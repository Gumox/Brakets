module.exports = {
  reactStrictMode: true,
  /*
	  node: {
				  fs: 'empty',
				  net: 'empty',
				  tls: 'empty',
		  },
	  */
  env: {
    MYSQL_HOST: process.env.NEXT_PUBLIC_MYSQL_HOST,
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "suseon_ok",
    MYSQL_USER: "admin",
    MYSQL_PASSWORD: "qmfozlcm21",
    KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    JWT_SECRET_KEY: "bracketssecretkey",
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  images: {
    domains: [
        "image.adidas.co.kr",
        "34.64.182.76"
    ], // TODO: Image 저장하거나, 특정 도메인 미리 설정 필요
  },
  
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },

 

  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
  },
};