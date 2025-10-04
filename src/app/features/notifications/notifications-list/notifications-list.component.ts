import {
  ChangeDetectionStrategy,
  Component,
  inject,
  LOCALE_ID,
  OnInit,
  signal,
} from '@angular/core';
import { NotificationApiService } from '../../../core/services/notifications/notification-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinGridOptions } from '../../../shared/components/grid/models/fin-grid-options';
import { IFinGridColumnOption } from '../../../shared/components/grid/models/columns/i-fin-grid-column-option';
import { Observable, of, Subject, tap } from 'rxjs';
import { NotificationOutput } from '../../../core/types/notifications/notification-output';
import { FinGridSimpleColumnOption } from '../../../shared/components/grid/models/columns/fin-grid-simple-column-option';
import {
  FinGridIconColumnOption,
  FinIconOptions,
} from '../../../shared/components/grid/models/columns/fin-grid-icon-column-option';
import { NotificationSeverity } from '../../../core/enums/notifications/notification-severity';
import { NotificationWay } from '../../../core/enums/notifications/notification-way';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';
import { FinSeverity } from '../../../core/types/themes/fin-severity';
import { DatePipe } from '@angular/common';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { FinTranslateService } from '../../../core/services/translate/fin-translate.service';

@Component({
  selector: 'fin-notifications-list',
  imports: [FinPageLayoutComponent, FinGridComponent, FinButtonComponent],
  providers: [DatePipe],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions>(new FinGridOptions());
  public readonly loading = signal(true);

  private readonly apiService = inject(NotificationApiService);
  private readonly localizationService = inject(LocalizationService);
  private readonly dataPipe = inject(DatePipe);
  private readonly locale = inject(LOCALE_ID);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translateService = inject(FinTranslateService);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setOptions();
    console.log(this.locale);
  }

  public createNotification(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'NOTIFICATIONS_LIST',
      getColumns: () => of(this.getColumns()),
      getList: (input) => this.getNotifications(input),
      reloadItens: this.reloadItens,
      onDelete: this.delete.bind(this),
      onEdit: this.edit.bind(this),
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<NotificationOutput>[] {
    return [
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => item.title,
        header: 'finCore.features.notifications.title',
        width: '10%'
      }),
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => item.textBody,
        header: 'finCore.features.notifications.textBody',
      }),
      new FinGridIconColumnOption<NotificationOutput>({
        getValue: (item) => this.getSeverityIcon(item.severity),
        header: 'finCore.features.notifications.severity.title',
        width: '50px',
      }),
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => this.formatWays(item.ways),
        header: 'finCore.features.notifications.ways.title',
        width: '120px',
      }),
      new FinGridIconColumnOption<NotificationOutput>({
        getValue: (item) => {
          if (!item.continuous) {
            return new FinIconOptions({
              icon: 'times',
              color: 'var(--color-disabled)',
            });
          }
          return new FinIconOptions({
            icon: 'check',
            color: 'var(--color-success)',
          });
        },
        header: 'finCore.features.notifications.continuous',
        width: '50px',
      }),
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => this.formatDate(item.startToDelivery),
        header: 'finCore.features.notifications.startToDelivery',
        width: '150px',
      }),
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) =>
          item.stopToDelivery ? this.formatDate(item.stopToDelivery) : '-',
        header: 'finCore.features.notifications.stopToDelivery',
        width: '150px',
      }),
    ];
  }

  private getSeverityIcon(severity: NotificationSeverity): FinIconOptions {
    let icon: string;
    let finSeverity: FinSeverity;
    let tooltip: string;

    switch (severity) {
      case NotificationSeverity.Success:
        finSeverity = 'success';
        icon = 'circle-check';
        tooltip = 'finCore.features.notifications.severity.success';
        break;
      case NotificationSeverity.Error:
        finSeverity = 'danger';
        icon = 'circle-exclamation';
        tooltip = 'finCore.features.notifications.severity.error';
        break;
      case NotificationSeverity.Warning:
        finSeverity = 'warn';
        icon = 'triangle-exclamation';
        tooltip = 'finCore.features.notifications.severity.warning';
        break;
      case NotificationSeverity.Info:
        finSeverity = 'info';
        icon = 'circle-info';
        tooltip = 'finCore.features.notifications.severity.info.';
        break;
      default:
        finSeverity = 'primary';
        icon = 'bell';
        tooltip = 'finCore.features.notifications.severity.default';
        break;
    }

    return new FinIconOptions({
      icon,
      severity: finSeverity,
      tooltip: tooltip,
    });
  }

  private formatWays(ways: NotificationWay[]): string {
    if (!ways || ways.length === 0) return '-';

    return ways
      .map((way) => {
        return this.translateService.translate(
          `finCore.features.notifications.ways.${NotificationWay[way].toLowerCase()}`
        );
      })
      .join(', ');
  }

  private formatDate(date: Date): string {
    if (!date) return '-';
    return (
      this.dataPipe.transform(
        new Date(date),
        this.localizationService.getDefaultDatetimeFormat()
      ) ?? '-'
    );
  }

  private edit(item: NotificationOutput): Observable<void> {
    this.router.navigate([`./${item.id}`], { relativeTo: this.activatedRoute });
    return of();
  }

  private delete(item: NotificationOutput): Observable<void> {
    return this.apiService
      .delete(item.id)
      .pipe(tap(() => this.reloadItens.next()));
  }

  private getNotifications(
    input: PagedFilteredAndSortedInput
  ): Observable<PagedOutput<NotificationOutput>> {
    return this.apiService.getList(input);
  }
}
