import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { AuthService } from '../authentication/auth.service';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { environment } from '../../../../environments/environment';
import { NotifyUserDto } from '../../types/notifications/notify-user-dto';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationWebsocketService implements OnDestroy, OnInit {
  private readonly _isConnected = signal(false);
  public readonly isConnected = this._isConnected.asReadonly();

  private hubConnection!: HubConnection;
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'notifications-hub';
  private readonly SEND_NOTIFICATION_ACTION = 'ReceiveNotification';

  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private subscription: Subscription;

  public ngOnInit(): void {
    this.subscription = this.authService.isAuthenticatedSub.subscribe(
      async (authenticated) => {
        if (authenticated) await this.startConnection();
        else await this.stopConnection();
      }
    );
  }

  public async ngOnDestroy(): Promise<void> {
    await this.stopConnection();
    this._isConnected.set(false);
    this.subscription.unsubscribe();
  }

  public async startConnection(): Promise<void> {
    try {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.API_URL, {
          accessTokenFactory: () => this.authService.getToken() || '',
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

      this.setupEventHandlers();

      await this.hubConnection.start();
      this._isConnected.set(true);
    } catch (error) {
      console.error('SignalR Connection Error:', error);
      this._isConnected.set(false);
    }
  }

  public async stopConnection(): Promise<void> {
    if (
      this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Connected
    ) {
      await this.hubConnection.stop();
      this._isConnected.set(false);
    }
  }

  public getConnectionState(): HubConnectionState {
    return this.hubConnection?.state || HubConnectionState.Disconnected;
  }

  private setupEventHandlers(): void {
    this.hubConnection.on(
      this.SEND_NOTIFICATION_ACTION,
      async (payload: NotifyUserDto) => {
        await this.notificationService.addNotificationFromWebSocket(payload);
      }
    );

    this.hubConnection.onreconnecting(() => {
      this._isConnected.set(false);
    });

    this.hubConnection.onreconnected(() => {
      this._isConnected.set(true);
    });

    this.hubConnection.onclose(() => {
      this._isConnected.set(false);
    });
  }
}
