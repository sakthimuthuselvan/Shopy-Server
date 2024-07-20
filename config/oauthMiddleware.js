// oauthMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware function to validate OAuth token
const validateOAuthToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];
console.log("authHeaderauthHeader ",authHeader);
  // Check if the authorization header is present
  if (!authHeader) {
    return res.status(401).json({ response_message: 'Unauthorized - Missing token' });
  }

  // Extract the token from the authorization header (assuming Bearer token)
  const token = authHeader.split(' ')[1];

  // Verify the token using JWT (or your preferred method)
  jwt.verify(token, '_SHOPY', (err, decoded) => {
    if (err) {
      return res.status(401).json({ response_message: 'Unauthorized - Invalid token' });
    }
    // Token is valid, attach the decoded token data to the request object for further processing
    req.user = decoded;
    next(); // Call the next middleware function
  });
};

module.exports = validateOAuthToken;
