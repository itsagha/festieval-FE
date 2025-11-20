import Breadcrumb from "@/components/organizer/Breadcrumb";

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Breadcrumb />
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
