import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// * localize 템플릿 문자열 치환
export const replaceT = (
  template: string,
  params: Record<string, string | number | boolean>,
) => {
  return template.replace(/{(\w+)}/g, (_, key) => {
    return key in params ? String(params[key]) : `{${key}}`;
  });
};
