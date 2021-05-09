'use strict';
module.exports = (options, app) => {
  return async function(ctx, next) {
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由
    const url = ctx.url;
    // 判断当前路由是否需要验证token
    const flag = routerAuth.includes(url);
    if (flag) {
      await next();
    } else {
      // 获取token,如果没有传入token，则为空
      const token = ctx.cookies.get('userToken', {
        encrypt: true,
      });
      // 解析token
      try {
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        ctx.state.userinfo = decode;
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {
          code: 0,
          message: 'token失效或解析错误',
          data: null,
        };
      }
    }
  };
};
