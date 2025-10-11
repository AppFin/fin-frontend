import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { FormGroupFromType } from '../../../shared/types/form/form-group-from-type';
import { WalletInput } from '../../../shared/types/wallets/wallet-input';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletService } from '../../../shared/services/wallets/wallet.service';
import { finalize, first, firstValueFrom, iif, tap } from 'rxjs';
import { WalletOutput } from '../../../shared/types/wallets/wallet-output';
import { FormControl, Validators } from '@angular/forms';
import { nameAlreadyInUseValidator } from '../../../shared/validators/name-already-in-use-validator';
import { WalletCreateOrUpdateErrorCode } from '../../../shared/enums/wallets/walletcreate-or-update-error-code';
import { EditorLayoutComponent } from '../../../shared/components/generics/page-layout/editor-layout/editor-layout.component';
import { FinInputComponent } from '../../../shared/components/generics/input/fin-input.component';
import { FinMoneyInputComponent } from '../../../shared/components/money-input/fin-money-input.component';
import { FinFinancialInstitutionSelectComponent } from '../../../shared/components/financial-institution/financial-institution-select/fin-financial-institution-select.component';
import { FinUserFriendlyColorPickerComponent } from '../../../shared/components/user-friendly-color-picker/fin-user-friendly-color-picker.component';
import { FinUserFriendlyIconPickerComponent } from '../../../shared/components/user-friendly-icon-picker/fin-user-friendly-icon-picker.component';

@Component({
  selector: 'fin-wallets-editor',
  imports: [
    EditorLayoutComponent,
    FinInputComponent,
    FinMoneyInputComponent,
    FinFinancialInstitutionSelectComponent,
    FinUserFriendlyColorPickerComponent,
    FinUserFriendlyIconPickerComponent,
  ],
  templateUrl: './wallets-editor.component.html',
  styleUrl: './wallets-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsEditorComponent implements OnInit {
  public formGroup: FormGroupFromType<WalletInput>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);
  public readonly walletEditingName = signal('');

  public readonly editorTypes = EditorType;

  private namesAlreadyInUse = signal<string[]>([]);

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(WalletService);
  private walletEditingId: string;

  public async ngOnInit(): Promise<void> {
    const walletEditing = await this.setEditingWallet();
    this.setFormGroup(walletEditing);
  }

  public get canSave(): boolean {
    return (
      this.formGroup?.valid &&
      this.formGroup?.touched &&
      !this.loading() &&
      !this.saving()
    );
  }

  public save(): void {
    if (!this.canSave) return;
    this.saving.set(true);

    const input = this.formGroup.getRawValue() as WalletInput;

    iif(
      () => this.editorType() === EditorType.Create,
      this.apiService.create(input),
      this.apiService.update(this.walletEditingId, input)
    )
      .pipe(
        tap((result) => {
          if (result[0]) return;
          if (
            result[2]?.errorCode ===
            WalletCreateOrUpdateErrorCode.NameAlreadyInUse
          ) {
            this.namesAlreadyInUse.update((ns) => {
              return [...ns, input.name];
            });
            this.formGroup.controls.name.updateValueAndValidity();
          }
        }),
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe((result) => {
        if (result[0]) this.close();
      });
  }

  public close(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  private async setEditingWallet(): Promise<WalletOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('walletId');
    if (!id) return null;

    const wallet = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.walletEditingId = id;
    this.walletEditingName.set(wallet.name);
    return wallet;
  }

  private setFormGroup(walletEditing: WalletOutput | null): void {
    this.formGroup = new FormGroupFromType<WalletInput>({
      name: new FormControl(walletEditing?.name ?? '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(100),
          nameAlreadyInUseValidator(() => this.namesAlreadyInUse()),
        ],
      }),
      color: new FormControl(walletEditing?.color ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      icon: new FormControl(walletEditing?.icon ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      financialInstitutionId: new FormControl(
        walletEditing?.financialInstitutionId ?? null
      ),
      initialBalance: new FormControl(walletEditing?.initialBalance ?? 0, {
        nonNullable: true,
      }),
    });
    this.loading.set(false);
  }
}
