import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: false,
    minlength: 8
  },
  provider: {
    type: String,
    enum: ['credentials', 'google'],
    default: 'credentials'
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
