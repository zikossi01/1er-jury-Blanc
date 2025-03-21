import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResourceForm = ({ addResource }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
    supplier: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addResource(formData);
    navigate("/resources");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold">Create New Resource</h1>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Resource Name"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        placeholder="Resource Type"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        placeholder="Resource Quantity"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        name="supplier"
        value={formData.supplier}
        onChange={handleInputChange}
        placeholder="Supplier"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Create Resource
      </button>
    </form>
  );
};

export default ResourceForm;
