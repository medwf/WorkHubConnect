const domain = 
  process.env.NODE_ENV !== 'production' 
    ? process.env.DOMAIN_DEV 
    : process.env.DOMAIN_PROD;

export default domain;