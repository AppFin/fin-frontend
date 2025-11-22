import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, first, firstValueFrom, iif, tap } from 'rxjs';
import { FinInputComponent } from '../../../shared/components/generics/input/fin-input.component';
import { EditorLayoutComponent } from '../../../shared/components/generics/page-layout/editor-layout/editor-layout.component';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { PersonCreateOrUpdateErrorCode } from '../../../shared/enums/people/person-create-or-update-error-code';
import { PeopleService } from '../../../shared/services/people/person.service';
import { FormGroupFromType } from '../../../shared/types/form/form-group-from-type';
import { PersonInput } from '../../../shared/types/people/person-input';
import { PersonOutput } from '../../../shared/types/people/person-output';
import { nameAlreadyInUseValidator } from '../../../shared/validators/name-already-in-use-validator';

@Component({
  selector: 'fin-people-editor',
  imports: [EditorLayoutComponent, FinInputComponent],
  templateUrl: './people-editor.component.html',
  styleUrl: './people-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleEditorComponent implements OnInit {
  public formGroup: FormGroupFromType<PersonInput>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);
  public readonly personEditingName = signal('');

  public readonly editorTypes = EditorType;

  private namesAlreadyInUse = signal<string[]>([]);

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(PeopleService);
  private personEditingId: string;

  public async ngOnInit(): Promise<void> {
    const personEditing = await this.setEditingPerson();
    this.setFormGroup(personEditing);
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

    const input = this.formGroup.getRawValue() as PersonInput;

    iif(
      () => this.editorType() === EditorType.Create,
      this.apiService.create(input),
      this.apiService.update(this.personEditingId, input)
    )
      .pipe(
        tap((result) => {
          if (result[0]) return;
          if (
            result[2]?.errorCode ===
            PersonCreateOrUpdateErrorCode.NameAlreadyInUse
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

  private async setEditingPerson(): Promise<PersonOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('personId');
    if (!id) return null;

    const person = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.personEditingId = id;
    this.personEditingName.set(person.name);
    return person;
  }

  private setFormGroup(personEditing: PersonOutput | null): void {
    this.formGroup = new FormGroupFromType<PersonInput>({
      name: new FormControl(personEditing?.name ?? '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(100),
          nameAlreadyInUseValidator(() => this.namesAlreadyInUse()),
        ],
      }),
    });
    this.loading.set(false);
  }
}
