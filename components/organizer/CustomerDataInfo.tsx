import SwitchButton from "../ui/SwitchButton"

export default function CustomerDataInfo() {
  const fields = [
    { label: "Nama Lengkap", defaultChecked: true },
    { label: "Email", defaultChecked: true },
    { label: "Nomor Handphone", defaultChecked: true },
    { label: "Nomor KTP", defaultChecked: true },
    { label: "Tanggal Lahir", defaultChecked: false },
    { label: "Jenis Kelamin", defaultChecked: false },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Ketentuan Data Pemesan</h2>
      {fields.map(({ label, defaultChecked }, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-2 p-3 border rounded-xl border-white/10"
        >
          {label}
          <SwitchButton defaultChecked={defaultChecked} />
        </div>
      ))}
    </div>
  )
}