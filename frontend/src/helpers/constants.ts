
const DOMAIN_DEV='https://workhubconnect.me'
const DOMAIN_PROD='https://workhubconnect.me'

const domain = process.env.NODE_ENV !== 'production'
  ? DOMAIN_DEV
  : DOMAIN_PROD;

export default domain;
