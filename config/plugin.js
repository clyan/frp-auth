'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-ejs',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  email: {
    enable: true,
    package: 'egg-email',
  },
  // vue: {
  //   enable: true,
  //   package: 'egg-view-vue',
  // },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
