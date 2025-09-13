// Install dependencies: npm install jsonwebtoken

const jwt = require('jsonwebtoken');

// Secret key for signing the JWT
const SECRET_KEY = "supersecretkey123";

// 1 Create a sample JWT with payload
const payload = {
  username: "papaUser",
  role: "admin" // change to "user" to test role restriction
};

// Sign the JWT (expires in 1 hour)
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
console.log("Generated JWT:", token);

// 2️ Decode and verify the JWT
try {
  const decoded = jwt.verify(token, SECRET_KEY);
  console.log("Decoded payload:", decoded);

  // 3️ Role check: only 'admin' can see secret message
  if (decoded.role === "admin") {
    console.log("Secret message for admin: The secret assignment code is 12345");
  } else {
    console.log("Access denied: You are not an admin.");
  }

} catch (err) {
  console.error("JWT verification failed:", err.message);
}

// 4️ Tampering the token (simulate an attack)
const tamperedToken = token.slice(0, -1) + 'x'; // change last character
try {
  jwt.verify(tamperedToken, SECRET_KEY);
} catch (err) {
  console.error("Tampered JWT verification failed:", err.message);
}

/* 
Security Discussion:

1. Risks if stored in localStorage:
   - Vulnerable to XSS attacks.
   - Malicious scripts can steal the token and impersonate users.

2. Why HttpOnly cookies are safer:
   - Not accessible to JavaScript.
   - Automatically sent with HTTP requests.
   - Reduces risk of token theft via XSS.

This demonstrates JWT generation, verification, role-based access, and tampering.
*/
