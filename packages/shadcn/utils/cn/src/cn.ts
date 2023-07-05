import { twMerge } from 'tailwind-merge';

export const cn = twMerge;
export type ClassNameValue = Parameters<typeof cn>[0];
