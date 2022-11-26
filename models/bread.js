// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'https://images.unsplash.com/photo-1609501885030-33622c25d055?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvdXJkb3VnaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' },
  baker: {
    type: Schema.Types.ObjectId,
    ref: 'Baker'
  }
})

// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker}`
}

// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread

