import { animate, style, transition, trigger } from '@angular/animations';

export const slideOut = trigger('slideOut', [
  transition(':leave', [
    animate(
      '200ms ease-in-out',
      style({ transform: 'translateX(100%)', opacity: 0 })
    ),
  ]),
]);
