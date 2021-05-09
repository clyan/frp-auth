'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
  }, {
    minimize: true,
  });
  return mongoose.model('User', UserSchema);
};
