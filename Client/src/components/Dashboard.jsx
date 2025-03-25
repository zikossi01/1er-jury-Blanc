import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard({ projects, deleteProject }) {
  const handleDeleteProject = (index) => {
    deleteProject(index); // Delete project
  };

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-100 mb-5">🚀 Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="p-5 bg-white/10 backdrop-blur-md rounded-xl border border-gray-300 shadow-md transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-blue-300">{project.name}</h3>
            <p className="text-gray-200">{project.description}</p>
            <div className="mt-4 flex space-x-4">
              <Link
                to={`/project/${index}`}
                className="text-blue-500 hover:text-blue-400 transition-colors duration-300"
              >
                🔍 View
              </Link>
              <button
                onClick={() => handleDeleteProject(index)}
                className="text-red-500 hover:text-red-400 transition-colors duration-300"
              >
                🗑 Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
