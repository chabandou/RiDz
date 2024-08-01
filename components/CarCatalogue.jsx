import CarCard from "./CarCard";

export default function CarCatalogue({ AllCars }) {
  const isDataEmpty = !Array.isArray(AllCars) || AllCars.length < 1 || !AllCars;

  return (
    <section >
      <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-7">
        {AllCars?.map((car, i) => (
          <CarCard key={i} car={car} />
        ))}
      </div>
      {/* <ShowMore
        pageNumber={(searchParams.limit || 10) / 10}
        isNext={(searchParams.limit || 10) > AllCars.length}
      /> */}
    </section>
  );
}
