module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};
