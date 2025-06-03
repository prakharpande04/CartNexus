import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const steps = ["Personal Info", "Address Info"]

const Register = () => {
  const { user } = useAuth0()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  const [data, setData] = useState({
    userId: user?.sub || "",
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const err = {}
    if (step === 1) {
      if (!data.userId) err.userId = "Required"
      if (!data.fullName) err.fullName = "Required"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = "Invalid email"
      if (!/^\d{10}$/.test(data.phone)) err.phone = "Invalid phone"
      if (!data.gender) err.gender = "Select gender"
    } else if (step === 2) {
      if (!data.addressLine1) err.addressLine1 = "Required"
      if (!data.city) err.city = "Required"
      if (!data.state) err.state = "Required"
      if (!data.zip) err.zip = "Required"
      if (!data.country) err.country = "Required"
    }
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const nextStep = () => {
    if (validate()) setStep(step + 1)
  }
  const prevStep = () => setStep(step - 1)

  const submitForm = async (e) => {
    e.preventDefault()
    if (validate()) {
      setLoading(true)
      console.log(data)
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, data)
        console.log("Registration successful:", response.data)
        alert("Form submitted successfully!")
        setLoading(false)
        navigate("/dashboard")
      } catch (error) {
        console.error("There was an error registering!", error)
        setLoading(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Creating your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-lg">Complete your profile to get started</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{step}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Step {step} of 2</h2>
                    <p className="text-gray-400 text-sm">{steps[step - 1]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Progress</div>
                  <div className="text-lg font-bold text-white">{Math.round((step / 2) * 100)}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={submitForm} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Personal Information
                    </h3>
                    <p className="text-gray-400 text-sm">Tell us about yourself</p>
                  </div>

                  <Input
                    label="User ID"
                    name="userId"
                    value={data.userId}
                    onChange={handleChange}
                    error={errors.userId}
                    readOnly
                    disabled
                  />
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email address"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="Enter your 10-digit phone number"
                  />
                  <Select
                    label="Gender"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    error={errors.gender}
                    options={["Male", "Female", "Other", "Prefer not to say"]}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Address Information
                    </h3>
                    <p className="text-gray-400 text-sm">Where should we deliver your orders?</p>
                  </div>

                  <Input
                    label="Address Line 1"
                    name="addressLine1"
                    value={data.addressLine1}
                    onChange={handleChange}
                    error={errors.addressLine1}
                    placeholder="Street address, P.O. box, company name"
                  />
                  <Input
                    label="Address Line 2 (Optional)"
                    name="addressLine2"
                    value={data.addressLine2}
                    onChange={handleChange}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="City"
                      name="city"
                      value={data.city}
                      onChange={handleChange}
                      error={errors.city}
                      placeholder="Enter your city"
                    />
                    <Input
                      label="State/Province"
                      name="state"
                      value={data.state}
                      onChange={handleChange}
                      error={errors.state}
                      placeholder="Enter your state"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="ZIP/Postal Code"
                      name="zip"
                      value={data.zip}
                      onChange={handleChange}
                      error={errors.zip}
                      placeholder="Enter ZIP code"
                    />
                    <Input
                      label="Country"
                      name="country"
                      value={data.country}
                      onChange={handleChange}
                      error={errors.country}
                      placeholder="Enter your country"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Complete Registration
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/dashboard")}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Go to Dashboard
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Input = ({ label, name, value, onChange, error, type = "text", placeholder, readOnly, disabled }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 ${
        error ? "border-red-500/50 focus:ring-red-500/50" : "border-white/20"
      } ${
        disabled || readOnly
          ? "bg-gray-500/20 border-gray-500/30 text-gray-400 cursor-not-allowed"
          : "hover:border-white/30"
      }`}
    />
    {error && (
      <div className="flex items-center gap-2 text-red-400 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </div>
    )}
  </div>
)

const Select = ({ label, name, value, onChange, options, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 ${
        error ? "border-red-500/50 focus:ring-red-500/50" : "border-white/20 hover:border-white/30"
      }`}
    >
      <option value="" className="bg-slate-800 text-gray-300">
        Select an option
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-slate-800 text-white">
          {opt}
        </option>
      ))}
    </select>
    {error && (
      <div className="flex items-center gap-2 text-red-400 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </div>
    )}
  </div>
)

export default Register



// import React, { useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from 'axios';
// const steps = ['Personal Info', 'Address Info', 'Card Info'];
// import Loader from '../components/Loader'; // Assuming you have a Loader component
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const { user} = useAuth0();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);

//   const [data, setData] = useState({
//     userId: user?.sub || '', 
//     fullName: user?.name || '', 
//     email: user?.email || '', 
//     phone: '', 
//     gender: '',
//     addressLine1: '', 
//     addressLine2: '', 
//     city: '', 
//     state: '', 
//     zip: '', 
//     country: ''
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     let err = {};
//     if (step === 1) {
//       if (!data.userId) err.userId = 'Required';
//       if (!data.fullName) err.fullName = 'Required';
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) err.email = 'Invalid email';
//       if (!/^\d{10}$/.test(data.phone)) err.phone = 'Invalid phone';
//       if (!data.gender) err.gender = 'Select gender';
//     } else if (step === 2) {
//       if (!data.addressLine1) err.addressLine1 = 'Required';
//       if (!data.city) err.city = 'Required';
//       if (!data.state) err.state = 'Required';
//       if (!data.zip) err.zip = 'Required';
//       if (!data.country) err.country = 'Required';
//     }
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const nextStep = () => { if (validate()) setStep(step + 1); };
//   const prevStep = () => setStep(step - 1);

//   const submitForm = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setLoading(true);
//       console.log(data);
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, data)
//         .then(response => {
//           console.log('Registration successful:', response.data);
//           alert('Form submitted successfully!');
//           setLoading(false);
//           navigate('/dashboard'); // Redirect to dashboard
//         })
//         .catch(error => {
//           console.error('There was an error registering!', error);
//         })
//     }
//   };

//   return (
//     loading ? <Loader /> :
//     <div className="min-w-2xl mx-100 mt-23 px-6 py-8 bg-white rounded-2xl shadow-lg text-black">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-semibold text-gray-700">Step {step} of 2</h2>
//           <p className="text-sm text-gray-500">{steps[step - 1]}</p>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div
//             className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
//             style={{ width: `${(step / 2) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       <form onSubmit={submitForm} className="space-y-4">
//         {step === 1 && (
//           <>
//             <Input label="User ID" name="userId" value={data.userId} onChange={handleChange} error={errors.userId} readOnly disabled/>
//             <Input label="Full Name" name="fullName" value={data.fullName} onChange={handleChange} error={errors.fullName} />
//             <Input label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
//             <Input label="Phone" name="phone" value={data.phone} onChange={handleChange} error={errors.phone} />
//             <Select label="Gender" name="gender" value={data.gender} onChange={handleChange} error={errors.gender} options={['Male', 'Female', 'Other']} />
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <Input label="Address Line 1" name="addressLine1" value={data.addressLine1} onChange={handleChange} error={errors.addressLine1} />
//             <Input label="Address Line 2" name="addressLine2" value={data.addressLine2} onChange={handleChange} />
//             <Input label="City" name="city" value={data.city} onChange={handleChange} error={errors.city} />
//             <Input label="State" name="state" value={data.state} onChange={handleChange} error={errors.state} />
//             <Input label="ZIP" name="zip" value={data.zip} onChange={handleChange} error={errors.zip} />
//             <Input label="Country" name="country" value={data.country} onChange={handleChange} error={errors.country} />
//           </>
//         )}

//         <div className="flex justify-between pt-4">
//           {step > 1 && (
//             <button type="button" onClick={prevStep} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">
//               Back
//             </button>
//           )}
//           {step < 2 ? (
//             <button type="button" onClick={nextStep} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
//               Next
//             </button>
//           ) : (
//             <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
//             onSubmit={submitForm}>
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// const Input = ({ label, name, value, onChange, error, type = 'text' }) => (
//   <div>
//     <label className="block mb-1 text-sm text-gray-700">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//     />
//     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//   </div>
// );

// const Select = ({ label, name, value, onChange, options, error }) => (
//   <div>
//     <label className="block mb-1 text-sm text-gray-700">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//     >
//       <option value="">Select</option>
//       {options.map((opt) => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//     {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//   </div>
// );

// export default Register;
