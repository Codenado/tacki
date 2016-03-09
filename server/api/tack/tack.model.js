'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
      Schema = mongoose.Schema;

var TackSchema = new Schema({
  name: String,
  url: String,
  description: String,
  author: {
   type: Schema.Types.ObjectId,
   ref: 'User',
   index: true
 }
})

TackSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'author', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
}

export default mongoose.model('Tack', TackSchema);
