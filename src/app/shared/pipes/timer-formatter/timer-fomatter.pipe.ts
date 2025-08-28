import { Pipe, PipeTransform } from '@angular/core';
import {
  FinTimeUnits,
  formatElapsedTime,
} from '../../functions/timer-formatter';

@Pipe({
  name: 'timerFomatter',
  pure: true,
})
export class TimerFomatterPipe implements PipeTransform {
  public transform(
    value: number,
    template?: string,
    unit: FinTimeUnits = 'milliseconds'
  ): string {
    return formatElapsedTime(value, template, unit);
  }
}
