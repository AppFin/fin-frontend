import { Injectable } from '@angular/core';

export interface PlatformInfo {
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlatformDetectionService {
  private platformInfo: PlatformInfo | null = null;

  constructor() {
    this.detectPlatform();
  }

  public getPlatformInfo(): PlatformInfo {
    if (!this.platformInfo) {
      this.detectPlatform();
    }
    return this.platformInfo!;
  }

  private detectPlatform(): void {
    const userAgent = navigator.userAgent;

    this.platformInfo = {
      osName: this.detectOSName(userAgent),
      osVersion: this.detectOSVersion(userAgent),
      browserName: this.detectBrowserName(userAgent),
      browserVersion: this.detectBrowserVersion(userAgent),
    };
  }

  private detectOSName(userAgent: string): string {
    if (userAgent.includes('Windows NT')) return 'Windows';
    if (userAgent.includes('Mac OS X')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (
      userAgent.includes('iOS') ||
      userAgent.includes('iPhone') ||
      userAgent.includes('iPad')
    )
      return 'iOS';
    return 'Unknown';
  }

  private detectOSVersion(userAgent: string): string {
    const osName = this.detectOSName(userAgent);

    switch (osName) {
      case 'Windows':
        const winMatch = userAgent.match(/Windows NT ([\d.]+)/);
        return winMatch ? winMatch[1] : 'Unknown';

      case 'macOS':
        const macMatch = userAgent.match(/Mac OS X ([\d_]+)/);
        return macMatch ? macMatch[1].replace(/_/g, '.') : 'Unknown';

      case 'Android':
        const androidMatch = userAgent.match(/Android ([\d.]+)/);
        return androidMatch ? androidMatch[1] : 'Unknown';

      case 'iOS':
        const iosMatch = userAgent.match(/OS ([\d_]+)/);
        return iosMatch ? iosMatch[1].replace(/_/g, '.') : 'Unknown';

      default:
        return 'Unknown';
    }
  }

  private detectBrowserName(userAgent: string): string {
    if (userAgent.includes('Edg/')) return 'Edge';
    if (userAgent.includes('Chrome') && !userAgent.includes('Chromium'))
      return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
      return 'Safari';
    if (userAgent.includes('Opera') || userAgent.includes('OPR'))
      return 'Opera';
    return 'Unknown';
  }

  private detectBrowserVersion(userAgent: string): string {
    const browserName = this.detectBrowserName(userAgent);

    switch (browserName) {
      case 'Chrome':
        const chromeMatch = userAgent.match(/Chrome\/([\d.]+)/);
        return chromeMatch ? chromeMatch[1] : 'Unknown';

      case 'Firefox':
        const firefoxMatch = userAgent.match(/Firefox\/([\d.]+)/);
        return firefoxMatch ? firefoxMatch[1] : 'Unknown';

      case 'Safari':
        const safariMatch = userAgent.match(/Version\/([\d.]+)/);
        return safariMatch ? safariMatch[1] : 'Unknown';

      case 'Edge':
        const edgeMatch = userAgent.match(/Edg\/([\d.]+)/);
        return edgeMatch ? edgeMatch[1] : 'Unknown';

      case 'Opera':
        const operaMatch = userAgent.match(/(Opera|OPR)\/([\d.]+)/);
        return operaMatch ? operaMatch[2] : 'Unknown';

      default:
        return 'Unknown';
    }
  }
}
