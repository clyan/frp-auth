'use strict';
function getToken(ctx) {
  return ctx.cookies.get('userToken', {
    encrypt: true,
  });
}
async function decodeToken(app, token) {
  return app.jwt.verify(token, app.config.jwt.secret);
}
module.exports = (options, app) => {
  return async function(ctx, next) {
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由
    let url = ctx.url;
    url = url.split('?')[0];
    // 单独处理/路由，判断是否携带token, 携带说明已经登录过，验证token是否过期，如果没过期则设置为token
    if (url === '/') {
      const token = getToken(ctx);
      if (token !== null) {
        try {
          await decodeToken(app, token);
          ctx.state.userToken = token;
        } catch (err) {
          ctx.state.userToken = null;
        }
      }
      return await next();
    }
    // 再判断当前路由是否需要验证token
    const flag = routerAuth.includes(url);
    if (flag) {
      return await next();
    }
    // 解析token
    const token = getToken(ctx);
    try {
      const decode = await decodeToken(app, token);
      ctx.state.userinfo = decode;
      return await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        message: 'token失效或解析错误',
        data: null,
      };
    }
  };
};
