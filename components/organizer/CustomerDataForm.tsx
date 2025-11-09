"use client"

import Dropdown from "../ui/Dropdown"
import SwitchButton from "../ui/SwitchButton"
import { useState } from "react";

export default function CustomerDataForm() {
  const [selected, setSelected] = useState("- orang");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Formulir Data Pemesan</h2>

      {/* maks tiket per transaksi */}
      <div className="flex items-center gap-2 justify-between">
        Jumlah maksimum tiket per transaksi
        <Dropdown
          label={selected}
          items={[
            { label: "1 Orang", onClick: () => setSelected("1 Orang") },
            { label: "2 Orang", onClick: () => setSelected("2 Orang") },
            { label: "3 Orang", onClick: () => setSelected("3 Orang") },
            { label: "4 Orang", onClick: () => setSelected("4 Orang") },
            { label: "5 Orang", onClick: () => setSelected("5 Orang") },
          ]}
        />
      </div>

      {/* 1 email u/ 1 transaksi */}
      <div className="flex items-center gap-2 justify-between">
        1 akun email hanya untuk 1 kali transaksi
        <SwitchButton />
      </div>

      {/* 1 tiket u/ 1 data pemesan */}
      <div className="flex items-center gap-2 justify-between">
        1 tiket hanya untuk 1 data pemesan
        <SwitchButton />
      </div>
    </div>
  )
}
