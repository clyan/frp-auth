'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.auth.index);
  router.get('/index', controller.home.index);


  router.post('/register', controller.auth.register);
  router.post('/login', controller.auth.login);
  router.post('/verfiy', controller.auth.verfiy);

  // 注册域名
  router.post('/applyDomain', controller.domian.applyDomain);
  router.get('/domains', controller.domian.findAll);

  // 单独给后端插件提供的拦截
  router.all('/frpAuth', controller.auth.frpAuth);
};
