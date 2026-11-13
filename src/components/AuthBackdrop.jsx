import { onboard3 } from '../assets'

export default function AuthBackdrop({ children }) {
  return (
    <div className="relative flex h-full flex-col justify-end overflow-hidden bg-night">
      <img src={onboard3} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 blur-xl" />
      {children}
    </div>
  )
}
