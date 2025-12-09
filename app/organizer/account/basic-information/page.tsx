import { CirclePlus } from "lucide-react"

export default function page() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-xl md:text-3xl'>Informasi Dasar</h1>
      <div className="h-0.5 w-full rounded-full bg-gray-400"></div>

      {/* button upload gambar */}
      <div>
        <h3 className="font-semibold mb-2">Gambar</h3>
        <button className="flex flex-col gap-2 items-center bg-white w-full py-40 text-gray-400 rounded-lg cursor-pointer">
          <CirclePlus />
          Tambahkan gambar/poster/banner
        </button>
      </div>
    </div>
  )
}
