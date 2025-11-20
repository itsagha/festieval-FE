import Link from "next/link"

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-3xl">Organizer Dashboard</h1>
      <Link href="/organizer/event" className="underline-hover w-fit">
        Buat Event Baru
      </Link>
    </div>
  )
}