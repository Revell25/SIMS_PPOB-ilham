const Button = ({
  type = 'button',
  variant = 'primary',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary:
      'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-200 focus:ring-offset-brand-50 disabled:bg-brand-300',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200 disabled:bg-slate-100 disabled:text-slate-400',
    ghost:
      'bg-transparent text-brand-600 hover:bg-brand-50 focus:ring-brand-200 disabled:text-brand-300',
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      <span>{children}</span>
    </button>
  )
}

export default Button
