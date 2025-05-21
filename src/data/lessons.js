export const lessons = [
  {
    id: 1,
    title: "Warming Up to German Basics",
    description: "Recognizing familiar words, pronunciation tips, and false friends.",
    vocabulary: [
      { german: "der Arm", english: "arm", pronunciation: "ârm" },
      { german: "die Butter", english: "butter", pronunciation: "boot-er" },
      { german: "das Hotel", english: "hotel", pronunciation: "hotel (as in English)" },
      { german: "die Bank", english: "bank", pronunciation: "bânk" }
    ],
    dialogue: {
      context: "Meeting someone for the first time",
      german: "Guten Tag! Wie heißen Sie?",
      english: "Good day! What is your name?",
      audio: "audio/dialogue1.mp3"
    },
    quiz: [
      {
        question: "What does 'der Arm' mean?",
        options: ["Leg", "Arm", "Hand", "Head"],
        answer: "Arm"
      },
      {
        question: "What is the correct translation for 'die Butter'?",
        options: ["Bread", "Butter", "Bottle", "Bank"],
        answer: "Butter"
      }
    ]
  },
  {
    id: 2,
    title: "Handling Numbers, Times, Dates, and Measurements",
    description: "Learn how to count and express time and quantities in German.",
    vocabulary: [
      { german: "null", english: "zero", pronunciation: "nool" },
      { german: "eins", english: "one", pronunciation: "ayns" },
      { german: "zwei", english: "two", pronunciation: "tsvay" },
      { german: "drei", english: "three", pronunciation: "dray" },
      { german: "zehn", english: "ten", pronunciation: "tseyn" }
    ],
    dialogue: {
      context: "Market shopping",
      german: "Zwei Kilo Äpfel und ein Pfund Tomaten, bitte.",
      english: "Two kilograms of apples and one pound of tomatoes, please.",
      audio: "audio/dialogue2.mp3"
    },
    quiz: [
      {
        question: "What does 'zwei' mean?",
        options: ["Three", "One", "Two", "Five"],
        answer: "Two"
      },
      {
        question: "What is the German word for 'ten'?",
        options: ["eins", "zehn", "drei", "null"],
        answer: "zehn"
      }
    ]
  },
  {
    id: 3,
    title: "Meeting and Greeting",
    description: "Learn essential greetings and how to introduce yourself.",
    vocabulary: [
      { german: "Guten Morgen", english: "Good morning" },
      { german: "Guten Tag", english: "Hello" },
      { german: "Auf Wiedersehen", english: "Goodbye" },
      { german: "Wie geht es Ihnen?", english: "How are you?" }
    ],
    dialogue: {
      context: "Formal introduction",
      german: "Guten Abend, Herr Kramer. Darf ich Ihnen meine Frau vorstellen?",
      english: "Good evening, Mr. Kramer. May I introduce my wife?",
      audio: "audio/dialogue3.mp3"
    },
    quiz: [
      {
        question: "What does 'Wie geht es Ihnen?' mean?",
        options: ["Who are you?", "How are you?", "Where are you?", "What time is it?"],
        answer: "How are you?"
      }
    ]
  },
  {
    id: 4,
    title: "Home, Family, and Daily Life",
    description: "Talk about your living space, family, and daily routine.",
    vocabulary: [
      { german: "das Badezimmer", english: "bathroom" },
      { german: "die Küche", english: "kitchen" },
      { german: "aufstehen", english: "to get up" },
      { german: "frühstücken", english: "to eat breakfast" }
    ],
    dialogue: {
      context: "Making weekend plans",
      german: "Ich möchte gern Fahrrad fahren. Kommst du mit?",
      english: "I’d really like to take a bike ride. Want to come along?",
      audio: "audio/dialogue4.mp3"
    },
    quiz: [
      {
        question: "What does 'die Küche' mean?",
        options: ["Living room", "Kitchen", "Bedroom", "Bathroom"],
        answer: "Kitchen"
      }
    ]
  },
  {
    id: 5,
    title: "Telecommunications and Business",
    description: "Phone calls, emails, and working in the office.",
    vocabulary: [
      { german: "das Telefon", english: "telephone" },
      { german: "anrufen", english: "to call" },
      { german: "das Büro", english: "office" }
    ],
    dialogue: {
      context: "Phone call",
      german: "Ich rufe später noch einmal an.",
      english: "I’ll call again later.",
      audio: "audio/dialogue5.mp3"
    },
    quiz: [
      {
        question: "What does 'das Telefon' mean?",
        options: ["Tablet", "Telephone", "Television", "Computer"],
        answer: "Telephone"
      }
    ]
  },
  {
    id: 6,
    title: "Shopping Simplified",
    description: "Learn how to shop and try on clothes in German.",
    vocabulary: [
      { german: "der Verkäufer", english: "salesman" },
      { german: "das Geschäft", english: "store" },
      { german: "die Größe", english: "size" },
      { german: "anprobieren", english: "to try on" }
    ],
    dialogue: {
      context: "Shopping conversation",
      german: "Kann ich Ihnen helfen?",
      english: "Can I help you?",
      audio: "audio/dialogue6.mp3"
    },
    quiz: [
      {
        question: "What does 'die Größe' mean?",
        options: ["Color", "Size", "Style", "Price"],
        answer: "Size"
      }
    ]
  }
];