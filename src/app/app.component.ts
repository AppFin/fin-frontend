
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, RouterOutlet],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly appService = inject(AppService);

  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.appService.startAppAsync(this.destroyRef)
  }

  public get isDarkMode(): boolean {
    return this.themeService.isDarkMode;
  }
}
