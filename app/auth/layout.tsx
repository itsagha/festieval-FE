export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<section
			className="min-h-screen bg-cover bg-center flex items-center justify-center"
			style={{
				backgroundImage: "url('/images/BgAuth.jpg')",
			}}
		>
			<div className="mx-3 bg-transparent backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">
				{children}
			</div>
		</section>
	);
}