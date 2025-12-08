"use client";

import { useState } from "react";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import Button from "@/components/ui/Button";

export default function AccountPage() {
  const [selectedBank, setSelectedBank] = useState<string>("Pilih Bank");

  const bankList = [
    "BRI",
    "BCA",
    "Mandiri",
    "BNI",
    "CIMB Niaga",
    "BTN",
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Rekening Anda</h1>
      <div className="h-0.5 w-full rounded-full bg-gray-400"></div>

      {/* Dropdown Bank */}
      <div>
        <h3 className='font-semibold mb-1'>Bank</h3>
        <Dropdown
          label={selectedBank}
          className="w-full"
          items={bankList.map((bank) => ({
            label: bank,
            onClick: () => setSelectedBank(bank),
          }))}
        />
      </div>

      {/* Input lainnya */}
      <h3 className='font-semibold mb-1'>Nama Pemilik Rekening</h3>
      <input
        type="text"
        placeholder="Nama Pemilik Rekening"
        className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary"
      />

      <h3 className='font-semibold mb-1'>Nomor Rekening</h3>
      <input
        type="number"
        placeholder="Nomor Rekening"
        className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary"
      />

      <h3 className='font-semibold mb-1'>Kantor Cabang</h3>
      <input
        type="text"
        placeholder="Kantor Cabang"
        className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary"
      />

      <h3 className='font-semibold mb-1'>Kota</h3>
      <input
        type="text"
        placeholder="Kota"
        className="bg-walnut border border-white/10 p-3 rounded-xl focus:outline-none text-sm focus:ring-1 focus:ring-primary"
      />

      {/* Tombol Simpan Rekening */}
      <Button  
        variant="bg-primary text-black"
        className="mt-2">
        Simpan Rekening
      </Button>
    </div>
  );
}
