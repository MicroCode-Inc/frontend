/**
 * Purchase API Service
 * Handles all course purchase-related API calls
 */

import { apiRequestJSON } from '../utils/api'

/**
 * Purchase one or more courses
 * @param {Array<number>} courseIds - Array of course IDs to purchase
 * @returns {Promise<Object>} - Purchase response with invoices and updated user
 */
export async function purchaseCourses(courseIds) {
  return await apiRequestJSON('/purchase', {
    method: 'POST',
    body: JSON.stringify({ course_ids: courseIds })
  })
}

/**
 * Get all purchases for the authenticated user
 * @param {boolean} expand - Whether to include full course details
 * @returns {Promise<Object>} - Object with count and purchases array
 */
export async function getUserPurchases(expand = false) {
  const endpoint = expand ? '/purchases?expand=true' : '/purchases'
  return await apiRequestJSON(endpoint)
}

/**
 * Get invoice details by invoice number
 * @param {string} invoiceNumber - Invoice number (e.g., "INV-XXXXX")
 * @returns {Promise<Object>} - Invoice details with user and course info
 */
export async function getInvoice(invoiceNumber) {
  return await apiRequestJSON(`/invoices/${invoiceNumber}`)
}
