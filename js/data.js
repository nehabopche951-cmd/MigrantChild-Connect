// MigrantChild Connect - Realistic Sample Data for Maharashtra Districts
// Covers Beed, Kolhapur, and Satara seasonal migration belts

const sampleDistricts = [
  { id: "kolhapur", name: "Kolhapur (कोल्हापूर)", lat: 16.7050, lng: 74.2433, desc: "Sugar mills & brick kilns corridor" },
  { id: "beed", name: "Beed (बीड)", lat: 18.9891, lng: 75.7601, desc: "Sugarcane cutter origin & seasonal hostel hub" },
  { id: "satara", name: "Satara (सातारा)", lat: 17.6805, lng: 73.9997, desc: "Agro-industrial & construction corridor" }
];

const sampleSchools = [
  {
    id: "sch-1",
    name: "Z.P. Primary School, Shiroli (जि.प. प्राथमिक शाळा, शिरोली)",
    districtId: "kolhapur",
    districtName: "Kolhapur",
    taluka: "Hatkanangale",
    type: "govt",
    typeName: "Government ZP School",
    medium: "Marathi",
    classes: "Classes 1 to 7",
    minAge: 6,
    maxAge: 13,
    distanceKm: 1.2,
    address: "Near Shiroli Gram Panchayat, Hatkanangale, Kolhapur",
    headmaster: "Shri. Sanjay Patil",
    phone: "+91 98220 14589",
    timings: "10:00 AM - 4:30 PM",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "10 Nov 2024",
    lat: 16.7450,
    lng: 74.2620,
    eligibilityText: "Open to all children aged 6 to 14. Mid-year admission guaranteed under RTE Section 4.",
    steps: [
      "Submit simple application or visit school office",
      "Teacher assesses age-appropriate class",
      "Immediate provisional admission & free uniform allotment",
      "Headmaster requests transfer record directly from previous school if needed"
    ],
    dates: "Admissions open throughout the academic year for seasonal migrant workers.",
    checklist: {
      required: [
        { id: "photo", name: "Child Passport Size Photo", desc: "1 copy for admission register" },
        { id: "age_proof", name: "Age Proof / Self-Declaration", desc: "Birth certificate OR parent's signed self-declaration of age" }
      ],
      optional: [
        { id: "aadhaar", name: "Aadhaar Card of Child/Parent", desc: "Helpful for DBT scholarship, not mandatory for entry" },
        { id: "caste_cert", name: "Caste / Category Certificate", desc: "For government welfare tracking if applicable" }
      ],
      conditional: [
        { id: "tc", name: "School Leaving / Transfer Certificate (TC)", desc: "If available. If not available, parent self-declaration is 100% accepted" },
        { id: "prev_report", name: "Previous School Marksheet", desc: "If available; if not, school will assess grade via bridge assessment" }
      ]
    }
  },
  {
    id: "sch-2",
    name: "Chhatrapati Shahu Sakhar Shala (हंगामी साखरशाळा, हातकणंगले)",
    districtId: "kolhapur",
    districtName: "Kolhapur",
    taluka: "Hatkanangale",
    type: "hostel",
    typeName: "Govt Seasonal Hostel School",
    medium: "Marathi / Hindi",
    classes: "Classes 1 to 4",
    minAge: 5,
    maxAge: 10,
    distanceKm: 0.8,
    address: "Near Datta Sugar Factory Labour Camp, Shirol, Kolhapur",
    headmaster: "Smt. Sunita Jadhav",
    phone: "+91 94238 78210",
    timings: "8:30 AM - 4:00 PM (Aligned with factory shifts)",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "12 Nov 2024",
    lat: 16.7510,
    lng: 74.2750,
    eligibilityText: "Specifically designed for sugarcane cutter children migrating with parents during crushing season.",
    steps: [
      "On-site registration at sugar factory labour camp",
      "No documents mandatory on day one; headmaster records parent details",
      "Free textbooks, school bag, morning breakfast & lunch provided"
    ],
    dates: "Active November through April during sugarcane crushing season.",
    checklist: {
      required: [
        { id: "photo", name: "Child Photo", desc: "Can be clicked at school via phone" },
        { id: "parent_decl", name: "Parent Identity & Migration Slip", desc: "Mukkadam slip or parent voter ID" }
      ],
      optional: [
        { id: "aadhaar", name: "Aadhaar Card", desc: "Optional" }
      ],
      conditional: [
        { id: "tc", name: "Transfer Certificate", desc: "NOT required; migration tracking card issued directly" }
      ]
    }
  },
  {
    id: "sch-3",
    name: "Mahatma Jyotirao Phule Ashram Shala (महात्मा फुले आश्रमशाळा, गेवराई)",
    districtId: "beed",
    districtName: "Beed",
    taluka: "Georai",
    type: "govt",
    typeName: "Govt Aided Residential School",
    medium: "Marathi",
    classes: "Classes 1 to 10",
    minAge: 6,
    maxAge: 16,
    distanceKm: 2.4,
    address: "National Highway 52, Georai Bypass, Beed",
    headmaster: "Shri. Balasaheb Deshmukh",
    phone: "+91 97631 45902",
    timings: "Residential / 9:30 AM - 5:00 PM",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "08 Nov 2024",
    lat: 19.0120,
    lng: 75.7510,
    eligibilityText: "Free residential boarding for children of seasonal migrant workers so they don't have to drop out.",
    steps: [
      "Parent fills residential hostel consent form",
      "Child provided safe hostel room, 3 meals daily, and health check",
      "Enrolled in regular ZP high school curriculum"
    ],
    dates: "Year-round admissions; special intake before sugarcane migration begins.",
    checklist: {
      required: [
        { id: "photo", name: "3 Passport Size Photos", desc: "For hostel register & ID card" },
        { id: "age_proof", name: "Birth Certificate or Gram Panchayat Slip", desc: "Age proof" }
      ],
      optional: [
        { id: "aadhaar", name: "Aadhaar Card", desc: "For DBT scholarship" },
        { id: "caste_cert", name: "Caste Certificate", desc: "For welfare entitlements" }
      ],
      conditional: [
        { id: "tc", name: "Previous TC / LC", desc: "School requests record via Saral portal if parent lacks hard copy" }
      ]
    }
  },
  {
    id: "sch-4",
    name: "Z.P. Kendrashala, Ashti (जि.प. केंद्रशाळा, आष्टी)",
    districtId: "beed",
    districtName: "Beed",
    taluka: "Ashti",
    type: "govt",
    typeName: "Government Model School",
    medium: "Marathi",
    classes: "Classes 1 to 7",
    minAge: 6,
    maxAge: 13,
    distanceKm: 1.5,
    address: "Near Old Bus Stand, Ashti Town, Beed",
    headmaster: "Smt. Rohini Kulkarni",
    phone: "+91 94227 63114",
    timings: "10:00 AM - 4:45 PM",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "05 Nov 2024",
    lat: 18.8020,
    lng: 75.1740,
    eligibilityText: "Model school with digital classrooms and special bridge classes for returnee migrant children.",
    steps: [
      "Direct walk-in or mobile application",
      "Teacher conducts friendly 10-minute assessment to find reading level",
      "Same-day classroom integration"
    ],
    dates: "Mid-year admission open 365 days under Maharashtra Education Code.",
    checklist: {
      required: [
        { id: "photo", name: "Child Photo", desc: "Passport size" },
        { id: "parent_decl", name: "Self-Declaration of Age", desc: "Simple 1-page form signed by parent" }
      ],
      optional: [
        { id: "aadhaar", name: "Aadhaar Card", desc: "Optional" }
      ],
      conditional: [
        { id: "prev_report", name: "Report Card", desc: "If available" }
      ]
    }
  },
  {
    id: "sch-5",
    name: "Karad Municipal Primary School No. 4 (कराड नगरपरिषद शाळा क्र. ४)",
    districtId: "satara",
    districtName: "Satara",
    taluka: "Karad",
    type: "govt",
    typeName: "Municipal Govt School",
    medium: "Marathi / Semi-English",
    classes: "Classes 1 to 8",
    minAge: 6,
    maxAge: 14,
    distanceKm: 1.9,
    address: "Mangalwar Peth, Near Krishna River Bridge, Karad, Satara",
    headmaster: "Shri. Prakash Thorat",
    phone: "+91 98902 44123",
    timings: "9:45 AM - 4:30 PM",
    seasonalHostel: false,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "11 Nov 2024",
    lat: 17.2880,
    lng: 74.1830,
    eligibilityText: "Urban local body school welcoming children of construction and seasonal bridge workers.",
    steps: [
      "Submit application with local contractor address or tent location",
      "Provisional admission issued immediately",
      "Uniform and mid-day meal card issued within 24 hours"
    ],
    dates: "Open for continuous admissions.",
    checklist: {
      required: [
        { id: "photo", name: "Child Photo", desc: "Required" },
        { id: "age_proof", name: "Birth Certificate OR Parent Affidavit", desc: "Parent affidavit on plain paper accepted" }
      ],
      optional: [
        { id: "aadhaar", name: "Aadhaar Card", desc: "Optional" }
      ],
      conditional: [
        { id: "tc", name: "Transfer Certificate", desc: "If migrating from another district, school requests digital copy from UDISE" }
      ]
    }
  },
  {
    id: "sch-6",
    name: "Shri Sant Gadge Maharaj Vidya Mandir, Phaltan (संत गाडगे महाराज शाळा, फलटण)",
    districtId: "satara",
    districtName: "Satara",
    taluka: "Phaltan",
    type: "private",
    typeName: "Govt Aided Private School",
    medium: "Marathi / Hindi",
    classes: "Classes 1 to 10",
    minAge: 6,
    maxAge: 16,
    distanceKm: 3.1,
    address: "Station Road, Near Sakhar Karkhana Colony, Phaltan, Satara",
    headmaster: "Shri. Rameshwar Shinde",
    phone: "+91 98231 99014",
    timings: "10:15 AM - 5:00 PM",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "02 Nov 2024",
    lat: 17.9890,
    lng: 74.4320,
    eligibilityText: "RTE 25% free quota for economically weaker and migrant children. Free schooling till Class 8.",
    steps: [
      "Apply through migrant quota or direct counter",
      "Document verification",
      "Immediate free book kit allocation"
    ],
    dates: "Ongoing mid-term entries.",
    checklist: {
      required: [
        { id: "photo", name: "Photo", desc: "Required" },
        { id: "parent_decl", name: "Age declaration", desc: "Signed by parent" }
      ],
      optional: [
        { id: "income_proof", name: "BPL Ration Card or MGNREGA Job Card", desc: "Optional proof of migrant status" }
      ],
      conditional: [
        { id: "tc", name: "TC / LC", desc: "Not mandatory for provisional entry" }
      ]
    }
  },
  {
    id: "sch-7",
    name: "Savitribai Phule Seasonal Bridge School (सावित्रीबाई फुले हंगामी शाळा, कसबा बावडा)",
    districtId: "kolhapur",
    districtName: "Kolhapur",
    taluka: "Karveer",
    type: "hostel",
    typeName: "NGO-Govt Seasonal Bridge Centre",
    medium: "Marathi",
    classes: "Classes 1 to 5",
    minAge: 5,
    maxAge: 11,
    distanceKm: 0.6,
    address: "Bawada Sugar Factory Labour Colony, Karveer, Kolhapur",
    headmaster: "Smt. Anjali Gaikwad",
    phone: "+91 94041 33281",
    timings: "9:00 AM - 3:30 PM",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "12 Nov 2024",
    lat: 16.7210,
    lng: 74.2510,
    eligibilityText: "Focused on bridging learning gaps for children who migrate every 6 months with sugarcane cutter parents.",
    steps: [
      "Volunteer visits labour tents to enroll child",
      "Child provided study kit and daily nutritious meal",
      "Migration learning passport issued when returning home"
    ],
    dates: "Open during crushing season (Oct - April).",
    checklist: {
      required: [
        { id: "photo", name: "Photo", desc: "Snapped by teacher" }
      ],
      optional: [],
      conditional: []
    }
  },
  {
    id: "sch-8",
    name: "Loknete Gopinath Munde Migrant Residential Hostel (गोपीनाथ मुंडे निवासी वसतिगृह, माजलगाव)",
    districtId: "beed",
    districtName: "Beed",
    taluka: "Majalgaon",
    type: "hostel",
    typeName: "Govt Migrant Residential Hostel",
    medium: "Marathi",
    classes: "Classes 1 to 8",
    minAge: 6,
    maxAge: 14,
    distanceKm: 2.8,
    address: "Majalgaon Town, Near Sub-district Hospital, Beed",
    headmaster: "Shri. Vitthalrao Ghodke",
    phone: "+91 98811 77652",
    timings: "Full-time Residential Hostel",
    seasonalHostel: true,
    freeMiddayMeal: true,
    verified: true,
    lastUpdated: "09 Nov 2024",
    lat: 19.1550,
    lng: 76.0590,
    eligibilityText: "Allows parents to migrate for sugarcane work while children stay back in home district in a secure, caring hostel with schooling.",
    steps: [
      "Parent registers child before migration season",
      "Free stay, nutritious food, clothes, medical care and school transport",
      "Parent can visit or call anytime"
    ],
    dates: "Admissions open throughout migration season.",
    checklist: {
      required: [
        { id: "photo", name: "Child & Parent Photo", desc: "Required for custody register" },
        { id: "age_proof", name: "Birth certificate or Ration Card", desc: "Age proof" }
      ],
      optional: [
        { id: "aadhaar", name: "Aadhaar Card", desc: "Optional" }
      ],
      conditional: [
        { id: "tc", name: "Transfer Certificate", desc: "School handles internal transfer" }
      ]
    }
  }
];

const sampleChildcareCentres = [
  {
    id: "cc-1",
    name: "Shiroli Sugar Mill Anganwadi Centre No. 12",
    nameMr: "शिरोली साखर कारखाना अंगणवाडी केंद्र क्र. १२",
    districtId: "kolhapur",
    districtName: "Kolhapur",
    address: "Datta Sugar Factory Worker Settlement, Shiroli, Kolhapur",
    distanceKm: 0.5,
    timings: "8:00 AM - 5:00 PM (Aligned with mill shifts)",
    sevikaName: "Savita Kamble (अंगणवाडी सेविका)",
    phone: "+91 98223 98112",
    availability: "confirmed",
    lastVerified: "Today, 11:30 AM",
    capacity: "35 Children (12 slots available)",
    services: [
      "Hot Nutritious Meals (Poshan Aahar twice daily)",
      "Safe Daycare & Resting Area for Infants (0-6 yrs)",
      "Monthly Health Checkup & Free Growth Monitoring",
      "Early Childhood Learning Toys & Games"
    ]
  },
  {
    id: "cc-2",
    name: "Hatkanangale Worksite Creche for Migrant Families",
    nameMr: "हातकणंगले विटभट्टी व बांधकाम पाळणाघर",
    districtId: "kolhapur",
    districtName: "Kolhapur",
    address: "Near Shiroli Brick Kiln Cluster, Hatkanangale, Kolhapur",
    distanceKm: 1.1,
    timings: "7:30 AM - 5:30 PM",
    sevikaName: "Meenakshi Bhosale",
    phone: "+91 94220 54129",
    availability: "confirmed",
    lastVerified: "Yesterday",
    capacity: "25 Children (8 slots available)",
    services: [
      "Clean Drinking Water & Warm Porridge/Milk",
      "Safe Fenced Play Area away from heavy machinery",
      "Trained Caretaker (दाई) on site",
      "First Aid & Emergency Doctor on Call"
    ]
  },
  {
    id: "cc-3",
    name: "Georai Canal Belt Anganwadi Centre No. 4",
    nameMr: "गेवराई कालवा अंगणवाडी केंद्र क्र. ४",
    districtId: "beed",
    districtName: "Beed",
    address: "Opposite Z.P. School, Georai Rural, Beed",
    distanceKm: 0.9,
    timings: "9:00 AM - 4:00 PM",
    sevikaName: "Chhaya Sonawane",
    phone: "+91 97645 22910",
    availability: "confirmed",
    lastVerified: "10 Nov 2024",
    capacity: "30 Children (5 slots available)",
    services: [
      "Egg & Khichdi Nutritional Meal",
      "Preschool Activity Songs & Stories in Marathi",
      "Polio & Routine Immunization Drives",
      "Adolescent Girl & Mother Nutrition Counseling"
    ]
  },
  {
    id: "cc-4",
    name: "Karad Construction Labour Creche (कौशल्य पाळणाघर)",
    nameMr: "कराड बांधकाम कामगार पाळणाघर, कराड नाका",
    districtId: "satara",
    districtName: "Satara",
    address: "Near Karad Highway Flyover Worksite, Karad, Satara",
    distanceKm: 1.4,
    timings: "8:00 AM - 6:00 PM",
    sevikaName: "Archana Salunkhe",
    phone: "+91 98814 11204",
    availability: "pending",
    lastVerified: "09 Nov 2024",
    capacity: "20 Children (Call to confirm vacancy)",
    services: [
      "Safe Enclosure for Infants while parents work",
      "Nutritious Supplementary Food",
      "Resting Cots & Clean Toilets",
      "Health Card Registration under BOCW Board"
    ]
  },
  {
    id: "cc-5",
    name: "Phaltan Sugar Workers Childcare Centre",
    nameMr: "फलटण साखर कामगार बालसंगोपन केंद्र",
    districtId: "satara",
    districtName: "Satara",
    address: "Sugar Mill Gate No. 2, Phaltan, Satara",
    distanceKm: 0.7,
    timings: "8:00 AM - 5:00 PM",
    sevikaName: "Mangal Pawar",
    phone: "+91 94038 66190",
    availability: "confirmed",
    lastVerified: "11 Nov 2024",
    capacity: "40 Children (15 slots available)",
    services: [
      "Fresh Cooked Balanced Meals",
      "Early Marathi & Counting Games",
      "Emergency Vehicle Assistance",
      "Warm Blankets & Clean Mats"
    ]
  }
];

// Preloaded realistic sample children & applications
const initialSampleChildren = [
  {
    id: "child-1",
    name: "Aarav Ramesh Rathod",
    age: 8,
    targetClass: "Class 3",
    gender: "Male",
    parentName: "Ramesh Rathod",
    phone: "98221 44501",
    originDistrict: "Beed (बीड)",
    currentDistrict: "Kolhapur (कोल्हापूर)",
    workSector: "Sugarcane Harvesting (ऊसतोड)",
    prevSchool: "Z.P. School Ashti, Beed",
    worksiteAddress: "Datta Sugar Mill Camp, Shiroli, Kolhapur",
    documents: {
      photo: { uploaded: true, name: "aarav_photo.jpg", date: "10 Nov 2024" },
      birth_cert: { uploaded: true, name: "birth_slip_beed.pdf", date: "10 Nov 2024" },
      report_card: { uploaded: false, name: null, date: null },
      tc: { uploaded: false, name: null, date: null },
      aadhaar: { uploaded: true, name: "aadhaar_masked.pdf", date: "10 Nov 2024" },
      migration_slip: { uploaded: true, name: "mukkadam_chitti.jpg", date: "10 Nov 2024" }
    },
    application: {
      hasApplied: true,
      appId: "MC-2024-8921",
      schoolId: "sch-1",
      schoolName: "Z.P. Primary School, Shiroli",
      appliedDate: "11 Nov 2024",
      status: "review", // 'submitted', 'review', 'moredocs', 'accepted'
      statusLabel: "Under Review (तपासणी सुरू)",
      notes: "Headmaster has acknowledged self-declaration. Provisional seat allocated."
    }
  },
  {
    id: "child-2",
    name: "Sakshi Sunil Pawar",
    age: 6,
    targetClass: "Class 1",
    gender: "Female",
    parentName: "Sunil Pawar",
    phone: "94220 89311",
    originDistrict: "Jalna (जालना)",
    currentDistrict: "Satara (सातारा)",
    workSector: "Brick Kiln (विटभट्टी)",
    prevSchool: "None (First Time Enrolment)",
    worksiteAddress: "Karad Brick Kiln Colony, Satara",
    documents: {
      photo: { uploaded: true, name: "sakshi_photo.jpg", date: "09 Nov 2024" },
      birth_cert: { uploaded: true, name: "anganwadi_age_record.pdf", date: "09 Nov 2024" },
      report_card: { uploaded: false, name: null, date: null },
      tc: { uploaded: false, name: null, date: null },
      aadhaar: { uploaded: false, name: null, date: null },
      migration_slip: { uploaded: true, name: "brick_kiln_pass.pdf", date: "09 Nov 2024" }
    },
    application: {
      hasApplied: true,
      appId: "MC-2024-7740",
      schoolId: "sch-5",
      schoolName: "Karad Municipal Primary School No. 4",
      appliedDate: "09 Nov 2024",
      status: "accepted",
      statusLabel: "Admission Accepted! (प्रवेश मंजूर)",
      notes: "Admitted into Class 1. Free uniform & Marathi primer handed over."
    }
  },
  {
    id: "child-3",
    name: "Rohan Vilas Shinde",
    age: 11,
    targetClass: "Class 6",
    gender: "Male",
    parentName: "Vilas Shinde",
    phone: "97632 01844",
    originDistrict: "Beed (बीड)",
    currentDistrict: "Kolhapur (कोल्हापूर)",
    workSector: "Sugarcane Harvesting (ऊसतोड)",
    prevSchool: "Z.P. School Georai",
    worksiteAddress: "Khatav Phata Sugar Mill Settlement, Kolhapur",
    documents: {
      photo: { uploaded: true, name: "rohan_photo.jpg", date: "08 Nov 2024" },
      birth_cert: { uploaded: false, name: null, date: null },
      report_card: { uploaded: true, name: "std5_eval_slip.pdf", date: "08 Nov 2024" },
      tc: { uploaded: false, name: null, date: null },
      aadhaar: { uploaded: false, name: null, date: null },
      migration_slip: { uploaded: false, name: null, date: null }
    },
    application: {
      hasApplied: true,
      appId: "MC-2024-6512",
      schoolId: "sch-2",
      schoolName: "Chhatrapati Shahu Sakhar Shala",
      appliedDate: "08 Nov 2024",
      status: "moredocs",
      statusLabel: "More Documents Required (कागदपत्रे हवीत)",
      notes: "Please submit parent age declaration slip for Class 6 enrolment."
    }
  },
  {
    id: "child-4",
    name: "Meena Prakash Chavan",
    age: 9,
    targetClass: "Class 4",
    gender: "Female",
    parentName: "Prakash Chavan",
    phone: "98901 77209",
    originDistrict: "Osmanabad (उस्मानाबाद)",
    currentDistrict: "Satara (सातारा)",
    workSector: "Construction (बांधकाम)",
    prevSchool: "Z.P. School Omerga",
    worksiteAddress: "Phaltan Bypass Construction Camp, Satara",
    documents: {
      photo: { uploaded: true, name: "meena_pic.jpg", date: "11 Nov 2024" },
      birth_cert: { uploaded: true, name: "gram_panchayat_letter.pdf", date: "11 Nov 2024" },
      report_card: { uploaded: false, name: null, date: null },
      tc: { uploaded: true, name: "provisional_tc.pdf", date: "11 Nov 2024" },
      aadhaar: { uploaded: true, name: "aadhaar_card.pdf", date: "11 Nov 2024" },
      migration_slip: { uploaded: false, name: null, date: null }
    },
    application: {
      hasApplied: true,
      appId: "MC-2024-9104",
      schoolId: "sch-6",
      schoolName: "Shri Sant Gadge Maharaj Vidya Mandir, Phaltan",
      appliedDate: "11 Nov 2024",
      status: "submitted",
      statusLabel: "Submitted (अर्ज सादर केला)",
      notes: "Application dispatched to School In-charge."
    }
  },
  {
    id: "child-5",
    name: "Tanvi Dilip Jadhav",
    age: 7,
    targetClass: "Class 2",
    gender: "Female",
    parentName: "Dilip Jadhav",
    phone: "98233 11890",
    originDistrict: "Parbhani (परभणी)",
    currentDistrict: "Beed (बीड)",
    workSector: "Farming / Agriculture",
    prevSchool: "Z.P. Primary School Jintur",
    worksiteAddress: "Georai Farm Cluster, Beed",
    documents: {
      photo: { uploaded: false, name: null, date: null },
      birth_cert: { uploaded: false, name: null, date: null },
      report_card: { uploaded: false, name: null, date: null },
      tc: { uploaded: false, name: null, date: null },
      aadhaar: { uploaded: false, name: null, date: null },
      migration_slip: { uploaded: false, name: null, date: null }
    },
    application: {
      hasApplied: false,
      appId: null,
      schoolId: null,
      schoolName: null,
      appliedDate: null,
      status: "not_applied",
      statusLabel: "Not Applied Yet",
      notes: "Flagged by local Anganwadi worker for urgent school enrolment."
    }
  }
];

// Document Alternatives Legal Knowledge Base
const documentAlternatives = {
  birth_cert: {
    titleEn: "Birth Certificate (जन्म दाखला / जन्म प्रमाण)",
    solutionEn: "Under Section 14 of the RTE Act 2009, no child can be denied admission for lack of a birth certificate. You can provide any of these alternatives:\n1. A simple self-declaration of the child's date of birth signed or thumb-printed by the parent.\n2. Anganwadi register record card.\n3. Hospital or Auxillary Nurse Midwife (ANM) maternity register card.\n4. Affidavit on plain paper stamped by Gram Panchayat Sarpanch or Police Patil.",
    solutionMr: "शिक्षण हक्क कायदा (RTE) कलम १४ नुसार जन्म दाखला नसल्यास कोणताही शाळा प्रवेश नाकारू शकत नाही. तुम्ही पुढीलपैकी कोणताही पर्याय वापरू शकता:\n१. पालकांचे साध्या कागदावरील स्वाक्षरी किंवा अंगठ्यासह जन्म तारखेचे हमीपत्र (Self-Declaration).\n२. अंगणवाडी नोंदवहीतील नोंद अथवा लस कार्ड.\n३. ग्रामपंचायत सरपंच अथवा पोलीस पाटलांचे शिफारस पत्र.\nशाळा या हमीपत्रावर ताबडतोब प्रवेश देण्यास बांधील आहे.",
    solutionHi: "शिक्षा का अधिकार (RTE) की धारा 14 के अनुसार जन्म प्रमाण पत्र न होने पर भी दाखिला रोका नहीं जा सकता। आप इनमें से कोई भी विकल्प दे सकते हैं:\n1. माता-पिता द्वारा सादे कागज़ पर हस्ताक्षरित या अंगूठा लगा स्व-घोषणा पत्र।\n2. आँगनवाड़ी रिकॉर्ड कार्ड या टीकाकरण पर्ची।\n3. ग्राम प्रधान / पुलिस पाटिल द्वारा प्रमाणित पत्र।"
  },
  tc: {
    titleEn: "Transfer Certificate (TC / शाळा सोडल्याचा दाखला)",
    solutionEn: "As per Ministry of Education guidelines and Maharashtra Govt Resolution (GR):\n1. Children of migrant workers can be admitted WITHOUT an immediate TC.\n2. The admitting school will give provisional admission immediately and request the digital transfer (Saral / UDISE portal) directly from the previous school.\n3. A self-declaration by parent stating previous schooling details is fully valid.",
    solutionMr: "महाराष्ट्र शासन निर्णय आणि शिक्षण मंत्रालयाच्या नियमांनुसार:\n१. स्थलांतरित पालकांच्या मुलांना तात्काळ टीसी (TC) नसतानाही प्रवेश देणे बंधनकारक आहे.\n२. शाळा तात्पुरता प्रवेश देईल आणि 'सरल' (SARAL) पोर्टलवरून मागील शाळेकडून डिजिटल दाखला स्वतः मागवून घेईल.\n३. पालकांनी केवळ पूर्वी मूल कोणत्या इयत्तेत शिकत होते याचे हमीपत्र द्यावे.",
    solutionHi: "शिक्षा मंत्रालय और महाराष्ट्र सरकार के नियमों के अनुसार:\n1. प्रवासी मजदूरों के बच्चों को बिना तुरंत टीसी (TC) के भी अस्थायी दाखिला दिया जाना अनिवार्य है।\n2. स्कूल बच्चे को तुरंत कक्षा में बैठाएगा और सरल (SARAL) पोर्टल से पिछले स्कूल से डिजिटल रिकॉर्ड खुद मंगाएगा।\n3. अभिभावक का एक सामान्य घोषणा पत्र ही शुरुआत के लिए पर्याप्त है।"
  },
  report_card: {
    titleEn: "Previous Report Card / Marksheet (मागील गुणपत्रिका)",
    solutionEn: "If report card is not available from previous village:\n1. The school teacher will conduct a non-punitive friendly reading & basic math assessment to place the child in an age-appropriate class.\n2. Bridge course (सेतू अभ्यास) materials will be provided free of cost to help the child catch up.",
    solutionMr: "मागील गुणपत्रिका उपलब्ध नसल्यास:\n१. शिक्षक मुलाची साधी वाचन व अंकगणित चाचणी घेऊन त्याच्या वयानुसार योग्य इयत्तेत बसवतील.\n२. मागील अभ्यास भरून काढण्यासाठी मोफत 'सेतू अभ्यास' (Bridge Course) साहित्य दिले जाईल.",
    solutionHi: "पिछली मार्कशीट उपलब्ध न होने पर:\n1. शिक्षक बच्चे की सामान्य पढ़ाई देखकर उसकी उम्र के अनुसार सही कक्षा में बैठाएंगे।\n2. छूटी हुई पढ़ाई पूरी करने के लिए मुफ्त सेतु अभ्यास सामग्री दी जाएगी।"
  },
  aadhaar: {
    titleEn: "Aadhaar Card (आधार कार्ड)",
    solutionEn: "As per the Supreme Court of India ruling and RTE guidelines:\n1. Aadhaar is strictly OPTIONAL for school admission. No child can be turned away for not having an Aadhaar card.\n2. The school is required to help generate child Aadhaar through local camps after admission.",
    solutionMr: "सर्वोच्च न्यायालयाच्या निर्णयानुसार आणि RTE नियमांनुसार:\n१. शाळा प्रवेशासाठी आधार कार्ड सक्तीचे नाही (ऐच्छिक आहे). आधार नसल्यामुळे प्रवेश नाकारता येत नाही.\n२. प्रवेश दिल्यानंतर शाळा स्वतः आधार कॅम्प लावून मुलाचे आधार कार्ड काढण्यास मदत करेल.",
    solutionHi: "माननीय सर्वोच्च न्यायालय के आदेशानुसार:\n1. स्कूल दाखिले के लिए आधार कार्ड अनिवार्य नहीं है। आधार न होने के कारण दाखिला नहीं रोका जा सकता।\n2. दाखिले के बाद स्कूल स्वयं बच्चे का आधार कार्ड बनवाने में सहयोग करेगा।"
  },
  photo: {
    titleEn: "Child Photo (मुलाचा फोटो)",
    solutionEn: "No need to go to a photo studio. The school headmaster or Anganwadi Sevika can snap a photo with a smartphone for the register.",
    solutionMr: "फोटो स्टुडिओमध्ये जाण्याची गरज नाही. शाळेचे शिक्षक अथवा अंगणवाडी सेविका मोबाईलवर फोटो काढून अर्जाला जोडू शकतात.",
    solutionHi: "फोटो स्टूडियो जाने की जरूरत नहीं है। शिक्षक या आँगनवाड़ी कार्यकर्ता मोबाइल से फोटो खींचकर फॉर्म में लगा सकते हैं।"
  },
  migration_slip: {
    titleEn: "Worksite / Migration Slip (ऊसतोड पावती किंवा जॉब कार्ड)",
    solutionEn: "A receipt from the labour contractor (Mukkadam), factory slip, MGNREGA card, or simple village address note is accepted.",
    solutionMr: "मुकादमाची चिठ्ठी, साखर कारखान्याचा पास, रोजगार हमी जॉब कार्ड किंवा वस्तीचा साधे पत्ता पुरावा चालतो.",
    solutionHi: "मुकादम की पर्ची, चीनी मिल पास, मनरेगा जॉब कार्ड या कार्यस्थल का सामान्य पता मान्य है।"
  }
};

// Emergency Helplines for Maharashtra
const emergencyHelplines = [
  {
    name: "Childline 1098 (चाइल्डलाईन)",
    number: "1098",
    tel: "tel:1098",
    badge: "24x7 Toll Free",
    desc: "National 24/7 emergency service for children in need of care and protection."
  },
  {
    name: "Emergency Police 112 (पोलीस मदत)",
    number: "112",
    tel: "tel:112",
    badge: "Immediate Response",
    desc: "National emergency police, ambulance and fire response system."
  },
  {
    name: "Women & Child Helpline 181 (महिला व बाल मदत)",
    number: "181",
    tel: "tel:181",
    badge: "Govt of Maharashtra",
    desc: "Dedicated state support for women and vulnerable children facing distress."
  },
  {
    name: "District Child Protection Unit (DCPU Kolhapur)",
    number: "+91 231 2652190",
    tel: "tel:+912312652190",
    badge: "District Officer",
    desc: "District Child Protection Officer & Child Welfare Committee (CWC)."
  },
  {
    name: "District Child Protection Unit (DCPU Beed)",
    number: "+91 2442 223401",
    tel: "tel:+912442223401",
    badge: "District Officer",
    desc: "Special welfare and seasonal hostel cell for sugarcane migrant children."
  }
];
