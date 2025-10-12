import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AuthService } from '../../../../core/services/authentication/auth.service';

@Component({
  selector: 'fin-user-image',
  imports: [Avatar],
  templateUrl: './fin-user-image.component.html',
  styleUrl: './fin-user-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinUserImageComponent implements OnInit {
  public readonly size = input('2.5rem');
  public readonly userImgUrl = signal('/image/default-user.png');

  public readonly authService = inject(AuthService);

  public ngOnInit(): void {
    this.setUserImgUrl();
  }

  private setUserImgUrl(): void {
    const user = this.authService.currentUser();
    if ((user?.imageUrl ?? '').trim() === '') return;
    this.userImgUrl.set(user?.imageUrl ?? '');
  }
}
