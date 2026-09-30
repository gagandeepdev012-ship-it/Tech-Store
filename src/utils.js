/**
 * Formats a number to Indian Rupees (INR) using the en-IN locale
 * to get proper Indian grouping (lakh/crore commas, e.g. 1,59,999)
 * and the ₹ symbol.
 * 
 * @param {number} amount - The price amount to format
 * @returns {string} The formatted currency string
 */
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
