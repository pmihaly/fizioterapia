import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import { env } from '../../config';

const roles = ['user', 'trainer'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'patient',
    },
    picture: {
      type: String,
      trim: true,
    },
    patients: {
      type: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    },
    trainer: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    trainerDescription: { type: String, trim: true, default: '' },
  },
  {
    timestamps: true,
  }
);

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1');
  }

  return email;
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9;

  bcrypt
    .hash(this.password, rounds)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.methods = {
  view(full) {
    let view = {};
    let fields = ['id', 'name', 'picture', 'role', 'trainerDescription'];

    if (full) {
      fields = [...fields, 'email', 'createdAt', 'patients', 'trainer'];
    }

    fields.forEach((field) => {
      view[field] = this[field];
    });

    return view;
  },

  authenticate(password) {
    return bcrypt.compare(password, this.password).then((valid) => (valid ? this : false));
  },
};

userSchema.statics = {
  roles,
};

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] });

const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
