
const DOMAIN_DEV='http://100.25.170.62'
const DOMAIN_PROD='http://100.25.170.62'

const domain = process.env.NODE_ENV !== 'production'
  ? DOMAIN_DEV
  : DOMAIN_PROD;

export default domain;
