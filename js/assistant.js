// MigrantChild Connect - AI Multilingual Assistant
// Supports Marathi, Hindi, English intent matching, Speech-to-Text & Text-to-Speech

const assistantResponses = {
  midyear: {
    keywords: ["mid-year", "mid year", "middle of year", "मध्यात", "सत्राच्या", "वर्षभर", "साल के बीच", "बीच में", "कभी भी", "late admission"],
    en: "Yes, you can enroll your child at ANY time of the year! Under Section 4 of the Right to Education (RTE) Act and Maharashtra Government directives, government and aided schools CANNOT refuse admission to children of seasonal or migrant workers due to late arrival. No entrance test or screening is allowed.\n\nAdvice: Visit the nearest Zila Parishad or Government school. If the school hesitates, ask for the Headmaster and mention RTE Section 4 or call Childline 1098.",
    mr: "होय, तुम्ही वर्षाच्या कोणत्याही दिवशी मुलाचा शाळेत प्रवेश घेऊ शकता! शिक्षण हक्क कायदा (RTE) कलम ४ आणि महाराष्ट्र शासनाच्या निर्णयानुसार, ऊसतोड किंवा स्थलांतरित कामगारांच्या पाल्याला उशिरा आल्याचे कारण सांगून शाळा प्रवेश नाकारू शकत नाही. कोणत्याही प्रवेश परीक्षेची गरज नसते.\n\nसल्ला: जवळच्या जिल्हा परिषद किंवा शासकीय शाळेत जा. मुख्याध्यापकांना भेटा आणि मोफत प्रवेशाची मागणी करा. अडचण आल्यास १०९८ वर फोन करा.",
    hi: "हाँ, आप साल के किसी भी महीने में अपने बच्चे का दाखिला करा सकते हैं! शिक्षा का अधिकार (RTE) कानून की धारा 4 और महाराष्ट्र सरकार के नियमों के अनुसार, प्रवासी मजदूरों के बच्चों को देर से आने पर भी सरकारी स्कूल दाखिला देने से मना नहीं कर सकते। कोई भी प्रवेश परीक्षा नहीं ली जा सकती।\n\nसुझाव: नजदीकी सरकारी या ज़िला परिषद स्कूल में जाएं। यदि कोई मना करे, तो 1098 पर सहायता मांगें।"
  },
  notc: {
    keywords: ["tc", "transfer certificate", "lc", "leaving certificate", "दाखला", "शाळा सोडल्याचा", "दाखिला", "ट्रांसफर", "टीसी", "टी सी"],
    en: "You DO NOT need an immediate Transfer Certificate (TC) to admit your child! As per Maharashtra Education Department norms:\n1. Admitting schools must grant immediate provisional admission.\n2. The Headmaster is required to fetch your child's student ID directly from the state 'SARAL' portal.\n3. You only need to submit a simple signed self-declaration stating your child's previous standard.",
    mr: "शाळा सोडल्याचा दाखला (TC/LC) नसल्यास अजिबात काळजी करू नका! महाराष्ट्र शिक्षण विभागाच्या नियमांनुसार:\n१. शाळेने मुलाला तात्काळ वर्गात बसवणे (तात्पुरता प्रवेश) बंधनकारक आहे.\n२. मुख्याध्यापक स्वतः 'सरल' (SARAL) पोर्टलवरून मागील शाळेचा दाखला ऑनलाइन मागवून घेतात.\n३. पालकांनी केवळ साध्या कागदावर 'माझा मुलगा पूर्वी अमुक इयत्तेत शिकत होता' असे हमीपत्र लिहून देणे पुरेसे आहे.",
    hi: "ट्रांसफर सर्टिफिकेट (TC) न होने पर भी दाखिला नहीं रुकेगा! महाराष्ट्र शिक्षा विभाग के नियमों के अनुसार:\n1. स्कूल को बच्चे को तुरंत अस्थायी दाखिला देना होगा।\n2. स्कूल के प्रधानाध्यापक राज्य के 'सरल' (SARAL) पोर्टल से बच्चे का रिकॉर्ड खुद ऑनलाइन निकालेंगे।\n3. आपको केवल एक साधारण स्व-घोषणा पत्र (अंगूठा या दस्तखत) देना होगा कि बच्चा पिछली बार किस कक्षा में था।"
  },
  childcare: {
    keywords: ["childcare", "leave my child", "work", "baby", "infant", "anganwadi", "creche", "कुठे ठेवू", "लहान मूल", "कामावर", "अंगणवाडी", "पाळणाघर", "देखभाल", "छोड़ें", "कहाँ रखें", "आंगनवाड़ी"],
    en: "You can safely place your young children (ages 6 months to 6 years) at the nearest Government Anganwadi Centre or Worksite Creche while you work.\n• What they provide: Free hot nutritious meals (Poshan), clean drinking water, safe resting area, and early preschool learning.\n• Near sugar mills & brick kilns: Dedicated seasonal creches run from 8:00 AM to 5:00 PM.\n• How to enroll: Visit the centre and give your child's name to the Anganwadi Sevika.",
    mr: "कामावर जाताना ६ महिने ते ६ वर्षे वयाच्या लहान मुलांना तुम्ही जवळच्या शासकीय अंगणवाडीत किंवा साखर कारखान्याजवळील पाळणाघरात सुरक्षित ठेवू शकता.\n• मिळणाऱ्या सुविधा: मोफत गरम पोषण आहार, स्वच्छ पाणी, विश्रांतीची जागा आणि बालवाडी शिक्षण.\n• साखर कारखाने व विटभट्ट्यांजवळ: सकाळी ८:०० ते संध्याकाळी ५:०० या वेळेत विशेष पाळणाघरे चालवली जातात.\n• नोंदणी: थेट केंद्रात जाऊन अंगणवाडी सेविकेला मुलाचे नाव सांगा.",
    hi: "काम पर जाते समय 6 महीने से 6 साल तक के छोटे बच्चों को आप पास के सरकारी आँगनवाड़ी केंद्र या कार्यस्थल बाल पालनाघर (क्रेश) में छोड़ सकते हैं।\n• मिलने वाली सुविधाएं: मुफ्त गर्म पौष्टिक खाना, साफ पानी, सोने की सुरक्षित जगह और खेल-खेल में पढ़ाई।\n• चीनी मिलों व ईंट भट्ठों के पास: सुबह 8:00 से शाम 5:00 बजे तक विशेष देखभाल केंद्र चलते हैं।\n• नामांकन: सीधे केंद्र जाकर आँगनवाड़ी कार्यकर्ता को बच्चे का नाम दर्ज कराएं।"
  },
  fees: {
    keywords: ["fee", "money", "cost", "charge", "free", "फी", "पैसे", "खर्च", "शुल्क", "मोफत", "रुपये"],
    en: "NO! Government and Zila Parishad schools are 100% FREE. Under the RTE Act, schools CANNOT demand any admission fees, building donations, or examination charges.\n• Your child is also entitled to: FREE mid-day meals (lunch), FREE government textbooks, and FREE school uniforms.\n• If any government or aided school demands money, report it immediately to the Block Education Officer (BEO) or dial 1098.",
    mr: "नाही! शासकीय आणि जिल्हा परिषद शाळांमध्ये शिक्षण १००% मोफत आहे. शिक्षण हक्क कायद्यानुसार शाळा प्रवेशासाठी एकही रुपया फी, देणगी किंवा परीक्षा शुल्क मागू शकत नाही.\n• मिळणारे हक्क: मोफत दुपारचे जेवण (माध्यान्ह भोजन), मोफत पाठ्यपुस्तके आणि मोफत गणवेश.\n• जर कोणी पैसे मागितले, तर गट शिक्षणाधिकारी (BEO) यांच्याकडे तक्रार करा किंवा १०९८ वर कॉल करा.",
    hi: "नहीं! सरकारी और ज़िला परिषद स्कूलों में पढ़ाई 100% मुफ्त है। कानूनन कोई भी सरकारी या सहायता प्राप्त स्कूल दाखिला फीस या डोनेशन नहीं मांग सकता।\n• मिलने वाले मुफ्त अधिकार: दोपहर का गर्म भोजन, सरकारी किताबें और स्कूल ड्रेस (वर्दी)।\n• यदि कोई पैसे मांगे, तो तुरंत खंड शिक्षा अधिकारी (BEO) से कहें या 1098 पर कॉल करें।"
  },
  hostel: {
    keywords: ["hostel", "residential", "sakhar shala", "seasonal", "साखरशाळा", "वसतिगृह", "हंगामी", "निवासी", "हॉस्टल", "छात्रावास"],
    en: "Seasonal Hostels (हंगामी वसतिगृहे) and Sakhar Shalas (साखरशाळा) are specially established in Maharashtra for migrant children:\n1. Sakhar Shalas run right near sugarcane mills and worksites with adjusted timings so children can attend school while living with parents.\n2. Residential Seasonal Hostels allow children to stay back safely in their home villages (e.g. in Beed or Jalna) with free lodging and meals while parents travel for work.",
    mr: "स्थलांतरित कामगारांच्या मुलांचे शिक्षण थांबू नये म्हणून महाराष्ट्रात दोन महत्त्वाच्या व्यवस्था आहेत:\n१. साखरशाळा: साखर कारखाने व विटभट्ट्यांच्या शेजारी सुरू केल्या जातात, जेणेकरून आई-वडिलांसोबत राहून मुले शिकू शकतील.\n२. हंगामी वसतिगृह: आई-वडील ऊसतोडीसाठी बाहेरगावी गेले, तरी मूळ गावी (उदा. बीड, जालना) मुले मोफत राहून, जेवण करून मूळ शाळेत शिक्षण चालू ठेवू शकतात.",
    hi: "महाराष्ट्र में प्रवासी बच्चों के लिए दो विशेष सुविधाएं हैं:\n1. साखरशाळा (मौसमी स्कूल): ये चीनी मिलों और ईंट भट्ठों के पास ही चलाए जाते हैं ताकि बच्चे माता-पिता के साथ रहकर पढ़ सकें।\n2. मौसमी छात्रावास (हॉस्टल): यदि माता-पिता मजदूरी के लिए दूर जा रहे हैं, तो बच्चे अपने गाँव के हॉस्टल में रहकर मुफ्त भोजन और आवास के साथ पढ़ाई जारी रख सकते हैं।"
  },
  birthcert: {
    keywords: ["birth certificate", "age", "birthday", "जन्म दाखला", "वय", "जन्म प्रमाणपत्र", "उम्र", "जन्म तारीख"],
    en: "Under RTE Section 14, lack of a formal birth certificate CANNOT be used to deny school entry. You can provide:\n• Parent's handwritten or thumb-stamped self-declaration of the child's estimated age.\n• Hospital birth record or Anganwadi vaccine slip.\n• The Headmaster will accept your declaration and note the age in the register.",
    mr: "शिक्षण हक्क कायदा कलम १४ नुसार जन्म दाखला नसला तरी प्रवेश रोखता येत नाही. तुम्ही पुढील पर्याय देऊ शकता:\n• पालकांनी साध्या कागदावर मुलाचे वय लिहून अंगठा किंवा सही केलेली स्व-घोषणा.\n• अंगणवाडीचे लस कार्ड किंवा दवाखान्याची पावती.\n• मुख्याध्यापक तुमचे हमीपत्र स्वीकारून मुलाची नोंद रजिस्टरमध्ये करतील.",
    hi: "RTE धारा 14 के अनुसार जन्म प्रमाण पत्र न होने पर भी दाखिला रोका नहीं जा सकता। आप ये दे सकते हैं:\n• अभिभावक द्वारा सादे कागज़ पर बच्चे की उम्र का स्व-घोषणा पत्र।\n• आँगनवाड़ी का टीकाकरण कार्ड या अस्पताल की पर्ची।\n• स्कूल के मास्टर साहब इस घोषणा पत्र के आधार पर दाखिला करेंगे।"
  },
  protection: {
    keywords: ["child labour", "abuse", "danger", "emergency", "beaten", "काम", "मजुरी", "त्रास", "मारहाण", "बालमजुरी", "बाल श्रम", "शोषण", "खतरा"],
    en: "Children below 14 years MUST NOT be employed in sugarcane cutting, loading trucks, or at brick kilns. This is strictly illegal under the Child Labour Act.\n• If a child is forced to work or is in danger: Dial Childline 1098 immediately (Free & 24/7).\n• Police Emergency: Dial 112.\n• Your identity can remain completely confidential.",
    mr: "१४ वर्षांखालील मुलांना ऊसतोड, ट्रक भरणे किंवा विटभट्टीवर कामाला लावणे हा कायद्याने गंभीर गुन्हा आहे.\n• जर मुलावर कामाचा दबाव असेल किंवा मूल धोक्यात असेल: ताबडतोब १०९८ (चाइल्डलाईन) वर फोन करा (२४ तास मोफत).\n• पोलीस मदत: ११२ वर कॉल करा.\n• तुमचे नाव पूर्णपणे गुप्त ठेवले जाईल.",
    hi: "14 साल से कम उम्र के बच्चों से गन्ने की कटाई, वजन उठाना या ईंट भट्ठों पर मजदूरी कराना कानूनी अपराध है।\n• यदि कोई बच्चा खतरे में है या उससे काम कराया जा रहा है: तुरंत 1098 (चाइल्डलाइन) पर मुफ्त कॉल करें।\n• पुलिस आपातकालीन सेवा: 112 डायल करें।\n• आपका नाम पूरी तरह गोपनीय रहेगा।"
  }
};

class AssistantManager {
  constructor() {
    this.speechSynth = window.speechSynthesis || null;
    this.speechRecognizer = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.speechRecognizer = new SpeechRecognition();
        this.speechRecognizer.continuous = false;
        this.speechRecognizer.interimResults = false;
      } catch (e) {
        console.warn("Speech recognition initialization fallback:", e);
      }
    }
  }

  getResponse(query, lang = "en") {
    const qLower = query.toLowerCase().trim();
    let bestMatch = null;

    // Iterate through intents
    for (const [key, item] of Object.entries(assistantResponses)) {
      for (const kw of item.keywords) {
        if (qLower.includes(kw.toLowerCase())) {
          bestMatch = item[lang] || item["en"];
          break;
        }
      }
      if (bestMatch) break;
    }

    if (!bestMatch) {
      if (lang === "mr") {
        bestMatch = `तुमच्या प्रश्नासाठी धन्यवाद. शिक्षण हक्क कायद्यानुसार (RTE) स्थलांतरित कामगारांच्या मुलांना कोणत्याही शासकीय शाळेत वर्षभर मोफत प्रवेश, पाठ्यपुस्तके व माध्यान्ह भोजन मिळते. कागदपत्रे नसली तरी पालकांच्या हमीपत्रावर तात्पुरता प्रवेश मिळतो.`;
      } else if (lang === "hi") {
        bestMatch = `आपके प्रश्न के लिए धन्यवाद। शिक्षा के अधिकार (RTE) के तहत प्रवासी बच्चों को साल भर सरकारी स्कूलों में मुफ्त दाखिला, किताबें और दोपहर का भोजन पाने का अधिकार है। कागज़ न होने पर भी स्व-घोषणा पर दाखिला मिलता है।`;
      } else {
        bestMatch = `Thank you for your question. Under the Right to Education (RTE) Act, children of migrant workers are legally entitled to free year-round admission, free textbooks, and mid-day meals in government and aided schools. Even without documents, a provisional admission is granted on a parent's self-declaration.`;
      }
    }

    const disclaimer = translations[lang]?.officialDisclaimer || "Please confirm with the school or official office.";
    return `${bestMatch}\n\n⚠️ ${disclaimer}`;
  }

  speak(text, lang = "en", onEndCallback = null) {
    if (!this.speechSynth) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    this.stopSpeaking();

    // Clean text of emojis & markdown for speech
    const cleanText = text.replace(/[*#_•⚠️📢🚨]/g, "").replace(/\n+/g, ". ");
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language code to BCP 47
    if (lang === "mr") {
      utterance.lang = "mr-IN";
    } else if (lang === "hi") {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.95; // slightly slower for clarity
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    this.isSpeaking = true;
    this.speechSynth.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechSynth && this.speechSynth.speaking) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
    }
  }

  startListening(lang = "en", onResult, onError, onEnd) {
    if (!this.speechRecognizer) {
      // Simulate realistic voice input prompt if browser does not support Web Speech API
      const simulatedPrompts = {
        mr: "सत्राच्या मध्यात शाळेत प्रवेश कसा मिळवायचा?",
        hi: "ट्रांसफर सर्टिफिकेट (TC) न होने पर दाखिला कैसे लें?",
        en: "How do I get school admission mid-year?"
      };
      const simulatedText = prompt(
        lang === "mr" ? "आवाज इनपुट (माईक अनुकरण): आपला प्रश्न लिहा किंवा ओके दाबा:" :
        lang === "hi" ? "ध्वनि इनपुट (माइक सिमुलेशन): अपना प्रश्न लिखें या ओके दबाएं:" :
        "Voice Input (Microphone simulation): Type your spoken question or press OK:",
        simulatedPrompts[lang] || simulatedPrompts["en"]
      );
      if (simulatedText) {
        onResult(simulatedText);
      }
      if (onEnd) onEnd();
      return;
    }

    try {
      this.speechRecognizer.lang = lang === "mr" ? "mr-IN" : lang === "hi" ? "hi-IN" : "en-IN";
      this.speechRecognizer.onstart = () => {
        this.isListening = true;
      };
      this.speechRecognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.isListening = false;
        onResult(transcript);
      };
      this.speechRecognizer.onerror = (event) => {
        this.isListening = false;
        if (onError) onError(event.error);
      };
      this.speechRecognizer.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };
      this.speechRecognizer.start();
    } catch (e) {
      console.warn("Speech recognizer start error:", e);
      if (onEnd) onEnd();
    }
  }

  stopListening() {
    if (this.speechRecognizer && this.isListening) {
      this.speechRecognizer.stop();
      this.isListening = false;
    }
  }
}

window.assistantManager = new AssistantManager();
