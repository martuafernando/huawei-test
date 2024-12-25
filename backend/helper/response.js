/**
 * 
 * @param {string} message 
 * @param {string} [data = null] - Optional data to include in the response
 * @returns {object} output message
 */
function successResponse(message, data = null) {
  return {
    "status": "success",
    "message": message,
    ...(data && { data })
  }
} 

/**
 * 
 * @param {string} message 
 * @returns {{status: string, message: string}} output message
 */
function failedResponse(message) {
  return {
    "status": "fail",
    "message": message
  }
} 

module.exports = {
  successResponse,
  failedResponse
}