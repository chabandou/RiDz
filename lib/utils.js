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
    } else if (secondsPast <= 660) {
      return `منذ ${Math.floor(secondsPast / 60)} دقائق`;
      
    }
    return `منذ ${Math.floor(secondsPast / 60)} دقيقة`;
  }
  if (secondsPast < 86400) {
    if (secondsPast < 3600) {
      return "منذ ساعة";
    }
    if (secondsPast < 10800) {
      return "منذ ساعتين";
    } else if ( secondsPast < 39600 ) {
      return `منذ ${Math.floor(secondsPast / 3600)} ساعات`;
      
    }
    return `منذ ${Math.floor(secondsPast / 3600)} ساعة`;
  }
  if (secondsPast < 2592000) {
    // 30 days
    if (secondsPast < 86400) {
      return "منذ يوم";
    }
    if (secondsPast < 259200) {
      return "منذ يومين";
    } else if ( secondsPast < 950400 ) {
      return `منذ ${Math.floor(secondsPast / 86400)} أيام`;
    }
    return `منذ ${Math.floor(secondsPast / 86400)} يوم`;
  }
  if (secondsPast < 31536000) {
    // 365 days
    if (secondsPast < 2592000) {
      return "منذ شهر";
    }
    if (secondsPast < 7776000) {
      return "منذ شهرين";
    } else if (secondsPast < 28512000) {
      return `منذ ${Math.floor(secondsPast / 2592000)} أشهر`;
      
    }
    return `منذ ${Math.floor(secondsPast / 2592000)} شهر`;
  }

  // 365*365 days
  if (secondsPast < 3153600000) {
    if (secondsPast < 77760000) {
      return "منذ عام";
    }
    if (secondsPast < 315360000) {
      return "منذ عامين";
    }
    if (secondsPast < 342144000) {

      return `منذ ${Math.floor(secondsPast / 31536000)} سنوات`;
    }
  }

  return `منذ ${Math.floor(secondsPast / 31536000)} سنة`;
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


export function updateSearchParams(key, value) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
}



// -------------------------------Fetch Logic ---------------------------
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "5453c6d830msh909c1d3f8f1a78cp129bd5jsn31c3620c9b9a",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};

export async function fetchCars(filters) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const url =
  `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&limit=${limit}&fuel_type=${fuel}&year=${year}`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}



export async function generateCarID(car) {
  const carIDUrl = new URL(`https://api.fuelapi.com/v1/json/vehicles/`);
  carIDUrl.searchParams.append("year", `${car.year}`);
  carIDUrl.searchParams.append("make", car.make);
  carIDUrl.searchParams.append("model", `${car.model}`.split(" ")[0]);
  carIDUrl.searchParams.append(
    "api_key",
    "daefd14b-9f2b-4968-9e4d-9d4bb4af01d1"
  );

  
try {
  const IDResponse = await fetch(carIDUrl.href, {
    // mode: "cors",
  });
  const IDResult = await IDResponse.json();

  const carID = IDResult[0]?.id;

  return carID;
} catch (error) {
  console.error(error);
}
}

export async function generateCarImageUrl(car, angle ="046") {
  const carID = await generateCarID(car);
  const url = new URL(
    `https://api.fuelapi.com/v1/json/vehicle/${carID}/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1&shotCode=${angle}`
  );

  try {
    
      const response = await fetch(url.href, {
        // mode: "no-cors",
      });
      const result = await response.json();
    
      const CarImageUrl = result?.products[0].productFormats[0].assets[0].url;
      // console.log(CarImageUrl);
    
      return `${CarImageUrl}`;

  } catch (error) {
    console.error(error);
  }
}


