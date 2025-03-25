import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ProjectForm({ addProject, projects }) {
  const { projectId } = useParams();
  const isEditing = !!projectId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: ""
  });

  useEffect(() => {
    if (isEditing && projects[projectId]) {
      setFormData(projects[projectId]);
    }
  }, [projectId, isEditing, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return false;
    }
    if (formData.name.length > 50) {
      toast.error("Project name must be less than 50 characters");
      return false;
    }
    if (!formData.startDate) {
      toast.error("Start date is required");
      return false;
    }
    if (formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date must be after start date");
      return false;
    }
    if (formData.budget && formData.budget < 0) {
      toast.error("Budget must be a positive number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const loadingToast = toast.loading(isEditing ? "Updating project..." : "Creating project...");
    
    try {
      addProject(formData);
      toast.success(isEditing ? "Project updated successfully!" : "Project created successfully!", {
        id: loadingToast
      });
      navigate(isEditing ? `/project/${projectId}` : "/");
    } catch (error) {
      toast.error("Failed to save project", {
        id: loadingToast
      });
      console.error("Error saving project:", error);
    }
  };

  return (
    <motion.div
      className="p-8 bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-500 shadow-xl max-w-2xl mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-white mb-6">
        {isEditing ? "✏️ Edit Project" : "📝 Create New Project"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Project Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-1">Budget ($)*</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-1">End Date*</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600"
              required
              min={formData.startDate}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(isEditing ? `/project/${projectId}` : "/")}
            className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition"
            whileHover={{ scale: 1.03 }}
          >
            {isEditing ? "Update Project" : "Create Project"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default ProjectForm;