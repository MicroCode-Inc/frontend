import { memo } from 'react'

/**
 * Reusable spinner component using Bootstrap spinner
 *
 * @param {string} size - 'sm' for small, default for normal
 * @param {string} variant - 'border' (default) or 'grow'
 * @param {string} className - Additional CSS classes
 */
function Spinner({ size = '', variant = 'border', className = '' }) {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : ''
  const spinnerClass = variant === 'grow' ? 'spinner-grow' : 'spinner-border'

  return (
    <span
      className={`${spinnerClass} ${sizeClass} ${className}`.trim()}
      role="status"
      aria-label="Loading"
    >
      <span className="visually-hidden">Loading...</span>
    </span>
  )
}

export default memo(Spinner)
