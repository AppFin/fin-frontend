import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { BankCode } from '../../enums/financial-institutions/bank-code.enum';
import { getBankLogoPath, getBankLogoAlt } from '../../models/financial-institutions/bank-logo.map';
import { NgOptimizedImage } from '@angular/common';
import { FinIconComponent } from '../icon/fin-icon.component';

@Component({
  selector: 'fin-bank-logo',
  imports: [NgOptimizedImage, FinIconComponent],
  template: `
    @if (logoPath()) {
      <img
        [ngSrc]="logoPath()!"
        [alt]="altText()"
        [width]="width()"
        [height]="height()"
        [priority]="priority()"
        [loading]="loading()"
        class="bank-logo"
        [style.object-fit]="'contain'"
      />
    } @else {
      <fin-icon
        icon="building-columns"
      />
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .bank-logo {
      object-fit: contain;
      border-radius: 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinBankLogoComponent {
  public readonly bankCode = input.required<BankCode>();
  public readonly width = input<number>(40);
  public readonly height = input<number>(40);
  public readonly priority = input<boolean>(false);
  public readonly loading = input<'lazy' | 'eager'>('lazy');

  public readonly logoPath = computed(() => getBankLogoPath(this.bankCode()));
  public readonly altText = computed(() => getBankLogoAlt(this.bankCode()));
}
