"use client"

import { CirclePlus, ChevronDown, CircleUserRound, Calendar, Clock4, MapPin } from 'lucide-react'; 
import { useState } from 'react';
import { useAuthStore } from "@/app/stores/authStore";
import Button from '../ui/Button';

export default function TicketSection() {
  const user = useAuthStore((state) => state.user);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");

  return (
    <div className="flex flex-col gap-4">
      {/* tambah poster */}
      <button className="flex flex-col gap-2 items-center bg-white w-full py-40 text-gray-400 rounded-lg cursor-pointer">
        <CirclePlus />
        Tambahkan gambar/poster/banner
      </button>

      {/* nama event */}
      <div>
        <h3 className='font-semibold mb-2'>Nama Event</h3>
        <input
          type="name"
          placeholder="Masukkan Nama Event"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
          required
          />
      </div>

      {/* desc event */}
      <div>
        <h3 className='font-semibold mb-2'>Deskripsi Event</h3>
        <textarea
          placeholder="Masukkan Deskripsi Event"
          value={eventDesc}
          onChange={(e) => setEventDesc(e.target.value)}
          className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
          required
          />
      </div>

      {/* kategori event */}
      <div>
        <h3 className='font-semibold mb-2'>Pilih Kategori Event</h3>
        <button className='w-full flex text-sm justify-between items-center bg-white rounded-lg px-4 py-2 text-gray-400 cursor-pointer'>
          Pilih Kategori
          <ChevronDown />
        </button>
      </div>

      {/* penyelenggara */}
      <div>
        <h3 className='font-semibold mb-2'>Diselenggarakan Oleh</h3>
        <div className='flex items-center gap-2'>
          <CircleUserRound />
          {user?.name}
        </div>
      </div>

      {/* tempat tanggal waktu */}
      <div className='flex justify-between items-center gap-4 mb-10'>
        {/* pilih tanggal */}
        <Button className='bg-white text-gray-400 flex items-center justify-center gap-2 w-full'>
          <Calendar />
          Pilih Tanggal
        </Button>

        {/* Pilih waktu */}
        <Button className='bg-white text-gray-400 flex items-center justify-center gap-2 w-full'>
          <Clock4 />
          Pilih Waktu
        </Button>

        {/* pilih lokasi */}
        <Button className='bg-white text-gray-400 flex items-center justify-center gap-2 w-full'>
          <MapPin />
          Pilih Lokasi
        </Button>
      </div>

      {/* tambah tiket */}
      <Button className='w-full bg-primary text-black flex items-center justify-center gap-2'>
        <CirclePlus />
        Tambahkan Tiket
      </Button>
    </div>
  )
}