const env = process.env.NODE_ENV || 'debug';

const devServer = {
    open: true,
    host: "0.0.0.0", 
};
if (env === 'debug') {
    devServer.proxy = {
        '/api': {
            target: 'http://10.72.2.108:30000',
            pathRewrite: {
                '^/api': ''
            }
        },
    };
}

module.exports = {
    productionSourceMap: false,
    devServer,
}