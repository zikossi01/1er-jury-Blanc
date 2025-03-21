import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    resources: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    navigate("/tasks");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold">Create New Task</h1>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Task Title"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Task Description"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleInputChange}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="resources"
        value={formData.resources}
        onChange={handleInputChange}
        placeholder="Resources"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
