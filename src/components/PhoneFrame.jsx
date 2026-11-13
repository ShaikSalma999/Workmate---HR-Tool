export default function PhoneFrame({ children }) {
  return (
    <div className="min-h-full bg-gray-100 md:flex md:justify-center">
      <div className="relative flex h-[100dvh] w-full max-w-[390px] flex-col overflow-hidden bg-surface md:shadow-[0_0_0_1px_rgba(16,24,40,0.08)]">
        {children}
      </div>
    </div>
  )
}
