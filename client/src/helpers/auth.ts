// utils/auth.js

import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Change this to your actual secret key

export function verifyToken(token) {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    // Return the decoded user ID
    return decoded.userId;
  } catch (error) {
    // If token verification fails, return null
    console.error('Error verifying token:', error);
    return null;
  }
}
