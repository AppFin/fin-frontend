import { FinSeverity } from '../../core/types/themes/fin-severity';

export const getSeverityColor = (severity: FinSeverity | null) => {
  switch (severity) {
    case 'success':
      return  'var(--color-success)';
    case 'danger':
      return 'var(--color-error)';
    case 'warn':
      return 'var(--color-warning)';
    case 'info':
      return  'var(--color-info)';
    case 'secondary':
      return  'var(--color-secondary)';
    default:
      return 'var(--color-primary)';
  }
}