'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserLoginTransfer = {
      username: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false },
    };
  }
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.renderView('auth.html');
  }
  async login() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserLoginTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.auth.login(payload);
    if (res.verfiy === false) {
      ctx.helper.success({ code: 0, ctx, res: {}, msg: '验证码已过期' });
    }
    if (res.username === false || res.password === false) {
      ctx.helper.success({ code: 0, ctx, res: {}, msg: '用户邮箱或密码错误' });
    }

    if (res.token) {
      ctx.cookies.set('userToken', res.token, {
        httpOnly: true,
        sameSite: true,
        encrypt: true,
        maxAge: 1000 * 3600 * 24,
      });
      // 设置响应内容和响应状态码
      ctx.helper.success({ ctx, res: {} });
      // ctx.router.redirect('/index');
    }
  }
  async register() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserLoginTransfer);
    const data = ctx.request.body;
    const res = await service.auth.register(data);
    let msg = '';
    if (res.verfiy === false) {
      msg = '验证码已过期';
    } else if (res.user === false) {
      msg = '用户邮箱已被注册';
    } else {
      msg = '注册成功';
    }
    return ctx.helper.success({ ctx, res, msg });
  }
  async verfiy() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.auth.verfiy(data);
    return ctx.helper.success({ ctx, res, msg: res.flag ? '验证码获取成功' : '验证码获取失败,检查邮箱是否存在' });
  }
  async frpAuth() {
    const data = this.ctx.request.body;
    if (!(data.content && data.content.user && data.content.user.metas)) {
      this.ctx.body = {
        reject: true,
        reject_reason: '请检查客户端meta数据',
      };
    }
    const { meta_username, meta_password } = data.content.user.metas;
    const user = await this.ctx.service.user.findByNameAndPwd({ username: meta_username, password: meta_password });
    if (user.length <= 0) {
      this.ctx.body = {
        reject: true,
        reject_reason: '请检查账号或密码是否正确，没有账号先注册',
      };
    }
    const { _id } = user;
    const domain = await this.ctx.service.domain.findByUserId(_id);
    if (domain.length <= 0) {
      this.ctx.body = {
        reject: true,
        reject_reason: '该账号未注册该域名，请确认',
      };
    }
    this.ctx.body = {
      reject: false,
      unchange: true,
    };
  }
}

module.exports = AuthController;
