import { useState, useEffect } from "react"
import axios from "axios"
import { getCookie } from "../utils/cookie"

function Profile() {
  const userId = getCookie("userId")
  const initialUserData = {
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    avatar: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  }

  const [userData, setUserData] = useState(initialUserData)
  const [personalDetails, setPersonalDetails] = useState(initialUserData)
  const [addressDetails, setAddressDetails] = useState(initialUserData.address)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleProfileUpdate = async (e) => {
    setUpdating(true)
    e.preventDefault()
    try {
      setUserData((prev) => ({
        ...prev,
        ...personalDetails,
      }))

      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`, personalDetails)
      console.log("Personal details updated:", response.data)
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setUpdating(false)
    }
  }

  const handleAddressUpdate = async (e) => {
    setUpdating(true)
    e.preventDefault()
    try {
      setUserData((prev) => ({
        ...prev,
        address: addressDetails,
      }))

      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/address/${userId}`, addressDetails)
      console.log("Address updated:", response.data)
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      console.error("Error updating address:", error)
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedData = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/login/${userId}`)
        const { user, address } = fetchedData.data
        console.log("Fetched user data:", user, address)

        const mergedData = {
          userId: user.userId || "",
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "",
          avatar: user.avatar || "",
          address: {
            addressLine1: address.addressLine1 || "",
            addressLine2: address.addressLine2 || "",
            city: address.city || "",
            state: address.state || "",
            zip: address.zip || "",
            country: address.country || "",
          },
        }
        setUserData(mergedData)

        setPersonalDetails({
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          gender: user.gender || "",
        })

        setAddressDetails({
          addressLine1: address.addressLine1 || "",
          addressLine2: address.addressLine2 || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          country: address.country || "",
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "personal", name: "Personal Details", icon: "👤" },
    { id: "address", name: "Address Details", icon: "📍" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-400 text-lg">Manage your personal information and preferences</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Success Message */}
        {updateSuccess && (
          <div className="fixed top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Profile updated successfully!
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sticky top-8">
              {/* Avatar Section */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 p-1 shadow-xl">
                    <img
                      src={userData.avatar || "/placeholder.svg?height=128&width=128"}
                      alt="Profile Avatar"
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mt-4 mb-2">{userData.fullName || "User Name"}</h2>
                <p className="text-gray-400 text-sm">{userData.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-400/50 text-white shadow-lg"
                        : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                    {activeTab === tab.id && (
                      <svg className="w-5 h-5 ml-auto text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
              {activeTab === "personal" && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                      <p className="text-gray-400">Update your personal details and preferences</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={personalDetails.fullName}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={personalDetails.email}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-xl text-gray-400 cursor-not-allowed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={personalDetails.phone}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Gender</label>
                      <select
                        value={personalDetails.gender}
                        onChange={(e) => setPersonalDetails({ ...personalDetails, gender: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      >
                        <option value="" className="bg-slate-800">
                          Select Gender
                        </option>
                        <option value="male" className="bg-slate-800">
                          Male
                        </option>
                        <option value="female" className="bg-slate-800">
                          Female
                        </option>
                        <option value="other" className="bg-slate-800">
                          Other
                        </option>
                        <option value="prefer-not-to-say" className="bg-slate-800">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={updating}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update Profile
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "address" && (
                <form onSubmit={handleAddressUpdate} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Address Information</h2>
                      <p className="text-gray-400">Manage your shipping and billing addresses</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">Address Line 1</label>
                      <input
                        type="text"
                        placeholder="Street address, P.O. box, company name"
                        value={addressDetails.addressLine1}
                        onChange={(e) => setAddressDetails({ ...addressDetails, addressLine1: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">Address Line 2</label>
                      <input
                        type="text"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        value={addressDetails.addressLine2}
                        onChange={(e) => setAddressDetails({ ...addressDetails, addressLine2: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">City</label>
                      <input
                        type="text"
                        placeholder="Enter your city"
                        value={addressDetails.city}
                        onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">State/Province</label>
                      <input
                        type="text"
                        placeholder="Enter your state or province"
                        value={addressDetails.state}
                        onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">ZIP/Postal Code</label>
                      <input
                        type="text"
                        placeholder="Enter your ZIP or postal code"
                        value={addressDetails.zip}
                        onChange={(e) => setAddressDetails({ ...addressDetails, zip: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Country</label>
                      <input
                        type="text"
                        placeholder="Enter your country"
                        value={addressDetails.country}
                        onChange={(e) => setAddressDetails({ ...addressDetails, country: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      disabled={updating}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update Address
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Profile



// import React, {useState, useEffect} from 'react'
// import './styles/Profile.css'
// import axios from 'axios';
// import { getCookie } from '../utils/cookie';
// import Loader from '../components/Loader'; // Assuming you have a Loader component

// function Profile() {
//   const userId = getCookie('userId');
//   const initialUserData = {
//     userId: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     gender: '',
//     avatar: '',
//     address: {
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       state: '',
//       zip: '',
//       country: ''
//     }
//   };

//   const [userData, setUserData] = useState(initialUserData);
//   const [personalDetails, setPersonalDetails] = useState(initialUserData);
//   const [addressDetails, setAddressDetails] = useState(initialUserData.address);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);


//   // Active tab state
//   const [activeTab, setActiveTab] = useState('personal');

//   const handleProfileUpdate = (e) => {
//   setUpdating(true);
//   e.preventDefault();
//   setUserData((prev) => ({
//     ...prev,
//     ...personalDetails,
//   }));

//   // Here you would typically send the updated personal details to your backend
//   const response = axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`, personalDetails);
//   console.log("Personal details updated:", response.data);
//   setUpdating(false);
// };

// const handleAddressUpdate = (e) => {
//   setUpdating(true);
//   e.preventDefault();
//   setUserData((prev) => ({
//     ...prev,
//     address: addressDetails,
//   }));

//   const response = axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/address/${userId}`, addressDetails);
//   console.log("Address updated:", response.data);
//   setUpdating(false);
// };

//   useEffect(() => {
//     // Simulate fetching user data from an API
//     const fetchUserData = async () => {
//       const fetchedData = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/login/${userId}`); // Replace with your API endpoint
//       const { user, address } = fetchedData.data;
//       console.log("Fetched user data:", user, address); 

//       const mergedData = {
//         userId: user.userId || '',
//         fullName: user.fullName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         gender: user.gender || '',
//         avatar: user.avatar || '',
//         address: {
//           addressLine1: address.addressLine1 || '',
//           addressLine2: address.addressLine2 || '',
//           city: address.city || '',
//           state: address.state || '',
//           zip: address.zip || '',
//           country: address.country || ''
//         }
//       };
//       setUserData(mergedData);

//       setPersonalDetails({
//         fullName: user.fullName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         gender: user.gender || ''
//       });

//       setAddressDetails({
//         addressLine1: address.addressLine1 || '',
//         addressLine2: address.addressLine2 || '',
//         city: address.city || '',
//         state: address.state || '',
//         zip: address.zip || '',
//         country: address.country || ''
//       });
//       setLoading(false);
//     };

//     fetchUserData();
//   }, []);

//   return (
//     loading ? <Loader /> :
//     <div className="min-w-screen min-h-screen flex flex-col items-center justify-start p-4 text-black">
//       <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 underline underline-offset-4 decoration-blue-400">
//         Profile
//       </h1>

//       <br /><br />

//       <div className="w-4/5 flex flex-row justify-between h-auto">
//         <div className="w-1/4 profile-sidebar flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-red-300 mr-4">
//           <img
//             src={userData.avatar}
//             alt="Avatar"
//             className="w-32 h-32 rounded-lg border-4 object-cover shadow-sm"
//           />
//           <h2 className="text-xl font-bold mt-4 mb-6 text-gray-800">{userData.fullName}</h2>

//           <nav className="w-full flex flex-col gap-2">
//             {['personal', 'address'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`py-2 px-4 rounded-lg text-left transition font-medium ${
//                   activeTab === tab
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
//                 }`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)} Details
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="w-7/10 profile-main flex flex-col p-6 rounded-xl bg-white shadow-lg">
//           {activeTab === 'personal' && (
//             <form onSubmit={handleProfileUpdate} className="space-y-4">
//               <h2 className="text-xl font-bold mb-4 text-blue-700">Personal Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={personalDetails.fullName}
//                   onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={personalDetails.email}
//                   readOnly
//                   className="input-field bg-gray-100 cursor-not-allowed"
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   value={personalDetails.phone}
//                   onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Gender"
//                   value={personalDetails.gender}
//                   onChange={(e) => setPersonalDetails({ ...personalDetails, gender: e.target.value })}
//                   className="input-field"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-fit self-end"
//               >
//                 Update Profile
//               </button>
//             </form>
//           )}

//           {activeTab === 'address' && (
            
//             <form onSubmit={handleAddressUpdate} className="space-y-4">
//               <h2 className="text-xl font-bold mb-4 text-blue-700">Address Details</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Address Line 1"
//                   value={addressDetails.addressLine1}
//                   onChange={(e) => setAddressDetails({ ...addressDetails, addressLine1: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address Line 2"
//                   value={addressDetails.addressLine2}
//                   onChange={(e) => setAddressDetails({ ...addressDetails, addressLine2: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="text"
//                   placeholder="City"
//                   value={addressDetails.city}
//                   onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="text"
//                   placeholder="State"
//                   value={addressDetails.state}
//                   onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="text"
//                   placeholder="ZIP Code"
//                   value={addressDetails.zip}
//                   onChange={(e) => setAddressDetails({ ...addressDetails, zip: e.target.value })}
//                   className="input-field"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   value={addressDetails.country}
//                   onChange={(e) => setAddressDetails({ ...addressDetails, country: e.target.value })}
//                   className="input-field"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-fit self-end"
//               >
//                 Update Address
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile