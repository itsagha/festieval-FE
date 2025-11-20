import api from "../api";

// bikin event baru
export const createEvent = async (payload: {
  name: string;
  description: string;
  venue_name: string;
  address: string;
  location_id: number;
  map_link: string;
  start_date: Date;
  end_date: Date;
  image_url: string;
  contact_person_name: string;
  contact_email: string;
  contact_phone: string;
  max_tickets_per_person: number;
  unique_email_for_transaction: boolean;
  unique_ticket_for_each_buyer: boolean;
  hide_ticket_quota: boolean;
  buyer_name: boolean;
  buyer_email: boolean;
  buyer_phone: boolean;
  buyer_idno: boolean;
  buyer_birth: boolean;
  buyer_gender: boolean;
}) => {
  const createEventURL = process.env.NEXT_PUBLIC_CREATE_EVENT_URL || "/private/organizer/events";
  const res = await api.post(createEventURL, payload);
  return res.data;
}