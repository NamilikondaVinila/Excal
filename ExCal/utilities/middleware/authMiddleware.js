// utilities/authMiddleware.js

import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, "DHIRAJ_SECRET");
    req.data = decoded; // Attach the decoded user information to the request object
    await next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ success: false, error: 'Invalid token' });
  }
};

export default authMiddleware;
