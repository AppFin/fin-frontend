import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fin-card-brand',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class CardBrandComponent {}
