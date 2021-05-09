'use strict';
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

// 处理成功响应
exports.success = ({ code = 1, ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code,
    data: res,
    msg,
  };
  ctx.status = 200;
};
