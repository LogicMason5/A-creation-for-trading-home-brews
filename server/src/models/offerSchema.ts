const mongo = require('mongoose')

const offerSchema = mongo.Schema({
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
  owner: { type: String }, //change to ref later
  // {
  //   type: mongo.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
  id: mongo.Schema.Types.ObjectId
  })

offerSchema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongo.model('OfferSchema', offerSchema)