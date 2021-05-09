'use strict';
const Service = require('egg').Service;

class FrpsrService extends Service {
  /**
   * 用户登录操作信息
   * @param {object} content
   * "content": {
      "version": <string>,
      "hostname": <string>,
      "os": <string>,
      "arch": <string>,
      "user": <string>,
      "timestamp": <int64>,
      "privilege_key": <string>,
      "run_id": <string>,
      "pool_count": <int>,
      "metas": map<string>string
  }
      */
  async Login(content) {
  }
  /**
   * 创建代理的相关信息
   * @param {object} content
   * "content": {
      "user": {
          "user": <string>,
          "metas": map<string>string
      },
      "proxy_name": <string>,
      "proxy_type": <string>,
      "use_encryption": <bool>,
      "use_compression": <bool>,
      "group": <string>,
      "group_key": <string>,

      // tcp and udp only
      "remote_port": <int>,

      // http and https only
      "custom_domains": []<string>,
      "subdomain": <string>,
      "locations": <string>,
      "http_user": <string>,
      "http_pwd": <string>,
      "host_header_rewrite": <string>,
      "headers": map<string>string,

      "metas": map<string>string
  }
      */
  async NewProxy(content) {

  }
  /**
   * 心跳相关信息
   * @param {object} content
   * "content": {
      "user": {
          "user": <string>,
          "metas": map<string>string
          "run_id": <string>
      },
      "timestamp": <int64>,
      "privilege_key": <string>
  }
      */
  async Ping(content) {

  }
  /**
   * 新增 frpc 连接相关信息
   * @param {object} content
   * "content": {
      "user": {
          "user": <string>,
          "metas": map<string>string
          "run_id": <string>
      },
      "run_id": <string>
      "timestamp": <int64>,
      "privilege_key": <string>
  }
      */
  async NewWorkConn(content) {
  }
  /**
   * 新增 proxy 连接相关信息 (支持 tcp、stcp、https 和 tcpmux 协议)。
   * @param {object} content
   * "content": {
      "user": {
          "user": <string>,
          "metas": map<string>string
          "run_id": <string>
      },
      "proxy_name": <string>,
      "proxy_type": <string>,
      "remote_addr": <string>
  }
      */
  async NewUserConn(content) {

  }


}

module.exports = FrpsrService;
