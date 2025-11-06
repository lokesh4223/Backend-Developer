import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [filter, setFilter] = useState('all'); // all, completed, pending

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>My Tasks</h2>
        <div className="task-count">
          <span className="badge bg-primary">
            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>
      </div>

      <div className="task-filters">
        <button 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button 
          className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <h5 className="card-title">No tasks found</h5>
            <p className="card-text text-muted">
              {filter === 'all' 
                ? 'You have no tasks yet. Create your first task!' 
                : filter === 'pending'
                ? 'You have no pending tasks. Great job!'
                : 'You have no completed tasks yet.'}
            </p>
          </div>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem 
            key={task._id} 
            task={task} 
            onUpdateTask={onUpdateTask} 
            onDeleteTask={onDeleteTask} 
          />
        ))
      )}
    </div>
  );
};

export default TaskList;