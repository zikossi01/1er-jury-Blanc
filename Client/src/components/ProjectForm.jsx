import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm({ addProject }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new project object
    const newProject = {
      id: Date.now(),  // Simple unique ID using current timestamp
      name,
      description,
      startDate,
      endDate,
      budget,
    };

    // Call the function to add project to the parent component (App.jsx)
    addProject(newProject);

    // Redirect to the projects list page after project creation
    navigate("/projects");
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-3xl text-center mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="w-full bg-green-500 p-3 rounded text-white hover:bg-green-600 transition duration-300"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
