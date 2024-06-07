import Filter from "@/components/filter";
import Image from "next/image";

export default function ComplaintPage() {
  return (
    <main className="flex flex-col pb-5 gap-2 px-3 mb-16 md:mb-0">
      <Filter />
      <h1 className="font-bold font-mono text-3xl md:text-6xl text-sky-400 tracking-wider text-center">Citizen Complaint</h1>
      <h4 className="font-sans text-sm md:text-base text-center">Aduan masyarakat terkait kondisi di sekitar anda</h4>
      <section className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 mt-8 md:px-10 xl:px-32">
        {[...Array(9)].map((value: any, index: number) => (
          <article key={index} className="w-full h-full gap-2 p-4 rounded-3xl bg-white border dark:border-white/10 dark:bg-slate-800">
            <h5 className="xl:text-lg font-mono mb-2 font-semibold dark:text-white">
              Voluptate esse occaecat in nostrud in nulla culpa laborum.
            </h5>
            <Image 
              className="w-full h-44 object-cover rounded-lg"
              src={`https://picsum.photos/200`}
              alt="random-image"
              width={300}
              height={200}
              loading="lazy"
            />
            <table className="font-serif mt-2">
              <tbody className="align-top">
                <tr>
                  <td width={"25%"}>Lokasi</td>
                  <td width={"1%"}>:</td>
                  <td className="pl-2">Jl. Dg Ramang, Makassar</td>
                </tr>
                <tr>
                  <td width={"25%"}>Tanggal</td>
                  <td width={"1%"}>:</td>
                  <td className="pl-2">{new Date(Date.now() + (-index*24*60*60*1000)).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </article>
        ))}
      </section>
    </main>
  );
}