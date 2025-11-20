"use client"

import { CirclePlus, ChevronDown, CircleUserRound, Calendar, MapPin } from 'lucide-react'; 
import { useState } from 'react';
import { useAuthStore } from "@/app/stores/authStore";
import Button from '@/components/ui/Button';
import { Textarea } from '@headlessui/react';
import Link from 'next/link';
import AsyncDropdown from '@/components/ui/dropdown/AsyncDropdown';
import DateTimeModal from '@/components/organizer/DateTimeModal';
import { useCreateEventStore } from '@/app/stores/useCreateEventStore';

export default function page() {
  const user = useAuthStore((state) => state.user);
  const { data, setField } = useCreateEventStore();

  const [eventName, setEventName] = useState(data.name);
  const [eventDesc, setEventDesc] = useState(data.description);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<string | null>(null);
  const [dateModalOpen, setDateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-xl md:text-3xl">Lengkapi Data Acara</h1>
      <button className="flex flex-col gap-2 items-center bg-white w-full py-40 text-gray-400 rounded-lg cursor-pointer">
        <CirclePlus />
        Tambahkan gambar/poster/banner
      </button>

      {/* nama event */}
      <div>
        <h3 className="font-semibold mb-2">Nama Event</h3>
        <input
          type="text"
          placeholder="Masukkan Nama Event"
          value={eventName}
          onChange={(e) => {
            const val = e.target.value;
            // UI update
            setEventName(val);
            // save ke zustand
            setField("name", val);
            console.log("isi zustand:", useCreateEventStore.getState().data);
          }}
          className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      {/* desc event */}
      <div>
        <h3 className="font-semibold mb-2">Deskripsi Event</h3>
        <Textarea
          placeholder="Masukkan Deskripsi Event"
          value={eventDesc}
          onChange={(e) => {
            const val = e.target.value;
            setEventDesc(val);
            setField("description", val);
            console.log("isi zustand:", useCreateEventStore.getState().data);
          }}
          className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      {/* kategori event */}
      <div>
        <h3 className='font-semibold mb-2'>Pilih Kategori Event</h3>
        <AsyncDropdown
          label={selectedCategoryLabel ?? "Pilih Kategori"}
          apiUrl={process.env.NEXT_PUBLIC_EVENT_CATEGORIES!}
          onSelect={(item) => {
            const label = `${item.categoryName} - ${item.name}`;
            setSelectedCategoryLabel(label);

            useCreateEventStore.getState().setCategories(item.categoryId, item.id);
            console.log("isi zustand:", useCreateEventStore.getState().data);
          }}
        />
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
      <div className='flex justify-between items-center gap-2 mb-10'>
        {/* pilih tanggal */}
        <Button className='bg-white text-gray-400 flex items-center justify-center gap-2 w-full' onClick={() => setDateModalOpen(true)}>
          <Calendar />
          Pilih Waktu
        </Button>
        {/* modal date time picker */}
        <DateTimeModal isOpen={dateModalOpen} onClose={() => setDateModalOpen(false)} />

        {/* pilih lokasi */}
        <Button className='bg-white text-gray-400 flex items-center justify-center gap-2 w-full'>
          <MapPin />
          Pilih Lokasi
        </Button>
      </div>

      <Link href="/organizer/event/tickets">
        <Button className="bg-primary text-black w-full">
          Selanjutnya
        </Button>
      </Link>
    </div>
  )
}