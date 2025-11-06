export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<section
			className="min-h-screen bg-cover bg-center bg-black">
			{children}
		</section>
	);
}