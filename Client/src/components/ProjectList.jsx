import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProjectList({ projects, resources, tasks, setProjects, setResources, setTasks }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState(null); // project, resource, or task

  // Open Edit Modal
  const handleEditClick = (item, type) => {
    setSelectedItem(item);
    setItemType(type); // Set the type (project, task, or resource)
    setIsEditModalOpen(true); // Open modal
  };

  // Save changes (for project, resource, or task)
  const handleSave = (updatedItem) => {
    if (itemType === "project") {
      const updatedProjects = projects.map((project) =>
        project.id === updatedItem.id ? updatedItem : project
      );
      setProjects(updatedProjects); // Update projects state
    } else if (itemType === "resource") {
      const updatedResources = resources.map((resource) =>
        resource.id === updatedItem.id ? updatedItem : resource
      );
      setResources(updatedResources); // Update resources state
    } else if (itemType === "task") {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedItem.id ? updatedItem : task
      );
      setTasks(updatedTasks); // Update tasks state
    }
    setIsEditModalOpen(false); // Close modal
  };

  // Delete project
  const handleDelete = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects); // Update state by filtering out the deleted project
  };

  return (
    <div className="p-10 bg-gray-800 min-h-screen">
      <h2 className="text-3xl text-center text-blue-500 mb-8">Projects</h2>

      {/* Create New Project Button */}
      <Link
        to="/projects/create"
        className="mb-6 w-full bg-green-500 p-3 rounded text-white text-center hover:bg-green-600 transition duration-300"
      >
        Create New Project
      </Link>

      {/* Projects List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl text-blue-500">{project.name}</h3>
              <p className="mt-2 text-white">{project.description}</p>
              <p className="mt-2 text-white">Start Date: {project.startDate}</p>
              <p className="mt-2 text-white">End Date: {project.endDate}</p>
              <p className="mt-2 text-white">Budget: ${project.budget}</p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 justify-between">
                <button
                  onClick={() => handleEditClick(project, "project")}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300 w-full sm:w-auto"
                >
                  Edit Project
                </button>

                <button
                  onClick={() => handleDelete(project.id)} // Trigger delete
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300 w-full sm:w-auto"
                >
                  Delete Project
                </button>

                <Link
                  to={`/projects/${project.id}/tasks/create`}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                >
                  Add Task
                </Link>

                <Link
                  to={`/projects/${project.id}/resources/create`}
                  className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition duration-300 w-full sm:w-auto"
                >
                  Add Resource
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No projects available. Please create a new project.</p>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl text-center">Edit {itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(selectedItem); // Save the edited item
              }}
            >
              <input
                type="text"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Name"
              />
              <textarea
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, description: e.target.value })
                }
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Description"
              />
              {/* Additional fields depending on type (project, resource, task) */}
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
}

export default ProjectList;
