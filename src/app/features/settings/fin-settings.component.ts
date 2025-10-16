import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, firstValueFrom, Observable, of } from 'rxjs';

import { FinInputComponent } from '../../shared/components/input/fin-input.component';
import { FinSelectComponent } from '../../shared/components/select/fin-select.component';
import { FinIconComponent } from '../../shared/components/icon/fin-icon.component';
import { FinTextComponent } from '../../shared/components/text/fin-text.component';
import { FinButtonComponent } from '../../shared/components/button/fin-button.component';
import { EditorLayoutComponent } from '../../shared/components/page-layout/editor-layout/editor-layout.component';
import { FinTranslatePipe } from '../../core/pipes/translate/fin-translate.pipe';
import { ThemeService } from '../../core/services/theme/theme.service';
import { NotifyService } from '../../core/services/notifications/notify.service';
import { UserSettingsApiService } from '../../core/services/user-settings/user-settings-api.service';
import { UserGender } from '../../shared/enums/users/user-gender';
import { NotificationSeverity } from '../../core/enums/notifications/notification-severity';
import { FinSelectComponentOptions } from '../../shared/components/select/fin-select-component-options';
import { PagedOutput } from '../../shared/models/paginations/paged-output';
import { FinSelectOption } from '../../shared/components/select/fin-select-option';
import { UserSettingsInput } from '../../shared/models/users/settings/user-settings-input';
import { UserSettingsOutput } from '../../shared/models/users/settings/user-settings-output';
import { FinDatetimeComponent } from "../../shared/components/datetime/fin-date-time.component";

type UserSettingsForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  displayName: FormControl<string | null>;
  gender: FormControl<UserGender | null>;
  birthDate: FormControl<Date | null>;
  imagePublicUrl: FormControl<string | null>;
  theme: FormControl<string>;
  locale: FormControl<string>;
  timezone: FormControl<string>;
  currencyCode: FormControl<string>;
};

@Component({
  selector: 'fin-settings',
  imports: [
    ReactiveFormsModule,
    FinInputComponent,
    FinSelectComponent,
    FinIconComponent,
    FinTextComponent,
    FinButtonComponent,
    EditorLayoutComponent,
    FinTranslatePipe,
    FinDatetimeComponent
],
  templateUrl: './fin-settings.component.html',
  styleUrl: './fin-settings.component.scss',
})
export class FinSettingsComponent implements OnInit {
  public formGroup: FormGroup<UserSettingsForm>;
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly isEditing = signal(false);

  private readonly themeService = inject(ThemeService);
  private readonly userSettingsService = inject(UserSettingsApiService);
  private readonly notifyService = inject(NotifyService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly isDarkMode = this.themeService.darkMode;

  public readonly genderSelectOptions = new FinSelectComponentOptions({
    getOptions: this.getGenderOptions.bind(this),
  });

  public async ngOnInit(): Promise<void> {
    const userSettings = await this.loadUserSettings();
    this.setFormGroup(userSettings)
    this.loading.set(false);

  }

  public get canSave(): boolean {
    return (
      this.formGroup?.valid &&
      this.formGroup?.touched &&
      !this.loading() &&
      !this.saving() &&
      this.isEditing()
    );
  }

  public enableEdit(): void {
    this.isEditing.set(true);
    this.formGroup.enable();
  }

  public save(): void {
    if (!this.canSave) return;

    this.saving.set(true);

    const formValue = this.formGroup.getRawValue() as UserSettingsInput;
    
    this.userSettingsService
      .updateSettings(formValue)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.saving.set(false))
      )
      .subscribe({
        next: () => {
          this.notifyService.notifyMessage(
            'finCore.settings.title',
            'finCore.settings.messages.saveSuccess',
            NotificationSeverity.Success
          );
          this.formGroup.markAsUntouched();
          this.isEditing.set(false);
          this.formGroup.disable();
        },
        error: (error: unknown) => {
          console.error('Error saving settings:', error);
          this.notifyService.notifyMessage(
            'finCore.settings.title',
            'finCore.settings.messages.saveError',
            NotificationSeverity.Error
          );
        },
      });
  }

  public cancel(): void {
    this.isEditing.set(false);
    this.loadUserSettings().then((settings) => {
      this.setFormGroup(settings);
      this.formGroup.disable();
    });
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private getGenderOptions(): Observable<PagedOutput<FinSelectOption<UserGender>>> {
    return of({
      totalCount: 3,
      items: [
        { value: UserGender.Man, label: 'finCore.settings.profile.genderOptions.man' },
        { value: UserGender.Woman, label: 'finCore.settings.profile.genderOptions.woman' },
        { value: UserGender.Other, label: 'finCore.settings.profile.genderOptions.other' },
      ],
    } as PagedOutput<FinSelectOption<UserGender>>);
  }

  private setFormGroup(userSettings: UserSettingsOutput): void {
    this.formGroup = new FormGroup<UserSettingsForm>({
      firstName: new FormControl(userSettings.firstName, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      lastName: new FormControl(userSettings.lastName, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      displayName: new FormControl(userSettings?.displayName, {
        nonNullable: true,
      }),
      gender: new FormControl(userSettings.gender),
      birthDate: new FormControl(
        userSettings.birthDate
      ),
      imagePublicUrl: new FormControl(userSettings?.imagePublicUrl, {
        nonNullable: true,
      }),
      theme: new FormControl(userSettings.theme, { nonNullable: true }),
      locale: new FormControl(userSettings.locale, { nonNullable: true }),
      timezone: new FormControl(userSettings.timezone, { nonNullable: true }),
      currencyCode: new FormControl(userSettings.currencyCode, { nonNullable: true }),
    }); 
    this.formGroup.disable();
    this.loading.set(false);
  }

  private async loadUserSettings(): Promise<UserSettingsOutput> {
    
     
    return await firstValueFrom(this.userSettingsService.getSettings());
  }
}
