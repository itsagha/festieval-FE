import ContactPersonSection from "@/components/organizer/ContactPersonSection"
import CustomerDataInfo from "@/components/organizer/CustomerDataInfo"
import CustomerDataForm from "@/components/organizer/CustomerDataForm"
import Button from "@/components/ui/Button"

export default function page() {
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-xl md:text-3xl">Informasi Contact Person</h1>
      <ContactPersonSection />
      <div className="w-full h-0.5 bg rounded-xl my-10 bg-gray-500"></div>
      <CustomerDataInfo />
      <div className="w-full h-0.5 bg rounded-xl my-10 bg-gray-500"></div>
      <CustomerDataForm />

      <div className="flex justify-between gap-2">
        <Button className="border border-primary text-primary hover:bg-primary hover:text-black w-full">
          Simpan Draf
        </Button>
        <Button className="bg-primary w-full text-black">
          Buat Event Sekarang
        </Button>
      </div>
    </div>
  )
}
