import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IFinGridCustomColumn } from '../../../interface/i-fin-grid-custom-column';
import { IFinGridColumnOption } from '../../columns/i-fin-grid-column-option';

export class FinImageOptions {
  public imageUrl: string = '';
  public altText?: string = 'Image';
  public width?: string = '40px';
  public height?: string = '40px';

  constructor(op: Partial<FinImageOptions> = {}) {
    Object.assign(this, op);
  }
}

@Component({
  selector: 'fin-grid-image-column',
  standalone: true,
  template: `
    @if (imageOptions()?.imageUrl) {
      <img 
        [src]="imageOptions()!.imageUrl" 
        [alt]="imageOptions()!.altText || 'Image'" 
        [style.width]="imageOptions()!.width" 
        [style.height]="imageOptions()!.height"
        style="object-fit: contain; display: block;"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinGridImageColumnComponent<T> implements IFinGridCustomColumn<T> {
  public imageOptions = signal<FinImageOptions | null>(null);

  public setItem(item: T, options: IFinGridColumnOption<T>): void {
    const getValue = (options as any).getValue;
    if (getValue) {
      this.imageOptions.set(getValue(item));
    }
  }
}
