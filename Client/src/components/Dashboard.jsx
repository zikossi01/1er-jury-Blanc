import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Dummy Data for Chart (replace with real data later)
const data = [
  { name: "Completed Projects", value: 15 },
  { name: "In Progress Projects", value: 5 },
  { name: "Pending Projects", value: 2 },
];

const Dashboard = () => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-blue-500">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Summary Cards */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Total Projects</h2>
          <p className="text-3xl text-blue-500">22</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Ongoing Projects</h2>
          <p className="text-3xl text-blue-500">5</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-white">Completed Projects</h2>
          <p className="text-3xl text-blue-500">15</p>
        </div>
      </div>

      {/* Pie Chart for Project Progress */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-white">Project Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#00C49F" : "#FF8042"} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-white">Quick Links</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="/projects"
              className="text-blue-500 hover:underline"
            >
              View All Projects
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="text-blue-500 hover:underline"
            >
              Manage Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/resources"
              className="text-blue-500 hover:underline"
            >
              Manage Resources
            </Link>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Dashboard;
