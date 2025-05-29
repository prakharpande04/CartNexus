import React, {useState, useEffect} from 'react'
import './styles/Profile.css'
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import Loader from '../components/Loader'; // Assuming you have a Loader component

function Profile() {
  const userId = getCookie('userId');
  const initialUserData = {
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    avatar: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  };

  const [userData, setUserData] = useState(initialUserData);
  const [personalDetails, setPersonalDetails] = useState(initialUserData);
  const [addressDetails, setAddressDetails] = useState(initialUserData.address);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  // Active tab state
  const [activeTab, setActiveTab] = useState('personal');

  const handleProfileUpdate = (e) => {
  setUpdating(true);
  e.preventDefault();
  setUserData((prev) => ({
    ...prev,
    ...personalDetails,
  }));

  // Here you would typically send the updated personal details to your backend
  const response = axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`, personalDetails);
  console.log("Personal details updated:", response.data);
  setUpdating(false);
};

const handleAddressUpdate = (e) => {
  setUpdating(true);
  e.preventDefault();
  setUserData((prev) => ({
    ...prev,
    address: addressDetails,
  }));

  const response = axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/address/${userId}`, addressDetails);
  console.log("Address updated:", response.data);
  setUpdating(false);
};

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = async () => {
      const fetchedData = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/login/${userId}`); // Replace with your API endpoint
      const { user, address } = fetchedData.data;
      console.log("Fetched user data:", user, address); 

      const mergedData = {
        userId: user.userId || '',
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || '',
        avatar: user.avatar || '',
        address: {
          addressLine1: address.addressLine1 || '',
          addressLine2: address.addressLine2 || '',
          city: address.city || '',
          state: address.state || '',
          zip: address.zip || '',
          country: address.country || ''
        }
      };
      setUserData(mergedData);

      setPersonalDetails({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || ''
      });

      setAddressDetails({
        addressLine1: address.addressLine1 || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        zip: address.zip || '',
        country: address.country || ''
      });
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    loading ? <Loader /> :
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-start p-4 text-black">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 underline underline-offset-4 decoration-blue-400">
        Profile
      </h1>

      <br /><br />

      <div className="w-4/5 flex flex-row justify-between h-auto">
        <div className="w-1/4 profile-sidebar flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-red-300 mr-4">
          <img
            src={userData.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-lg border-4 object-cover shadow-sm"
          />
          <h2 className="text-xl font-bold mt-4 mb-6 text-gray-800">{userData.fullName}</h2>

          <nav className="w-full flex flex-col gap-2">
            {['personal', 'address'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-lg text-left transition font-medium ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-blue-100 text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Details
              </button>
            ))}
          </nav>
        </div>

        <div className="w-7/10 profile-main flex flex-col p-6 rounded-xl bg-white shadow-lg">
          {activeTab === 'personal' && (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={personalDetails.fullName}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={personalDetails.email}
                  readOnly
                  className="input-field bg-gray-100 cursor-not-allowed"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={personalDetails.phone}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Gender"
                  value={personalDetails.gender}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, gender: e.target.value })}
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-fit self-end"
              >
                Update Profile
              </button>
            </form>
          )}

          {activeTab === 'address' && (
            
            <form onSubmit={handleAddressUpdate} className="space-y-4">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Address Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={addressDetails.addressLine1}
                  onChange={(e) => setAddressDetails({ ...addressDetails, addressLine1: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Address Line 2"
                  value={addressDetails.addressLine2}
                  onChange={(e) => setAddressDetails({ ...addressDetails, addressLine2: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={addressDetails.city}
                  onChange={(e) => setAddressDetails({ ...addressDetails, city: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={addressDetails.state}
                  onChange={(e) => setAddressDetails({ ...addressDetails, state: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={addressDetails.zip}
                  onChange={(e) => setAddressDetails({ ...addressDetails, zip: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={addressDetails.country}
                  onChange={(e) => setAddressDetails({ ...addressDetails, country: e.target.value })}
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-fit self-end"
              >
                Update Address
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile