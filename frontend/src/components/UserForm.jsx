import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSubmit, onClose, role = "customer" }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    password: "",
    birthdate: "",
    contact: "",
    next_of_kin: "",
    next_of_kin_contact: "",
    role: role || "customer",
    specialty: "",
    status: "active",
    bio: "",
    created_at: "",
    image: null, // file upload
  });

  // Prefill if editing user
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        first_name: user.first_name || "",
        middle_name: user.middle_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        password: user.password || "",
        birthdate: user.birthdate || "",
        contact: user.contact || "",
        next_of_kin: user.next_of_kin || "",
        next_of_kin_contact: user.next_of_kin_contact || "",
        role: user.role || role,
        specialty: user.specialty || "",
        status: user.status || "active",
        bio: user.bio || "",
        created_at: user.created_at || "",
        image: null,
      });
    }
  }, [user, role]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for submission (especially if includes an image)
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value || ""); // append all values, even empty ones
    });

    onSubmit(data); // pass to parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto space-y-4 h-[80vh] overflow-y-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {user ? "Edit User" : "Add User"} ({role})
      </h2>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {/* BASIC NAMES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Middle Name</label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
            placeholder={user ? "Leave blank to keep current password" : ""}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
      </div>

      {/* SHARED FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>
      </div>

      {/* EMPLOYEE-ONLY FIELDS */}
      {role === "employee" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Next of Kin</label>
              <input
                type="text"
                name="next_of_kin"
                value={formData.next_of_kin}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Next of Kin Contact</label>
              <input
                type="text"
                name="next_of_kin_contact"
                value={formData.next_of_kin_contact}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialty</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                placeholder="e.g., Hair Stylist, Nail Technician"
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Biography</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              placeholder="Write a short bio..."
              className="mt-1 block w-full border rounded-md p-2"
            />
          </div>
        </>
      )}

      {/* BUTTONS */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UserForm;
