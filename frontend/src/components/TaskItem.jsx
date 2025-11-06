import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed
  });

  const handleUpdate = () => {
    onUpdateTask(task._id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(task._id);
    }
  };

  const handleToggleComplete = () => {
    onUpdateTask(task._id, { ...editData, completed: !editData.completed });
    setEditData({ ...editData, completed: !editData.completed });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-content">
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              placeholder="Task title"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              placeholder="Task description"
              rows="3"
            />
          </div>
        </div>
      ) : (
        <div className="task-content">
          <h3 className="task-title">
            {task.title}
            {task.completed && (
              <span className="badge bg-success ms-2">Completed</span>
            )}
          </h3>
          <p className="task-description">{task.description}</p>
          <div className="task-meta">
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            {task.assignedTo && (
              <span>Assigned by: {task.user?.name || 'Unknown'}</span>
            )}
          </div>
        </div>
      )}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button 
              className="btn btn-success btn-sm"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button 
              className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
              onClick={handleToggleComplete}
            >
              {task.completed ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button 
              className="btn btn-danger btn-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;