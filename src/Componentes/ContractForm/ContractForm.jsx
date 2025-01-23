// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Butten from "./Butten";

const ContractForm = () => {

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    state: "",
    message: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    // Fetch countries on component mount
    const fatchCondries = () => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
    }
    fatchCondries();
  }, [countries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: "" });

    // Fetch states for the selected country
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: selectedCountry,
      })
      .then((response) => {
        console.log("state", response.data.data.states);
        setStates(response.data.data.states);
      })
      .catch((error) => console.error("Error fetching states:", error));
  };



  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
      setErrors({});
    }
  };

  return (
<div className="contractForm w-full min-h-screen bg-gray-500 text-black flex flex-col items-start px-20">
  <h1 className="text-3xl font-bold p-4 text-white ">Contact Form</h1>
  <form onSubmit={handleSubmit} className="w-[30vw] space-y-4 bg-gray-200 p-6 rounded shadow-md mt-5">
    {/* Full Name */}
    <div className="form-group">
      <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name:</label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        value={formData.fullname}
        onChange={handleInputChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
      {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname}</span>}
    </div>

    {/* Gender */}
    <div className="form-group">
      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        required
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      >
        <option value="" disabled>-- Select Gender --</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
    </div>

    {/* Phone Number */}
    <div className="form-group">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
      <input
        type="number"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
      {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
    </div>

    {/* Email */}
    <div className="form-group">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
    </div>

    {/* Address */}
    <div className="form-group">
      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      ></textarea>
      {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
    </div>

    {/* Country */}
    <div className="form-group">
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
      <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.country} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
      {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
    </div>

    {/* State */}
    <div className="form-group">
      <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
      <select
        id="state"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      >
        <option value="">Select a state</option>
        {states.map((state) => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
    </div>

    {/* Message */}
    <div className="form-group">
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message:</label>
      <textarea
        name="message"
        rows="5"
        cols="10"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Write your message here..."
        required
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
    </div>

    {/* Submit Button */}
    <Butten />
  </form>


 {/* result  */}
  {submittedData && (
    <div className="submission-data mt-8 bg-gray-100 p-4 rounded shadow-md w-[30vw] pb-20">
      <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
      {Object.entries(submittedData).map(([key, value]) => (
        <p key={key}>
          <strong className="capitalize">{key}:</strong> {value}
        </p>
      ))}
    </div>
  )}
</div>

  );
};

export default ContractForm;
