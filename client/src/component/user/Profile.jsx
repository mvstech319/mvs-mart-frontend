import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export const Profile = () => {
  const { user, updateUser } = useContext(AppContext); // Assuming updateUser exists
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Save
  const handleSave = () => {
    updateUser(formData);
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex justify-center items-center mt-16">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-center text-white">
          <div className="relative mx-auto w-32 h-32 mb-4">
            <img
              src={user?.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold">{user?.name || "User Name"}</h1>
          <p className="text-md">{user?.email || "user@example.com"}</p>
        </div>

        {/* User Details Section */}
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500 font-medium">Full Name</span>
            <span className="text-gray-800 font-semibold">{user?.name}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="text-gray-800 font-semibold">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-gray-500 font-medium">Role</span>
            <span className="text-gray-800 font-semibold">{user?.role}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-medium">Joined On</span>
            <span className="text-gray-800 font-semibold">{user?.createdAt}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="p-6 border-t bg-gray-50 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Profile Photos</label>
                <input
                  type="file"
                  name="imgSrc"
                  value={formData.imgSrc}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
