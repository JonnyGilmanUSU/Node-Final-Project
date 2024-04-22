const mongoose = require('mongoose');
const slugify = require("slugify");

const mustacheStyleSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [50, 'Title cannot exceed 50 characters'],
    set: function (value) {
      this.styleSlug = slugify(value, { lower: true, trim: true });
      return value;
    },
  },
  imageURL: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: function(v) {
        return /([^\s]+(\.(jpg|png))$)/i.test(v); 
      },
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  styleSlug: {
    type: String,
    required: [true, 'Title slug is required'],
  }
});



module.exports = mongoose.model('MustacheStyle', mustacheStyleSchema);
