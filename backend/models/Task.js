const mongoose = require('mongoose');
const Joi = require('joi');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // New field for assigned user (for admin assigned tasks)
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // New field for notification status
  isNotified: {
    type: Boolean,
    default: false
  },
  // New field for task assignment timestamp
  assignedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validate task input
TaskSchema.statics.validateTask = function(task) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).required(),
    completed: Joi.boolean(),
    assignedTo: Joi.string().optional()
  });

  return schema.validate(task);
};

module.exports = mongoose.model('Task', TaskSchema);