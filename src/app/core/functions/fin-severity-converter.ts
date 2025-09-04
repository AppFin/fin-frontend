import { FinSeverity } from '../types/themes/fin-severity';

export function finSeverityConverter(severity: FinSeverity) {
  switch (severity) {
    case 'primary':
      return 'var(--color-primary)';
    case 'secondary':
      return 'var(--color-secondary)';
    case 'success':
      return 'var(--color-success)';
    case 'info':
      return 'var(--color-info)';
    case 'warn':
      return 'var(--color-warning)';
    case 'danger':
      return 'var(--color-error)';
  }
}
