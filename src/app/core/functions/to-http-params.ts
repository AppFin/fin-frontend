import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: any, prefix?: string): HttpParams {
  let params = new HttpParams();

  if (obj === null || obj === undefined) {
    return params;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const paramKey = prefix ? `${prefix}.${key}` : key;

      if (value === null || value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item !== null && item !== undefined) {
            if (typeof item === 'object') {
              const nestedParams = toHttpParams(item, `${paramKey}[${index}]`);
              nestedParams.keys().forEach(nestedKey => {
                nestedParams.getAll(nestedKey)?.forEach(nestedValue => {
                  params = params.append(nestedKey, nestedValue);
                });
              });
            } else {
              params = params.append(paramKey, item.toString());
            }
          }
        });
      } else if (typeof value === 'object' && value instanceof Date) {
        params = params.append(paramKey, value.toISOString());
      } else if (typeof value === 'object') {
        const nestedParams = toHttpParams(value, paramKey);
        nestedParams.keys().forEach(nestedKey => {
          nestedParams.getAll(nestedKey)?.forEach(nestedValue => {
            params = params.append(nestedKey, nestedValue);
          });
        });
      } else if (typeof value === 'boolean') {
        params = params.append(paramKey, value.toString());
      } else {
        params = params.append(paramKey, value.toString());
      }
    }
  }

  return params;
}
