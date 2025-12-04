import { ClipboardList, File, Dock, Ticket, Database, UsersRound } from "lucide-react"

const cards = [
  {
    title: "Event Aktif",
    value: 12,
    icon: <ClipboardList size={24} color="green"/>,
    unit: "Event",
  },
  {
    title: "Event Draft",
    value: 4,
    icon: <File size={24} color="red"/>,
    unit: "Event",
  },
  {
    title: "Total Transaksi",
    value: "102",
    icon: <Dock size={24} color="blue"/>,
    unit: "Transaksi",
  },
  {
    title: "Total Penjualan Tiket",
    value: "Rp31.261.600",
    icon: <Ticket size={24} color="violet"/>,
    unit: "Tiket",
  },
  {
    title: "Total Penjualan",
    value: 100,
    icon: <Database size={24} color="yellow"/>,
    unit: "",
  },
  {
    title: "Total Pengunjung",
    value: 203,
    icon: <UsersRound size={24} color="purple"/>,
    unit: "Pengunjung",
  },
];

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <div className="h-0.5 w-full rounded-full bg-gray-400"></div>

      {/* GRID RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-walnut border border-primary rounded-2xl p-6 hover:scale-101 duration-500 hover:shadow-[0_0_20px_var(--tw-shadow-color)] hover:shadow-primary"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm flex font-semibold justify-start items-center gap-2">{card.icon}{card.title}</p>
            </div>

            {/* garis */}
            <div className="h-0.5 w-full rounded-full bg-gray-400/30 my-2"></div>
            <p className="text-gray-400 text-sm">Total</p>
            <div className="flex justify-between items-end">
              <h2 className="text-2xl md:text-5xl font-bold mt-4">{card.value}</h2>
              <p className="text-gray-400 text-sm">{card.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}