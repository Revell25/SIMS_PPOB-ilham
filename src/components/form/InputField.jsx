import { forwardRef } from 'react'

const InputField = forwardRef(
  (
    {
      label,
      error,
      hint,
      className = '',
      leadingIcon,
      trailingIcon,
      inputClassName = '',
      ...props
    },
    ref,
  ) => {
    const hasLeading = Boolean(leadingIcon)
    const hasTrailing = Boolean(trailingIcon)

    const paddingClasses = [
      hasLeading ? 'pl-11' : 'pl-4',
      hasTrailing ? 'pr-11' : 'pr-4',
    ].join(' ')

    return (
      <div className={`space-y-1 ${className}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {hasLeading && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            {...props}
            className={`w-full rounded-xl border bg-white py-3 text-sm text-slate-900 transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 ${
              error ? 'border-red-400' : 'border-slate-200'
            } ${paddingClasses} ${inputClassName}`}
          />
          {hasTrailing && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              {trailingIcon}
            </span>
          )}
        </div>
        {hint && !error && (
          <p className="text-xs text-slate-400">
            {hint}
          </p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  },
)

InputField.displayName = 'InputField'

export default InputField
