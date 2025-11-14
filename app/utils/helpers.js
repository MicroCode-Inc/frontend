export const formatDateShort = value => {
  const date = typeof value === "string" ? new Date(value) : value
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  })
    .format(date)
    .replace(/\//g, " / ")
}

/**
 * Calculate final price after applying discount
 * @param {number} price - Original price
 * @param {number} discount - Discount amount
 * @returns {number} - Final price (never negative)
 */
export const calculateFinalPrice = (price, discount = 0) => {
  return Math.max(0, price - discount)
}

/**
 * Format a number as currency (USD)
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string (e.g., "$29.99")
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount)
}

/**
 * Check if a course is owned by the user
 * @param {number} courseId - Course ID to check
 * @param {Array<number>} ownedCourses - Array of owned course IDs
 * @returns {boolean} - True if course is owned
 */
export const isCourseOwned = (courseId, ownedCourses = []) => {
  return ownedCourses.includes(courseId)
}

/**
 * Update user data in localStorage
 * @param {Object} updatedUser - Updated user object
 * @returns {boolean} - True if update succeeded, false otherwise
 */
export const updateUserInStorage = (updatedUser) => {
  try {
    const token = localStorage.getItem('token')
    if (token && updatedUser) {
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
