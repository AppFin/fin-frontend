import { Injectable } from '@angular/core';
import { LoginOutput } from '../../models/authentication/login-output';
import { ensureTrailingSlash } from '../../functions/ensure-trailing-slash';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private readonly LOGIN_URL =
    ensureTrailingSlash(environment.apiUrl) +
    'authentications/login-google?state=';

  public async loginWithGoogle(): Promise<LoginOutput> {
    return new Promise((resolve, reject) => {
      const state = this.generateSecureState();
      const popup = this.openGooglePopup(state);

      if (!popup) {
        this.emmitPopupErrorMessage();
        reject('Error on open popup');
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          reject('User closed popup');
        }
      }, 1000);

      const messageHandler = async (event: MessageEvent) => {
        if (!this.isValidOrigin(event.origin)) {
          console.warn('Invalid origin:', event.origin);
          reject('Invalid origin');
          return;
        }

        if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          popup.close();

          const result: LoginOutput = event.data.result;
          resolve(result);
        } else if (event.data?.type === 'GOOGLE_AUTH_ERROR') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          popup.close();
          reject(event.data.error || 'Authentication with Google errors');
        }
      };

      window.addEventListener('message', messageHandler);

      setTimeout(() => {
        if (!popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          popup.close();
          reject('No response from user');
        }
      }, 300000);
    });
  }

  private openGooglePopup(state: string): Window | null {
    const width = 500;
    const height = 600;
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;

    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=yes',
      'status=yes',
      'menubar=no',
      'toolbar=no',
      'location=no',
    ].join(',');

    return window.open(this.LOGIN_URL + state, 'google-auth', features);
  }

  private generateSecureState(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  }

  private isValidOrigin(origin: string): boolean {
    const validOrigins = [environment.apiUrl];
    return validOrigins.includes(origin);
  }

  private emmitPopupErrorMessage(): void {
    // TODO here we notify user via push ou dialog.
  }
}
