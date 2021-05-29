/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588070284144_1806';
  // 验证码过期时间
  config.verfiyCodeExpire = 120;

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ];

  // 免验证
  config.routerAuth = [ '/', '/verfiy', '/login', '/register', '/frpAuth' ];

  // add your user config here
  const userConfig = {
    mongoose: {
      url: process.env.SERVER_MONGODB_URL + '/frp' || 'mongodb://127.0.0.1:27017/frp',
      options: {
        server: { poolSize: 20 },
        useNewUrlParser: true,
      },
    },
    cors: {
      credentials: true,
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    view: {
      defaultExtension: '.html',
      mapping: {
        '.html': 'ejs',
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: process.env.SERVER_REDIS_PWD || '',
        db: 0,
      },
    },
    email: {
      client: {
        host: 'smtp.qq.com',
        secureConnection: true,
        port: 465,
        auth: {
          user: process.env.SERVER_SMTP_USER || '',
          pass: process.env.SERVER_SMTP_PASS || '',
        },
      },
    },
  };

  config.security = {
    csrf: {
      enable: false,
      credentials: true,
    },
  };
  config.jwt = {
    secret: process.env.SERVER_JWT_SECRET || 'token',
    enable: true, // default is false
    match: '/jwt', // optional
  };
  return {
    ...config,
    ...userConfig,
  };
};
