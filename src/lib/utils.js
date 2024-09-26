import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (title) => {
  const transformedTitle = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return transformedTitle.length > 36
    ? transformedTitle.substring(0, 36)
    : transformedTitle;
};

export const formatDate = (data) => {
  return new Date(data).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false  // Use 24-hour format, set to true for 12-hour format
  })
}