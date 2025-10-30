import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NotificationWebsocketService } from '../../services/notifications/notification-websocket.service';
import { FinSideModalComponent } from "./side-modal/fin-side-modal.component";

@Component({
  selector: 'fin-layout',
  imports: [RouterOutlet, HeaderComponent, SideNavComponent, FinSideModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly notificationWebsocketService = inject(
    NotificationWebsocketService
  );

  public ngOnInit(): void {
    this.notificationWebsocketService.ngOnInit();
  }

  public async ngOnDestroy(): Promise<void> {
    await this.notificationWebsocketService.ngOnDestroy();
  }
}

