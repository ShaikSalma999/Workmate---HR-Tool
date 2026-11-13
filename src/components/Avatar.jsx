export function Avatar({ src, size = 24, className = '' }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  )
}

export function AvatarStack({ avatars, size = 24, extra }) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {avatars.map((src, i) => (
          <Avatar key={i} src={src} size={size} className="ring-2 ring-white" />
        ))}
      </div>
      {extra && <span className="ml-2 text-label-md font-medium text-gray-700">{extra}</span>}
    </div>
  )
}
