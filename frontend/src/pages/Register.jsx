import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
const steps = ['Personal Info', 'Address Info', 'Card Info'];

const Register = () => {
  const { user} = useAuth0();

  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    userId: user?.sub || '', 
    fullName: user?.name || '', 
    email: user?.email || '', 
    phone: '', 
    gender: '', 
    dob: '',
    addressLine1: '', 
    addressLine2: '', 
    city: '', 
    state: '', 
    zip: '', 
    country: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (step === 1) {
      if (!data.userId) err.userId = 'Required';
      if (!data.fullName) err.fullName = 'Required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = 'Invalid email';
      if (!/^\d{10}$/.test(data.phone)) err.phone = 'Invalid phone';
      if (!data.gender) err.gender = 'Select gender';
      if (!data.dob) err.dob = 'Required';
    } else if (step === 2) {
      if (!data.addressLine1) err.addressLine1 = 'Required';
      if (!data.city) err.city = 'Required';
      if (!data.state) err.state = 'Required';
      if (!data.zip) err.zip = 'Required';
      if (!data.country) err.country = 'Required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const nextStep = () => { if (validate()) setStep(step + 1); };
  const prevStep = () => setStep(step - 1);

  const submitForm = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(data);

      await axios.get(`${import.meta.env.VITE_API_BASE_URL}`)
      .then(response => {
        console.log('API is running:', response.data);
      })
      .catch(error => {
        console.error('There was an error connecting to the API!', error);
      });

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, data)
        .then(response => {
          console.log('Registration successful:', response.data);
          alert('Form submitted successfully!');
        })
        .catch(error => {
          console.error('There was an error registering!', error);
        }); 
    }
  };

  return (
    <div className="min-w-2xl mx-auto mt-23 px-6 py-8 bg-white rounded-2xl shadow-lg text-black">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-700">Step {step} of 2</h2>
          <p className="text-sm text-gray-500">{steps[step - 1]}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={submitForm} className="space-y-4">
        {step === 1 && (
          <>
            <Input label="User ID" name="userId" value={data.userId} onChange={handleChange} error={errors.userId} readOnly disabled/>
            <Input label="Full Name" name="fullName" value={data.fullName} onChange={handleChange} error={errors.fullName} />
            <Input label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <Input label="Phone" name="phone" value={data.phone} onChange={handleChange} error={errors.phone} />
            <Select label="Gender" name="gender" value={data.gender} onChange={handleChange} error={errors.gender} options={['Male', 'Female', 'Other']} />
            <Input label="Date of Birth" name="dob" type="date" value={data.dob} onChange={handleChange} error={errors.dob} />
          </>
        )}

        {step === 2 && (
          <>
            <Input label="Address Line 1" name="addressLine1" value={data.addressLine1} onChange={handleChange} error={errors.addressLine1} />
            <Input label="Address Line 2" name="addressLine2" value={data.addressLine2} onChange={handleChange} />
            <Input label="City" name="city" value={data.city} onChange={handleChange} error={errors.city} />
            <Input label="State" name="state" value={data.state} onChange={handleChange} error={errors.state} />
            <Input label="ZIP" name="zip" value={data.zip} onChange={handleChange} error={errors.zip} />
            <Input label="Country" name="country" value={data.country} onChange={handleChange} error={errors.country} />
          </>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">
              Back
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={nextStep} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
              Next
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
            onSubmit={submitForm}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, value, onChange, error, type = 'text' }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Select = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Register;
