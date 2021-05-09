'use strict';

const Controller = require('egg').Controller;
class DomainController extends Controller {
  async applyDomain() {
    const { ctx } = this;
    const data = ctx.request.body;
    const { domain } = data;
    // 首先判断用户是否已经申请过一个域名。。,申请过不再让申请
    // decode {
    //   data: { id: 'dasdsadsadasd', username: 'dasdsadsa@qq.com' },
    //   exp: 1621350427,
    //   iat: 1620745627
    // }
    const decode = ctx.state.userinfo;
    const { id } = decode.data;
    const domainByUser = await ctx.service.domain.findByUserId(id);
    if (domainByUser.length > 0) {
      return ctx.helper.success({ code: 0, ctx, msg: '您已经申请过域名了,暂时支持注册一个', res: {} });
    }
    // 判断该域名是否被申请过了
    const curdomain = await ctx.service.domain.findByName(domain);
    if (curdomain.length > 0) {
      return ctx.helper.success({ code: 0, ctx, res: {}, msg: '该域名已被申请，请尝试换一个域名' });
    }
    // 申请
    const result = await ctx.service.domain.create({ user_id: id, name: domain });
    return ctx.helper.success({ ctx, msg: '申请成功', res: result });
  }
}

module.exports = DomainController;
