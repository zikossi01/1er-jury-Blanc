import React, { useState } from "react";

const ResourceList = ({ resources, setResources }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  // Open the edit modal and set the selected resource
  const handleEditClick = (resource) => {
    setSelectedResource({ ...resource });
    setIsEditModalOpen(true);
  };

  // Save changes to the resource
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setResources(resources.map((resource) =>
      resource.id === selectedResource.id ? { ...selectedResource } : resource
    ));
    setIsEditModalOpen(false);
  };

  // Delete resource
  const handleDelete = (resourceId) => {
    setResources(resources.filter((resource) => resource.id !== resourceId));
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-medium text-white">Resource List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-lg text-blue-500">{resource.name}</h3>
            <p className="mt-2 text-white">Type: {resource.type}</p>
            <p className="mt-2 text-white">Quantity: {resource.quantity}</p>
            <p className="mt-2 text-white">Supplier: {resource.supplier}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEditClick(resource)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(resource.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedResource && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl text-center">Edit Resource</h2>
            <form onSubmit={handleSaveChanges}>
              <input
                type="text"
                value={selectedResource.name}
                onChange={(e) => setSelectedResource({ ...selectedResource, name: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Resource Name"
              />
              <input
                type="text"
                value={selectedResource.type}
                onChange={(e) => setSelectedResource({ ...selectedResource, type: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Resource Type"
              />
              <input
                type="number"
                value={selectedResource.quantity}
                onChange={(e) => setSelectedResource({ ...selectedResource, quantity: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Quantity"
              />
              <input
                type="text"
                value={selectedResource.supplier}
                onChange={(e) => setSelectedResource({ ...selectedResource, supplier: e.target.value })}
                className="w-full mb-4 p-3 rounded bg-gray-200"
                placeholder="Supplier"
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

export default ResourceList;
