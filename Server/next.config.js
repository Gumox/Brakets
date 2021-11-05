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
	'MYSQL_HOST': 'localhost',
	'MYSQL_PORT': '3306',
	'MYSQL_DATABASE': 'Adidas_01',
	'MYSQL_USER': 'admin',
	'MYSQL_PASSWORD': 'qmfozlcm21',
	},

	/*
	init: function () {
		return mysql.createConnection(db_info);
    	},
    	connect: function(conn) {
		conn.connect(function(err) {
	    	if(err) console.error('mysql connection error : ' + err);
	    	else console.log('mysql is connected successfully!');
		});
    	},
	*/

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
        	crypto: require.resolve('crypto-browserify')
      		}
    	},

}
