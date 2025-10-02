import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NotificationWay } from '../../../core/enums/notifications/notification-way';
import { NotificationSeverity } from '../../../core/enums/notifications/notification-severity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditorType } from '../../../shared/enums/layouts/editor-type';
import { FinSelectComponentOptions } from '../../../shared/components/select/fin-select-component-options';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationApiService } from '../../../core/services/notifications/notification-api.service';
import { finalize, first, firstValueFrom, map, Observable, of } from 'rxjs';
import { NotificationInput } from '../../../core/types/notifications/notification-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinSelectOption } from '../../../shared/components/select/fin-select-option';
import { NotificationOutput } from '../../../core/types/notifications/notification-output';
import { EditorLayoutComponent } from '../../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinInputComponent } from '../../../shared/components/input/fin-input.component';
import { FinSelectComponent } from '../../../shared/components/select/fin-select.component';
import { FinToggleSwitchComponent } from '../../../shared/components/toggle-switch/fin-toggle-switch.component';

type NotificationInputForm = {
  ways: FormControl<NotificationWay[]>;
  textBody: FormControl<string>;
  htmlBody: FormControl<string>;
  title: FormControl<string>;
  continuous: FormControl<boolean>;
  startToDelivery: FormControl<Date>;
  stopToDelivery: FormControl<Date | null>;
  userIds: FormControl<string[]>;
  link: FormControl<string>;
  severity: FormControl<NotificationSeverity>;
};

@Component({
  selector: 'fin-notifications-editor',
  imports: [
    EditorLayoutComponent,
    FinInputComponent,
    FinSelectComponent,
    FinToggleSwitchComponent,
  ],
  templateUrl: './notifications-editor.component.html',
  styleUrl: './notifications-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NotificationsEditorComponent implements OnInit {
  public formGroup: FormGroup<NotificationInputForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly editorType = signal<EditorType>(EditorType.Create);

  public readonly editorTypes = EditorType;

  public readonly selectOptions = new FinSelectComponentOptions({
    getOptions: this.getNotificationSeverityOptions.bind(this),
  });

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(NotificationApiService);
  private notificationEditingId: string;

  public async ngOnInit(): Promise<void> {
    const notificationEditing = await this.setEditingNotification();
    this.setFormGroup(notificationEditing);
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

    const input = this.formGroup.getRawValue() as NotificationInput;

    const request =
      this.editorType() === EditorType.Create
        ? this.apiService.create(input).pipe(map(() => {}))
        : this.apiService.update(this.notificationEditingId, input);

    request
      .pipe(
        first(),
        finalize(() => this.saving.set(false))
      )
      .subscribe(() => this.fechar());
  }

  public fechar(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  private getNotificationSeverityOptions(): Observable<
    PagedOutput<FinSelectOption<NotificationSeverity>>
  > {
    return of({
      totalCount: 2,
      items: Object.values(NotificationSeverity)
        .filter((e) => typeof e !== 'string')
        .map((e) => {
          return {
            value: e,
            label: `finCore.features.notifications.severity.${NotificationSeverity[e].toLowerCase()}`,
          };
        }),
    } as PagedOutput<FinSelectOption<NotificationSeverity>>);
  }

  private setFormGroup(notificationsEditing: NotificationOutput | null): void {
    this.formGroup = new FormGroup<NotificationInputForm>({
      continuous: new FormControl(notificationsEditing?.continuous ?? false, {
        nonNullable: true,
        validators: Validators.required,
      }),
      htmlBody: new FormControl(notificationsEditing?.htmlBody ?? '', {
        nonNullable: true,
      }),
      link: new FormControl(notificationsEditing?.link ?? '', {
        nonNullable: true,
      }),
      severity: new FormControl(
        notificationsEditing?.severity ?? NotificationSeverity.Default,
        { nonNullable: true, validators: Validators.required }
      ),
      startToDelivery: new FormControl(
        notificationsEditing?.startToDelivery ?? new Date(),
        { nonNullable: true, validators: Validators.required }
      ),
      stopToDelivery: new FormControl(
        notificationsEditing?.stopToDelivery ?? null
      ),
      textBody: new FormControl(notificationsEditing?.textBody ?? '', {
        nonNullable: true,
      }),
      title: new FormControl(notificationsEditing?.title ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      userIds: new FormControl(notificationsEditing?.userIds ?? [], {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)],
      }),
      ways: new FormControl(notificationsEditing?.ways ?? [], {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
    this.loading.set(false);
  }

  private async setEditingNotification(): Promise<NotificationOutput | null> {
    const id = this.activatedRoute.snapshot.paramMap.get('notificationId');
    if (!id) return null;

    const menu = await firstValueFrom(this.apiService.get(id));
    this.editorType.set(EditorType.Edit);
    this.notificationEditingId = id;
    return menu;
  }
}
