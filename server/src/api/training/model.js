import mongoose, { Schema } from 'mongoose';

const trainingSchema = new Schema(
  {
    name: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    patient: {
      type: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exercises: {
      type: [
        {
          id: { type: Schema.Types.ObjectId, ref: 'exercises' },
          number: Number,
        },
      ],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

trainingSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      thumbnail: this.thumbnail,
      patient: this.patient,
      exercises: this.exercises,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
    };

    return full
      ? {
          ...view,
          // add properties for a full view
        }
      : view;
  },
};

const model = mongoose.model('Training', trainingSchema);

export const schema = model.schema;
export default model;
