import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { IFinGridActionOption } from '../models/i-fin-grid-action-option';
import { firstValueFrom, Observable, take } from 'rxjs';
import { FinIconOptions } from '../models/columns/fin-grid-icon-column-option';
import { FinButtonComponent } from '../../button/fin-button.component';

interface IFinGridEffectiveAction<T> {
  icon: FinIconOptions;
  onClick: (item: T) => Observable<void>;
  disabled: boolean;
}

@Component({
  selector: 'fin-grid-actions-renderer',
  imports: [FinButtonComponent],
  templateUrl: './fin-grid-actions-renderer.component.html',
  styleUrl: './fin-grid-actions-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinGridActionsRendererComponent<T> implements OnInit {
  public readonly actions = input<IFinGridActionOption<T>[]>();
  public readonly item = input<T>();
  public readonly effectiveActions = signal<IFinGridEffectiveAction<T>[]>([]);

  public async ngOnInit(): Promise<void> {
    await this.setEffectiveActions();
  }

  private async setEffectiveActions(): Promise<void> {
    const item = this.item();
    if (!item) return;

    const actionsRequest = this.actions()?.map(async (a) => {
      return {
        action: a,
        canShow:
          a.canShow == null ? true : await firstValueFrom(a.canShow(item)),
        disabled:
          a.disabled == null ? false : await firstValueFrom(a.disabled(item)),
      };
    });
    if (!actionsRequest) return;

    const actions = (await Promise.all(actionsRequest))
      .filter((action) => action.canShow)
      .map((action) => {
        return {
          disabled: action.disabled,
          icon: action.action.icon,
          onClick: action.action.onClick,
        } as IFinGridEffectiveAction<T>;
      });
    this.effectiveActions.set(actions);
  }

  public onActionClick(action: IFinGridEffectiveAction<T>): void {
    const item = this.item();
    if (!item) return;
    action
      .onClick(item)
      .pipe(take(1))
      .subscribe(() => {});
  }
}
