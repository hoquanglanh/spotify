const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên bài hát không được để trống'],
    trim: true
  },
  singer: {
    type: String,
    required: [true, 'Tên ca sĩ không được để trống'],
    trim: true
  },
  album: {
    type: String,
    required: [true, 'Tên album không được để trống'],
    trim: true
  },
  albumArtist: {
    type: String,
    required: [true, 'Tên ca sĩ album không được để trống'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Thời lượng bài hát không được để trống'],
    validate: {
      validator: function(v) {
        return /^([0-9]{1,2}):([0-5][0-9])$/.test(v);
      },
      message: props => `${props.value} không phải là định dạng thời gian hợp lệ! Sử dụng định dạng mm:ss`
    }
  },
  lyrics: {
    type: String,
    required: [true, 'Lời bài hát không được để trống'],
    trim: true
  },
  audioFile: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }]
});

// Middleware để tự động cập nhật updatedAt
songSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Các phương thức instance
songSchema.methods.increaseViews = async function() {
  this.views += 1;
  return this.save();
};

// Các phương thức static
songSchema.statics.findByArtist = function(singerName) {
  return this.find({ singer: new RegExp(singerName, 'i') });
};

// Virtual field cho URL
songSchema.virtual('audioUrl').get(function() {
  if (this.audioFile) {
    return `/uploads/songs/${this.audioFile}`;
  }
  return null;
});

// Đảm bảo virtuals được bao gồm khi chuyển đổi sang JSON
songSchema.set('toJSON', { virtuals: true });
songSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Song', songSchema);