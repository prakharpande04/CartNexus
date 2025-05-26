import React, {useState} from 'react'
import './styles/Profile.css'

function Profile() {
  const [userData, setUserData] = useState({
    userId: 'prakharpande04',
    fullName: 'Prakhar Pande',
    email: 'pandeprakhar1801@gmail.com',
    phone: '8275711340',
    gender: 'Male',
    dob: '2024-01-18',
    address: {
      addressLine1: '1012, Ashirwad Nagar',
      addressLine2: 'Near NIT Market',
      city: 'Nagpur',
      state: 'Maharashtra',
      zip: '440024',
      country: 'India'
    },
    cardName: 'Prakhar Sanjeev Pande',
    cardNumber: '4287 8712 3658 1234',
    expiry: '09/30',
    cvv: '785',
  });

  // Separate states for form inputs
  const [personalDetails, setPersonalDetails] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    gender: userData.gender,
    dob: userData.dob,
  });

  const [addressDetails, setAddressDetails] = useState(userData.address);

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: userData.cardName,
    cardNumber: userData.cardNumber,
    expiry: userData.expiry,
    cvv: userData.cvv,
  });


  // Active tab state
  const [activeTab, setActiveTab] = useState('personal');

  const handleProfileUpdate = (e) => {
  e.preventDefault();
  setUserData((prev) => ({
    ...prev,
    ...personalDetails,
  }));
  console.log("Personal details updated:", personalDetails);
};

const handleAddressUpdate = (e) => {
  e.preventDefault();
  setUserData((prev) => ({
    ...prev,
    address: addressDetails,
  }));
  console.log("Address updated:", addressDetails);
};

const handlePaymentUpdate = (e) => {
  e.preventDefault();
  setUserData((prev) => ({
    ...prev,
    ...paymentDetails,
  }));
  console.log("Payment details updated:", paymentDetails);
};


  return (
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
          <h2 className="text-xl font-bold mt-4 text-gray-800">{userData.fullName}</h2>
          <h4 className="text-sm text-gray-500 mb-6">@{userData.userId}</h4>

          <nav className="w-full flex flex-col gap-2">
            {['personal', 'address', 'payment'].map((tab) => (
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
                  onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                  className="input-field"
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
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={personalDetails.dob}
                  onChange={(e) => setPersonalDetails({ ...personalDetails, dob: e.target.value })}
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
            <form onSubmit={handleAddressUpdate} className="space-y-4 mt-6">
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

          {activeTab === 'payment' && (
            <form onSubmit={handlePaymentUpdate} className="space-y-4 mt-6">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Card Name"
                  value={paymentDetails.cardName}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={paymentDetails.expiry}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                  className="input-field"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 w-fit self-end"
              >
                Update Payment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile