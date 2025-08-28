const SECONDS_IN_ONE_HOUR = 3600;
const SECONDS_IN_ONE_MINUTE = 60;
const SECONDS_IN_ONE_DAY = 86400;
const SECONDS_IN_ONE_MONTH = 2592000;
const SECONDS_IN_ONE_YEAR = 31536000;

export type FinTimeUnits = 'milliseconds';

export function formatElapsedTime(
  value: number,
  template: string = '{hh}:{mm}',
  unit: FinTimeUnits = 'milliseconds'
): string {
  if (!template) template = '{hh}:{mm}';

  if (value <= 0) return formatTemplate(template);

  const totalSeconds = Math.floor(value / 1000);
  const milliseconds = totalSeconds % 1000;

  const years = Math.floor(totalSeconds / SECONDS_IN_ONE_YEAR);
  const remainingAfterYears = totalSeconds % SECONDS_IN_ONE_YEAR;

  const months = Math.floor(remainingAfterYears / SECONDS_IN_ONE_MONTH);
  const remainingAfterMonths = remainingAfterYears % SECONDS_IN_ONE_MONTH;

  const days = Math.floor(remainingAfterMonths / SECONDS_IN_ONE_DAY);
  const remainingAfterDays = remainingAfterMonths % SECONDS_IN_ONE_DAY;

  const hours = Math.floor(remainingAfterDays / SECONDS_IN_ONE_HOUR);
  const minutes = Math.floor(
    (remainingAfterDays % SECONDS_IN_ONE_HOUR) / SECONDS_IN_ONE_MINUTE
  );
  const seconds = Math.floor(remainingAfterDays % SECONDS_IN_ONE_MINUTE);

  return formatTemplate(template, {
    yy: years,
    MM: months,
    dd: days,
    hh: hours,
    mm: minutes,
    ss: seconds,
    ms: milliseconds,
  });
}

function formatTemplate(
  template: string,
  timeValues: {
    yy: number;
    MM: number;
    dd: number;
    ss: number;
    hh: number;
    mm: number;
    ms: number;
  } | null = null
): string {
  let result = template;

  const hasYears = template.includes('{yy}');
  const hasMonths = template.includes('{MM}');
  const hasDays = template.includes('{dd}');
  const hasHours = template.includes('{hh}');
  const hasMinutes = template.includes('{mm}');
  const hasSeconds = template.includes('{ss}');

  if (!hasYears && !!timeValues?.yy && timeValues.yy > 0) {
    timeValues.MM += timeValues.yy * 12;
  }
  if (!hasMonths && !!timeValues?.MM && timeValues.MM > 0) {
    timeValues.dd += timeValues.MM * 30;
  }
  if (!hasDays && !!timeValues?.dd && timeValues.dd > 0) {
    timeValues.hh += timeValues.dd * 24;
  }
  if (!hasHours && !!timeValues?.hh && timeValues.hh > 0) {
    timeValues.mm += timeValues.hh * 60;
  }
  if (!hasMinutes && !!timeValues?.mm && timeValues.mm > 0) {
    timeValues.ss += timeValues.mm * 60;
  }
  if (!hasSeconds && !!timeValues?.ss && timeValues.ss > 0) {
    timeValues.ms += timeValues.ss * 1000;
  }

  result = result.replace(/\{yy\}/g, padZero(timeValues?.yy ?? 0));
  result = result.replace(/\{MM\}/g, padZero(timeValues?.MM ?? 0));
  result = result.replace(/\{dd\}/g, padZero(timeValues?.dd ?? 0));
  result = result.replace(/\{hh\}/g, padZero(timeValues?.hh ?? 0));
  result = result.replace(/\{mm\}/g, padZero(timeValues?.mm ?? 0));
  result = result.replace(/\{ss\}/g, padZero(timeValues?.ss ?? 0));
  result = result.replace(/\{ms\}/g, padZero(timeValues?.ms ?? 0, 3));

  return result;
}

function padZero(value: number, digits = 2): string {
  return value.toString().padStart(digits, '0');
}
