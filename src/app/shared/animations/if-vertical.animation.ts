import { animate, style, transition, trigger } from '@angular/animations';

export const ifVerticalAnimation = trigger('ifVertical', [
  transition(':enter', [
    style({
      height: '0px',
      opacity: 0,
      transform: 'translateY(-20px)',
      overflow: 'hidden',
    }),
    animate(
      '300ms ease-out',
      style({
        height: '*',
        opacity: 1,
        transform: 'translateY(0)',
        overflow: 'hidden',
      })
    ),
  ]),
  transition(':leave', [
    style({
      height: '*',
      opacity: 1,
      transform: 'translateY(0)',
      overflow: 'hidden',
    }),
    animate(
      '300ms ease-in',
      style({
        height: '0px',
        opacity: 0,
        transform: 'translateY(-20px)',
        overflow: 'hidden',
      })
    ),
  ]),
]);
