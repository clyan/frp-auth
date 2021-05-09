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
  config.verfiyCodeExpire = 2000;

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ];

  // 免验证
  config.routerAuth = [ '/', '/verfiy', '/login', '/register', '/frpAuth' ];

  // add your user config here
  const userConfig = {
    mongoose: {
      url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/taskmanage',
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
        host: '',
        password: '',
        db: 0,
      },
    },
    email: {
      client: {
        host: 'smtp.qq.com',
        secureConnection: true,
        port: 465,
        auth: {
          user: '',
          pass: '',
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
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  };
  return {
    ...config,
    ...userConfig,
  };
};
