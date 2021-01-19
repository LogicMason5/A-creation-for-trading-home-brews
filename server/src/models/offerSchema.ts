const mongoose = require('mongoose')

const offerSchema = mongoose.Schema({
  beerName: { type: String, required: true },
  description: { type: String, required: true },
  packageSize: { type: String },
  amount: { type: Number },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  recipeLink: { type: String },
  created: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  id: mongoose.Schema.Types.ObjectId
    // title: { type: String, required: true},
    // author: String,
    // url: { type: String, required: true},
    // likes: { type: Number, default: 0},
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }
  })

offerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Offer', offerSchema)