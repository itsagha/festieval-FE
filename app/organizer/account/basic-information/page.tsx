import { CirclePlus } from "lucide-react"
import Button from "@/components/ui/Button"

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

      {/* form edit informasi personal */}
      <div className="flex justify-between ">
        {/* photo profile */}
        <div>
          <h3 className="font-semibold mb-2">Profile</h3>
          <button className="flex flex-col gap-2 justify-center items-center cursor-pointer rounded-full w-32 h-32 text-gray-400 bg-white text-xs">
            <CirclePlus />
            Tambahkan Profil
          </button>
        </div>

        {/* others */}
        <div className="flex flex-col gap-4">
          {/* tautan singkat profile */}
          <div>
            <h3 className="font-semibold">Tautan Singkat Profil</h3>
            <div className="flex justify-between gap-2">
              {/* input type URL */}
              <input 
                type="url" 
                placeholder="https://example.com"
                pattern="https://.*"
                className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary w-full"/>

              {/* button save */}
              <Button
                variant="bg-primary text-black"
                >
                Simpan
              </Button>
            </div>
          </div>

          {/* Nama Organizer */}
          <div>
            <label className="font-semibold">Nama Organizer</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input 
              type="email" 
              placeholder="JohnDoe@gmail.com"
              pattern=".+@gmail\.com"
              className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary w-full"
            />
          </div>

          {/* NOmor hp & alamat */}
          <div className="flex justify-between gap-2">
            {/* no hp */}
            <div>
              <label className="font-semibold">Nomor Handphone</label>
              <input 
                type="number" 
                placeholder="08123456789"
                className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary w-full"
              />
            </div>
            {/* alamat */}
            <div>
              <label className="font-semibold">Alamat</label>
              <input 
                type="text" 
                placeholder="Jalan Prabumulih-Palembang"
                className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
