// app/stores/useCreateEventStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EventPayload {
  // Data dasar event
  name: string;
  description: string;
  image_url: string;
  categoryIds: number[];
  subcategoryIds: number[];
  start_date: string | null;
  end_date: string | null;

  // Lokasi
  venue_name: string;
  address: string;
  location_id: number | null;
  map_link: string;

  // Contact Person
  contact_person_name: string;
  contact_email: string;
  contact_phone: string;

  // Tiket
  max_tickets_per_person: number;
  unique_email_for_transaction: boolean;
  unique_ticket_for_each_buyer: boolean;
  hide_ticket_quota: boolean;

  // Ketentuan data pembeli
  buyer_name: boolean;
  buyer_email: boolean;
  buyer_phone: boolean;
  buyer_idno: boolean;
  buyer_birth: boolean;
  buyer_gender: boolean;
}

interface EventStore {
  data: EventPayload;

  // set satu field
  setField: <K extends keyof EventPayload>(key: K, value: EventPayload[K]) => void;

  // set beberapa field sekaligus
  setBulk: (payload: Partial<EventPayload>) => void;
  setCategories: (categoryId: number, subcategoryId: number) => void;
  setEventDate: (start: string, end: string) => void;

  // reset ke default
  reset: () => void;
}

// Default value
const defaultData: EventPayload = {
  name: "",
  description: "",
  image_url: "https://example.com/banner.jpg",
  categoryIds: [],
  subcategoryIds: [],
  start_date: null,
  end_date: null,
  venue_name: "",
  address: "",
  location_id: null,
  map_link: "",
  contact_person_name: "",
  contact_email: "",
  contact_phone: "",
  max_tickets_per_person: 1,
  unique_email_for_transaction: true,
  unique_ticket_for_each_buyer: true,
  hide_ticket_quota: false,
  buyer_name: true,
  buyer_email: true,
  buyer_phone: true,
  buyer_idno: true,
  buyer_birth: false,
  buyer_gender: false,
};

// Store pake persist ke localStorage
export const useCreateEventStore = create<EventStore>()(
  persist(
    (set) => ({
      data: defaultData,
      setField: (key, value) =>
        set((state) => ({
          data: { ...state.data, [key]: value },
        })),
      setBulk: (payload) =>
        set((state) => ({
          data: { ...state.data, ...payload },
        })),
      setCategories: (categoryId: number, subcategoryId: number) =>
        set((state) => ({
          data: {
            ...state.data,
            categoryIds: [categoryId],
            subcategoryIds: [subcategoryId],
          },
        })),
      setEventDate: (start, end) =>
        set((state) => ({
          data: { ...state.data, start_date: start, end_date: end },
        })),
      reset: () => set({ data: defaultData }),
    }),
    {
      name: "create-event-storage",
      partialize: (state) => ({ data: state.data }),
    }
  )
);