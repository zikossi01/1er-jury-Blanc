import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/ProjectForm";
import ProjectDetails from "./components/ProjectDetails";
import TaskDetails from "./components/TaskDetails";

function App() {
  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    try {
      setProjects([...projects, { ...newProject, tasks: [] }]);
      toast.success("Project created successfully!");
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    }
  };

  const deleteProject = (index) => {
    try {
      setProjects(projects.filter((_, i) => i !== index));
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error);
    }
  };

  const addTaskToProject = (projectIndex, newTask) => {
    try {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks.push({ ...newTask, resources: [] });
      setProjects(updatedProjects);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task");
      console.error(error);
    }
  };

  const deleteTask = (projectIndex, taskIndex) => {
    try {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks = updatedProjects[projectIndex].tasks.filter((_, i) => i !== taskIndex);
      setProjects(updatedProjects);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  const editTask = (projectIndex, taskIndex, updatedTask) => {
    try {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks[taskIndex] = { ...updatedTask };
      setProjects(updatedProjects);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
      console.error(error);
    }
  };

  // Resource operations
  const addResourceToTask = (projectIndex, taskIndex, newResource) => {
    try {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks[taskIndex].resources.push(newResource);
      setProjects(updatedProjects);
      toast.success("Resource added successfully!");
    } catch (error) {
      toast.error("Failed to add resource");
      console.error(error);
    }
  };

  const updateResourceInTask = (projectIndex, taskIndex, resourceIndex, updatedResource) => {
    try {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks[taskIndex].resources[resourceIndex] = updatedResource;
      setProjects(updatedProjects);
      toast.success("Resource updated successfully!");
    } catch (error) {
      toast.error("Failed to update resource");
      console.error(error);
    }
  };

  const deleteResourceFromTask = (projectIndex, taskIndex, resourceIndex) => {
    try {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].tasks[taskIndex].resources = 
        updatedProjects[projectIndex].tasks[taskIndex].resources.filter((_, i) => i !== resourceIndex);
      setProjects(updatedProjects);
      toast.success("Resource deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete resource");
      console.error(error);
    }
  };

  return (
    <Router>
      {/* Add the Toaster component here */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151',
            padding: '16px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <nav className="flex justify-between items-center mb-8">
          <Link to="/" className="text-xl font-bold text-blue-400 hover:scale-105 transition-all">
            🏠 Dashboard
          </Link>
          <Link
            to="/create-project"
            className="bg-blue-600 px-4 py-2 rounded-xl text-white font-semibold shadow-lg hover:bg-blue-700 transition-all"
          >
            ➕ Create Project
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard projects={projects} deleteProject={deleteProject} />} />
          <Route path="/create-project" element={<ProjectForm addProject={addProject} />} />
          <Route
            path="/project/:projectId"
            element={
              <ProjectDetails 
                projects={projects} 
                addTaskToProject={addTaskToProject} 
                deleteTask={deleteTask} 
                editTask={editTask} 
              />
            }
          />
          <Route
            path="/project/:projectId/task/:taskId"
            element={
              <TaskDetails 
                projects={projects} 
                addResourceToTask={addResourceToTask}
                updateResourceInTask={updateResourceInTask}
                deleteResourceFromTask={deleteResourceFromTask}
              />
            }
          />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;