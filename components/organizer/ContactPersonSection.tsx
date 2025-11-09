"use client"

import { useState } from "react"

export default function ContactPersonSection() {
  const [contactPerson, setContactPerson] =useState("")
  const [emailCP, setEmailCP] =useState("")
  const [numberCP, setNumberCP] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Informasi Contact Person</h2>

      {/* narahubung */}
      <div>
        <h3 className='font-semibold mb-2'>Narahubung</h3>
        <input
          type="name"
          placeholder="Masukkan Nama Narahubung"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
          required
          />
      </div>

      {/* email cp */}
      <div>
        <h3 className='font-semibold mb-2'>Email</h3>
        <input
          type="email"
          placeholder="Masukkan Email Narahubung"
          value={emailCP}
          onChange={(e) => setEmailCP(e.target.value)}
          className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
          required
          />
      </div>

      {/* no telp cp */}
      <div>
        <h3 className='font-semibold mb-2'>No. Ponsel</h3>
        <div className="flex items-center justify-between gap-2">
          <div className="rounded-lg text-gray-600 p-3 bg-white text-sm">
            <p>+62</p>
          </div>
          <input
            type="number"
            placeholder="81234567890"
            value={numberCP}
            onChange={(e) => setNumberCP(e.target.value)}
            className="p-3 text-gray-600 text-sm bg-white rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary"
            required
            />
        </div>
      </div>
    </div>
  )
}