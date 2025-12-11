import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { firstValueFrom, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { NotifyUserDto } from '../../types/notifications/notify-user-dto';
import { AuthService } from '../authentication/auth.service';
import { NotificationService } from './notification.service';

interface ConnectionTokenResponse {
  connectionToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationWebsocketService implements OnDestroy, OnInit {
  private readonly _isConnected = signal(false);
  public readonly isConnected = this._isConnected.asReadonly();

  private hubConnection!: HubConnection;
  private readonly API_URL =
    ensureTrailingSlash(environment.apiUrl) + 'notifications-hub';
  private readonly TOKEN_ENDPOINT =
    ensureTrailingSlash(environment.apiUrl) +
    'notifications/websocket/connection-token';
  private readonly SEND_NOTIFICATION_ACTION = 'ReceiveNotification';

  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly http = inject(HttpClient);

  private authSubscription?: Subscription;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  public ngOnInit() {
    this.initializeAuthSubscription();
  }

  private initializeAuthSubscription(): void {
    this.authSubscription = this.authService.isAuthenticatedSub.subscribe(
      async (authenticated) => {
        if (authenticated) {
          await this.startConnection();
        } else {
          await this.stopConnection();
        }
      }
    );
  }

  public async ngOnDestroy(): Promise<void> {
    await this.stopConnection();
    this._isConnected.set(false);
    this.authSubscription?.unsubscribe();
  }

  public async startConnection(): Promise<void> {
    try {
      const connectionToken = await this.getConnectionToken();
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.API_URL, {
          accessTokenFactory: () => connectionToken,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.previousRetryCount === 0) return 0; // 0s
            if (retryContext.previousRetryCount === 1) return 2000; //2s
            if (retryContext.previousRetryCount === 2) return 10000; // 10s
            return 30000; // 30s
          },
        })
        .build();

      this.setupEventHandlers();

      await this.hubConnection.start();
      this._isConnected.set(true);
      this.reconnectAttempts = 0;

      console.log('WebSocket connected successfully');
    } catch (error) {
      console.error('SignalR Connection Error:', error);
      this._isConnected.set(false);

      this.handleConnectionFailure();
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

  public async forceReconnect(): Promise<void> {
    await this.stopConnection();
    this.reconnectAttempts = 0;
    await this.startConnection();
  }

  private handleConnectionFailure(): void {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

      console.log(
        `Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`
      );

      setTimeout(() => {
        if (this.authService.getToken()) {
          this.startConnection();
        }
      }, delay);
    } else {
      console.error(
        'Max reconnection attempts reached. Please refresh the page.'
      );
    }
  }

  private async getConnectionToken(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<ConnectionTokenResponse>(this.TOKEN_ENDPOINT, {})
      );
      return response.connectionToken;
    } catch (error) {
      console.error('Failed to get connection token:', error);
      throw new Error('Could not obtain WebSocket connection token');
    }
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

    this.hubConnection.onreconnected(async () => {
      console.log('WebSocket reconnected, obtaining new connection token...');

      try {
        await this.hubConnection.stop();
        await this.startConnection();
      } catch (error) {
        console.error('Failed to reconnect with new token:', error);
        this.handleConnectionFailure();
      }
    });

    this.hubConnection.onclose((error) => {
      console.log('WebSocket connection closed', error);
      this._isConnected.set(false);

      if (this.authService.isAuthenticated) {
        this.handleConnectionFailure();
      }
    });
  }
}
