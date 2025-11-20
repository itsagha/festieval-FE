import { CirclePlus } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Page() {
  const ticketCards = [
    { type: "BERBAYAR" },
    { type: "BAYAR SESUKAMU" },
    { type: "GRATIS" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-xl md:text-3xl">Pilih Kategori Tiket</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ticketCards.map((ticket, index) => (
          <div
            key={index}
            className="relative flex overflow-hidden h-40 rounded-2xl shadow-md transition hover:scale-101 duration-500 cursor-pointer"
          >
            {/* Bagian kiri */}
            <div className="w-3/4 bg-white flex flex-col justify-center pl-6">
              <span className="text-gray-400 text-sm">Kategori</span>
              <h3 className="text-gray-800 font-bold text-xl md:text-2xl">
                {ticket.type}
              </h3>
            </div>

            {/* Sobekan di tengah */}
            <div className="absolute right-[25%] top-0 bottom-0 flex flex-col justify-between">
              <div className="w-6 h-6 bg-black rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex-1 border-dashed border-l-2 border-gray-400 mx-auto"></div>
              <div className="w-6 h-6 bg-black rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Bagian kanan  */}
            <div className="w-1/4 bg-primary flex items-center justify-center">
              <CirclePlus className="w-8 h-8 text-gray-800" />
            </div>
          </div>
        ))}
      </div>

      <Link href="/organizer/event/contact">
        <Button className="bg-primary text-black w-full mt-6">
          Selanjutnya
        </Button>
        </Link>
    </div>
  );
}