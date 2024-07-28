import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-fit flex-col items-center justify-between p-3 lg:p-24">
      <div className="flex h-fit flex-col items-center justify-center gap-3 bg-green-100/60 rounded-lg px-6 py-3">
        <Image
          src="/under-construction.svg"
          alt="Under Construction"
          width={1024}
          height={1024}
        />
        <h1 className="text-4xl lg:text-7xl font-bold text-green-700">
          !الصفحة قيد البناء
        </h1>
        <h2 className="text-2xl text-black/95">...آتية إليكم قريباً</h2>
      </div>
    </main>
  );
}
