import React, { useContext, useState } from 'react';
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

export const Address = () => {
  const { addAddress, userAddress, user } = useContext(AppContext);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    fullName:user?.name,
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phoneNumber: '',
  });

  const [error, setError] = useState('');

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'pincode' && value.length === 6) {
      fetchLocationDetails(value);
    }
  };

  // Fetch State, Country, and District from Pin Code
  const fetchLocationDetails = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data && data[0]?.Status === "Success") {
        const { District, State, Country } = data[0]?.PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          city: District,
          state: State,
          country: Country,
        }));
        setError('');
      } else {
        setError('Invalid Pincode. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch location details. Please try again later.');
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, address, city, state, pincode, country, phoneNumber } = formData;

    if (!fullName || !address || !city || !state || !pincode || !country || !phoneNumber) {
      setError("Please fill in all fields!");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Invalid phone number. Please enter a 10-digit number.");
      return;
    }

    try {
      const result = await addAddress(
        fullName,
        address,
        city,
        state,
        pincode,
        country,
        phoneNumber
      );
      if (result?.data?.success) {
        setFormData({
          fullName: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          phoneNumber: ''
        });
        setError('');
        navigate("/checkout");
      } else {
        setError("Failed to save address. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Address Registration failed. Please try again.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-gray-800 to-black min-h-screen flex items-center justify-center py-12 mt-[64px]">
      <div className="max-w-4xl w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 shadow-2xl rounded-xl p-8">
        {/* Page Title */}
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Shipping Address 📦
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Pin Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Pin Code</label>
              <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your pin code"
              required
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* City, State, Country */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
  <label className="block text-gray-300 font-medium mb-2">State</label>
  <select
    name="state"
    value={formData.state}
    onChange={handleChange}
    className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 
    sm:text-sm md:text-base lg:text-lg 
    max-w-full"
    required
  >
    <option value="">Select State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">
      Dadra and Nagar Haveli and Daman and Diu
    </option>
    <option value="Delhi">Delhi</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-300 font-medium mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-all duration-200"
            >
              Save Address
            </button>
          </div>
        </form>
         {/* Use Old Address Button */}
         {userAddress?.address && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full sm:w-1/2 py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition-all duration-200"
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
