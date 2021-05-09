'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const DomainSchema = new Schema({
    name: { type: String },
    state: { type: Number, default: 1 },
    user_id: { type: String },
  }, {
    minimize: true,
  });
  return mongoose.model('Domain', DomainSchema);
};
