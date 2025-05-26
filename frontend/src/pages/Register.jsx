import React, { useState } from 'react';
const steps = ['Personal Info', 'Account Details', 'Address Info'];
import { Autocomplete, TextField } from '@mui/material';


function Register() {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    userId: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setRegistrationData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setRegistrationData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateStep = () => {
    let tempErrors = {};

    if (step === 1) {
      if (!registrationData.userId.trim()) tempErrors.userId = 'User ID is required';
      if (!registrationData.fullName.trim()) tempErrors.fullName = 'Full name is required';
      if (!registrationData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = 'Valid email required';
      if (!registrationData.phone.match(/^\d{10}$/)) tempErrors.phone = '10-digit phone number required';
      if (!registrationData.gender) tempErrors.gender = 'Gender required';
      if (!registrationData.dob) tempErrors.dob = 'Date of birth required';
    }

    if (step === 2) {
      const a = registrationData.address;
      if (!a.addressLine1.trim()) tempErrors.addressLine1 = 'Address Line 1 required';
      if (!a.city.trim()) tempErrors.city = 'City required';
      if (!a.state.trim()) tempErrors.state = 'State required';
      if (!a.zip.trim()) tempErrors.zip = 'ZIP Code required';
      if (!a.country.trim()) tempErrors.country = 'Country required';
    }

    if (step === 3) {
      if (!registrationData.cardName.trim()) tempErrors.cardName = 'Cardholder name required';
      if (!registrationData.cardNumber.match(/^\d{16}$/)) tempErrors.cardNumber = '16-digit card number required';
      if (!registrationData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) tempErrors.expiry = 'Expiry must be MM/YY';
      if (!registrationData.cvv.match(/^\d{3}$/)) tempErrors.cvv = '3-digit CVV required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log('Submitted Data:', registrationData);
      alert('Registration successful!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-xl font-semibold">Step {step} of 3</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <>
            <input name="userId" placeholder="User ID" value={registrationData.userId} onChange={handleChange} className="inputClass" />
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}

            <input name="fullName" placeholder="Full Name" value={registrationData.fullName} onChange={handleChange} className="inputClass" />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

            <input name="email" placeholder="Email" value={registrationData.email} onChange={handleChange} className="inputClass" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input name="phone" placeholder="Phone" value={registrationData.phone} onChange={handleChange} className="inputClass" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            <select name="gender" value={registrationData.gender} onChange={handleChange} className="inputClass">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

            <input type="date" name="dob" value={registrationData.dob} onChange={handleChange} className="inputClass" />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </>
        )}

        {step === 2 && (
          <>
            <input name="address.addressLine1" placeholder="Address Line 1" value={registrationData.address.addressLine1} onChange={handleChange} className="inputClass" />
            {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}

            <input name="address.addressLine2" placeholder="Address Line 2" value={registrationData.address.addressLine2} onChange={handleChange} className="inputClass" />

            <input name="address.city" placeholder="City" value={registrationData.address.city} onChange={handleChange} className="inputClass" />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}

            <input name="address.state" placeholder="State" value={registrationData.address.state} onChange={handleChange} className="inputClass" />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

            <input name="address.zip" placeholder="ZIP Code" value={registrationData.address.zip} onChange={handleChange} className="inputClass" />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}

            <input name="address.country" placeholder="Country" value={registrationData.address.country} onChange={handleChange} className="inputClass" />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </>
        )}

        {step === 3 && (
          <>
            <input name="cardName" placeholder="Cardholder Name" value={registrationData.cardName} onChange={handleChange} className="inputClass" />
            {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}

            <input name="cardNumber" placeholder="Card Number" value={registrationData.cardNumber} onChange={handleChange} className="inputClass" />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

            <input name="expiry" placeholder="MM/YY" value={registrationData.expiry} onChange={handleChange} className="inputClass" />
            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}

            <input name="cvv" placeholder="CVV" value={registrationData.cvv} onChange={handleChange} className="inputClass" />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">Back</button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
          ) : (
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;