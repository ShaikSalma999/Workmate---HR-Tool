export default function EmptyState({ image, title, message, imageClass = 'h-16' }) {
  return (
    <div className="flex flex-col items-center px-4 py-8 text-center">
      <img src={image} alt="" className={`w-auto ${imageClass}`} />
      <h3 className="mt-4 text-title-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-[300px] text-[10px] leading-[14px] text-gray-500">{message}</p>
    </div>
  )
}
