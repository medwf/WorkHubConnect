const DOMAIN_DEV = "http://localhost:5000";
const DOMAIN_PROD = "https://workhubconnect.com";

const domain = process.env.NODE_ENV !== "production" ? DOMAIN_DEV : DOMAIN_PROD;

console.log(`Using domain: ${domain}`); // Log the domain being used
export default domain;
