const variants = {
  primary:
    'border border-purple-400 bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-button ' +
    'disabled:border-transparent disabled:bg-none disabled:bg-purple-300 disabled:shadow-none',
  outline: 'border border-purple-400 bg-white text-purple-600 disabled:border-purple-200 disabled:text-purple-300',
  dark: 'border border-gray-700 bg-gradient-to-b from-gray-700 to-gray-900 text-white',
}

const sizes = {
  md: 'h-[46px] w-full text-label-lg',
  sm: 'h-6 px-3 text-label-sm',
}

export default function Button({ variant = 'primary', size = 'md', icon: Icon, className = '', children, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-150 hover:brightness-105 active:scale-[0.97] disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:active:scale-100 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 18} />}
      {children}
    </button>
  )
}
