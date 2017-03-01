var mongoose = require('mongoose');  
var elizaSchema = new mongoose.Schema({  
  user_id: Number,
  convo_id: Number,
  date: { type: Date, default: Date.now },
  convo : { type : Array , "default" : [] }
});
mongoose.model('Convo', elizaSchema);