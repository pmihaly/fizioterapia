import mongoose, { Schema } from 'mongoose'

const exerciseSchema = new Schema({
  name: {
    type: String
  },
  thumbnail: {
    type: String
  },
  youtubeLink: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

exerciseSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      thumbnail: this.thumbnail,
      youtubeLink: this.youtubeLink,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Exercise', exerciseSchema)

export const schema = model.schema
export default model
