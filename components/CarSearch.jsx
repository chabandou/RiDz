import { fetchCars } from "@/lib/utils";
import CarsSearchBar from "./CarsSearchBar";

export async function CarSearch({ searchParams }) {

  return (
    <section
      className="w-full flex flex-col justify-center items-start gap-4 xl:gap-7 mt-4 mb-2 px-4 "
      dir="rtl"
    >
      <div className="flex flex-col justify-center items-start gap-4">
        <h1 className="text-3xl font-extrabold text-center">فهرس السيارات</h1>
        <p className="text-muted-foreground">
          تصفح السيارات التي ترغب في معرفة الزيد عنها
        </p>
      </div>
      <CarsSearchBar />
    </section>
  );
}
