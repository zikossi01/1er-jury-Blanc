import React, { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function TaskDetails({ projects, addResourceToTask, updateResourceInTask, deleteResourceFromTask }) {
  const { projectId, taskId } = useParams();
  const project = projects[projectId];
  const task = project?.tasks[taskId];

  const [resourceForm, setResourceForm] = useState({
    name: "",
    type: "",
    quantity: "",
    supplier: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);

  if (!project || !task) {
    toast.error("Task not found");
    return <p className="text-center text-white">Task not found</p>;
  }

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm(prev => ({ ...prev, [name]: value }));
  };

  const validateResource = () => {
    if (!resourceForm.name.trim()) {
      toast.error("Resource name is required");
      return false;
    }
    if (!resourceForm.type) {
      toast.error("Resource type is required");
      return false;
    }
    if (resourceForm.quantity && resourceForm.quantity < 0) {
      toast.error("Quantity must be a positive number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateResource()) return;

    const loadingToast = toast.loading(
      editingIndex !== null ? "Updating resource..." : "Adding resource..."
    );
    
    try {
      if (editingIndex !== null) {
        await updateResourceInTask(projectId, taskId, editingIndex, resourceForm);
        toast.success("Resource updated successfully!", { id: loadingToast });
      } else {
        await addResourceToTask(projectId, taskId, resourceForm);
        toast.success("Resource added successfully!", { id: loadingToast });
      }
      setResourceForm({ name: "", type: "", quantity: "", supplier: "" });
      setEditingIndex(null);
    } catch (error) {
      toast.error("Failed to save resource", { id: loadingToast });
      console.error("Error saving resource:", error);
    }
  };

  const confirmDelete = (index) => {
    const resourceName = task.resources[index].name;
    toast((t) => (
      <div className="flex flex-col space-y-2">
        <p>Delete resource <span className="font-semibold">"{resourceName}"</span>?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteResourceFromTask(projectId, taskId, index);
              toast.success(`Resource "${resourceName}" deleted`, { id: t.id });
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

  const handleEdit = (index) => {
    setResourceForm(task.resources[index]);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setResourceForm({ name: "", type: "", quantity: "", supplier: "" });
    setEditingIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-white mb-1">{task.name}</h2>
        <p className="text-gray-300 mb-6">{task.description}</p>

        <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
        
        {task.resources.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No resources added yet</p>
        ) : (
          <div className="space-y-3 mb-6">
            {task.resources.map((resource, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <div className="text-sm text-gray-300 mt-1">
                      {resource.type && <p>Type: {resource.type}</p>}
                      {resource.quantity && <p>Quantity: {resource.quantity}</p>}
                      {resource.supplier && <p>Supplier: {resource.supplier}</p>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(index)}
                      className="px-3 py-1 bg-red-600 rounded hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-700 p-5 rounded-lg">
          <h4 className="text-lg font-medium text-white mb-3">
            {editingIndex !== null ? "Edit Resource" : "Add New Resource"}
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 mb-1">Resource Name*</label>
              <input
                type="text"
                name="name"
                value={resourceForm.name}
                onChange={handleResourceChange}
                className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-1">Type*</label>
              <select
                name="type"
                value={resourceForm.type}
                onChange={handleResourceChange}
                className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                required
              >
                <option value="">Select Type</option>
                <option value="material">Material</option>
                <option value="equipment">Equipment</option>
                <option value="human">Human Resource</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={resourceForm.quantity}
                  onChange={handleResourceChange}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={resourceForm.supplier}
                  onChange={handleResourceChange}
                  className="w-full p-2 rounded bg-gray-600 text-white border border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            {editingIndex !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500"
            >
              {editingIndex !== null ? "Update Resource" : "Add Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskDetails;