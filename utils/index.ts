import { CarProps, FilterProps } from "@/types";


const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "5453c6d830msh909c1d3f8f1a78cp129bd5jsn31c3620c9b9a",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};

export async function fetchCars(filters: FilterProps) {
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

export async function generateCarID(car: CarProps) {
  const carIDUrl = new URL(`https://api.fuelapi.com/v1/json/vehicles/`);
  carIDUrl.searchParams.append("year", `${car.year}`);
  carIDUrl.searchParams.append("make", car.make);
  carIDUrl.searchParams.append("model", `${car.model}`.split(" ")[0]);
  carIDUrl.searchParams.append(
    "api_key",
    "daefd14b-9f2b-4968-9e4d-9d4bb4af01d1"
  );

  console.log(carIDUrl.href);
  

  const IDResponse = await fetch(carIDUrl.href, {
    // mode: "no-cors",
  });
  const IDResult = await IDResponse.json();

  const carID = IDResult[0].id;

  return carID;
}

export async function generateCarImageUrl(car: CarProps, angle: string="046") {
  const carID = await generateCarID(car);
  const url = new URL(
    `https://api.fuelapi.com/v1/json/vehicle/${carID}/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1&shotCode=${angle}`
  );

  const response = await fetch(url.href, {
    // mode: "no-cors",
  });
  const result = await response.json();

  const CarImageUrl = result.products[0].productFormats[0].assets[0].url;
  // console.log(CarImageUrl);

  return `${CarImageUrl}`;
}


export function updateSearchParams(key: string, value: string) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
}
