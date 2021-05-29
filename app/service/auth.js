'use strict';
const Service = require('egg').Service;

class AuthService extends Service {
  async verfiy({ username: email }) {
    const code = this.app.verfiyCode();
    const mailOptions = {
      from: '2429335889@qq.com',
      to: email,
      subject: '欢迎使用该内网穿透服务',
      html: `您本次的验证码为${code}`,
    };
    const ex = this.app.config.verfiyCodeExpire;
    try {
      const response = await this.app.email.sendMail(mailOptions);
      // 60s 过期。
      this.app.redis.set(email + '_verfiyCode', code, 'EX', ex);
      this.app.email.close();
      return {
        flag: true,
        ex,
        error: null,
      };
    } catch (error) {
      this.ctx.logger.error(new Error(error));
      return {
        flag: false,
        ex,
        error,
      };
    }
  }
  async apply(id, username) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        id,
        username,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
  }
  async register(info) {
    const { service } = this.ctx;
    const { user: UserService } = service;
    const verfiyCode = await this.app.redis.get(info.username + '_verfiyCode');
    if (info.verfiy !== verfiyCode) {
      return {
        verfiy: false,
        user: null,
      };
    }
    // 查询用户是否存在
    const users = await UserService.findByName(info.name);
    if (users.length) {
      return {
        verfiy: true,
        user: false,
      };
    }

    // 创建
    const userInfo = UserService.create(info);
    return {
      verfiy: true,
      user: true,
    };
  }
  async login(payload) {
    const { service } = this.ctx;
    const { user: UserService } = service;
    const verfiyCode = await this.app.redis.get(payload.username + '_verfiyCode');
    if (payload.verfiy !== verfiyCode) {
      return {
        verfiy: false,
        username: null,
        password: null,
      };
    }
    // 查询用户是否存在
    const user = await UserService.findByNameAndPwd({ username: payload.username, password: payload.password });
    if (user.length <= 0) {
      return {
        username: false,
        password: false,
      };
    }
    // 生成Token令牌
    return { token: await service.auth.apply(user[0]._id, user[0].username) };
  }
}

module.exports = AuthService;
