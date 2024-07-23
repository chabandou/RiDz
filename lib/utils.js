import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date) {
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return "الآن";
  }
  if (secondsPast < 3600) {
    if (secondsPast < 120) {
      return "منذ دقيقة";
    } else if (secondsPast < 180) {
      return "منذ دقيقتان";
    }
    return `منذ ${Math.floor(secondsPast / 60)} دقائق`;
  }
  if (secondsPast < 86400) {
    if (secondsPast < 3600) {
      return "منذ ساعة";
    }
    if (secondsPast < 10800) {
      return "منذ ساعتين";
    }
    return `منذ ${Math.floor(secondsPast / 3600)} ساعات`;
  }
  if (secondsPast < 2592000) {
    // 30 days
    if (secondsPast < 86400) {
      return "منذ يوم";
    }
    if (secondsPast < 259200) {
      return "منذ يومين";
    } else {
      return `منذ ${Math.floor(secondsPast / 86400)} أيام`;
    }
  }
  if (secondsPast < 31536000) {
    // 365 days
    if (secondsPast < 2592000) {
      return "منذ شهر";
    }
    if (secondsPast < 7776000) {
      return "منذ شهرين";
    }
    return `منذ ${Math.floor(secondsPast / 2592000)} أشهر`;
  }

  // 365*365 days
  if (secondsPast < 3153600000) {
    if (secondsPast < 77760000) {
      return "منذ عام";
    }
    if (secondsPast < 315360000) {
      return "منذ عامين";
    }
  }

  return `منذ ${Math.floor(secondsPast / 31536000)} سنوات`;
}



export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};