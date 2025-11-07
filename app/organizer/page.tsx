import TicketSection from "@/components/organizer/TicketSection"
import ContactPersonSection from "@/components/organizer/ContactPersonSection"
import CustomerDataInfo from "@/components/organizer/CustomerDataInfo"
import CustomerDataForm from "@/components/organizer/CustomerDataForm"
import Button from "@/components/ui/Button"

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-3xl">Buat event baru</h1>
      <TicketSection />
      <div className="w-full h-0.5 bg-gray-700 rounded-xl my-16"></div>
      <ContactPersonSection />
      <div className="w-full h-0.5 bg-gray-700 rounded-xl my-16"></div>
      <CustomerDataInfo />
      <div className="w-full h-0.5 bg-gray-700 rounded-xl my-16"></div>
      <CustomerDataForm />
      <div className="flex justify-between items-center gap-3 mb-10">
        <Button className="border border-primary text-primary hover:bg-primary hover:text-black w-full">
          Simpan Draf
        </Button>

        <Button className="bg-primary text-black w-full">
          Buat Event Sekarang
        </Button>
      </div>
    </div>
  )
}
