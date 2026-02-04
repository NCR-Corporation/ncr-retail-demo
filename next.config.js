module.exports = {
  images: {
    domains: ['retaildemo.ncrvoyixcloud.com', 'https://via.placeholder.com', 'via.placeholder.com', 'www.google.com', 'localhost']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  publicRuntimeConfig: {
    APP_URI: process.env.REACT_APP_URI,
    GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  }
};
