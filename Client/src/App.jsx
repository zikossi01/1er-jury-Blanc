import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/ProjectForm";
import TaskForm from "./components/TaskForm";
import ResourceForm from "./components/ResourceForm";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";
import ResourceList from "./components/ResourceList";
import { motion } from "framer-motion";

// Helper functions to handle localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

function App() {
  const [projects, setProjects] = useState(loadFromLocalStorage("projects", []));
  const [tasks, setTasks] = useState(loadFromLocalStorage("tasks", []));
  const [resources, setResources] = useState(loadFromLocalStorage("resources", []));

  // Update localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage("projects", projects);
    saveToLocalStorage("tasks", tasks);
    saveToLocalStorage("resources", resources);
  }, [projects, tasks, resources]);

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const addResource = (newResource) => {
    setResources([...resources, newResource]);
  };

  return (
    <Router>
      <motion.div
        className="app-container bg-gray-900 text-white font-sans min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 p-5">
            <h2 className="text-xl text-blue-500">ConstructionXpert</h2>
            <nav>
              <ul className="mt-4">
                <li><a href="/" className="text-white">Dashboard</a></li>
                <li><a href="/projects" className="text-white">Projects</a></li>
                <li><a href="/tasks" className="text-white">Tasks</a></li>
                <li><a href="/resources" className="text-white">Resources</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-10">
            <Routes>
              <Route path="/" element={<Dashboard projects={projects} tasks={tasks} resources={resources} />} />
              <Route path="/projects" element={<ProjectList projects={projects} />} />
              <Route path="/projects/create" element={<ProjectForm addProject={addProject} />} />
              <Route path="/projects/:projectId/tasks/create" element={<TaskForm addTask={addTask} />} />
              <Route path="/tasks" element={<TaskList tasks={tasks} />} />
              <Route path="/tasks/:taskId/resources/create" element={<ResourceForm addResource={addResource} />} />
              <Route path="/resources" element={<ResourceList resources={resources} />} />
            </Routes>
          </div>
        </div>
      </motion.div>
    </Router>
  );
}

export default App;
