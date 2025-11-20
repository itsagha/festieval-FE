"use client";

import React, { useState, useEffect } from "react";
import Modal from "../ui/modal/Modal";
import DatePicker from "react-datepicker";
import { useCreateEventStore } from "@/app/stores/useCreateEventStore";

interface DateTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DateTimeModal({ isOpen, onClose }: DateTimeModalProps) {
  const { data, setEventDate } = useCreateEventStore();

  // datepicker
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());

  // Load dari Zustand jika sudah ada isinya
  useEffect(() => {
    if (data.start_date && data.end_date) {
      setStartDateTime(new Date(data.start_date));
      setEndDateTime(new Date(data.end_date));
    }
  }, [data.start_date, data.end_date]);

  const handleSave = () => {
    if (!startDateTime || !endDateTime) return;

    const startISO = startDateTime.toISOString();
    const endISO = endDateTime.toISOString();

    setEventDate(startISO, endISO);
    console.log("isi zustand:", useCreateEventStore.getState().data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Atur Waktu Acara"
      showFooter
      confirmText="Simpan"
      cancelText="Batal"
      onConfirm={handleSave}
      variantBG="bg-[#4c4c4c]"
    >
      <div className="text-white flex flex-col gap-4">

        {/* Start DateTime */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Mulai Acara</label>
          <DatePicker
            selected={startDateTime}
            onChange={(date) => setStartDateTime(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date()}
            className="w-full p-2 rounded-lg bg-white text-black"
          />
        </div>

        {/* End DateTime */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Selesai Acara</label>
          <DatePicker
            selected={endDateTime}
            onChange={(date) => setEndDateTime(date)}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={startDateTime || new Date()}
            className="w-full p-2 rounded-lg bg-white text-black"
          />
        </div>
      </div>
    </Modal>
  );
}
