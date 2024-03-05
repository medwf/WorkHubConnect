
const DOMAIN_DEV='https://34.229.66.77'
const DOMAIN_PROD='https://100.25.170.62'

const domain = process.env.NODE_ENV !== 'production'
  ? DOMAIN_DEV
  : DOMAIN_PROD;

export default domain;
