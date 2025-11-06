const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    // Get user's own tasks and tasks assigned to them
    const tasks = await Task.find({
      $or: [
        { user: req.user.id },
        { assignedTo: req.user.id }
      ]
    }).populate('user', 'name').populate('assignedTo', 'name');

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name').populate('assignedTo', 'name');

    if (!task) {
      return next(
        new ErrorResponse(`No task with the id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or assigned user
    if (task.user.toString() !== req.user.id && 
        task.assignedTo?.toString() !== req.user.id && 
        req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to access this task`,
          401
        )
      );
    }

    // Mark as notified if this is the first time user is accessing it
    if (!task.isNotified && task.assignedTo?.toString() === req.user.id) {
      task.isNotified = true;
      await task.save();
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    const { error } = Task.validateTask(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Add user to req.body
    req.body.user = req.user.id;
    
    // If admin is assigning task to a user
    if (req.user.role === 'admin' && req.body.assignedTo) {
      req.body.assignedAt = Date.now();
    }

    const task = await Task.create(req.body);

    // Populate user and assignedTo fields
    await task.populate('user', 'name');
    if (task.assignedTo) {
      await task.populate('assignedTo', 'name');
    }

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`No task with the id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or admin
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this task`,
          401
        )
      );
    }

    // If admin is assigning task to a user
    if (req.user.role === 'admin' && req.body.assignedTo && !task.assignedTo) {
      req.body.assignedAt = Date.now();
    }

    const { error } = Task.validateTask(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'name').populate('assignedTo', 'name');

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(
        new ErrorResponse(`No task with the id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is task owner or admin
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this task`,
          401
        )
      );
    }

    await task.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};