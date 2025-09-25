import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { IFinGridActionOption } from '../../../shared/components/grid/models/i-fin-grid-action-option';
import { PagedFilteredAndSortedInput } from '../../../shared/models/paginations/paged-filtered-and-sorted-input';
import { PagedOutput } from '../../../shared/models/paginations/paged-output';
import { FinPageLayoutComponent } from '../../../shared/components/page-layout/fin-page-layout.component';
import { FinGridComponent } from '../../../shared/components/grid/fin-grid.component';
import { FinButtonComponent } from '../../../shared/components/button/fin-button.component';

@Component({
  selector: 'fin-notifications-list',
  imports: [FinPageLayoutComponent, FinGridComponent, FinButtonComponent],
  templateUrl: './notifications-list.component.html',
  styleUrl: './notifications-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsListComponent implements OnInit {
  public readonly gridOptions = signal<FinGridOptions>(new FinGridOptions());
  public readonly loading = signal(true);

  private readonly apiService = inject(NotificationApiService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly reloadItens = new Subject<void>();

  public ngOnInit(): void {
    this.setOptions();
  }

  public createNotification(): void {
    this.router.navigate(['./new'], { relativeTo: this.activatedRoute });
  }

  private setOptions() {
    const gridOptions = new FinGridOptions({
      id: 'NOTIFICATIONS_LIST',
      getColumns: () => of(this.getColumns()),
      getActions: () => of(this.getActions()),
      getList: (input) => this.getNotifications(input),
      reloadItens: this.reloadItens,
    });

    this.gridOptions.set(gridOptions);
    this.loading.set(false);
  }

  private getColumns(): IFinGridColumnOption<NotificationOutput>[] {
    return [
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => item.title,
        header: 'finCore.features.notifications.title',
      }),
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => item.textBody,
        header: 'finCore.features.notifications.textBody',
      }),
      new FinGridIconColumnOption<NotificationOutput>({
        getValue: (item) => this.getSeverityIcon(item.severity),
        header: 'finCore.features.notifications.severity',
        width: '50px',
      }),
      new FinGridSimpleColumnOption<NotificationOutput>({
        getValue: (item) => this.formatWays(item.ways),
        header: 'finCore.features.notifications.ways',
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
        getValue: (item) => item.stopToDelivery ? this.formatDate(item.stopToDelivery) : '-',
        header: 'finCore.features.notifications.stopToDelivery',
        width: '150px',
      }),
    ];
  }

  private getActions(): IFinGridActionOption<NotificationOutput>[] {
    return [
      {
        icon: new FinIconOptions({
          icon: 'eye',
          tooltip: 'finCore.actions.view',
          color: 'var(--color-primary)',
        }),
        canShow: () => of(true),
        disabled: () => of(false),
        onClick: (item) => this.view(item),
      },
      {
        icon: new FinIconOptions({
          icon: 'pen',
          tooltip: 'finCore.actions.edit',
          color: 'var(--color-disabled)',
        }),
        canShow: () => of(true),
        disabled: () => of(false),
        onClick: (item) => this.edit(item),
      },
      {
        icon: new FinIconOptions({
          icon: 'trash',
          color: 'var(--color-error)',
          tooltip: 'finCore.actions.delete',
        }),
        canShow: () => of(true),
        disabled: () => of(false),
        onClick: (item) => this.delete(item),
      },
    ];
  }

  private getSeverityIcon(severity: NotificationSeverity): FinIconOptions {
    switch (severity) {
      case NotificationSeverity.Info:
        return new FinIconOptions({
          icon: 'info-circle',
          color: 'var(--color-info)',
        });
      case NotificationSeverity.Warning:
        return new FinIconOptions({
          icon: 'exclamation-triangle',
          color: 'var(--color-warning)',
        });
      case NotificationSeverity.Error:
        return new FinIconOptions({
          icon: 'times-circle',
          color: 'var(--color-error)',
        });
      case NotificationSeverity.Success:
        return new FinIconOptions({
          icon: 'check-circle',
          color: 'var(--color-success)',
        });
      default:
        return new FinIconOptions({
          icon: 'circle',
          color: 'var(--color-disabled)',
        });
    }
  }

  private formatWays(ways: NotificationWay[]): string {
    if (!ways || ways.length === 0) return '-';

    return ways.map(way => {
      switch (way) {
        case NotificationWay.Email:
          return 'Email';
        case NotificationWay.Push:
          return 'Push';
        case NotificationWay.Snack:
          return 'Snack';
        case NotificationWay.Message:
          return 'Message';
        default:
          return '-';
      }
    }).join(', ');
  }

  private formatDate(date: Date): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  private view(item: NotificationOutput): Observable<void> {
    this.router.navigate([`./${item.id}/view`], { relativeTo: this.activatedRoute });
    return of();
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