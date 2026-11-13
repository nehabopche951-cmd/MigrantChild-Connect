# MigrantChild Connect (मायग्रंट चाईल्ड कनेक्ट)

> **Education & Child Protection Platform for Migrant and Seasonal Worker Families**

A clean, mobile-first web app prototype built to help seasonal worker families (such as sugarcane cutters, brick kiln workers, and construction labourers moving across Maharashtra) find schools, safely store documents, secure mid-year admissions, locate trusted childcare (Anganwadi), and access child protection helplines.

Designed specifically for semi-literate parents with **large touch targets, intuitive iconography, calm blue and green colors, audio read-aloud support, and instant trilingual switching (English, मराठी, हिंदी)**.

---

## 🚀 Quick Start / How to Run

Because this prototype is built using modern vanilla web technologies (HTML5, CSS3, JavaScript ES6+), it requires **zero external dependencies or npm build steps**.

### Option 1: Run with Python Local Server (Recommended)
Open a terminal in the project folder and run:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Direct Browser Launch
Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

---

## 🌟 Key Features & Implementation Details

### 1. Trilingual Support with Instant Switcher
- **Languages**: English | मराठी (Marathi) | हिंदी (Hindi)
- Top-right language buttons allow instantaneous switching across all labels, headings, document lists, assistant suggestions, and admin reports.
- Defaulted to Marathi to reflect seasonal sugarcane corridors in Western Maharashtra and Marathwada (Beed, Kolhapur, Satara).

### 2. Login & Onboarding
- Mobile number input + demo OTP with a convenient **"Auto-fill 1234"** button.
- Asks: *"Did your family recently move for work?"* with seasonal work categories:
  - Sugarcane Harvesting (ऊसतोड कामगार)
  - Brick Kiln (विटभट्टी कामगार)
  - Construction (बांधकाम कामगार)
  - Farming / Agriculture (शेती काम)
  - Other Daily Wage Work
- Initial Child Profile creation: Name, Age, Target Class, Origin Village/District, Current Work District, and Previous School.
- Profile switcher supports multiple children per family.

### 3. Home Screen Hub
- High-contrast **"Emergency 1098"** red button at the top header and prominent card for instant Childline / 112 dialing.
- Seasonal migration 3-step action banner:
  1. *Store Documents* (upload slips or use parent self-declarations)
  2. *Find Nearby School* (locate ZP and Seasonal Hostel schools)
  3. *Quick Admission* (leverage the Right to Education Act mid-year guarantee)
- 5 Big hub cards:
  - 🏫 **Find School**
  - 📁 **Document Wallet**
  - 🧸 **Safe Childcare & Anganwadi**
  - 🤖 **Ask AI Assistant**
  - 🛡️ **Child Protection & Help**
- Real-time application tracker preview banner.

### 4. Smart School Finder (Maharashtra Focus)
- Realistic schools across **Kolhapur, Beed, and Satara**:
  - *Z.P. Primary School, Shiroli* (Govt ZP School, Marathi)
  - *Chhatrapati Shahu Sakhar Shala* (Seasonal Hostel School near Datta Sugar Mill)
  - *Mahatma Jyotirao Phule Ashram Shala, Georai* (Residential Aided School)
  - *Z.P. Kendrashala, Ashti* (Model Govt School)
  - *Karad Municipal School No. 4* (Urban Local Body School)
  - *Shri Sant Gadge Maharaj Vidya Mandir, Phaltan* (Govt Aided)
  - *Savitribai Phule Seasonal Bridge Centre, Kasba Bawada* (NGO-Govt)
  - *Loknete Gopinath Munde Migrant Residential Hostel, Majalgaon*
- Location input + **"📍 Use My Location"** simulation cycling between migrant corridors.
- Filters: Distance (2km, 5km, All), School Type (Govt, Seasonal Hostel, Private), Medium (Marathi, Hindi, English).
- **List View & Interactive SVG Map View** with color-coded clickable school pins.

### 5. School Detail & Admission Guide
- Detailed breakdown of:
  - Eligibility and Age Criteria
  - Step-by-step admission process
  - Important dates (highlighting year-round continuous admission)
  - Direct Headmaster phone call button (`tel:`)
  - Verification badge and last-updated timestamp
- **Legal RTE Act Section 4 Notice**: Emphasizes that by law no school in Maharashtra can deny mid-year admission to a child of seasonal migrant workers.
- Categorized Document Checklist:
  - **Required**: Child Photo, Age proof / Parent declaration
  - **Optional**: Aadhaar card, Caste certificate
  - **Conditional**: Transfer Certificate (TC/LC) — with clear note that parent self-declaration is accepted if hard copy is unavailable.

### 6. Document Wallet (DigiLocker for Migrant Parents)
- Safe digital storage with status badges: **Uploaded (हिरवा टिक)** or **Missing (लाल क्रॉस)**.
- Simulated one-tap upload for:
  - Birth Certificate
  - Previous Report Card / Marksheet
  - Transfer Certificate (TC / LC)
  - Child Photo
  - Aadhaar Card (Optional)
  - Migration / Worksite Slip (Mukkadam receipt)
- **"Don't have this document?" button on every item**:
  - Explains legal alternatives under **RTE Section 14** (e.g. parent self-declaration of age, hospital birth record, or Anganwadi card).
  - Explicit advisory note: *"Please confirm with the school or official office."*

### 7. Missing-Document Check
- Compares wallet documents against any selected school's requirements.
- Clean visual display:
  - ✅ Available documents
  - ❌ Missing documents with immediate action advice and one-tap upload
- Direct link to proceed to the Admission Application form with provisional declarations.

### 8. Auto-Filled Admission Form & Application Tracker
- Automatically pulls details from the active child profile (Child name, Age, Class, Parent contact, Worksite camp).
- Allows parent to review and submit with one tap.
- **Application Tracker**:
  - Visual 4-step progress stepper:
    1. *Submitted (अर्ज सादर केला)*
    2. *Under Review (तपासणी सुरू)*
    3. *More Documents Required (कागदपत्रे हवीत)*
    4. *Accepted (प्रवेश मंजूर)*
  - Clearly labeled with **"DEMO STATUS - For prototype demonstration"**.
  - Interactive simulator buttons allowing testers to preview all 4 statuses dynamically.

### 9. Safe Childcare & Anganwadi Finder
- 5 realistic childcare centres near sugar mills and construction sites:
  - *Shiroli Sugar Mill Anganwadi Centre No. 12* (8:00 AM - 5:00 PM)
  - *Hatkanangale Worksite Creche for Migrant Families*
  - *Georai Canal Belt Anganwadi Centre No. 4*
  - *Karad Construction Labour Creche*
  - *Phaltan Sugar Workers Childcare Centre*
- Lists services provided: Hot nutritious meals (Poshan Aahar), early childhood learning, immunization, safe resting cots.
- Includes Anganwadi Sevika phone contact and verified availability status badge.

### 10. AI Multilingual Assistant
- Voice and text chat assistant for migrant parents.
- **Microphone button**: Uses browser Web Speech API for voice recognition, with intelligent fallback.
- **"Read Aloud" button**: Speaks answers aloud in Marathi (`mr-IN`), Hindi (`hi-IN`), or English (`en-IN`) using the browser's speech synthesis engine.
- Answers key inquiries:
  - *"How do I get admission mid-year?"*
  - *"What if I don't have a Transfer Certificate (TC)?"*
  - *"Where can I leave my child while I work?"*
  - *"Can a government school charge admission fees?"*
  - *"What is a Seasonal Hostel (साखरशाळा)?"*
- Always appends official closing disclaimer:
  *"Please confirm with the school or official office."*

### 11. Child Protection & Help Centre
- Verified tap-to-call emergency helplines:
  - **Childline 1098** (National 24/7 emergency service)
  - **Emergency Police 112**
  - **Maharashtra Women & Child Helpline 181**
  - **District Child Protection Units (DCPU Kolhapur & Beed)**
- Educational guidance cards:
  - *What is Child Labour?* (Illegal under 14 at sugar mills, brick kilns, construction)
  - *How to Report Abuse* (Free, confidential 1098 protocol)
  - *Emergency at Worksite*
- Confidential **"Report a Concern"** form with anonymous reporting toggle and ticket generation.

### 12. Privacy Policy & Principles
- Plain-language privacy pledge:
  - No data selling to third parties.
  - Documents shared only with chosen schools upon explicit submission.
  - Aadhaar number masking.
  - Full right to erase/reset data anytime.

### 13. Admin Dashboard (`/admin` or top navigation switch)
- District child welfare monitoring portal:
  - 4 Key Metrics: Children Registered (142), Applications Submitted (98), Pending Documents (34), Flagged Out-of-School (19).
  - Children served by district visual bar chart (Kolhapur, Beed, Satara, Pune, Jalna).
  - Applications table with **"Request More Docs"** (simulates parent SMS notice) and **"Approve Admission"** workflow buttons.

---

## 📱 Mobile-First Design & Desktop Testing
- On mobile screens, the app renders seamlessly as a native-feeling progressive web app with a sticky bottom navigation bar.
- On desktop screens, a floating **"💻 Full Screen / 📱 Phone View"** toggle button allows you to switch between a realistic mobile phone mockup and an expanded responsive widescreen layout.

---

## 📂 Project Directory Structure

```
MigrantChild Connect/
├── index.html              # Main Single-Page Application entry point
├── css/
│   └── styles.css          # Design system (calm blues & greens, big buttons, accessible cards)
├── js/
│   ├── translations.js     # Full multilingual dictionary (English, मराठी, हिंदी)
│   ├── data.js             # Realistic sample data for Maharashtra districts & schools
│   ├── assistant.js        # AI Multilingual Assistant, Speech recognition & Read-Aloud TTS
│   └── app.js              # Application state manager, router, missing-doc logic, tracker
└── README.md               # Documentation & usage guide
```

---

*MigrantChild Connect Prototype — Empowering every migrant child with uninterrupted education and safe care.*

