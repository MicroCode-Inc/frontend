import { memo, useState, useCallback } from 'react'
import Spinner from './Spinner'

/**
 * Automatic loading button component that handles async operations
 *
 * Automatically:
 * - Shows spinner during async operation
 * - Disables button to prevent double-clicks
 * - Re-enables when operation completes
 * - Optionally shows error alerts
 *
 * Usage:
 *   <AsyncButton onClick={async () => await apiCall()}>
 *     Submit
 *   </AsyncButton>
 *
 * @param {Function} onClick - Async function to execute
 * @param {ReactNode} children - Button text/content
 * @param {string} loadingText - Optional text to show during loading
 * @param {string} className - Button CSS classes
 * @param {boolean} showErrorAlert - Show browser alert on error (default: false)
 * @param {Function} onError - Custom error handler
 * @param {boolean} disabled - Externally control disabled state
 * @param {string} type - Button type (button, submit, reset)
 * @param {object} ...props - Other button props
 */
function AsyncButton({
  onClick,
  children,
  loadingText,
  className = 'btn btn-primary',
  showErrorAlert = false,
  onError,
  disabled = false,
  type = 'button',
  ...props
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async (e) => {
    if (isLoading || disabled) return

    setIsLoading(true)
    try {
      // Execute the async function
      await onClick(e)
    } catch (error) {
      // Handle errors
      if (showErrorAlert) {
        alert(error.message || 'An error occurred. Please try again.')
      }
      if (onError) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [onClick, isLoading, disabled, showErrorAlert, onError])

  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <>
          <Spinner size="sm" className="me-2" />
          {loadingText || children}
        </>
      )}
      {!isLoading && children}
    </button>
  )
}

export default memo(AsyncButton)
