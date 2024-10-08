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

  return transformedTitle.length > 105
    ? transformedTitle.substring(0, 105)
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

export const filterTitleInBlog = (searchKey, blogs) => {
  return blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(searchKey.toLowerCase());
  })
}

export const filterStatusInBlog = (status, blogs) => {
  return blogs.filter((blog) => {
    return blog.status.toLowerCase().includes(status.toLowerCase());
  });
}

export const filterCategoryInBlog = (category, blogs) => {
  return blogs.filter((blog) => {
    return blog.category.toLowerCase().includes(category.toLowerCase());
  });
}