const mongoose = require ('mongoose');
const slugify = require("slugify");

const contactRequestSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  address: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  phone: {
    type: String
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  dateResponded: {
    type: Date
  },
  response: {
    type: String
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for 'shortMessage'
contactRequestSchema.virtual('shortMessage').get(function() {
  return `${this.message.split(/\s+/).slice(0, 10).join(" ")}...`;
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
