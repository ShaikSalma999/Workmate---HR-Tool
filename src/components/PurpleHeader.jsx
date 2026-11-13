import StatusBar from './StatusBar'

export default function PurpleHeader({ title, subtitle, art }) {
  return (
    <header className="relative shrink-0 rounded-b-[28px] bg-purple-500 pb-20">
      <StatusBar />
      <div className="px-6 pb-[25px] pt-[27px]">
        <h1 className="text-headline-sm font-semibold text-white">{title}</h1>
        <p className="text-body-sm text-purple-100">{subtitle}</p>
      </div>
      {art && (
        <div className="pointer-events-none absolute animate-float-slow" style={{ left: art.x, top: art.y }}>
          <img src={art.src} alt="" width={art.w} className="h-auto max-w-none" />
        </div>
      )}
    </header>
  )
}
