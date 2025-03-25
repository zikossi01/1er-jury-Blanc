import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ProjectDetails({ projects, addTaskToProject, deleteTask, editTask }) {
  const { projectId } = useParams();
  const project = projects[projectId];

  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  if (!project) {
    toast.error("Project not found");
    return <p className="text-center text-white">Project not found</p>;
  }

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const validateTask = () => {
    if (!taskForm.name.trim()) {
      toast.error("Task name is required");
      return false;
    }
    if (taskForm.name.length > 50) {
      toast.error("Task name must be less than 50 characters");
      return false;
    }
    if (taskForm.startDate && taskForm.endDate && new Date(taskForm.endDate) < new Date(taskForm.startDate)) {
      toast.error("End date must be after start date");
      return false;
    }
    return true;
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!validateTask()) return;

    const loadingToast = toast.loading(isEditing ? "Updating task..." : "Adding task...");
    
    try {
      if (isEditing) {
        await editTask(projectId, taskToEdit, taskForm);
        toast.success("Task updated successfully!", { id: loadingToast });
      } else {
        await addTaskToProject(projectId, taskForm);
        toast.success("Task added successfully!", { id: loadingToast });
      }
      setTaskForm({ name: "", description: "", startDate: "", endDate: "" });
      setIsEditing(false);
      setTaskToEdit(null);
    } catch (error) {
      toast.error("Failed to save task", { id: loadingToast });
      console.error("Error saving task:", error);
    }
  };

  const handleEditTask = (taskIndex) => {
    const task = project.tasks[taskIndex];
    setTaskForm({
      name: task.name,
      description: task.description,
      startDate: task.startDate || "",
      endDate: task.endDate || ""
    });
    setTaskToEdit(taskIndex);
    setIsEditing(true);
  };

  const confirmDeleteTask = (taskIndex) => {
    const taskName = project.tasks[taskIndex].name;
    toast((t) => (
      <div className="flex flex-col space-y-2">
        <p>Are you sure you want to delete <span className="font-semibold">"{taskName}"</span>?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteTask(projectId, taskIndex);
              toast.success(`Task "${taskName}" deleted`, { id: t.id });
            }}
            className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 10000
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
      <p className="text-gray-300 mb-6">{project.description}</p>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-4">Tasks</h3>
        
        {project.tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No tasks added yet</p>
        ) : (
          <div className="space-y-3">
            {project.tasks.map((task, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{task.name}</h4>
                    <p className="text-gray-300">{task.description}</p>
                    {task.startDate && task.endDate && (
                      <p className="text-sm text-gray-400 mt-1">
                        🗓 {task.startDate} to {task.endDate}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTask(index)}
                      className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteTask(index)}
                      className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/project/${projectId}/task/${index}`}
                      className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
                    >
                      Resources
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <form 
          onSubmit={handleAddTask} 
          className="mt-6 bg-gray-700 p-5 rounded-lg"
        >
          <h4 className="text-lg font-medium text-white mb-3">
            {isEditing ? "Edit Task" : "Add New Task"}
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 mb-1">Task Name*</label>
              <input
                type="text"
                name="name"
                value={taskForm.name}
                onChange={handleTaskChange}
                className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                required
                maxLength="50"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Description*</label>
              <textarea
                name="description"
                value={taskForm.description}
                onChange={handleTaskChange}
                className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                rows="3"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={taskForm.startDate}
                  onChange={handleTaskChange}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={taskForm.endDate}
                  onChange={handleTaskChange}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                  min={taskForm.startDate}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setTaskForm({ name: "", description: "", startDate: "", endDate: "" });
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectDetails;