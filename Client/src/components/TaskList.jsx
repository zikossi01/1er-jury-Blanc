import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, setTasks, projectId }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Open the edit modal and set the selected task
  const handleEditClick = (task) => {
    setSelectedTask({ ...task });
    setIsEditModalOpen(true);
  };

  // Save changes to the task
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setTasks(tasks.map((task) =>
      task.id === selectedTask.id ? { ...selectedTask } : task
    ));
    setIsEditModalOpen(false);
  };

  // Delete task
  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => task.projectId === projectId);

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl text-center text-blue-500 mb-4">Tasks for Project {projectId}</h2>

      {filteredTasks.length === 0 ? (
        <p className="text-white">No tasks yet for this project. Add a new task!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl text-blue-500">{task.title}</h3>
              <p className="mt-2 text-white">{task.description}</p>
              <p className="mt-2 text-white">Start Date: {task.startDate}</p>
              <p className="mt-2 text-white">End Date: {task.endDate}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to={`/projects/${projectId}/tasks/create`}
        className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add New Task
      </Link>

      {/* Edit Modal */}
      {isEditModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl text-center">Edit Task</h2>
            <form onSubmit={handleSaveChanges}>
              <input
                type="text"
                value={selectedTask.title}
                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Task Title"
              />
              <textarea
                value={selectedTask.description}
                onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Task Description"
              />
              <input
                type="date"
                value={selectedTask.startDate}
                onChange={(e) => setSelectedTask({ ...selectedTask, startDate: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
              />
              <input
                type="date"
                value={selectedTask.endDate}
                onChange={(e) => setSelectedTask({ ...selectedTask, endDate: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
              />
              <button
                type="submit"
                className="w-full bg-green-500 p-3 rounded text-white hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="mt-4 w-full bg-red-500 p-3 rounded text-white hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
