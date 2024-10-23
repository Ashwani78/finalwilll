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
  
    // Guardians
    guardians: [],
  
    executors: [
      { name: '', relationship: '', email: '', occupation: '', address: '', parish: '' },
      { name: '', relationship: '', email: '', occupation: '', address: '', parish: '' }
    ],
    witnesses: [
      { name: '', address: '', parish: '', occupation: '' },
      { name: '', address: '', parish: '',  occupation: '' }
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


  const formatPossessionForPDF = (possession) => {
    switch (possession.type) {
      case 'Property':
        return `Property- situate at ${possession.address}, in the parish of ${possession.parish} registered at Volume ${possession.volume} and Folio ${possession.folio} of the Register Book of Titles to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Shares and Stocks':
        return `Shares in ${possession.company} held in ${possession.country} at ${possession.exchange} in account numbered ${possession.accountNumber} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Insurance':
        return `Proceeds of insurance policy numbered ${possession.policyNumber}, held at ${possession.company} located at ${possession.address}, ${possession.country} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Bank Accounts':
        return `Proceeds of bank account numbered ${possession.accountNumber}, held at ${possession.bank} located at ${possession.address}, ${possession.country} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Motor Vehicle':
        return `${possession.color} ${possession.make} ${possession.model} Motor vehicle bearing License plate number ${possession.licensePlate} and engine number ${possession.engineNumber} and chassis number ${possession.chassisNumber} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Unpaid Salary':
        return `Unpaid salary and/or emoluments with my employer, ${possession.employer} located at ${possession.employerAddress} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'NHT Contributions':
        return `Refund of National Housing Trust Contributions (NHT Number: ${possession.nhtNumber}, Tax Number: ${possession.taxNumber}) to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Jewellery':
        return `${possession.description} described as my Jewellery to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Furniture':
        return `Furniture to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Paintings':
        return `Paintings to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      case 'Firearm':
        return `Firearm bearing serial number ${possession.serialNumber} and firearm licence number ${possession.licenseNumber} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
      
      default:
        return '';
    }
  };


  const renderAddPossessions = () => {
    return (
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Add Your Possessions</h2>
        
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
              possessions: [...prev.possessions, newPossession]
            }));
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!formData.selectedPossession}
        >
          Add {formData.selectedPossession || 'Possession'}
        </button>
  
        <div className="mt-6 space-y-4">
          {formData.possessions.map((possession, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
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
      </section>
    );
  };
  
  // Updated renderPossessionFields function
  const renderPossessionFields = (possession, index) => {
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
  
    switch (possession.type) {
      case 'Property':
        return (
          <div>
            {renderInput('Address', 'address')}
            {renderInput('Parish', 'parish')}
            {renderInput('Volume', 'volume')}
            {renderInput('Folio', 'folio')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Shares and Stocks':
        return (
          <div>
            {renderInput('Company', 'company')}
            {renderInput('Country', 'country')}
            {renderInput('Exchange', 'exchange')}
            {renderInput('Account Number', 'accountNumber')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Insurance':
        return (
          <div>
            {renderInput('Policy Number', 'policyNumber')}
            {renderInput('Company', 'company')}
            {renderInput('Address', 'address')}
            {renderInput('Country', 'country')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Bank Accounts':
        return (
          <div>
            {renderInput('Account Number', 'accountNumber')}
            {renderInput('Bank Name', 'bank')}
            {renderInput('Bank Address', 'address')}
            {renderInput('Country', 'country')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Motor Vehicle':
        return (
          <div>
            {renderInput('Color', 'color')}
            {renderInput('Make', 'make')}
            {renderInput('Model', 'model')}
            {renderInput('License Plate', 'licensePlate')}
            {renderInput('Engine Number', 'engineNumber')}
            {renderInput('Chassis Number', 'chassisNumber')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Unpaid Salary':
        return (
          <div>
            {renderInput('Employer Name', 'employer')}
            {renderInput('Employer Address', 'employerAddress')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'NHT Contributions':
        return (
          <div>
            {renderInput('NHT Number', 'nhtNumber')}
            {renderInput('Tax Number', 'taxNumber')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Jewellery':
        return (
          <div>
            {renderInput('Description', 'description')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Furniture':
      case 'Paintings':
        return (
          <div>
            {renderInput('Description', 'description')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      case 'Firearm':
        return (
          <div>
            {renderInput('Serial Number', 'serialNumber')}
            {renderInput('License Number', 'licenseNumber')}
            {renderInput('Beneficiary Name', 'beneficiary')}
            {renderInput('Beneficiary Address', 'beneficiaryAddress')}
          </div>
        );
  
      default:
        return null;
    }
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

const createEmptyPossession = (type) => {
  const baseFields = {
    type,
    beneficiary: '',
    beneficiaryAddress: ''
  };

  switch (type) {
    case 'Property':
      return {
        ...baseFields,
        address: '',
        parish: '',
        volume: '',
        folio: ''
      };
    case 'Shares and Stocks':
      return {
        ...baseFields,
        company: '',
        country: '',
        exchange: '',
        accountNumber: ''
      };
    case 'Insurance':
      return {
        ...baseFields,
        policyNumber: '',
        company: '',
        address: '',
        country: ''
      };
    case 'Bank Accounts':
      return {
        ...baseFields,
        accountNumber: '',
        bank: '',
        address: '',
        country: ''
      };
    case 'Motor Vehicle':
      return {
        ...baseFields,
        color: '',
        make: '',
        model: '',
        licensePlate: '',
        engineNumber: '',
        chassisNumber: ''
      };
    case 'Unpaid Salary':
      return {
        ...baseFields,
        employer: '',
        employerAddress: ''
      };
    case 'NHT Contributions':
      return {
        ...baseFields,
        nhtNumber: '',
        taxNumber: ''
      };
    case 'Jewellery':
    case 'Furniture':
    case 'Paintings':
      return {
        ...baseFields,
        description: ''
      };
    case 'Firearm':
      return {
        ...baseFields,
        serialNumber: '',
        licenseNumber: ''
      };
    default:
      return baseFields;
  }
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


  const navigateForward = () => {
    if (currentStep === 8 && formData.livingChildren === 'no') {
      // Skip guardian details if no children
      setCurrentStep(10);
    } else if (currentStep === 11) {
      // Skip individual possession steps since they're handled in Add Possession
      setCurrentStep(17);
    } else if ([12, 13, 14, 15, 16].includes(currentStep)) {
      // Skip possession-specific steps
      setCurrentStep(17);
    } else {
      setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 9 && formData.livingChildren === 'no') {
      // Skip guardian details when going back
      setCurrentStep(7);
    } else if (currentStep === 17) {
      // Go back to Add Possession step
      setCurrentStep(11);
    } else if ([12, 13, 14, 15, 16].includes(currentStep)) {
      // Skip possession-specific steps when going back
      setCurrentStep(11);
    } else {
      setCurrentStep(prev => Math.max(1, prev - 1));
    }
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
  
      // Helper function to add a new page with consistent header
      const addPage = (pageNum) => {
        const page = pdfDoc.addPage([612, 792]); // US Letter size
        
        // Add consistent header on every page
        page.drawText(`Page - ${pageNum} - of 5`, {
          x: 50,
          y: 750,
          size: 12,
          font: timesRoman
        });
  
        // Add signature lines on every page
        page.drawText("(Please insert Testator's signature here)", {
          x: 50,
          y: 730,
          size: 10,
          font: timesRoman
        });
  
        page.drawText("(Please insert Witness #1's signature here)", {
          x: 250,
          y: 730,
          size: 10,
          font: timesRoman
        });
  
        page.drawText("(Please insert Witness #2's signature here)", {
          x: 450,
          y: 730,
          size: 10,
          font: timesRoman
        });
  
        return { page, yOffset: 700 };
      };
  
      // Helper function to write text with proper formatting and line breaks
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
  
        // Handle center alignment
        if (align === 'center') {
          const width = font.widthOfTextAtSize(text, size);
          const centerX = (page.getWidth() - width) / 2;
          page.drawText(text, { x: centerX, y, size, font, color });
          return y - (size * lineSpacing);
        }
  
        // Handle text wrapping
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
  
        // Draw all lines with proper spacing
        let yPos = y;
        lines.forEach(line => {
          page.drawText(line, { x: actualX, y: yPos, size, font, color });
          yPos -= size * lineSpacing;
        });
  
        return yPos - (size * 0.5); // Return final y position
      };
  
      // Helper to check and add new page when needed
      const checkNewPage = (currentYOffset, pageNum, neededSpace = 100) => {
        if (currentYOffset < neededSpace) {
          return addPage(pageNum);
        }
        return { page: currentPage, yOffset: currentYOffset };
      };
  
      // Start Page 1
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
  
      // Personal Information section
      yOffset = writeText(page, 'THIS IS THE LAST WILL AND TESTAMENT of me ' +
        `${formData.prefix || ''} ${formData.testatorName || ''} ${formData.suffix || ''}, ` +
        `a ${formData.occupation || ''} whose address is ${formData.address || ''} ` +
        `in the parish of ${formData.parish || ''}.`, {
        y: yOffset,
        lineSpacing: 1.5
      });
      yOffset -= 30;
  
      // Section 1 - Revocation
      yOffset = writeText(page, '1. I HEREBY REVOKE all Wills and Testamentary dispositions heretofore by me made AND ' +
        'DECLARE this to be my Last Will and Testament.', {
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
  
      // Executor details
      formData.executors?.forEach((executor, index) => {
        let executorText = `I HEREBY APPOINT ${executor.name || ''}, my ${executor.relationship || ''}, ` +
          `${executor.occupation || ''}, of ${executor.address || ''}, in the parish of ${executor.parish || ''}`;
        
        if (index < formData.executors.length - 1) {
          executorText += ' AND ';
        }
  
        yOffset = writeText(page, executorText, {
          y: yOffset,
          lineSpacing: 1.5
        });
        yOffset -= 20;
      });
  
      yOffset = writeText(page, 'to be the Executor and Trustee of this my Will (hereinafter referred to as "my Trustee").', {
        y: yOffset,
        lineSpacing: 1.5
      });
      yOffset -= 30;
  
      // Section 3 - Debts
      yOffset = writeText(page, '3. I DIRECT that as soon as possible after my decease my Trustees shall pay all my just debts, funeral, ' +
        'tombing and testamentary expenses.', {
        y: yOffset,
        lineSpacing: 1.5
      });
      yOffset -= 30;
  
      // Section 4 - Funeral Arrangements
      yOffset = writeText(page, '4. FUNERAL AND BURIAL ARRANGEMENTS', {
        y: yOffset,
        font: timesBold
      });
      yOffset -= 20;
  
      yOffset = writeText(page, 'I HEREBY DIRECT that my body be prepared for burial in an appropriate manner and that ' +
        'my funeral expenses and any debts be paid out of my estate, along with the following:', {
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
  
      // Start Section 5 - Possessions (new page)
      ({ page: currentPage, yOffset } = addPage(2));
  
      yOffset = writeText(currentPage, '5. I GIVE DEVISE AND BEQUEATH:', {
        y: yOffset,
        font: timesBold
      });
      yOffset -= 25;
  
      // Property Section
      if (formData.possessions.some(p => p.type === 'Property')) {
        yOffset = writeText(currentPage, 'a. PROPERTY', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const properties = formData.possessions.filter(p => p.type === 'Property');
        properties.forEach((property, index) => {
          const ordinal = index === 0 ? '1st' : index === 1 ? '2nd' : '3rd';
          yOffset = writeText(currentPage, `i. ${ordinal} Property- situate at ${property.address}, in the parish of ${property.parish} registered at Volume ${property.volume} and Folio ${property.folio} of the Register Book of Titles to ${property.beneficiary}.`, {
            y: yOffset,
            indent: 1,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        });
      }
  
      // Check for new page before Shares section
      ({ page: currentPage, yOffset } = checkNewPage(yOffset, 2));
  
      // Shares and Stocks Section
      if (formData.possessions.some(p => p.type === 'Shares and Stocks')) {
        yOffset = writeText(currentPage, 'b. SHARES AND STOCKS', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const shares = formData.possessions.filter(p => p.type === 'Shares and Stocks');
        shares.forEach((share, index) => {
          yOffset = writeText(currentPage, `i. Shares in ${share.company} held in ${share.country} at ${share.exchange} in account numbered ${share.accountNumber} to ${share.beneficiary} of ${share.beneficiaryAddress}.`, {
            y: yOffset,
            indent: 1,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        });
      }
  
      // Insurance Section
      if (formData.possessions.some(p => p.type === 'Insurance')) {
        yOffset = writeText(currentPage, 'c. INSURANCE', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const insurances = formData.possessions.filter(p => p.type === 'Insurance');
        insurances.forEach((insurance, index) => {
          yOffset = writeText(currentPage, `i. Proceeds of insurance policy numbered ${insurance.policyNumber}, held at ${insurance.company} located at ${insurance.address}, ${insurance.country} to ${insurance.beneficiary}.`, {
            y: yOffset,
            indent: 1,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        });
      }
  
      // Start new page for Bank Accounts
      ({ page: currentPage, yOffset } = addPage(3));
  
      // Bank Accounts Section
      if (formData.possessions.some(p => p.type === 'Bank Accounts')) {
        yOffset = writeText(currentPage, 'd. BANK ACCOUNTS', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const accounts = formData.possessions.filter(p => p.type === 'Bank Accounts');
        accounts.forEach((account, index) => {
          yOffset = writeText(currentPage, `i. Proceeds of bank account numbered ${account.accountNumber}, held at ${account.bank} located at ${account.address}, ${account.country} to ${account.beneficiary} of ${account.beneficiaryAddress}.`, {
            y: yOffset,
            indent: 1,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        });
      }
  
      // Motor Vehicle Section
      if (formData.possessions.some(p => p.type === 'Motor Vehicle')) {
        yOffset = writeText(currentPage, 'e. MOTOR VEHICLE', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const vehicles = formData.possessions.filter(p => p.type === 'Motor Vehicle');
        vehicles.forEach((vehicle, index) => {
          yOffset = writeText(currentPage, `i. ${vehicle.color} ${vehicle.make} ${vehicle.model} Motor vehicle bearing Licence plate number ${vehicle.licensePlate} and engine and chassis numbers ${vehicle.engineNumber}, ${vehicle.chassisNumber} to ${vehicle.beneficiary} of ${vehicle.beneficiaryAddress}.`, {
            y: yOffset,
            indent: 1,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        });
      }
  
      // Start new page for remaining possessions
      ({ page: currentPage, yOffset } = addPage(4));
  
      // Unpaid Salary Section
      if (formData.possessions.some(p => p.type === 'Unpaid Salary')) {
        yOffset = writeText(currentPage, 'f. UNPAID SALARY AND/EMOLUMENTS', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const salary = formData.possessions.find(p => p.type === 'Unpaid Salary');
        if (salary) {
          yOffset = writeText(currentPage, `Unpaid salary and/or emoluments with my employer, ${salary.employer} located at ${salary.employerAddress} to ${salary.beneficiary} of ${salary.beneficiaryAddress}.`, {
            y: yOffset,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        }
      }
  
      // NHT Contributions Section
      if (formData.possessions.some(p => p.type === 'NHT Contributions')) {
        yOffset = writeText(currentPage, 'g. NATIONAL HOUSING TRUST(NHT) CONTRIBUTIONS', {
          y: yOffset,
          font: timesBold
        });
        yOffset -= 20;
  
        const nht = formData.possessions.find(p => p.type === 'NHT Contributions');
        if (nht) {
          yOffset = writeText(currentPage, `Refund of National Housing Trust Contributions (${nht.nhtNumber}, ${nht.taxNumber}) to ${nht.beneficiary} of ${nht.beneficiaryAddress}.`, {
            y: yOffset,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        }
      }
  
      // Simple Possessions (Jewellery, Furniture, Paintings, Firearm)
      const simplePossessions = [
        { type: 'Jewellery', letter: 'h' },
        { type: 'Furniture', letter: 'i' },
        { type: 'Paintings', letter: 'j' },
        { type: 'Firearm', letter: 'k' }
      ];
  
      simplePossessions.forEach(({ type, letter }) => {
        const possession = formData.possessions.find(p => p.type === type);
        if (possession) {
          yOffset = writeText(currentPage, `${letter}. ${type.toUpperCase()}`, {
            y: yOffset,
            font: timesBold
          });
          yOffset -= 20;
  
          let text = '';
          if (type === 'Firearm') {
            text = `Firearm bearing serial and firearm licence numbers ${possession.serialNumber}, ${possession.licenseNumber} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
          } else if (type === 'Jewellery') {
            text = `${possession.description} described as my Jewellery to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
          } else {
            text = `${type} to ${possession.beneficiary} of ${possession.beneficiaryAddress}.`;
          }
  
          yOffset = writeText(currentPage, text, {
            y: yOffset,
            lineSpacing: 1.5
          });
          yOffset -= 25;
        }
      });
  
      // Residual Estate Section (new page)
      ({ page: currentPage, yOffset } = addPage(5));
  
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
      yOffset -= 20;
  
      yOffset = writeText(currentPage, '(Testator to sign here)', {
        y: yOffset
      });
      yOffset -= 30;
  
      // Witness Declaration
      yOffset = writeText(currentPage, `SIGNED by the Testator the said ${formData.testatorName || ''}, a ${formData.occupation || ''} of ${formData.address || ''}, in the parish of ${formData.parish || ''}, as my Last Will and Testament I declare that I have signed and`, {
        y: yOffset,
        lineSpacing: 1.5
      });
      yOffset -= 20;
  
      yOffset = writeText(currentPage, 'executed this Last will and testament willingly and in the presence of the following witnesses, who are present at the same time and who have signed as witnesses in my presence:', {
        y: yOffset,
        lineSpacing: 1.5
      });
      yOffset -= 30;
      yOffset = writeText(currentPage, 'WITNESSES', {
        y: yOffset,
        font: timesBold,
        size: 16,
        x: 50
      });
      yOffset -= 40;
  
      // Witnesses Section
    yOffset = writeText(currentPage, 'WITNESSES', {
      y: yOffset,
      font: timesBold,
      size: 16,
      x: 50
    });
    yOffset -= 40;

    // Add "Witnesses to sign here" with vertical line
    writeText(currentPage, 'Witnesses', {
      y: yOffset,
      x: 50,
      size: 12,
      font: timesRoman
    });
    yOffset -= 15;
    writeText(currentPage, 'to sign', {
      y: yOffset,
      x: 50,
      size: 12,
      font: timesRoman
    });
    yOffset -= 15;
    writeText(currentPage, 'here.', {
      y: yOffset,
      x: 50,
      size: 12,
      font: timesRoman
    });

    // Draw vertical line
    currentPage.drawLine({
      start: { x: 110, y: yOffset + 60 },
      end: { x: 110, y: yOffset - 20 },
      thickness: 1,
      color: rgb(0, 0, 0)
    });

    // Reset yOffset for witness details
    yOffset += 60;

    // Two-column layout with dotted lines and data
    const columns = [
      { x: 130, width: 250 },  // First column
      { x: 430, width: 250 }   // Second column
    ];

    formData.witnesses?.forEach((witness, index) => {
      const column = columns[index];
      let localY = yOffset;

      // Name and Signature
      writeText(currentPage, 'Name and', {
        y: localY,
        x: column.x,
        size: 12,
        font: timesBold
      });
      localY -= 20;
      writeText(currentPage, 'Signature:', {
        y: localY,
        x: column.x,
        size: 12,
        font: timesBold
      });

      // Add the witness name
      writeText(currentPage, witness.name || '', {
        y: localY,
        x: column.x + 100,  // Position after "Signature:"
        size: 12,
        font: timesRoman
      });

      // Dotted line for signature
      const lineLength = 250;
      const dotSpacing = 5;
      for (let i = 0; i < lineLength; i += dotSpacing) {
        currentPage.drawLine({
          start: { x: column.x + 100 + i, y: localY - 2 }, // Slightly below the text
          end: { x: column.x + 100 + i + 1, y: localY - 2 },
          thickness: 0.5,
          color: rgb(0, 0, 0)
        });
      }
      localY -= 40;

      // Address
      writeText(currentPage, 'Address:', {
        y: localY,
        x: column.x,
        size: 12,
        font: timesBold
      });

      // Add the address and parish
      const fullAddress = [witness.address, witness.parish]
        .filter(Boolean)
        .join(', ');
      
      writeText(currentPage, fullAddress, {
        y: localY,
        x: column.x + 100,
        size: 12,
        font: timesRoman
      });

      // Dotted line for address
      for (let i = 0; i < lineLength; i += dotSpacing) {
        currentPage.drawLine({
          start: { x: column.x + 100 + i, y: localY - 2 },
          end: { x: column.x + 100 + i + 1, y: localY - 2 },
          thickness: 0.5,
          color: rgb(0, 0, 0)
        });
      }
      localY -= 40;

      // Occupation
      writeText(currentPage, 'Occupation:', {
        y: localY,
        x: column.x,
        size: 12,
        font: timesBold
      });

      // Add the occupation
      writeText(currentPage, witness.occupation || '', {
        y: localY,
        x: column.x + 100,
        size: 12,
        font: timesRoman
      });

      // Dotted line for occupation
      for (let i = 0; i < lineLength; i += dotSpacing) {
        currentPage.drawLine({
          start: { x: column.x + 100 + i, y: localY - 2 },
          end: { x: column.x + 100 + i + 1, y: localY - 2 },
          thickness: 0.5,
          color: rgb(0, 0, 0)
        });
      }
    });

    yOffset -= 150; 

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };


     
  
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
          </section>
        );
      case 4:
        return (
            <section>
            <h2 className="text-2xl font-semibold mb-4">Spouse/Partner Details</h2>
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
        return (
          <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Identify Guardians for Minor Children</h2>
    
          {formData.livingChildren === 'no' || !formData.children?.length ? (
            <div className="p-4 bg-gray-100 rounded">
              <p>You have indicated that you have no minor children, so you do not need to identify any guardians.</p>
              <p className="mt-2">Click "Next" to continue...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {formData.children.map((child, index) => (
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
        <section className="distribute-possessions">
          <h2 className="text-2xl font-semibold mb-4">Distribute Your Possessions</h2>
          <p className="mb-4">You are now ready to specify how you wish your possessions to be distributed.</p>
          <h3 className="text-xl font-semibold mb-2">Remember:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>To reduce the likelihood of your Will being contested in a court of law, be as complete and unambiguous in your answers as possible.</li>
            <li>While answering the questions, if you need general assistance on the section, just read the Common Questions which appear on every page. If you don't see the questions, simply click on the big ? near the top of the page.</li>
            <li>Specific help for parts of a page that may be unclear is available by tapping (or moving your mouse over) the small ? symbol which appears next to some questions.</li>
            <li>You can come back at any time to revise your answers and keep your Will up to date, free of charge.</li>
          </ul>
          <p className="mb-4">Click on the "NEXT" button below to continue.</p>
        </section>
      );
      
      case 18:
        return (
          <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Make Bequests</h2>
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