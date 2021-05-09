'use strict';
const Service = require('egg').Service;

class DomainService extends Service {
  async create(domainInfo) {
    const { domain } = this.ctx.service;
    const { Domain } = this.ctx.model;

    const domains = domain.findByName(domainInfo.name);
    // 存在则直接返回
    if (domains.length) return domains;

    const result = await Domain.create({
      user_id: domainInfo.user_id,
      name: domainInfo.name,
    });
    return result;
  }
  async findAll() {
    return this.ctx.model.Domain.find({});
  }
  async findByName(name) {
    return this.ctx.model.Domain.find({ name });
  }
  async findByUserId(user_id, state = 1) {
    return this.ctx.model.Domain.find({ user_id, state });
  }
}

module.exports = DomainService;
