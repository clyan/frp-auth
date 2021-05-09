'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.renderView('index.html');
  }
}

module.exports = HomeController;
