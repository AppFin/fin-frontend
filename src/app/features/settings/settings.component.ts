import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, firstValueFrom, Observable, of } from 'rxjs';
import { SupportedLocalizations } from '../../core/constants/localizations/supported-localizations';
import { AuthService } from '../../core/services/authentication/auth.service';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { FinTranslateService } from '../../core/services/translate/fin-translate.service';
import { FinInputComponent } from '../../shared/components/generics/input/fin-input.component';
import { EditorLayoutComponent } from '../../shared/components/generics/page-layout/editor-layout/editor-layout.component';
import { FinSelectComponentOptions } from '../../shared/components/generics/select/fin-select-component-options';
import { FinSelectOption } from '../../shared/components/generics/select/fin-select-option';
import { FinSelectComponent } from '../../shared/components/generics/select/fin-select.component';
import { PagedOutput } from '../../shared/models/paginations/paged-output';
import { UserDto } from '../../shared/models/users/user-dto';
import { UserUpdateOrCreateInput } from '../../shared/models/users/user-update-or-create-input';
import { UserApiService } from '../authentication/services/user-api.service';
import { UpdateUserForm } from './update-user-form';

@Component({
  selector: 'fin-settings',
  imports: [EditorLayoutComponent, FinInputComponent, FinSelectComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  public formGroup: FormGroup<UpdateUserForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);

  public readonly lacalizationsSelectOptions: FinSelectComponentOptions = {
    getOptions: this.getLocalizationOptions,
  };

  private entityEditingId: string;

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(UserApiService);
  private authService = inject(AuthService);
  private localizationService = inject(LocalizationService);
  private translateService = inject(FinTranslateService);

  public async ngOnInit(): Promise<void> {
    const userId = this.authService.currentUser()?.userId;
    if (!userId) throw new Error('User ID not found');
    this.entityEditingId = userId;

    const editingEntity = await this.getUser();
    this.setFormGroup(editingEntity);
  }

  public get canSave(): boolean {
    return (
      this.formGroup?.touched &&
      this.formGroup?.valid &&
      !this.loading() &&
      !this.saving()
    );
  }

  public close(setLang = false): void {
    if (setLang) {
      const lang = this.formGroup.get('locale')?.value;
      if (!!lang) {
        this.localizationService.setUserLang(lang.toString());
        this.translateService.setDefaultLanguage();
        this.authService.performTokenRefresh();
      }
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  public save(): void {
    if (!this.canSave) return;
    this.saving.set(true);

    const input = this.formGroup.getRawValue() as UserUpdateOrCreateInput;

    this.apiService
      .update(this.entityEditingId, input)
      .pipe(
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe(() => {
        this.close(true);
      });
  }

  private async getUser(): Promise<UserDto> {
    return await firstValueFrom(this.apiService.get(this.entityEditingId));
  }

  private setFormGroup(entityEditing: UserDto): void {
    this.formGroup = new FormGroup<UpdateUserForm>({
      firstName: new FormControl(entityEditing.firstName, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.min(2),
        ],
      }),
      lastName: new FormControl(entityEditing.lastName, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.min(2),
        ],
      }),
      displayName: new FormControl(entityEditing.displayName, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(100),
          Validators.min(2),
        ],
      }),
      locale: new FormControl<SupportedLocalizations>(
        entityEditing.tenants[0].locale,
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.maxLength(5),
            Validators.min(5),
          ],
        }
      ),
      imagePublicUrl: new FormControl(entityEditing.imagePublicUrl, {
        validators: [Validators.maxLength(200)],
      }),
    });
    this.loading.set(false);
  }

  private getLocalizationOptions(): Observable<
    PagedOutput<FinSelectOption<SupportedLocalizations>>
  > {
    return of({
      totalCount: 3,
      items: [
        {
          label: 'finCore.auth.pages.settings.ptBr',
          value: SupportedLocalizations.ptBR,
        },
        {
          label: 'finCore.auth.pages.settings.enUs',
          value: SupportedLocalizations.enUS,
        },
        {
          label: 'finCore.auth.pages.settings.esEs',
          value: SupportedLocalizations.esES,
        },
      ],
    } as PagedOutput<FinSelectOption<SupportedLocalizations>>);
  }
}
