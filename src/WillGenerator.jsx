import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const WillGenerator = () => {
  const totalSteps = 20; // Add this constant for step tracking
  const [currentStep, setCurrentStep] = useState(1);
  
  // Your existing state structure
  const [formData, setFormData] = useState({
    // Testator Information
    testatorName: '',
    occupation: '',
    address: '',
    parish: '',
    prefix: '',
    suffix: '',
    gender: '',
  
    // Family Status
    maritalStatus: '',
    livingChildren: 'no',
    livingGrandchildren: 'no',
  
    // Spouse Information
    spouse: {
      fullName: '',
      relation: '',
      occupation: ''
    },

  
  
    // Children
    children: [],
    minorChildren: [], // Add this for minor children
    livingChildren: 'no',
  children: [],
  guardians: [], // Add this
  
    // Deceased Family Members
    hasDeceasedFamilyMembers: 'no',
    deceasedFamilyMembers: [],
  
    // Beneficiaries
    additionalBeneficiaries: [],
    otherBeneficiaries: 'none',

     // ... other state
  children: [],
  additionalBeneficiaries: [],
  possessions: [],
  
    // Guardians
    guardians: [],
  
    executors: [
      { name: '', relationship: '', email: '', occupation: '', address: '', parish: '' },
      { name: '', relationship: '', email: '', occupation: '', address: '', parish: '' }
    ],
    witnesses: [
      { name: '', email: '', address: '', parish: '', occupation: '' },
      { name: '', email: '', address: '', parish: '',  occupation: '' }
    ],

    // Possessions
    selectedPossession: '',
    properties: [],
    shares: [],
    insurance: [],
    bankAccounts: [],
    motorVehicles: [],
    unpaidSalary: {
      employer: '',
      employerAddress: '',
      beneficiary: ''
    },
    nhtContributions: {
      nhtNumber: '',
      taxNumber: '',
      beneficiary: ''
    },
    jewellery: {
      description: '',
      beneficiary: ''
    },
    furniture: {
      beneficiary: ''
    },
    paintings: {
      beneficiary: ''
    },
    firearm: {
      serialNumber: '',
      licenseNumber: '',
      beneficiary: ''
    },

    selectedPossession: '',
    possessions: [],
  
    // Residual Estate
    residualEstate: {
      beneficiaries: []
    },
     

  livingGrandchildren: 'no',
  grandchildrenInclusion: '',
  grandchildren: [],
   
    // Bequests
    bequests: [],
    bequests: [],
    possessions: [],
    children: [],
    additionalBeneficiaries: [],
  
    // Funeral Arrangements
    funeralDetails: '',
    clothingDetails: '',
    remainsDetails: '',
    songs: ['', '', ''],
  
    // Witnesses and Signature
    witnesses: [
      { name: '', address: '', occupation: '' },
      { name: '', address: '', occupation: '' }
    ],
    signatureDate: ''
  });

   
  const handleGrandchildChange = (e, index, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      grandchildren: prev.grandchildren.map((gc, i) => 
        i === index ? { ...gc, [field]: value } : gc
      )
    }));
  };
    
     

  
  const GrandchildrenSection = ({ formData, handleInputChange, removeGrandchild, addGrandchild }) => {
    if (formData.livingGrandchildren !== 'yes') return null;
  
    return (
      <div className="mt-6">
        <div className="mb-4">
          <label className="block mb-4 text-gray-600">
            Identifying all of your grandchildren is optional. It allows you to choose them later
            in this wizard if you decide to leave them some of your assets. If you do not plan
            on leaving anything specific to your grandchildren, you can simply skip this page.
          </label>
          
          <div className="mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="grandchildrenInclusion"
                value="notLeaving"
                checked={formData.grandchildrenInclusion === 'notLeaving'}
                onChange={(e) => handleInputChange(e, null, 'grandchildrenInclusion')}
                className="form-radio"
              />
              <span>I have grandchildren, but I am NOT leaving them something directly in my Will</span>
            </label>
          </div>
  
          <div className="mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="grandchildrenInclusion"
                value="mightLeave"
                checked={formData.grandchildrenInclusion === 'mightLeave'}
                onChange={(e) => handleInputChange(e, null, 'grandchildrenInclusion')}
                className="form-radio"
              />
              <span>I have grandchildren, and I MIGHT OR MIGHT NOT leave them something in my Will</span>
            </label>
          </div>
        </div>
  
        {formData.grandchildrenInclusion === 'mightLeave' && (
          <>
            {formData.grandchildren.map((grandchild, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-sm space-y-4 mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  {index === 0 ? "Grandchild's" : `#${index + 1} Grandchild's`} Details
                </h3>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Grandchild's Full Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={grandchild.fullName || ''}
                    onChange={(e) => handleInputChange(e, 'grandchildren', 'fullName', index)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Relationship
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`relationship-${index}`}
                        value="grandson"
                        checked={grandchild.relationship === 'grandson'}
                        onChange={(e) => handleInputChange(e, 'grandchildren', 'relationship', index)}
                        className="mr-2"
                      />
                      Grand Son
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`relationship-${index}`}
                        value="granddaughter"
                        checked={grandchild.relationship === 'granddaughter'}
                        onChange={(e) => handleInputChange(e, 'grandchildren', 'relationship', index)}
                        className="mr-2"
                      />
                      Grand Daughter
                    </label>
                  </div>
                </div>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={grandchild.dateOfBirth || ''}
                    onChange={(e) => handleInputChange(e, 'grandchildren', 'dateOfBirth', index)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={grandchild.email || ''}
                    onChange={(e) => handleInputChange(e, 'grandchildren', 'email', index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={grandchild.occupation || ''}
                    onChange={(e) => handleInputChange(e, 'grandchildren', 'occupation', index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={grandchild.address || ''}
                    onChange={(e) => handleInputChange(e, 'grandchildren', 'address', index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
  
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Parish
                  </label>
                  <input
                    type="text"
                    value={grandchild.parish || ''}
                    onChange={(e) => handleInputChange(e, 'grandchildren', 'parish', index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
  
                <button
                  type="button"
                  onClick={() => removeGrandchild(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove Grandchild
                </button>
              </div>
            ))}
  
            <button
              type="button"
              onClick={addGrandchild}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Grandchild
            </button>
          </>
        )}
      </div>
    );
  };
  

 
  const handleInputChange = (e, section, field, index = null) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setFormData(prev => {
      const newData = { ...prev };
      
      if (section && index !== null) {
        // Handle array updates
        if (!Array.isArray(newData[section])) {
          newData[section] = [];
        }
        
        if (!newData[section][index]) {
          newData[section][index] = {};
        }
        
        newData[section] = [
          ...newData[section].slice(0, index),
          {
            ...newData[section][index],
            [field]: value
          },
          ...newData[section].slice(index + 1)
        ];
      } else if (section) {
        // Handle nested object updates
        if (!newData[section]) {
          newData[section] = {};
        }
        newData[section] = {
          ...newData[section],
          [field]: value
        };
      } else {
        // Handle direct updates
        newData[field] = value;
      }
      
      return newData;
    });
  };
  
  
    
     


  
  const BeneficiarySelect = ({ possession, index, onUpdate }) => {
    // Combine all possible beneficiaries (children, grandchildren, and additional beneficiaries)
    const allBeneficiaries = [
      // Children as beneficiaries
      ...(formData.children || []).map(child => ({
        id: `child-${child.fullName}`,
        fullName: child.fullName,
        type: 'Child',
        relationship: child.relationship,
        email: child.email,
        address: child.address,
        parish: child.parish,
        occupation: child.occupation
      })),
      // Grandchildren as beneficiaries
      ...(formData.grandchildren || []).map(grandchild => ({
        id: `grandchild-${grandchild.fullName}`,
        fullName: grandchild.fullName,
        type: 'Grandchild',
        relationship: grandchild.relationship,
        email: grandchild.email,
        address: grandchild.address,
        parish: grandchild.parish,
        occupation: grandchild.occupation
      })),
      // Additional beneficiaries
      ...(formData.additionalBeneficiaries || []).map((ben, idx) => ({
        id: `other-${ben.fullName}-${idx}`,
        fullName: ben.fullName,
        type: ben.type,
        relationship: ben.relationship,
        email: ben.email,
        address: ben.address,
        parish: ben.parish
      }))
    ];
  
    return (
      <div className="space-y-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Add Beneficiary
        </label>
        <div className="flex space-x-2">
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              const selectedBeneficiary = allBeneficiaries.find(b => b.id === e.target.value);
              if (selectedBeneficiary) {
                const updatedBeneficiaries = [
                  ...(possession.beneficiaries || []),
                  {
                    ...selectedBeneficiary,
                    sharePercentage: 0
                  }
                ];
  
                onUpdate(index, {
                  ...possession,
                  beneficiaries: updatedBeneficiaries
                });
              }
              e.target.value = ''; // Reset select after adding
            }}
            value=""
          >
            <option value="">Select a beneficiary</option>
            
            {/* Children Group */}
            {formData.children?.length > 0 && (
              <optgroup label="Children">
                {formData.children.map((child, idx) => {
                  const isSelected = possession.beneficiaries?.some(b => b.id === `child-${child.fullName}`);
                  if (!isSelected) {
                    return (
                      <option key={`child-${idx}`} value={`child-${child.fullName}`}>
                        {child.fullName} (Child - {child.relationship})
                      </option>
                    );
                  }
                  return null;
                })}
              </optgroup>
            )}
  
            {/* Grandchildren Group */}
            {formData.grandchildren?.length > 0 && (
              <optgroup label="Grandchildren">
                {formData.grandchildren.map((grandchild, idx) => {
                  const isSelected = possession.beneficiaries?.some(b => b.id === `grandchild-${grandchild.fullName}`);
                  if (!isSelected) {
                    return (
                      <option key={`grandchild-${idx}`} value={`grandchild-${grandchild.fullName}`}>
                        {grandchild.fullName} (Grandchild - {grandchild.relationship})
                      </option>
                    );
                  }
                  return null;
                })}
              </optgroup>
            )}
            
            {/* Additional Beneficiaries Group */}
            {formData.additionalBeneficiaries?.length > 0 && (
              <optgroup label="Other Beneficiaries">
                {formData.additionalBeneficiaries.map((ben, idx) => {
                  const isSelected = possession.beneficiaries?.some(b => b.id === `other-${ben.fullName}-${idx}`);
                  if (!isSelected) {
                    return (
                      <option key={`ben-${idx}`} value={`other-${ben.fullName}-${idx}`}>
                        {ben.fullName} ({ben.type})
                      </option>
                    );
                  }
                  return null;
                })}
              </optgroup>
            )}
          </select>
        </div>
  
        {/* Display selected beneficiaries */}
        {possession.beneficiaries?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-4">Selected Beneficiaries:</h4>
            <div className="space-y-4">
              {possession.beneficiaries.map((beneficiary, idx) => (
                <div key={beneficiary.id} className="p-4 bg-gray-50 rounded-lg relative border">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdate(index, {
                        ...possession,
                        beneficiaries: possession.beneficiaries.filter((_, i) => i !== idx)
                      });
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <span className="font-medium">Name:</span> {beneficiary.fullName}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {beneficiary.type}
                    </div>
                    <div>
                      <span className="font-medium">Relationship:</span> {beneficiary.relationship}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {beneficiary.email}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {beneficiary.address}
                    </div>
                    {beneficiary.parish && (
                      <div>
                        <span className="font-medium">Parish:</span> {beneficiary.parish}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Share Percentage:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={beneficiary.sharePercentage || 0}
                        onChange={(e) => {
                          const updatedBeneficiaries = possession.beneficiaries.map((b, i) =>
                            i === idx ? { ...b, sharePercentage: parseFloat(e.target.value) || 0 } : b
                          );
                          onUpdate(index, {
                            ...possession,
                            beneficiaries: updatedBeneficiaries
                          });
                        }}
                        className="shadow appearance-none border rounded w-24 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <span>%</span>
                    </div>
                  </div>
                </div>
              ))}
  
              {/* Show total share percentage */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="font-medium">
                  Total Share: {possession.beneficiaries.reduce((total, ben) => total + (ben.sharePercentage || 0), 0)}%
                </div>
                {possession.beneficiaries.reduce((total, ben) => total + (ben.sharePercentage || 0), 0) !== 100 && (
                  <div className="text-red-500 text-sm mt-1">
                    Note: Total share percentage should equal 100%
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }


     


       
  const SaveDetailsSection = ({ handleSave }) => {
    return (
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
            Secure Your Progress
          </h2>
  
          {/* Main Save Card */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Save Your Will Details</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Secure all your important information with just one click. You can always come back and modify it later.
              </p>
            </div>
  
            {/* Save Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Local Save */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Quick Save</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Save your progress locally in your browser
                </p>
                <button
                  onClick={() => handleSave('local')}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  Save Locally
                </button>
              </div>
  
              {/* Download JSON */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-800 mb-3">Download Backup</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Download your data as a backup file
                </p>
                <button
                  onClick={() => handleSave('download')}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Backup
                </button>
              </div>
            </div>
          </div>
  
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Storage</h3>
              <p className="text-gray-600 text-sm">Your data is securely stored and encrypted</p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Updates</h3>
              <p className="text-gray-600 text-sm">Return anytime to modify your details</p>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Backup Protection</h3>
              <p className="text-gray-600 text-sm">Download a copy for safekeeping</p>
            </div>
          </div>
  
          {/* Important Notice */}
          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Remember to save your progress regularly. Your information is valuable - keep it safe!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

   
  const handleSave = () => {
    try {
      // Save to localStorage
      localStorage.setItem('willFormData', JSON.stringify(formData));
      alert('Progress saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save progress. Please try again.');
    }
  };
    



    
  const addGrandchild = () => {
    setFormData(prev => ({
      ...prev,
      grandchildren: [
        ...prev.grandchildren,
        {
          fullName: '',
          relationship: '',
          dateOfBirth: '',
          email: '',
          occupation: '',
          address: '',
          parish: ''
        }
      ]
    }));
  };
  
  const removeGrandchild = (index) => {
    setFormData(prev => ({
      ...prev,
      grandchildren: prev.grandchildren.filter((_, i) => i !== index)
    }));
  };
   

    

   
  
     
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const navigateForward = () => {
    let nextStep = currentStep + 1;
  
    // Handle guardian section (Step 8)
    if (currentStep === 8) {
      const minorChildren = formData.children.filter(child => 
        child.dateOfBirth && calculateAge(child.dateOfBirth) < 18
      );
      
      // Skip guardian section if:
      // - No minor children AND no grandchildren
      // OR
      // - No living children
      if ((minorChildren.length === 0 && formData.livingGrandchildren !== 'yes') || 
          formData.livingChildren === 'no') {
        nextStep = 10;
      }
    } 
    // Handle possession section navigation
    else if (currentStep === 11) {
      // Skip individual possession steps since they're handled in Add Possession
      nextStep = 17;
    }
    // Skip possession-specific steps
    else if ([12, 13, 14, 15, 16].includes(currentStep)) {
      nextStep = 17;
    }
  
    // Ensure we don't exceed total steps
    setCurrentStep(Math.min(totalSteps, nextStep));
  };
   
     





  

  const handlePreviousStep = () => {
    let prevStep = currentStep - 1;
  
    // Handle guardian section navigation
    if (currentStep === 9) {
      const minorChildren = formData.children.filter(child => 
        child.dateOfBirth && calculateAge(child.dateOfBirth) < 18
      );
      
      // Skip guardian details if no minor children or livingChildren is 'no'
      if ((minorChildren.length === 0 && formData.livingGrandchildren !== 'yes') || 
          formData.livingChildren === 'no') {
        prevStep = 7;
      }
    }
    
    // Handle possession section navigation
    else if (currentStep === 17) {
      // Go back to Add Possession step
      prevStep = 11;
    }
    // Skip possession-specific steps when going back
    else if ([12, 13, 14, 15, 16].includes(currentStep)) {
      prevStep = 11;
    }
  
    // Ensure we don't go below step 1
    setCurrentStep(Math.max(1, prevStep));
  };

     // create empty possesions //


     const createEmptyPossession = (type) => {
      // Base fields that all possession types will have
      const baseFields = {
        type,
        beneficiaries: [], // Array to hold multiple beneficiaries
        beneficiaryShares: {}, // Object to track share percentages
        totalShare: 0 // Track total share percentage
      };
    
      switch (type) {
        case 'Property':
          return {
            ...baseFields,
            address: '',
            parish: '',
            volume: '',
            folio: '',
            description: '',
            estimatedValue: '',
            titleDetails: '',
            propertyType: '', // residential, commercial, agricultural, etc.
            currentUsage: '',
            encumbrances: '', // any mortgages, liens, etc.
          };
    
        case 'Shares and Stocks':
          return {
            ...baseFields,
            company: '',
            country: '',
            exchange: '',
            accountNumber: '',
            numberOfShares: '',
            shareType: '',
            certificateNumbers: '',
            brokerDetails: '',
            currentValue: '',
            dividendInstructions: ''
          };
    
        case 'Insurance':
          return {
            ...baseFields,
            policyNumber: '',
            company: '',
            address: '',
            country: '',
            policyType: '',
            sumInsured: '',
            premiumStatus: '',
            maturityDate: '',
            nomineeDetails: '',
            insuranceAgentDetails: ''
          };
    
        case 'Bank Accounts':
          return {
            ...baseFields,
            accountNumber: '',
            bank: '',
            address: '',
            country: '',
            accountType: '', // savings, checking, fixed deposit, etc.
            currency: '',
            branchDetails: '',
            jointAccountDetails: '',
            bankContactInfo: '',
            onlineBankingAccess: false
          };
    
        case 'Motor Vehicle':
          return {
            ...baseFields,
            color: '',
            make: '',
            model: '',
            year: '',
            licensePlate: '',
            engineNumber: '',
            chassisNumber: '',
            registrationDetails: '',
            insuranceDetails: '',
            condition: '',
            currentMileage: '',
            serviceHistory: '',
            parkingLocation: '',
            modifications: ''
          };
    
        case 'Unpaid Salary':
          return {
            ...baseFields,
            employer: '',
            employerAddress: '',
            employmentId: '',
            salaryAmount: '',
            periodCovered: '',
            paymentFrequency: '',
            lastPaymentDate: '',
            employerContactPerson: '',
            employerPhone: '',
            employerEmail: ''
          };
    
        case 'NHT Contributions':
          return {
            ...baseFields,
            nhtNumber: '',
            taxNumber: '',
            contributionPeriod: '',
            totalContributions: '',
            lastContributionDate: '',
            refundStatus: '',
            benefitEligibility: '',
            mortgageDetails: '',
            contactPerson: '',
            applicationStatus: ''
          };
    
        case 'Jewellery':
          return {
            ...baseFields,
            description: '',
            itemType: '', // necklace, ring, watch, etc.
            material: '',
            weight: '',
            stones: '',
            appraisalValue: '',
            dateAcquired: '',
            location: '',
            insuranceDetails: '',
            specialInstructions: '',
            authenticityDocuments: ''
          };
    
        case 'Furniture':
          return {
            ...baseFields,
            description: '',
            location: '',
            itemList: [],
            condition: '',
            acquisitionDate: '',
            estimatedValue: '',
            specialInstructions: '',
            insuranceDetails: '',
            maintenanceRecords: '',
            historicalSignificance: ''
          };
    
        case 'Paintings':
          return {
            ...baseFields,
            description: '',
            artist: '',
            title: '',
            medium: '',
            dimensions: '',
            yearCreated: '',
            provenance: '',
            appraisalValue: '',
            location: '',
            condition: '',
            authenticityCertificate: '',
            exhibitionHistory: '',
            insuranceDetails: ''
          };
    
        case 'Firearm':
          return {
            ...baseFields,
            serialNumber: '',
            licenseNumber: '',
            make: '',
            model: '',
            caliber: '',
            type: '',
            purchaseDate: '',
            licenseExpiryDate: '',
            storageLocation: '',
            ammunitionDetails: '',
            maintenanceRecords: '',
            permitsAndCertifications: '',
            registrationStatus: ''
          };
    
        case 'Digital Assets':
          return {
            ...baseFields,
            assetType: '', // cryptocurrency, digital art, domain names, etc.
            platform: '',
            accountDetails: '',
            walletAddress: '',
            accessInstructions: '',
            estimatedValue: '',
            twoFactorAuthDetails: '',
            backupCodes: '',
            recoveryInstructions: ''
          };
    
        case 'Intellectual Property':
          return {
            ...baseFields,
            type: '', // patent, trademark, copyright, etc.
            registrationNumber: '',
            jurisdiction: '',
            expiryDate: '',
            rightsOwned: '',
            royaltyAgreements: '',
            licensingDetails: '',
            pendingApplications: '',
            associatedRevenue: ''
          };
    
        case 'Business Interests':
          return {
            ...baseFields,
            companyName: '',
            registrationNumber: '',
            businessType: '',
            ownershipPercentage: '',
            sharesCertificateNumbers: '',
            partnershipDetails: '',
            valuationDetails: '',
            successionPlan: '',
            keyContacts: '',
            operatingAgreements: ''
          };
    
        case 'Residual Estate':
          return {
            ...baseFields,
            description: '',
            estimatedValue: '',
            distributionInstructions: '',
            contingentBeneficiaries: [],
            specialConditions: '',
            executorInstructions: ''
          };
    
        default:
          return {
            ...baseFields,
            description: '',
            estimatedValue: '',
            location: '',
            additionalDetails: '',
            specialInstructions: ''
          };
      }
    };
    
    // Example usage:
    // const newProperty = createEmptyPossession('Property');
    // const newVehicle = createEmptyPossession('Motor Vehicle');


    const formatPossessionForPDF = (possession) => {
      const formatBeneficiaryDetails = (beneficiaries) => {
        if (!beneficiaries || beneficiaries.length === 0) return '';
        
        return beneficiaries.map(b => {
          const typeLabel = b.type === 'Grandchild' ? ` (${b.relationship})` : 
                           b.type === 'Child' ? ' (Child)' : '';
          
          return `${b.fullName}${typeLabel} of ${b.address}${b.parish ? `, ${b.parish}` : ''} ` +
                 `with a ${b.sharePercentage}% share`;
        }).join(' AND ');
      };
    
      const beneficiaryDetails = formatBeneficiaryDetails(possession.beneficiaries);
      const noBeneficiariesText = 'with no specified beneficiaries';
    
      switch (possession.type) {
        case 'Property':
          return `Property- situate at ${possession.address}, in the parish of ${possession.parish} ` +
                 `registered at Volume ${possession.volume} and Folio ${possession.folio} of the Register ` +
                 `Book of Titles to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Shares and Stocks':
          return `Shares in ${possession.company} held in ${possession.country} at ${possession.exchange} ` +
                 `in account numbered ${possession.accountNumber}, comprising ${possession.numberOfShares} shares ` +
                 `with certificate numbers ${possession.certificateNumbers} to be shared between ` +
                 `${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Insurance':
          return `Proceeds of insurance policy numbered ${possession.policyNumber}, held at ${possession.company} ` +
                 `located at ${possession.address}, ${possession.country}, being a ${possession.policyType} policy ` +
                 `with sum insured of ${possession.sumInsured} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Bank Accounts':
          return `Proceeds of ${possession.accountType || ''} account numbered ${possession.accountNumber}, ` +
                 `held at ${possession.bank} located at ${possession.address}, ${possession.country}, ` +
                 `in ${possession.currency || ''} currency to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Motor Vehicle':
          return `${possession.color} ${possession.year} ${possession.make} ${possession.model} Motor vehicle ` +
                 `bearing License plate number ${possession.licensePlate} and engine number ${possession.engineNumber} ` +
                 `and chassis number ${possession.chassisNumber}, currently located at ${possession.parkingLocation || ''} ` +
                 `to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Unpaid Salary':
          return `Unpaid salary and/or emoluments with my employer, ${possession.employer} ` +
                 `located at ${possession.employerAddress}, Employee ID: ${possession.employmentId || ''}, ` +
                 `covering the period ${possession.periodCovered || ''} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'NHT Contributions':
          return `Refund of National Housing Trust Contributions (NHT Number: ${possession.nhtNumber}, ` +
                 `Tax Number: ${possession.taxNumber}), with total contributions of ${possession.totalContributions || ''} ` +
                 `up to ${possession.lastContributionDate || ''} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Jewellery':
          return `Jewellery described as ${possession.description}, being a ${possession.itemType || ''} ` +
                 `made of ${possession.material || ''}${possession.stones ? `, set with ${possession.stones}` : ''}, ` +
                 `valued at ${possession.appraisalValue || ''}, currently located at ${possession.location || ''} ` +
                 `to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Furniture':
          return `Furniture ${possession.description ? `described as ${possession.description}, ` : ''}` +
                 `currently located at ${possession.location || ''}, ` +
                 `valued at ${possession.estimatedValue || ''} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Paintings':
          return `Painting titled "${possession.title || ''}" by artist ${possession.artist || ''}, ` +
                 `created in ${possession.yearCreated || ''}, ${possession.medium || ''}, ` +
                 `measuring ${possession.dimensions || ''}, currently located at ${possession.location || ''}, ` +
                 `valued at ${possession.appraisalValue || ''} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
             
    case 'Firearm':
      return `Firearm bearing serial number ${possession.serialNumber} and firearm licence ` +
             `number ${possession.licenseNumber}, being a ${possession.make} ${possession.model} ` +
             `${possession.caliber} caliber ${possession.type}, stored at ${possession.storageLocation} ` +
             `to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Digital Assets':
          return `Digital assets described as ${possession.assetType || ''} held on ${possession.platform || ''}, ` +
                 `account identifier ${possession.accountDetails || ''}, with estimated value of ${possession.estimatedValue || ''} ` +
                 `to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Intellectual Property':
          return `Intellectual Property rights being ${possession.type || ''} registered under number ${possession.registrationNumber || ''} ` +
                 `in ${possession.jurisdiction || ''}, valid until ${possession.expiryDate || ''}, ` +
                 `with associated rights ${possession.rightsOwned || ''} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Business Interests':
          return `Business interests in ${possession.companyName || ''} (Registration Number: ${possession.registrationNumber || ''}), ` +
                 `being a ${possession.businessType || ''} with ${possession.ownershipPercentage || ''}% ownership, ` +
                 `valued at ${possession.valuationDetails || ''} to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        case 'Residual Estate':
          return `Residual estate comprising ${possession.description || ''}, ` +
                 `with estimated value of ${possession.estimatedValue || ''}, subject to ${possession.specialConditions || ''} ` +
                 `to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
    
        default:
          return `${possession.type}: ${possession.description || 'No description provided'} ` +
                 `to be shared between ${beneficiaryDetails || noBeneficiariesText}.`;
      }
    };



  



  
  
  
  const renderAddPossessions = () => {
    const hasPossessions = formData.possessions && formData.possessions.length > 0;
  
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Add Your Possessions</h2>
        
        {/* Show possession selector at top only when no possessions exist */}
        {!hasPossessions && (
          <div className="mb-8">
            <PossessionSelector />
          </div>
        )}
        
        {/* Existing Possessions List */}
        <div className="space-y-6">
          {formData.possessions.map((possession, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{possession.type}</h3>
              
              {renderPossessionFields(possession, index)}
  
              <button
                type="button"
                onClick={() => handleDeletePossession(index)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
  
        {/* Show possession selector at bottom when possessions exist */}
        {hasPossessions && (
          <div className="mt-8 p-6 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Add Another Possession</h3>
            <PossessionSelector />
          </div>
        )}
      </section>
    );
  };


    

  const PossessionSelector = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Possession Type
          </label>
          <select
            value={formData.selectedPossession}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              selectedPossession: e.target.value
            }))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a possession type</option>
            <option value="Property">Property</option>
            <option value="Shares and Stocks">Shares and Stocks</option>
            <option value="Insurance">Insurance</option>
            <option value="Bank Accounts">Bank Accounts</option>
            <option value="Motor Vehicle">Motor Vehicle</option>
            <option value="Unpaid Salary">Unpaid Salary</option>
            <option value="NHT Contributions">NHT Contributions</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Furniture">Furniture</option>
            <option value="Paintings">Paintings</option>
            <option value="Firearm">Firearm</option>
          </select>
        </div>
  
        <button
          type="button"
          onClick={() => {
            if (!formData.selectedPossession) return;
            const newPossession = createEmptyPossession(formData.selectedPossession);
            setFormData(prev => ({
              ...prev,
              possessions: [...prev.possessions, newPossession],
              selectedPossession: '' // Reset selection after adding
            }));
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!formData.selectedPossession}
        >
          Add {formData.selectedPossession || 'Possession'}
        </button>
      </div>
    );
  };
  



  

 
  
  // Updated renderPossessionFields function
  const renderPossessionFields = (possession, index) => {
    const handleUpdate = (idx, updatedPossession) => {
      setFormData(prev => ({
        ...prev,
        possessions: prev.possessions.map((p, i) => 
          i === idx ? updatedPossession : p
        )
      }));
    };
  
    const renderInput = (label, field) => (
      <div key={field} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          type="text"
          value={possession[field] || ''}
          onChange={(e) => handlePossessionUpdate(index, field, e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    );

      
    const renderPossessionFields = (possession, index) => {
      const handleUpdate = (idx, updatedPossession) => {
        setFormData(prev => ({
          ...prev,
          possessions: prev.possessions.map((p, i) => 
            i === idx ? updatedPossession : p
          )
        }));
      };
    
      return (
        <div className="space-y-4">
          {/* Type-specific fields */}
          {renderTypeSpecificFields(possession, index)}
    
          {/* Beneficiary selection */}
          <BeneficiarySelect
            possession={possession}
            index={index}
            onUpdate={handleUpdate}
          />
        </div>
      );
    };
  
    const renderTypeSpecificFields = () => {
      switch (possession.type) {
        case 'Property':
          return (
            <>
              {renderInput('Address', 'address')}
              {renderInput('Parish', 'parish')}
              {renderInput('Volume', 'volume')}
              {renderInput('Folio', 'folio')}
            </>
          );
  
        case 'Shares and Stocks':
          return (
            <>
              {renderInput('Company', 'company')}
              {renderInput('Country', 'country')}
              {renderInput('Exchange', 'exchange')}
              {renderInput('Account Number', 'accountNumber')}
            </>
          );
  
        case 'Insurance':
          return (
            <>
              {renderInput('Policy Number', 'policyNumber')}
              {renderInput('Company', 'company')}
              {renderInput('Address', 'address')}
              {renderInput('Country', 'country')}
            </>
          );
  
        case 'Bank Accounts':
          return (
            <>
              {renderInput('Account Number', 'accountNumber')}
              {renderInput('Bank Name', 'bank')}
              {renderInput('Bank Address', 'address')}
              {renderInput('Country', 'country')}
            </>
          );
  
        case 'Motor Vehicle':
          return (
            <>
              {renderInput('Color', 'color')}
              {renderInput('Make', 'make')}
              {renderInput('Model', 'model')}
              {renderInput('License Plate', 'licensePlate')}
              {renderInput('Engine Number', 'engineNumber')}
              {renderInput('Chassis Number', 'chassisNumber')}
            </>
          );
  
        case 'Unpaid Salary':
          return (
            <>
              {renderInput('Employer Name', 'employer')}
              {renderInput('Employer Address', 'employerAddress')}
            </>
          );
  
        case 'NHT Contributions':
          return (
            <>
              {renderInput('NHT Number', 'nhtNumber')}
              {renderInput('Tax Number', 'taxNumber')}
            </>
          );
  
        case 'Jewellery':
        case 'Furniture':
        case 'Paintings':
          return renderInput('Description', 'description');
  
        case 'Firearm':
          return (
            <>
              {renderInput('Serial Number', 'serialNumber')}
              {renderInput('License Number', 'licenseNumber')}
            </>
          );
  
        default:
          return null;
      }
    };
  
    return (
      <div className="space-y-4">
        {/* Type-specific fields */}
        {renderTypeSpecificFields()}
  
        {/* Beneficiary selection */}
        <BeneficiarySelect
          possession={possession}
          index={index}
          onUpdate={handleUpdate}
        />
  
        {/* Show selected beneficiary details */}
        {possession.beneficiary && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Selected Beneficiary Details:</h4>
            <p>Name: {possession.beneficiary}</p>
            <p>Address: {possession.beneficiaryAddress}</p>
            {possession.beneficiaryParish && <p>Parish: {possession.beneficiaryParish}</p>}
            {possession.beneficiaryRelationship && <p>Relationship: {possession.beneficiaryRelationship}</p>}
          </div>
        )}
      </div>
    );
  };


  




const handleAddBequest = () => {
  setFormData(prev => ({
    ...prev,
    bequests: [
      ...prev.bequests,
      {
        beneficiary: '',
        itemType: '',
        item: ''
      }
    ]
  }));
};

const handleAddBeneficiary = () => {
  setFormData(prev => ({
    ...prev,
    additionalBeneficiaries: [
      ...prev.additionalBeneficiaries,
      {
        type: 'individual',
        fullName: '',
        relationship: '',
        email: '',
        address: '',
        parish: ''
      }
    ]
  }));
};
   
     // update format // 


     



// Update possession fields rendering



const handleRemoveBequest = (index) => {
  setFormData(prev => ({
    ...prev,
    bequests: prev.bequests.filter((_, i) => i !== index)
  }));
};

const handleBequestChange = (index, field, value) => {
  setFormData(prev => {
    const newBequests = [...prev.bequests];
    newBequests[index] = {
      ...newBequests[index],
      [field]: value
    };
    
    // Clear item selection if item type changes
    if (field === 'itemType') {
      newBequests[index].item = '';
    }
    
    return {
      ...prev,
      bequests: newBequests
    };
  });
};







  const handleDeletePossession = (index) => {
    setFormData(prev => ({
      ...prev,
      possessions: prev.possessions.filter((_, i) => i !== index)
    }));
  };

  const handlePossessionUpdate = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      possessions: prev.possessions.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };



  const shouldSkipStep = (stepNumber) => {
    // Skip individual possession steps since they're handled in Add Possession
    return [12, 13, 14, 15, 16].includes(stepNumber);
  };

   
  // Navigation handlers
  const handleNext = () => {
    let nextStep = currentStep + 1;
    // Skip possession-specific steps
    while (shouldSkipStep(nextStep) && nextStep < totalSteps) {
      nextStep++;
    }
    setCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    let prevStep = currentStep - 1;
    // Skip possession-specific steps when going backwards
    while (shouldSkipStep(prevStep) && prevStep > 1) {
      prevStep--;
    }
    setCurrentStep(prevStep);
  };

  // Possession handlers
  const addPossession = (type) => {
    setFormData(prev => {
      const newPossessions = { ...prev.possessions };
      
      const newItem = {
        type,
        ...getEmptyPossessionByType(type)
      };

      if (!Array.isArray(newPossessions[type])) {
        newPossessions[type] = [];
      }

      newPossessions[type] = [...newPossessions[type], newItem];
      
      return {
        ...prev,
        possessions: newPossessions
      };
    });
  };

  const getEmptyPossessionByType = (type) => {
    switch(type) {
      case 'properties':
        return { address: '', parish: '', volume: '', folio: '', beneficiary: '' };
      case 'shares':
        return { company: '', country: '', exchange: '', accountNumber: '', beneficiary: '' };
      case 'bankAccounts':
        return { accountNumber: '', bank: '', address: '', country: '', beneficiary: '' };
      case 'vehicles':
        return { color: '', make: '', model: '', licensePlate: '', engineNumber: '', chassisNumber: '', beneficiary: '' };
      default:
        return {};
    }
  };

     
 

     

  // add children //

  const addGuardian = (childIndex) => {
    setFormData(prev => {
      const newMinorChildren = [...prev.minorChildren];
      if (!newMinorChildren[childIndex]) {
        newMinorChildren[childIndex] = {
          childName: prev.children[childIndex]?.fullName || '',
          guardianName: '',
          guardianEmail: '',
          guardianOccupation: '',
          guardianAddress: '',
          guardianParish: '',
          guardianReason: '',
          guardianIsAdult: false
        };
      }
      return { ...prev, minorChildren: newMinorChildren };
    });
  };


  

  

  const getEmptyPossession = (type) => {
    switch (type) {
      case 'vehicles':
        return {
          make: '',
          model: '',
          color: '',
          licensePlate: '',
          engineNumber: '',
          chassisNumber: '',
          beneficiary: ''
        };
      // Add other cases for different possession types
      default:
        return {};
    }
  };


  
  
  
  // Update your navigation buttons
  <div className="flex justify-between mt-8">
    <button
      type="button"
      onClick={handlePrevious}
      className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
      disabled={currentStep === 1}
    >
      Previous
    </button>
    
    {currentStep === 20 ? (
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
      >
        Generate Will
      </button>
    ) : (
      <button
        type="button"
        onClick={handleNext}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    )}
  </div>


  const updateGuardian = (index, field, value) => {
    setFormData(prev => {
      const newGuardians = [...(prev.guardians || [])];
      if (!newGuardians[index]) {
        newGuardians[index] = {};
      }
      newGuardians[index] = {
        ...newGuardians[index],
        [field]: value
      };
      return {
        ...prev,
        guardians: newGuardians
      };
    });
  };



  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [
        ...prev.children,
        {
          fullName: '',
          relationship: '',
          dateOfBirth: '',
          email: '',
          occupation: ''
        }
      ]
    }));
  };

  const renderInput = (section, field, label, index = null) => {
    const value = section 
      ? index !== null 
        ? formData[section]?.[index]?.[field] || ''
        : formData[section]?.[field] || ''
      : formData[field] || '';
  
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={(e) => handleInputChange(e, section, field, index)}
        />
      </div>
    );
  };
  

  // Transform form data to match PDF generator expectations
  const transformFormDataForPDF = (data) => {
    return {
      testatorInfo: {
        prefix: data.prefix || '',
        fullName: data.testatorName || '',
        suffix: data.suffix || '',
        occupation: data.occupation || '',
        address: data.address || '',
        parish: data.parish || '',
        gender: data.gender || ''
      },
      executors: data.executors?.map(executor => ({
        fullName: executor.name || '',
        relationship: executor.relationship || '',
        occupation: executor.occupation || '',
        address: executor.address || '',
        parish: executor.parish || ''
      })) || [],
      funeralArrangements: {
        details: data.funeralDetails || '',
        clothing: data.clothingDetails || '',
        remains: data.remainsDetails || '',
        songs: data.songs || ['', '', '']
      },
      possessions: {
        properties: data.properties?.map(prop => ({
          address: prop.address || '',
          parish: prop.parish || '',
          volume: prop.volume || '',
          folio: prop.folio || '',
          beneficiary: prop.beneficiary || ''
        })) || [],
        shares: data.shares?.map(share => ({
          company: share.company || '',
          country: share.country || '',
          exchange: share.exchange || '',
          accountNumber: share.accountNumber || '',
          beneficiary: share.beneficiary || '',
          beneficiaryAddress: share.beneficiaryAddress || ''
        })) || [],
        insurance: data.insurance?.map(ins => ({
          policyNumber: ins.policyNumber || '',
          company: ins.company || '',
          address: ins.address || '',
          country: ins.country || '',
          beneficiary: ins.beneficiary || ''
        })) || [],
        bankAccounts: data.bankAccounts?.map(acc => ({
          accountNumber: acc.accountNumber || '',
          bank: acc.bank || '',
          address: acc.address || '',
          country: acc.country || '',
          beneficiary: acc.beneficiary || '',
          beneficiaryAddress: acc.beneficiaryAddress || ''
        })) || [],
        vehicles: data.motorVehicles?.map(vehicle => ({
          color: vehicle.color || '',
          make: vehicle.make || '',
          model: vehicle.model || '',
          licensePlate: vehicle.licensePlate || '',
          engineNumber: vehicle.engineNumber || '',
          chassisNumber: vehicle.chassisNumber || '',
          beneficiary: vehicle.beneficiary || '',
          beneficiaryAddress: vehicle.beneficiaryAddress || ''
        })) || [],
        salary: data.unpaidSalary,
        nht: {
          number: data.nhtContributions.nhtNumber || '',
          tax: data.nhtContributions.taxNumber || '',
          beneficiary: data.nhtContributions.beneficiary || ''
        },
        jewellery: data.jewellery,
        furniture: data.furniture,
        paintings: data.paintings,
        firearm: {
          serial: data.firearm.serialNumber || '',
          license: data.firearm.licenseNumber || '',
          beneficiary: data.firearm.beneficiary || ''
        }
      },
      residualEstate: {
        beneficiaries: Array.isArray(data.residualEstate.beneficiaries) 
          ? data.residualEstate.beneficiaries 
          : [data.residualEstate.beneficiaries]
      },
      witnesses: data.witnesses?.map(witness => ({
        fullName: witness.name || '',
        address: witness.address || '',
        occupation: witness.occupation || ''
      })) || []
    };
  };
  

const addBeneficiary = () => {
  setFormData(prev => ({
    ...prev,
    additionalBeneficiaries: [
      ...prev.additionalBeneficiaries,
      {
        type: 'individual',
        fullName: '',
        relationship: '',
        email: '',
        address: '',
        parish: ''
      }
    ]
  }));
};

const removeBeneficiary = (index) => {
  setFormData(prev => ({
    ...prev,
    additionalBeneficiaries: prev.additionalBeneficiaries.filter((_, i) => i !== index)
  }));
};


const formatPossessionDetails = (type, item) => {
  const formatRomanNumeral = (index) => {
    const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
    return romanNumerals[index] || (index + 1).toString();
  };

  switch (type) {
    case 'Property':
      return [
        `Property- situate at ${item.address}, in the parish of ${item.parish} registered at Volume ${item.volume} and Folio ${item.folio} of the Register Book of Titles to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Shares and Stocks':
      return [
        `Shares in ${item.company} held in ${item.country} at ${item.exchange} in account numbered ${item.accountNumber} to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Insurance':
      return [
        `Proceeds of insurance policy numbered ${item.policyNumber}, held at ${item.company} located at ${item.address}, ${item.country} to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Bank Accounts':
      return [
        `Proceeds of bank account numbered ${item.accountNumber}, held at ${item.bank} located at ${item.address}, ${item.country} to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Motor Vehicle':
      return [
        `${item.color} ${item.make} ${item.model} Motor vehicle bearing License plate number ${item.licensePlate} and engine number ${item.engineNumber} and chassis number ${item.chassisNumber} to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Unpaid Salary':
      return [
        `Unpaid salary and/or emoluments with my employer, ${item.employer} located at ${item.employerAddress} to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'NHT Contributions':
      return [
        `Refund of National Housing Trust Contributions (NHT Number: ${item.nhtNumber}, Tax Number: ${item.taxNumber}) to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Jewellery':
      return [
        `${item.description} described as my Jewellery to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Furniture':
      return [
        `Furniture to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Paintings':
      return [
        `Paintings to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    case 'Firearm':
      return [
        `Firearm bearing serial number ${item.serialNumber} and firearm licence number ${item.licenseNumber} to ${item.beneficiary} of ${item.beneficiaryAddress}.`
      ];

    default:
      return [];
  }
};






  // generate Pdf //


  const generatePDF = async (formData) => {
    try {
      const pdfDoc = await PDFDocument.create();
      const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  
      // Keep your existing helper functions exactly as they are
      const addPage = (pageNum) => {
        const page = pdfDoc.addPage([612, 792]); 
        
        page.drawText(`Page - ${pageNum} - of 5`, {
          x: 50,
          y: 750,
          size: 12,
          font: timesRoman
        });
  
        page.drawText("(Please insert Testator's signature here)", {
          x: 370,
          y: 20,
          size: 10,
          font: timesRoman
        });
  
         
  
        return { page, yOffset: 700 };
      };

        
      const calculateContentHeight = (content) => {
        let height = 0;
        if (content.possessions) {
          height += content.possessions.length * 100; // Approximate height per possession
        }
        if (content.executors) {
          height += content.executors.length * 50;
        }
        // Add other content calculations as needed
        return height;
      };


      


      // Keep your existing writeText function exactly as is
      const writeText = (page, text, options = {}) => {
        const {
          x = 50,
          y,
          size = 12,
          font = timesRoman,
          color = rgb(0, 0, 0),
          maxWidth = 500,
          indent = 0,
          align = 'left',
          lineSpacing = 1.2
        } = options;
  
        const lines = [];
        let currentLine = '';
        const words = text.split(' ');
        const actualX = x + (indent * 20);
  
        if (align === 'center') {
          const width = font.widthOfTextAtSize(text, size);
          const centerX = (page.getWidth() - width) / 2;
          page.drawText(text, { x: centerX, y, size, font, color });
          return y - (size * lineSpacing);
        }
  
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const width = font.widthOfTextAtSize(testLine, size);
  
          if (width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          lines.push(currentLine);
        }
  
        let yPos = y;
        lines.forEach(line => {
          page.drawText(line, { x: actualX, y: yPos, size, font, color });
          yPos -= size * lineSpacing;
        });
  
        return yPos - (size * 0.5);
      };
  
      // Keep your existing helper functions
      const drawDottedLine = (page, startX, startY, length, options = {}) => {
        const { spacing = 5, thickness = 0.5 } = options;
        for (let i = 0; i < length; i += spacing) {
          page.drawLine({
            start: { x: startX + i, y: startY },
            end: { x: startX + i + 1, y: startY },
            thickness,
            color: rgb(0, 0, 0)
          });
        }
      };

      const checkNewPage = (currentYOffset, pageNum, neededSpace = 100) => {
        if (currentYOffset < neededSpace) {
          return addPage(pageNum);
        }
        return { page: currentPage, yOffset: currentYOffset };
      };
  
  
     
      // Updated formatPossessionForPDF function to handle multiple beneficiaries
      const formatPossessionForPDF = (possession) => {
        const formatBeneficiaryDetails = (beneficiaries) => {
          if (!beneficiaries || beneficiaries.length === 0) {
            // Fallback to legacy single beneficiary format
            if (possession.beneficiary) {
              return `to ${possession.beneficiary}${possession.beneficiaryType === 'Child' ? ' (Child)' : ''} ` +
                     `${possession.beneficiaryRelationship ? `(${possession.beneficiaryRelationship})` : ''} ` +
                     `of ${possession.beneficiaryAddress}${possession.beneficiaryParish ? `, ${possession.beneficiaryParish}` : ''}`;
            }
            return '';
          }
  
          return 'to be shared between ' + beneficiaries.map(b => 
            `${b.fullName}${b.type === 'Child' ? ' (Child)' : ''} ` +
            `(${b.relationship}) of ${b.address}${b.parish ? `, ${b.parish}` : ''} ` +
            `with a ${b.sharePercentage}% share`
          ).join(' AND ');
        };
  
        const beneficiaryDetails = formatBeneficiaryDetails(possession.beneficiaries);
  
        switch (possession.type) {
          case 'Property':
            return `Property- situate at ${possession.address}, in the parish of ${possession.parish} ` +
                   `registered at Volume ${possession.volume} and Folio ${possession.folio} of the Register ` +
                   `Book of Titles ${beneficiaryDetails}.`;
  
          // Keep all your other cases exactly as they are
          case 'Shares and Stocks':
            return `Shares in ${possession.company} held in ${possession.country} at ${possession.exchange} ` +
                   `in account numbered ${possession.accountNumber} ${beneficiaryDetails}.`;
  
          case 'Insurance':
            return `Proceeds of insurance policy numbered ${possession.policyNumber}, held at ${possession.company} ` +
                   `located at ${possession.address}, ${possession.country} ${beneficiaryDetails}.`;
  
          case 'Bank Accounts':
            return `Proceeds of bank account numbered ${possession.accountNumber}, held at ${possession.bank} ` +
                   `located at ${possession.address}, ${possession.country} ${beneficiaryDetails}.`;
  
          case 'Motor Vehicle':
            return `${possession.color} ${possession.make} ${possession.model} Motor vehicle bearing License ` +
                   `plate number ${possession.licensePlate} and engine number ${possession.engineNumber} and ` +
                   `chassis number ${possession.chassisNumber} ${beneficiaryDetails}.`;
  
          case 'Unpaid Salary':
            return `Unpaid salary and/or emoluments with my employer, ${possession.employer} located at ` +
                   `${possession.employerAddress} ${beneficiaryDetails}.`;
  
          case 'NHT Contributions':
            return `Refund of National Housing Trust Contributions (NHT Number: ${possession.nhtNumber}, ` +
                   `Tax Number: ${possession.taxNumber}) ${beneficiaryDetails}.`;
  
          case 'Jewellery':
            return `${possession.description} described as my Jewellery ${beneficiaryDetails}.`;
  
          case 'Furniture':
            return `Furniture ${beneficiaryDetails}.`;
  
          case 'Paintings':
            return `Paintings ${beneficiaryDetails}.`;
  
          case 'Firearm':
            return `Firearm bearing serial number ${possession.serialNumber} and firearm licence ` +
                   `number ${possession.licenseNumber} ${beneficiaryDetails}.`;
  
          default:
            return '';
        }
      };

      // Start PDF generation
    let { page, yOffset } = addPage(1);
    let currentPage = page;

    // Title
    yOffset = writeText(page, 'LAST WILL AND TESTAMENT', {
      y: yOffset,
      size: 16,
      font: timesBold,
      align: 'center'
    });
    yOffset -= 30;

    // Personal Information (keep exactly as is)
    const personalInfo = `THIS IS THE LAST WILL AND TESTAMENT of me ${formData.prefix || ''} ${formData.testatorName || ''} ${formData.suffix || ''}, a ${formData.occupation || ''} whose address is ${formData.address || ''} in the parish of ${formData.parish || ''}.`;
    yOffset = writeText(page, personalInfo, { y: yOffset, lineSpacing: 1.5 });
    yOffset -= 30;

     // Section 1 - Revocation
     yOffset = writeText(page, '1. I HEREBY REVOKE all Wills and Testamentary dispositions heretofore by me made AND DECLARE this to be my Last Will and Testament.', {
      y: yOffset,
      lineSpacing: 1.5
    });
    yOffset -= 30;

    // Section 2 - Executors
    yOffset = writeText(page, '2. APPOINTMENT OF EXECUTORS', {
      y: yOffset,
      font: timesBold
    });
    yOffset -= 20;

    formData.executors?.forEach((executor, index) => {
      const executorText = `I HEREBY APPOINT ${executor.name || ''}, my ${executor.relationship || ''}, ${executor.occupation || ''}, of ${executor.address || ''}, in the parish of ${executor.parish || ''}${index < formData.executors.length - 1 ? ' AND' : ''}`;
      yOffset = writeText(page, executorText, { y: yOffset, lineSpacing: 1.5 });
      yOffset -= 20;
    });

    yOffset = writeText(page, 'to be the Executor and Trustee of this my Will (hereinafter referred to as "my Trustee").', {
      y: yOffset,
      lineSpacing: 1.5
    });
    yOffset -= 30;

    // Section 3 - Debts
    yOffset = writeText(page, '3. I DIRECT that as soon as possible after my decease my Trustees shall pay all my just debts, funeral, tombing and testamentary expenses.', {
      y: yOffset,
      lineSpacing: 1.5
    });
    yOffset -= 30;

    // Section 4 - Funeral Arrangements
    ({ page: currentPage, yOffset } = checkNewPage(yOffset, 2));

    yOffset = writeText(currentPage, '4. FUNERAL AND BURIAL ARRANGEMENTS', {
      y: yOffset,
      font: timesBold
    });
    yOffset -= 20;

    yOffset = writeText(currentPage, 'I HEREBY DIRECT that my body be prepared for burial in an appropriate manner and that my funeral expenses and any debts be paid out of my estate, along with the following:', {
      y: yOffset,
      lineSpacing: 1.5
    });
    yOffset -= 25;

    // Funeral Details
    [
      `a. That I be ${formData.funeralDetails || ''}`,
      `b. That be clothed in ${formData.clothingDetails || ''}`,
      `c. That my remains be placed ${formData.remainsDetails || ''}`,
      'd. That the following songs be included in my funeral programme',
      'e. That the following song is played at my wedding-'
    ].forEach(detail => {
      yOffset = writeText(currentPage, detail, {
        y: yOffset,
        lineSpacing: 1.5
      });
      yOffset -= 15;
    });

    // Songs
    formData.songs?.forEach(song => {
      yOffset = writeText(currentPage, `- ${song}`, {
        y: yOffset,
        indent: 1,
        lineSpacing: 1.5
      });
      yOffset -= 15;
    });

    // Sections 1-4 remain exactly the same...
    // Section 1 - Revocation
    yOffset = writeText(page, '1. I HEREBY REVOKE all Wills and Testamentary dispositions heretofore by me made AND DECLARE this to be my Last Will and Testament.', {
      y: yOffset,
      lineSpacing: 1.5
    });
    yOffset -= 30;

    // Section 2-4 (keep exactly as is)
    // ... your existing executor and funeral arrangement code ...

    // Updated Section 5 - Possessions with multiple beneficiary support
    ({ page: currentPage, yOffset } = addPage(3));

    yOffset = writeText(currentPage, '5. I GIVE DEVISE AND BEQUEATH:', {
      y: yOffset,
      font: timesBold
    });
    yOffset -= 25;

    // Keep your existing possession types
    const possessionTypes = {
      'Property': 'a',
      'Shares and Stocks': 'b',
      'Insurance': 'c',
      'Bank Accounts': 'd',
      'Motor Vehicle': 'e',
      'Unpaid Salary': 'f',
      'NHT Contributions': 'g',
      'Jewellery': 'h',
      'Furniture': 'i',
      'Paintings': 'j',
      'Firearm': 'k'
    };

    // Updated possession writing section with multiple beneficiary support
    Object.entries(possessionTypes).forEach(([type, letter]) => {
      const possessionsOfType = formData.possessions.filter(p => p.type === type);
      
      if (possessionsOfType.length > 0) {
        ({ page: currentPage, yOffset } = checkNewPage(yOffset, 3));

        yOffset = writeText(currentPage, `${letter}. ${type.toUpperCase()}`, {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;

        possessionsOfType.forEach((possession, index) => {
          // Check page space for new possession
          if (yOffset < 150) {
            ({ page: currentPage, yOffset } = addPage(3));
          }

          const romanNumeral = ['i', 'ii', 'iii'][index] || `${index + 1}`;
          const formattedText = formatPossessionForPDF(possession);

          yOffset = writeText(currentPage, `${romanNumeral}. ${formattedText}`, {
            y: yOffset,
            indent: 1,
            lineSpacing: 1.5
          });
          yOffset -= 25;

          // Add detailed beneficiary information if using multiple beneficiaries
          if (possession.beneficiaries?.length > 0) {
            yOffset -= 10;
            
            if (yOffset < 150) {
              ({ page: currentPage, yOffset } = addPage(3));
            }

            possession.beneficiaries.forEach((beneficiary, benIndex) => {
              if (yOffset < 150) {
                ({ page: currentPage, yOffset } = addPage(3));
              }

              const beneficiaryText = `   • ${beneficiary.fullName} ` +
                                    `(${beneficiary.type}${beneficiary.relationship ? `, ${beneficiary.relationship}` : ''}) - ` +
                                    `${beneficiary.sharePercentage}% share`;

              yOffset = writeText(currentPage, beneficiaryText, {
                y: yOffset,
                indent: 2,
                lineSpacing: 1.2,
                size: 11
              });
              yOffset -= 15;
            });

            // Add total share calculation
            const totalShare = possession.beneficiaries.reduce(
              (sum, ben) => sum + (parseFloat(ben.sharePercentage) || 0),
              0
            );

            if (yOffset < 150) {
              ({ page: currentPage, yOffset } = addPage(3));
            }

            yOffset = writeText(currentPage, `   Total Share: ${totalShare}%`, {
              y: yOffset,
              indent: 2,
              lineSpacing: 1.2,
              size: 11,
              font: timesBold
            });
            yOffset -= 25;
          }
        });
      }
    });


    // Keep all remaining sections exactly as they are
    // Section 6 - Residual Estate
    

    // Section 6 - Residual Estate
    ({ page: currentPage, yOffset } = addPage(4));
  
    yOffset = writeText(currentPage, '6. RESIDUAL ESTATE', {
      y: yOffset,
      font: timesBold
    });
    yOffset -= 20;

    yOffset = writeText(currentPage, `I give, devise and bequeath all the rest, residue and remainder of my estate, including any proceeds from the sale of assets to ${formData.residualEstate?.beneficiaries?.join(', ') || ''} in equal shares.`, {
      y: yOffset,
      lineSpacing: 1.5
    });
    yOffset -= 40;

    // Signature Section
    yOffset = writeText(currentPage, 'IN WITNESS WHEREOF I have hereunto set my hand and seal this ………day of ………. 20', {
      y: yOffset
    });
    yOffset -= 40;


    // ... your existing residual estate code ...

    // Witness Section (keep exactly as is)
    yOffset = writeText(currentPage, 'WITNESSES', {
      y: yOffset,
      font: timesBold,
      size: 16
    });
    yOffset -= 40;

     // Witness Section
     yOffset = writeText(currentPage, 'WITNESSES', {
      y: yOffset,
      font: timesBold,
      size: 16
    });
    yOffset -= 40;

    // Add "Witnesses to sign here" with vertical line
    const startY = yOffset;
    writeText(currentPage, 'Witnesses', { y: yOffset, x: 50 });
    yOffset -= 15;
    writeText(currentPage, 'to sign', { y: yOffset, x: 50 });
    yOffset -= 15;
    writeText(currentPage, 'here.', { y: yOffset, x: 50 });

    // Draw vertical line
    currentPage.drawLine({
      start: { x: 110, y: startY + 20 },
      end: { x: 110, y: yOffset - 10 },
      thickness: 1,
      color: rgb(0, 0, 0)
    });

    // Two-column witness layout
    const columns = [
      { x: 130, width: 250 },
      { x: 430, width: 250 }
    ];

    formData.witnesses?.forEach((witness, index) => {
      const column = columns[index];
      let localY = startY;

      // Name and Signature
      writeText(currentPage, 'Name and', {
        y: localY,
        x: column.x,
        font: timesBold
      });
      localY -= 20;
      
      writeText(currentPage, 'Signature:', {
        y: localY,
        x: column.x,
        font: timesBold
      });

      // Draw dotted line
      drawDottedLine(currentPage, column.x + 80, localY, 200);
      
      if (witness.name) {
        writeText(currentPage, witness.name, {
          y: localY,
          x: column.x + 80
        });
      }

      localY -= 40;

      writeText(currentPage, 'Email:', {
        y: localY,
        x: column.x,
        font: timesBold
      });
    
      drawDottedLine(currentPage, column.x + 80, localY, 200);
      
      if (witness.email) {
        writeText(currentPage, witness.email, {
          y: localY,
          x: column.x + 80
        });
      }
    
      localY -= 40
      
     
      // Address
      writeText(currentPage, 'Address:', {
        y: localY,
        x: column.x,
        font: timesBold
      });

      drawDottedLine(currentPage, column.x + 80, localY, 200);
      // Continuing from where we left off (Address section)...
    
    if (witness.address || witness.parish) {
      const fullAddress = [witness.address, witness.parish].filter(Boolean).join(', ');
      writeText(currentPage, fullAddress, {
        y: localY,
        x: column.x + 80
      });
    }

    localY -= 40;

    // Occupation
    writeText(currentPage, 'Occupation:', {
      y: localY,
      x: column.x,
      font: timesBold
    });

    drawDottedLine(currentPage, column.x + 80, localY, 200);
    
    if (witness.occupation) {
      writeText(currentPage, witness.occupation, {
        y: localY,
        x: column.x + 80
      });
    }
  });

    // ... rest of your existing witness section code ...

    // Final Declaration (keep exactly as is)
    yOffset -= 165;
    yOffset = writeText(currentPage, 'executed this Last will and testament willingly and in the presence of the following witnesses, who are present at the same time and who have signed as witnesses in my presence:', {
      y: yOffset,
      lineSpacing: 1.5
    });

    // Generate the final PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

  



// Helper function to handle PDF download
const handleGeneratePDF = async () => {
  try {
    const pdfBytes = await generatePDF(formData);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Last_Will_and_Testament_${formData.testatorName || 'Document'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};
  // When adding a possession
const handleAddPossession = (type) => {
  const newPossession = {
    type,
    // Add appropriate fields based on type
    ...(type === 'Property' && {
      address: '',
      parish: '',
      volume: '',
      folio: '',
      beneficiary: ''
    }),
    ...(type === 'Motor Vehicle' && {
      color: '',
      make: '',
      model: '',
      licensePlate: '',
      engineNumber: '',
      chassisNumber: '',
      beneficiary: ''
    }),
    // Add other types
  };

  setFormData(prev => ({
    ...prev,
    possessions: [...prev.possessions, newPossession]
  }));
};

  
  // Helper function to download the generated PDF
 const downloadPDF = async (formData) => {
    try {
      const result = await generatePDF(formData);
      
      if (!result.success) {
        throw new Error(result.message);
      }
  
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Last_Will_and_Testament_${formData.testatorInfo.fullName.replace(/\s+/g, '_')}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
      return {
        success: true,
        message: 'PDF downloaded successfully'
      };
    } catch (error) {
      console.error('Error downloading PDF:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to download PDF'
      };
    }
  };
  
  // Helper function to validate the form data before generating PDF
   const validateFormData = (formData) => {
    const errors = [];
  
    // Required fields validation
    if (!formData.testatorInfo.fullName) {
      errors.push('Testator name is required');
    }
  
    if (!formData.testatorInfo.occupation) {
      errors.push('Testator occupation is required');
    }
  
    if (!formData.testatorInfo.address) {
      errors.push('Testator address is required');
    }
  
    if (!formData.testatorInfo.parish) {
      errors.push('Testator parish is required');
    }
  
    // Executor validation
    if (!formData.executors.length) {
      errors.push('At least one executor is required');
    }
  
    // Witness validation
    if (formData.witnesses.length < 2) {
      errors.push('Two witnesses are required');
    }
  
    // Validate all sections have beneficiaries assigned
    const possessionTypes = Object.keys(formData.possessions);
    possessionTypes.forEach(type => {
      if (Array.isArray(formData.possessions[type])) {
        formData.possessions[type].forEach((item, index) => {
          if (item.beneficiary === undefined || item.beneficiary === '') {
            errors.push(`Beneficiary required for ${type} item ${index + 1}`);
          }
        });
      }
    });
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };

 

  // child //


  
  const removeChild = (index) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }));
  };



// add //




  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  


      
     



     // possesions code // 

    
      
      const deletePossession = (index) => {
        setFormData(prevData => ({
          ...prevData,
          possessions: prevData.possessions.filter((_, i) => i !== index),
        }));
      };
      
      
// Add these helper functions above your renderStep function
const addBequest = () => {
  setFormData(prev => ({
    ...prev,
    bequests: [...prev.bequests, { beneficiaryId: '', item: '' }]
  }));
};


const removeBequest = (index) => {
  setFormData(prev => ({
    ...prev,
    bequests: prev.bequests.filter((_, i) => i !== index)
  }));
};







  const renderStep = () => {
    switch (currentStep) {
        case 1:
            return (
                <section className="introduction bg-gray-100 p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Welcome to Your Last Will and Testament</h2>
                <p className="text-lg text-gray-700 mb-4 text-center">
                  We've made this process as easy and quick as possible. It should only take a few minutes of your time.
                </p>
                <div className="mb-6">
                  <p className="text-gray-600 mb-3">
                    You will be asked a series of questions to guide you through creating your Last Will and Testament.
                  </p>
                  <p className="text-gray-600 mb-3">
                    For general help, refer to the "Common Questions" that are available on each page. If you can't see them, click on the large "?" at the top of the page.
                  </p>
                  <p className="text-gray-600 mb-3">
                    For specific help with any question, hover over or tap the small "?" icon next to the item.
                  </p>
                  <p className="text-gray-600 mb-3">
                    You can save your progress at any time and return later.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Once you're finished, make sure to print and sign your document in front of witnesses to make it legally binding.
                  </p>
                </div>
                <div className="text-center">
                </div>
              </section>
            );
      case 2:
        return (
            <section>
            <h2 className="text-2xl font-semibold mb-4">Testator Information</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Prefix</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.prefix || ''}
                  onChange={(e) => handleInputChange(e, null, 'prefix')}
                >
                  <option value="">Select...</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="col-span-2">
                {renderInput(null, 'testatorName', 'Full Name')}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Suffix</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.suffix || ''}
                  onChange={(e) => handleInputChange(e, null, 'suffix')}
                >
                  <option value="">Select...</option>
                  <option value="Jr">Jr</option>
                  <option value="Sr">Sr</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
              <div className="flex space-x-4">
                {['Male', 'Female', 'Neutral'].map((gender) => (
                  <label key={gender} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      checked={formData.gender === gender.toLowerCase()}
                      onChange={(e) => handleInputChange(e, null, 'gender')}
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
            {renderInput(null, 'occupation', 'Occupation')}
            {renderInput(null, 'address', 'Address')}
            {renderInput(null, 'parish', 'Parish')}
          </section>
        );
        case 3:
          return (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Family Status</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Marital Status</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.maritalStatus || ''}
                  onChange={(e) => handleInputChange(e, null, 'maritalStatus')}
                >
                  <option value="">Select...</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                  <option value="separated">Separated</option>
                  <option value="domesticPartnership">Domestic Partnership</option>
                </select>
              </div>
        
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Living Children</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="livingChildren"
                        value={option.toLowerCase()}
                        checked={formData.livingChildren === option.toLowerCase()}
                        onChange={(e) => handleInputChange(e, null, 'livingChildren')}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
        
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Living Grandchildren</label>
                <div className="flex space-x-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="livingGrandchildren"
                        value={option.toLowerCase()}
                        checked={formData.livingGrandchildren === option.toLowerCase()}
                        onChange={(e) => handleInputChange(e, null, 'livingGrandchildren')}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
        
              {/* Add the GrandchildrenSection component */}
              <GrandchildrenSection
                formData={formData}
                handleInputChange={handleInputChange}
                removeGrandchild={removeGrandchild}
                addGrandchild={addGrandchild}
              />
            </section>
          );
      case 4:
        return (
            <section>
            <h2 className="text-2xl font-semibold mb-4">Spouse/Partner Details if you are Single / Divorced any other reason you can skip this part</h2>
            {renderInput('spouse', 'fullName', 'Full Name')}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Relation</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.spouse?.relation || ''}
                onChange={(e) => handleInputChange(e, 'spouse', 'relation')}
              >
                <option value="">Select...</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            {renderInput('spouse', 'occupation', 'Occupation')}
          </section>
        );
      case 5:
        return (
          <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Identify Children</h2>
          
          {formData.children.map((child, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm space-y-4">
              <h3 className="text-xl font-semibold">Child {index + 1}</h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Child's Full Name</label>
                <input
                  type="text"
                  value={child.fullName}
                  onChange={(e) => handleInputChange(e, 'children', 'fullName', index)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Relationship</label>
                <div className="space-x-4">
                  {['Son', 'Daughter', 'Gender Neutral Child'].map((rel) => (
                    <label key={rel} className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`relationship-${index}`}
                        value={rel.toLowerCase()}
                        checked={child.relationship === rel.toLowerCase()}
                        onChange={(e) => handleInputChange(e, 'children', 'relationship', index)}
                        className="mr-2"
                      />
                      {rel}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Child's Date of Birth</label>
                <input
                  type="date"
                  value={child.dateOfBirth}
                  onChange={(e) => handleInputChange(e, 'children', 'dateOfBirth', index)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={child.email}
                  onChange={(e) => handleInputChange(e, 'children', 'email', index)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Occupation</label>
                <input
                  type="text"
                  value={child.occupation}
                  onChange={(e) => handleInputChange(e, 'children', 'occupation', index)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              value={child.address || ''}
              onChange={(e) => handleInputChange(e, 'children', 'address', index)}
              className="w-full p-2 border rounded"
              placeholder="Enter address"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Parish</label>
            <input
              type="text"
              value={child.parish || ''}
              onChange={(e) => handleInputChange(e, 'children', 'parish', index)}
              className="w-full p-2 border rounded"
              placeholder="Enter parish"
            />
          </div>


              <button
                type="button"
                onClick={() => removeChild(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove Child
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addChild}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Child
          </button>
        </section>
          
        );
      case 6:
        return (
            <section>
            <h2 className="text-2xl font-semibold mb-4">Deceased Family Members</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Do you have any deceased family members?</label>
              <div className="flex space-x-4">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="hasDeceasedFamilyMembers"
                      value={option.toLowerCase()}
                      checked={formData.hasDeceasedFamilyMembers === option.toLowerCase()}
                      onChange={(e) => handleInputChange(e, null, 'hasDeceasedFamilyMembers')}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            {formData.hasDeceasedFamilyMembers === 'yes' && (
              <div>
                {formData.deceasedFamilyMembers.map((member, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <h3 className="text-xl font-semibold mb-2">Deceased Family Member {index + 1}</h3>
                    {renderInput('deceasedFamilyMembers', 'fullName', 'Full Name', index)}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Relationship</label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={member.relationship || ''}
                        onChange={(e) => handleInputChange(e, 'deceasedFamilyMembers', 'relationship', index)}
                      >
                        <option value="">Select...</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      deceasedFamilyMembers: [...formData.deceasedFamilyMembers, { fullName: '', relationship: '' }]
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Deceased Family Member
                </button>
              </div>
            )}
          </section>
        );
        case 7:
            return (
              <section className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Identify Others to be Included in your Will</h2>
              <p className="text-gray-600 mb-4">
                If there are other people or organizations to be included in your Will, you can name them now. 
                You can also add more names later, as you are working through this wizard.
              </p>
              <p className="text-gray-600 mb-4">
                You should not include your spouse/partner, children, or grandchildren on this page, 
                because they would have been named in previous pages of this wizard.
              </p>
              <p className="text-gray-600 mb-4">
                By listing the beneficiaries here, it makes it easier to select them later on for receiving a bequest. 
                You are also able to set up a trust for them. They do not appear in your Will unless they are 
                specifically selected in Section 7.
              </p>
    
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="otherBeneficiaries"
                    value="none"
                    checked={formData.otherBeneficiaries === "none"}
                    onChange={(e) => handleInputChange(e, null, 'otherBeneficiaries')}
                    className="form-radio"
                  />
                  <span>I have no other beneficiaries, or will add them later</span>
                </label>
    
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="otherBeneficiaries"
                    value="add"
                    checked={formData.otherBeneficiaries === "add"}
                    onChange={(e) => handleInputChange(e, null, 'otherBeneficiaries')}
                    className="form-radio"
                  />
                  <span>I would like to add beneficiaries now</span>
                </label>
              </div>
    
              {formData.otherBeneficiaries === "add" && (
                <div className="space-y-6 mt-6">
                  {formData.additionalBeneficiaries.map((beneficiary, index) => (
                    <div key={index} className="p-4 border rounded-lg shadow-sm space-y-4">
                      <h3 className="text-lg font-semibold">Beneficiary {index + 1}</h3>
                      
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`beneficiaryType-${index}`}
                            value="individual"
                            checked={beneficiary.type === "individual"}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'type', index)}
                            className="form-radio"
                          />
                          <span className="ml-2">Individual</span>
                        </label>
                        
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`beneficiaryType-${index}`}
                            value="charity"
                            checked={beneficiary.type === "charity"}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'type', index)}
                            className="form-radio"
                          />
                          <span className="ml-2">Charity/Organization</span>
                        </label>
                      </div>
    
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            type="text"
                            value={beneficiary.fullName}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'fullName', index)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Relationship</label>
                          <input
                            type="text"
                            value={beneficiary.relationship}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'relationship', index)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Email Address</label>
                          <input
                            type="email"
                            value={beneficiary.email}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'email', index)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <input
                            type="text"
                            value={beneficiary.address}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'address', index)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
    
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Parish</label>
                          <input
                            type="text"
                            value={beneficiary.parish}
                            onChange={(e) => handleInputChange(e, 'additionalBeneficiaries', 'parish', index)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
    
                      <button
                        type="button"
                        onClick={() => removeBeneficiary(index)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove Beneficiary
                      </button>
                    </div>
                  ))}
    
                  <button
                    type="button"
                    onClick={addBeneficiary}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Another Beneficiary
                  </button>
                </div>
              )}
            </section>
      
            );
    
            case 8:
              // Filter minor children
              const minorChildren = formData.children.filter(child => 
                child.dateOfBirth && calculateAge(child.dateOfBirth) < 18
              );
            
              return (
                <section className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">Identify Guardians for Minor Children</h2>
            
                  {(formData.livingChildren === 'no' || !minorChildren.length) && formData.livingGrandchildren !== 'yes' ? (
                    <div className="p-4 bg-gray-100 rounded">
                      <p>You have indicated that you have no minor children or grandchildren that need guardians.</p>
                      <p className="mt-2">Click "Next" to continue...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {minorChildren.map((child, index) => (
                        <div key={index} className="p-6 border rounded-lg shadow-sm bg-white">
                          <h3 className="text-xl font-semibold mb-4">Guardian for {child.fullName}</h3>
            
                          <div className="grid gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Child's Name</label>
                              <input
                                type="text"
                                value={child.fullName}
                                disabled
                                className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                              />
                            </div>
            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Child's Age: {calculateAge(child.dateOfBirth)} years
                              </label>
                              <input
                                type="text"
                                value={`${calculateAge(child.dateOfBirth)} years old`}
                                disabled
                                className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                              />
                            </div>
            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Guardian's Full Name</label>
                              <input
                                type="text"
                                value={formData.guardians[index]?.name || ''}
                                onChange={(e) => {
                                  setFormData(prev => {
                                    const newGuardians = [...(prev.guardians || [])];
                                    if (!newGuardians[index]) {
                                      newGuardians[index] = {};
                                    }
                                    newGuardians[index] = {
                                      ...newGuardians[index],
                                      name: e.target.value
                                    };
                                    return {
                                      ...prev,
                                      guardians: newGuardians
                                    };
                                  });
                                }}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>
            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Guardian's Relationship to Child</label>
                              <input
                                type="text"
                                value={formData.guardians[index]?.relationship || ''}
                                onChange={(e) => {
                                  setFormData(prev => {
                                    const newGuardians = [...(prev.guardians || [])];
                                    if (!newGuardians[index]) {
                                      newGuardians[index] = {};
                                    }
                                    newGuardians[index] = {
                                      ...newGuardians[index],
                                      relationship: e.target.value
                                    };
                                    return {
                                      ...prev,
                                      guardians: newGuardians
                                    };
                                  });
                                }}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>
            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Guardian's Email</label>
                              <input
                                type="email"
                                value={formData.guardians[index]?.email || ''}
                                onChange={(e) => {
                                  setFormData(prev => {
                                    const newGuardians = [...(prev.guardians || [])];
                                    if (!newGuardians[index]) {
                                      newGuardians[index] = {};
                                    }
                                    newGuardians[index] = {
                                      ...newGuardians[index],
                                      email: e.target.value
                                    };
                                    return {
                                      ...prev,
                                      guardians: newGuardians
                                    };
                                  });
                                }}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>
            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Guardian's Address</label>
                              <input
                                type="text"
                                value={formData.guardians[index]?.address || ''}
                                onChange={(e) => {
                                  setFormData(prev => {
                                    const newGuardians = [...(prev.guardians || [])];
                                    if (!newGuardians[index]) {
                                      newGuardians[index] = {};
                                    }
                                    newGuardians[index] = {
                                      ...newGuardians[index],
                                      address: e.target.value
                                    };
                                    return {
                                      ...prev,
                                      guardians: newGuardians
                                    };
                                  });
                                }}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>
            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Guardian's Parish</label>
                              <input
                                type="text"
                                value={formData.guardians[index]?.parish || ''}
                                onChange={(e) => {
                                  setFormData(prev => {
                                    const newGuardians = [...(prev.guardians || [])];
                                    if (!newGuardians[index]) {
                                      newGuardians[index] = {};
                                    }
                                    newGuardians[index] = {
                                      ...newGuardians[index],
                                      parish: e.target.value
                                    };
                                    return {
                                      ...prev,
                                      guardians: newGuardians
                                    };
                                  });
                                }}
                                className="mt-1 p-2 w-full border rounded-md"
                              />
                            </div>
            
                            <div>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={formData.guardians[index]?.isAdult || false}
                                  onChange={(e) => {
                                    setFormData(prev => {
                                      const newGuardians = [...(prev.guardians || [])];
                                      if (!newGuardians[index]) {
                                        newGuardians[index] = {};
                                      }
                                      newGuardians[index] = {
                                        ...newGuardians[index],
                                        isAdult: e.target.checked
                                      };
                                      return {
                                        ...prev,
                                        guardians: newGuardians
                                      };
                                    });
                                  }}
                                  className="h-4 w-4 text-blue-600 rounded"
                                />
                                <span className="text-sm text-gray-700">Guardian is 18 or above</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
      case 9:
        return (
          <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Executors and Witnesses</h2>
          
          {/* Executor 1 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">First Executor</h3>
            <div className="grid grid-cols-1 gap-4">
              {renderInput('executors', 'name', 'Full Name', 0)}
              {renderInput('executors', 'relationship', 'Relationship', 0)}
              {renderInput('executors', 'email', 'Email Address', 0)}
              {renderInput('executors', 'occupation', 'Occupation', 0)}
              {renderInput('executors', 'address', 'Address', 0)}
              {renderInput('executors', 'parish', 'Parish', 0)}
            </div>
          </div>
    
          {/* Executor 2 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Second Executor</h3>
            <div className="grid grid-cols-1 gap-4">
              {renderInput('executors', 'name', 'Full Name', 1)}
              {renderInput('executors', 'relationship', 'Relationship', 1)}
              {renderInput('executors', 'email', 'Email Address', 1)}
              {renderInput('executors', 'occupation', 'Occupation', 1)}
              {renderInput('executors', 'address', 'Address', 1)}
              {renderInput('executors', 'parish', 'Parish', 1)}
            </div>
          </div>
    
          {/* Witnesses */}
         
          <div>
        <h3 className="text-xl font-semibold mb-4">Witnesses</h3>
        {[0, 1].map((index) => (
          <div key={index} className="mb-8">
            <h4 className="text-lg font-semibold mb-2">Witness {index + 1}</h4>
            <div className="grid grid-cols-1 gap-4">
              {renderInput('witnesses', 'name', 'Full Name', index)}
              {renderInput('witnesses', 'email', 'Email Address', index)}
              {renderInput('witnesses', 'address', 'Address', index)}
              {renderInput('witnesses', 'parish', 'Parish', index)}  {/* Added parish field */}
              {renderInput('witnesses', 'occupation', 'Occupation', index)}
            </div>
          </div>
        ))}
      </div>
      
        </section>
        );
        
         
      case 10:
        return (
            <section>
            <h2 className="text-2xl font-semibold mb-4">Funeral Arrangements</h2>
            {renderInput(null, 'funeralDetails', 'Funeral Details')}
            {renderInput(null, 'clothingDetails', 'Clothing Details')}
            {renderInput(null, 'remainsDetails', 'Remains Placement')}
            <h3 className="text-xl font-semibold mb-2">Songs</h3>
            {formData.songs.map((_, index) => (
              renderInput('songs', index, `Song ${index + 1}`, index)
            ))}
          </section>
        );

        

      case 11:
        return renderAddPossessions(
            <section>
            <h2 className="text-2xl font-semibold mb-4">Add Your Possessions</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Select Possession Type</label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.selectedPossession || ''}
                onChange={(e) => handleInputChange(e, null, 'selectedPossession')}
              >
                <option value="">Select a possession type</option>
                <option value="property">Property</option>
                <option value="shares">Shares and Stocks</option>
                <option value="insurance">Insurance</option>
                <option value="bankAccounts">Bank Accounts</option>
                <option value="motorVehicle">Motor Vehicle</option>
                <option value="unpaidSalary">Unpaid Salary and Emoluments</option>
                <option value="nhtContributions">National Housing Trust (NHT) Contributions</option>
                <option value="jewellery">Jewellery</option>
                <option value="furniture">Furniture</option>
                <option value="paintings">Paintings</option>
                <option value="firearm">Firearm</option>
                <option value="residualEstate">Residual Estate</option>
              </select>
            </div>
      
            <button
              type="button"
              onClick={addPossession}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Add Possession
            </button>
      
            {formData.possessions && formData.possessions.map((possession, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h3 className="text-xl font-semibold mb-2">{possession.type}</h3>
                {renderPossessionFields(possession, index)}
                <button
                  type="button"
                  onClick={() => deletePossession(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        );

        case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          
          
        
            return null;

       
          

            case 17:
              return (
                <SaveDetailsSection 
                  handleSave={(type) => {
                    if (type === 'local') {
                      localStorage.setItem('willFormData', JSON.stringify(formData));
                      alert('Progress saved successfully!');
                    } else if (type === 'download') {
                      const dataStr = JSON.stringify(formData);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'will_details_backup.json';
                      link.click();
                      URL.revokeObjectURL(url);
                    }
                  }} 
                />
              );
      
      case 18:
        return (
          <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Make Bequests / You can skip this part you have already distribute your possesions</h2>
      <p className="mb-4">
        I would like to leave the following specific items to specific beneficiaries. 
        Any of my possessions not specifically described here will go to my multiple main beneficiaries.
      </p>

      {formData.bequests.map((bequest, index) => (
        <div key={index} className="mb-4 p-4 border rounded shadow-sm bg-white">
          <h3 className="text-xl mb-4 font-semibold">Bequest {index + 1}</h3>

          {/* Beneficiary Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Beneficiary
            </label>
            <select
              value={bequest.beneficiary || ''}
              onChange={(e) => handleBequestChange(index, 'beneficiary', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a beneficiary</option>
              
              {/* List Children */}
              {formData.children?.length > 0 && (
                <optgroup label="Children">
                  {formData.children.map((child, idx) => (
                    <option key={`child-${idx}`} value={child.fullName}>
                      {child.fullName} (Child)
                    </option>
                  ))}
                </optgroup>
              )}

              {/* List Additional Beneficiaries */}
              {formData.additionalBeneficiaries?.length > 0 && (
                <optgroup label="Other Beneficiaries">
                  {formData.additionalBeneficiaries.map((ben, idx) => (
                    <option key={`ben-${idx}`} value={ben.fullName}>
                      {ben.fullName} ({ben.type})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Possession Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Item Type
            </label>
            <select
              value={bequest.itemType || ''}
              onChange={(e) => handleBequestChange(index, 'itemType', e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Select item type</option>
              <option value="Property">Property</option>
              <option value="Shares and Stocks">Shares and Stocks</option>
              <option value="Insurance">Insurance</option>
              <option value="Bank Accounts">Bank Accounts</option>
              <option value="Motor Vehicle">Motor Vehicle</option>
              <option value="Unpaid Salary">Unpaid Salary</option>
              <option value="NHT Contributions">NHT Contributions</option>
              <option value="Jewellery">Jewellery</option>
              <option value="Furniture">Furniture</option>
              <option value="Paintings">Paintings</option>
              <option value="Firearm">Firearm</option>
            </select>

            {bequest.itemType && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Specific Item
                </label>
                <select
                  value={bequest.item || ''}
                  onChange={(e) => handleBequestChange(index, 'item', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an item</option>
                  {formData.possessions
                    .filter(p => p.type === bequest.itemType)
                    .map((possession, idx) => {
                      let displayText;
                      switch (possession.type) {
                        case 'Property':
                          displayText = `Property at ${possession.address}`;
                          break;
                        case 'Motor Vehicle':
                          displayText = `${possession.make} ${possession.model} (${possession.licensePlate})`;
                          break;
                        case 'Bank Accounts':
                          displayText = `Account at ${possession.bank} (${possession.accountNumber})`;
                          break;
                        case 'Shares and Stocks':
                          displayText = `Shares in ${possession.company}`;
                          break;
                        case 'Insurance':
                          displayText = `Policy ${possession.policyNumber}`;
                          break;
                        case 'Jewellery':
                          displayText = possession.description;
                          break;
                        case 'Furniture':
                          displayText = 'Furniture';
                          break;
                        case 'Paintings':
                          displayText = 'Paintings';
                          break;
                        case 'Firearm':
                          displayText = `Firearm (${possession.serialNumber})`;
                          break;
                        default:
                          displayText = `${possession.type} Item ${idx + 1}`;
                      }
                      return (
                        <option 
                          key={`possession-${idx}`} 
                          value={JSON.stringify(possession)}
                        >
                          {displayText}
                        </option>
                      );
                    })}
                </select>
              </>
            )}
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => handleRemoveBequest(index)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Bequest
          </button>
        </div>
      ))}

      {/* Add Bequest Button */}
      <button
        type="button"
        onClick={() => handleAddBequest()}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add New Bequest
      </button>
    </section>
        );
          
        case 19:
          return (
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Review Your Will Details</h2>
        
              {/* Save Progress Button */}
              <div className="mb-8 text-center">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transform transition hover:scale-105 flex items-center justify-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
                  </svg>
                  Save Progress
                </button>
              </div>
        
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Personal Information</h3>
                  <dl className="space-y-2">
                    <dt className="font-medium">Full Name</dt>
                    <dd className="ml-4 text-gray-600">{formData.prefix} {formData.testatorName} {formData.suffix}</dd>
                    <dt className="font-medium">Occupation</dt>
                    <dd className="ml-4 text-gray-600">{formData.occupation}</dd>
                    <dt className="font-medium">Address</dt>
                    <dd className="ml-4 text-gray-600">{formData.address}, {formData.parish}</dd>
                  </dl>
                </div>
        
                {/* Family Status */}
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Family Status</h3>
                  <dl className="space-y-2">
                    <dt className="font-medium">Marital Status</dt>
                    <dd className="ml-4 text-gray-600">{formData.maritalStatus}</dd>
                    <dt className="font-medium">Living Children</dt>
                    <dd className="ml-4 text-gray-600">{formData.livingChildren === 'yes' ? 'Yes' : 'No'}</dd>
                    <dt className="font-medium">Living Grandchildren</dt>
                    <dd className="ml-4 text-gray-600">{formData.livingGrandchildren === 'yes' ? 'Yes' : 'No'}</dd>
                  </dl>
                </div>
        
                {/* Executors */}
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Executors</h3>
                  {formData.executors.map((executor, index) => (
                    <div key={`executor-${index}`} className="mb-4">
                      <h4 className="font-medium">Executor {index + 1}</h4>
                      <dl className="ml-4 space-y-1">
                        <dt className="text-sm">Name</dt>
                        <dd className="text-gray-600">{executor.name}</dd>
                        <dt className="text-sm">Relationship</dt>
                        <dd className="text-gray-600">{executor.relationship}</dd>
                        <dt className="text-sm">Email</dt>
                        <dd className="text-gray-600">{executor.email}</dd>
                      </dl>
                    </div>
                  ))}
                </div>
        
                {/* Witnesses */}
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Witnesses</h3>
                  {formData.witnesses.map((witness, index) => (
                    <div key={`witness-${index}`} className="mb-4">
                      <h4 className="font-medium">Witness {index + 1}</h4>
                      <dl className="ml-4 space-y-1">
                        <dt className="text-sm">Name</dt>
                        <dd className="text-gray-600">{witness.name}</dd>
                        <dt className="text-sm">Email</dt>
                        <dd className="text-gray-600">{witness.email}</dd>
                        <dt className="text-sm">Occupation</dt>
                        <dd className="text-gray-600">{witness.occupation}</dd>
                      </dl>
                    </div>
                  ))}
                </div>
        
                {/* Possessions Summary */}
                <div className="bg-gray-50 p-6 rounded-lg shadow md:col-span-2">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">Possessions Summary</h3>
                  <div className="space-y-4">
                    {formData.possessions.map((possession, index) => (
                      <div key={`possession-${index}`} className="border-b pb-4">
                        <h4 className="font-medium">{possession.type}</h4>
                        <div className="ml-4 text-sm text-gray-600">
                          {possession.beneficiaries && possession.beneficiaries.map((ben, idx) => (
                            <div key={`ben-${idx}`} className="mt-2">
                              <span className="font-medium">Beneficiary {idx + 1}:</span> {ben.fullName} ({ben.sharePercentage}%)
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
  
        case 20:
            return(
              <section className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Generate Will</h2>
              <p>Review your information and click the button below to generate your will.</p>
              <button
                onClick={handleGeneratePDF}
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Generate Will PDF
              </button>
            </section>
            );

        
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Last Will and Testament Generator</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1;
            // Don't show skipped steps
            if (![12, 13, 14, 15, 16].includes(step)) {
              return (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === currentStep
                      ? 'bg-blue-500 text-white'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300'
                  }`}
                >
                  {step}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          
          <button
            type="button"
            onClick={navigateForward}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default WillGenerator;