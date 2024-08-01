import CarCatalogue from "@/components/CarCatalogue";
import { CarSearch } from "@/components/CarSearch";
import CarShowcaseHero from "@/components/CarShowcaseHero";
import { fetchCars } from "@/lib/utils";
import Image from "next/image";

export default async function Home({ searchParams }) {
  const AllCars = await fetchCars({
    manufacturer: searchParams.make || "",
    model: searchParams.model || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
  });

  return (
    <main className="flex h-fit flex-col items-center justify-between py-3 lg:px-12  ">
      <CarShowcaseHero />
      <CarSearch searchParams={searchParams} />
      <CarCatalogue AllCars={AllCars} />
    </main>
  );
}
