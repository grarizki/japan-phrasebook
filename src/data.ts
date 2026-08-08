import type { Category, Conversation, Translation } from "./schema"

export const MY_PHRASES_ID = "my-phrases"

export const CATEGORY_GROUPS = [
  { id: "food", label: "🍜 Food & Drink" },
  { id: "shopping", label: "🛍️ Shopping" },
  { id: "travel", label: "🚆 Travel" },
  { id: "conversation", label: "💬 Conversation" },
  { id: "safety", label: "🆘 Emergencies" },
  { id: "basics", label: "📖 Basics" },
  { id: "work", label: "💼 Work" },
] as const

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Convenience Store",
    description: "Common phrases used in convenience stores.",
    group: "shopping",
  },
  {
    id: "cat2",
    name: "Restaurant",
    description: "Common phrases used in restaurants.",
    group: "food",
  },
  {
    id: "cat3",
    name: "Shop",
    description: "Common phrases used in shops.",
    group: "shopping",
  },
  {
    id: "cat4",
    name: "Transportation",
    description:
      "Common phrases used at train stations, in taxis, and at bus stops.",
    group: "travel",
  },
  {
    id: "cat5",
    name: "Hotel",
    description: "Common phrases used at hotels.",
    group: "travel",
  },
  {
    id: "cat6",
    name: "Airport",
    description: "Common phrases used at airports.",
    group: "travel",
  },
  {
    id: "cat7",
    name: "Sightseeing",
    description: "Common phrases used while sightseeing.",
    group: "travel",
  },
  {
    id: "cat8",
    name: "Everyday Conversation",
    description: "Common phrases used in everyday conversation.",
    group: "conversation",
  },
  {
    id: "cat9",
    name: "Emergencies",
    description: "Common phrases used during emergencies.",
    group: "safety",
  },
  {
    id: "cat10",
    name: "Animal Vocabulary (Doubutsu)",
    description: "Japanese words for common animals.",
    group: "basics",
  },
  {
    id: "cat11",
    name: "Self-introduction",
    description: "Phrases used when introducing yourself.",
    group: "conversation",
  },
  {
    id: "cat12",
    name: "Starting a New Job",
    description: "Phrases used when starting a new job.",
    group: "work",
  },
  {
    id: "cat13",
    name: "Making a Purchase",
    description: "Phrases used when making a purchase.",
    group: "shopping",
  },
  {
    id: "cat14",
    name: "Asking Business Hours",
    description: "Phrases used when asking about business hours.",
    group: "shopping",
  },
  {
    id: "cat15",
    name: "Confirming a Destination",
    description: "Phrases used when confirming a destination.",
    group: "travel",
  },
]

export const conversations: Conversation[] = [
  // =========================================================
  // Convenience Store
  // =========================================================
  {
    id: "conv1",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Excuse me, where can I find the snacks?",
    timestamp: "2023-10-01T10:00:00Z",
  },
  {
    id: "conv2",
    category_id: "cat1",
    context: "At a convenience store",
    content: "How much is this drink?",
    timestamp: "2023-10-01T10:05:00Z",
  },
  {
    id: "conv7",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Where is the restroom?",
    timestamp: "2023-10-01T10:10:00Z",
  },
  {
    id: "conv9",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Can I pay by credit card?",
    timestamp: "2023-10-01T10:15:00Z",
  },
  {
    id: "conv10",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Do you have a plastic bag?",
    timestamp: "2023-10-01T10:20:00Z",
  },
  {
    id: "conv11",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Can I heat this up?",
    timestamp: "2023-10-01T10:25:00Z",
  },
  {
    id: "conv12",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Do you sell SIM cards here?",
    timestamp: "2023-10-01T10:30:00Z",
  },
  {
    id: "conv13",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Can I use the ATM?",
    timestamp: "2023-10-01T10:35:00Z",
  },
  {
    id: "conv14",
    category_id: "cat1",
    context: "At a convenience store",
    content: "Do you accept cashless payments?",
    timestamp: "2023-10-01T10:40:00Z",
  },

  // =========================================================
  // Restaurant
  // =========================================================
  {
    id: "conv3",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Can I see the menu, please?",
    timestamp: "2023-10-01T11:00:00Z",
  },
  {
    id: "conv4",
    category_id: "cat2",
    context: "At a restaurant",
    content: "I would like to order sushi.",
    timestamp: "2023-10-01T11:05:00Z",
  },
  {
    id: "conv8",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Can I get the bill, please?",
    timestamp: "2023-10-01T11:10:00Z",
  },
  {
    id: "conv15",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Do you have a table for two?",
    timestamp: "2023-10-01T11:15:00Z",
  },
  {
    id: "conv16",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Do I need to make a reservation?",
    timestamp: "2023-10-01T11:20:00Z",
  },
  {
    id: "conv17",
    category_id: "cat2",
    context: "At a restaurant",
    content: "What do you recommend?",
    timestamp: "2023-10-01T11:25:00Z",
  },
  {
    id: "conv18",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Is this dish spicy?",
    timestamp: "2023-10-01T11:30:00Z",
  },
  {
    id: "conv19",
    category_id: "cat2",
    context: "At a restaurant",
    content: "I don't eat pig's meat.",
    timestamp: "2023-10-01T11:35:00Z",
  },
  {
    id: "conv20",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Can I have some water, please?",
    timestamp: "2023-10-01T11:40:00Z",
  },
  {
    id: "conv21",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Can we pay separately?",
    timestamp: "2023-10-01T11:45:00Z",
  },
  {
    id: "conv22",
    category_id: "cat2",
    context: "At a restaurant",
    content: "Is service included?",
    timestamp: "2023-10-01T11:50:00Z",
  },

  // =========================================================
  // Shopping
  // =========================================================
  {
    id: "conv5",
    category_id: "cat3",
    context: "At a shop",
    content: "Do you have this in a larger size?",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: "conv6",
    category_id: "cat3",
    context: "At a shop",
    content: "Can I try this on?",
    timestamp: "2023-10-01T12:05:00Z",
  },
  {
    id: "conv23",
    category_id: "cat3",
    context: "At a shop",
    content: "Do you have this in another color?",
    timestamp: "2023-10-01T12:10:00Z",
  },
  {
    id: "conv24",
    category_id: "cat3",
    context: "At a shop",
    content: "How much does this cost?",
    timestamp: "2023-10-01T12:15:00Z",
  },
  {
    id: "conv25",
    category_id: "cat3",
    context: "At a shop",
    content: "Is this on sale?",
    timestamp: "2023-10-01T12:20:00Z",
  },
  {
    id: "conv26",
    category_id: "cat3",
    context: "At a shop",
    content: "Do you have a smaller size?",
    timestamp: "2023-10-01T12:25:00Z",
  },
  {
    id: "conv27",
    category_id: "cat3",
    context: "At a shop",
    content: "Can I pay with a credit card?",
    timestamp: "2023-10-01T12:30:00Z",
  },
  {
    id: "conv28",
    category_id: "cat3",
    context: "At a shop",
    content: "Can I get a tax refund?",
    timestamp: "2023-10-01T12:35:00Z",
  },
  {
    id: "conv29",
    category_id: "cat3",
    context: "At a shop",
    content: "Where is the fitting room?",
    timestamp: "2023-10-01T12:40:00Z",
  },
  {
    id: "conv30",
    category_id: "cat3",
    context: "At a shop",
    content: "Can I return this?",
    timestamp: "2023-10-01T12:45:00Z",
  },

  // =========================================================
  // Train / Transportation
  // =========================================================
  {
    id: "conv31",
    category_id: "cat4",
    context: "At a train station",
    content: "Where is the ticket machine?",
    timestamp: "2023-10-01T13:00:00Z",
  },
  {
    id: "conv32",
    category_id: "cat4",
    context: "At a train station",
    content: "Which train goes to Tokyo?",
    timestamp: "2023-10-01T13:05:00Z",
  },
  {
    id: "conv33",
    category_id: "cat4",
    context: "At a train station",
    content: "Which platform should I go to?",
    timestamp: "2023-10-01T13:10:00Z",
  },
  {
    id: "conv34",
    category_id: "cat4",
    context: "At a train station",
    content: "How much is a ticket to Kyoto?",
    timestamp: "2023-10-01T13:15:00Z",
  },
  {
    id: "conv35",
    category_id: "cat4",
    context: "At a train station",
    content: "Is this train bound for Osaka?",
    timestamp: "2023-10-01T13:20:00Z",
  },
  {
    id: "conv36",
    category_id: "cat4",
    context: "At a train station",
    content: "Where can I recharge my IC card?",
    timestamp: "2023-10-01T13:25:00Z",
  },
  {
    id: "conv37",
    category_id: "cat4",
    context: "At a train station",
    content: "When is the next train?",
    timestamp: "2023-10-01T13:30:00Z",
  },
  {
    id: "conv38",
    category_id: "cat4",
    context: "In a taxi",
    content: "Please take me to this address.",
    timestamp: "2023-10-01T13:35:00Z",
  },
  {
    id: "conv39",
    category_id: "cat4",
    context: "In a taxi",
    content: "How much will it cost?",
    timestamp: "2023-10-01T13:40:00Z",
  },
  {
    id: "conv40",
    category_id: "cat4",
    context: "At a bus stop",
    content: "Does this bus go to the station?",
    timestamp: "2023-10-01T13:45:00Z",
  },

  // =========================================================
  // Hotel
  // =========================================================
  {
    id: "conv41",
    category_id: "cat5",
    context: "At a hotel",
    content: "I have a reservation.",
    timestamp: "2023-10-01T14:00:00Z",
  },
  {
    id: "conv42",
    category_id: "cat5",
    context: "At a hotel",
    content: "I'd like to check in.",
    timestamp: "2023-10-01T14:05:00Z",
  },
  {
    id: "conv43",
    category_id: "cat5",
    context: "At a hotel",
    content: "What time is check-out?",
    timestamp: "2023-10-01T14:10:00Z",
  },
  {
    id: "conv44",
    category_id: "cat5",
    context: "At a hotel",
    content: "Is breakfast included?",
    timestamp: "2023-10-01T14:15:00Z",
  },
  {
    id: "conv45",
    category_id: "cat5",
    context: "At a hotel",
    content: "Can I leave my luggage here?",
    timestamp: "2023-10-01T14:20:00Z",
  },
  {
    id: "conv46",
    category_id: "cat5",
    context: "At a hotel",
    content: "Could you call a taxi for me?",
    timestamp: "2023-10-01T14:25:00Z",
  },
  {
    id: "conv47",
    category_id: "cat5",
    context: "At a hotel",
    content: "Is there Wi-Fi in the room?",
    timestamp: "2023-10-01T14:30:00Z",
  },
  {
    id: "conv48",
    category_id: "cat5",
    context: "At a hotel",
    content: "Could I get another towel?",
    timestamp: "2023-10-01T14:35:00Z",
  },

  // =========================================================
  // Airport
  // =========================================================
  {
    id: "conv49",
    category_id: "cat6",
    context: "At an airport",
    content: "Where is the check-in counter?",
    timestamp: "2023-10-01T15:00:00Z",
  },
  {
    id: "conv50",
    category_id: "cat6",
    context: "At an airport",
    content: "Where is the baggage claim?",
    timestamp: "2023-10-01T15:05:00Z",
  },
  {
    id: "conv51",
    category_id: "cat6",
    context: "At an airport",
    content: "Where is the departure gate?",
    timestamp: "2023-10-01T15:10:00Z",
  },
  {
    id: "conv52",
    category_id: "cat6",
    context: "At an airport",
    content: "How many bags can I check in?",
    timestamp: "2023-10-01T15:15:00Z",
  },
  {
    id: "conv53",
    category_id: "cat6",
    context: "At an airport",
    content: "Where can I exchange money?",
    timestamp: "2023-10-01T15:20:00Z",
  },
  {
    id: "conv54",
    category_id: "cat6",
    context: "At an airport",
    content: "Where can I buy a SIM card?",
    timestamp: "2023-10-01T15:25:00Z",
  },

  // =========================================================
  // Sightseeing
  // =========================================================
  {
    id: "conv55",
    category_id: "cat7",
    context: "While sightseeing",
    content: "How do I get to this place?",
    timestamp: "2023-10-01T16:00:00Z",
  },
  {
    id: "conv56",
    category_id: "cat7",
    context: "While sightseeing",
    content: "How much is the entrance fee?",
    timestamp: "2023-10-01T16:05:00Z",
  },
  {
    id: "conv57",
    category_id: "cat7",
    context: "While sightseeing",
    content: "What time does it open?",
    timestamp: "2023-10-01T16:10:00Z",
  },
  {
    id: "conv58",
    category_id: "cat7",
    context: "While sightseeing",
    content: "Can I take photos here?",
    timestamp: "2023-10-01T16:15:00Z",
  },
  {
    id: "conv59",
    category_id: "cat7",
    context: "While sightseeing",
    content: "Is there a famous place nearby?",
    timestamp: "2023-10-01T16:20:00Z",
  },
  {
    id: "conv60",
    category_id: "cat7",
    context: "While sightseeing",
    content: "Could you take a photo for us?",
    timestamp: "2023-10-01T16:25:00Z",
  },

  // =========================================================
  // Everyday Conversation
  // =========================================================
  {
    id: "conv61",
    category_id: "cat8",
    context: "Meeting someone",
    content: "Nice to meet you.",
    timestamp: "2023-10-01T17:00:00Z",
  },
  {
    id: "conv62",
    category_id: "cat8",
    context: "Meeting someone",
    content: "Where are you from?",
    timestamp: "2023-10-01T17:05:00Z",
  },
  {
    id: "conv63",
    category_id: "cat8",
    context: "Everyday conversation",
    content: "Do you speak English?",
    timestamp: "2023-10-01T17:10:00Z",
  },
  {
    id: "conv64",
    category_id: "cat8",
    context: "Everyday conversation",
    content: "Could you speak more slowly?",
    timestamp: "2023-10-01T17:15:00Z",
  },
  {
    id: "conv65",
    category_id: "cat8",
    context: "Everyday conversation",
    content: "Could you say that again?",
    timestamp: "2023-10-01T17:20:00Z",
  },
  {
    id: "conv66",
    category_id: "cat8",
    context: "Everyday conversation",
    content: "I don't understand.",
    timestamp: "2023-10-01T17:25:00Z",
  },
  {
    id: "conv67",
    category_id: "cat8",
    context: "Everyday conversation",
    content: "Thank you for your help.",
    timestamp: "2023-10-01T17:30:00Z",
  },
  {
    id: "conv68",
    category_id: "cat8",
    context: "Everyday conversation",
    content: "Excuse me.",
    timestamp: "2023-10-01T17:35:00Z",
  },

  // =========================================================
  // Emergencies
  // =========================================================
  {
    id: "conv69",
    category_id: "cat9",
    context: "During an emergency",
    content: "Please help me.",
    timestamp: "2023-10-01T18:00:00Z",
  },
  {
    id: "conv70",
    category_id: "cat9",
    context: "During an emergency",
    content: "Where is the nearest hospital?",
    timestamp: "2023-10-01T18:05:00Z",
  },
  {
    id: "conv71",
    category_id: "cat9",
    context: "During an emergency",
    content: "I lost my wallet.",
    timestamp: "2023-10-01T18:10:00Z",
  },
  {
    id: "conv72",
    category_id: "cat9",
    context: "During an emergency",
    content: "I lost my passport.",
    timestamp: "2023-10-01T18:15:00Z",
  },
  {
    id: "conv73",
    category_id: "cat9",
    context: "At a police station",
    content: "I need to report something.",
    timestamp: "2023-10-01T18:20:00Z",
  },

  // =========================================================
  // Animal Vocabulary (Doubutsu)
  // =========================================================
  {
    id: "conv74",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Dog",
    timestamp: "2023-10-01T19:00:00Z",
  },
  {
    id: "conv75",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Horse",
    timestamp: "2023-10-01T19:05:00Z",
  },
  {
    id: "conv76",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Bear",
    timestamp: "2023-10-01T19:10:00Z",
  },
  {
    id: "conv77",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Elephant",
    timestamp: "2023-10-01T19:15:00Z",
  },
  {
    id: "conv78",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Rhinoceros",
    timestamp: "2023-10-01T19:20:00Z",
  },
  {
    id: "conv79",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Cat",
    timestamp: "2023-10-01T19:25:00Z",
  },
  {
    id: "conv80",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Cow",
    timestamp: "2023-10-01T19:30:00Z",
  },
  {
    id: "conv81",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Deer",
    timestamp: "2023-10-01T19:35:00Z",
  },
  {
    id: "conv82",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Hippopotamus",
    timestamp: "2023-10-01T19:40:00Z",
  },
  {
    id: "conv83",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Goat",
    timestamp: "2023-10-01T19:45:00Z",
  },
  {
    id: "conv84",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Pig",
    timestamp: "2023-10-01T19:50:00Z",
  },
  {
    id: "conv85",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Donkey",
    timestamp: "2023-10-01T19:55:00Z",
  },
  {
    id: "conv86",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Tiger",
    timestamp: "2023-10-01T20:00:00Z",
  },
  {
    id: "conv87",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Squirrel",
    timestamp: "2023-10-01T20:05:00Z",
  },
  {
    id: "conv88",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Turtle",
    timestamp: "2023-10-01T20:10:00Z",
  },
  {
    id: "conv89",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Leopard",
    timestamp: "2023-10-01T20:15:00Z",
  },
  {
    id: "conv90",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Monkey",
    timestamp: "2023-10-01T20:20:00Z",
  },
  {
    id: "conv91",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Squid",
    timestamp: "2023-10-01T20:25:00Z",
  },
  {
    id: "conv92",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Shark",
    timestamp: "2023-10-01T20:30:00Z",
  },
  {
    id: "conv93",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Snake",
    timestamp: "2023-10-01T20:35:00Z",
  },
  {
    id: "conv94",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Crocodile",
    timestamp: "2023-10-01T20:40:00Z",
  },
  {
    id: "conv95",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Octopus",
    timestamp: "2023-10-01T20:45:00Z",
  },
  {
    id: "conv96",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Crab",
    timestamp: "2023-10-01T20:50:00Z",
  },
  {
    id: "conv97",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Ant",
    timestamp: "2023-10-01T20:55:00Z",
  },
  {
    id: "conv98",
    category_id: "cat10",
    context: "Animal vocabulary (Doubutsu)",
    content: "Crane (bird)",
    timestamp: "2023-10-01T21:00:00Z",
  },

  // =========================================================
  // Self-introduction
  // =========================================================
  {
    id: "conv99",
    category_id: "cat11",
    context: "Self-introduction",
    content: "My name is Andi.",
    timestamp: "2023-10-01T21:05:00Z",
  },
  {
    id: "conv100",
    category_id: "cat11",
    context: "Self-introduction",
    content: "I am Indonesian.",
    timestamp: "2023-10-01T21:10:00Z",
  },
  {
    id: "conv101",
    category_id: "cat11",
    context: "Self-introduction",
    content: "I came from Jakarta.",
    timestamp: "2023-10-01T21:15:00Z",
  },
  {
    id: "conv102",
    category_id: "cat11",
    context: "Self-introduction",
    content: "I look forward to working with you.",
    timestamp: "2023-10-01T21:20:00Z",
  },
  {
    id: "conv103",
    category_id: "cat11",
    context: "Self-introduction",
    content: "This is Mr. Tanaka.",
    timestamp: "2023-10-01T21:25:00Z",
  },
  {
    id: "conv104",
    category_id: "cat11",
    context: "Self-introduction",
    content: "What is your job?",
    timestamp: "2023-10-01T21:30:00Z",
  },

  // =========================================================
  // Starting a New Job
  // =========================================================
  {
    id: "conv105",
    category_id: "cat12",
    context: "Starting a new job",
    content: "Thank you for your continued support.",
    timestamp: "2023-10-01T21:35:00Z",
  },
  {
    id: "conv106",
    category_id: "cat12",
    context: "Starting a new job",
    content: "Here is my business card.",
    timestamp: "2023-10-01T21:40:00Z",
  },
  {
    id: "conv107",
    category_id: "cat12",
    context: "Starting a new job",
    content: "I will do my best.",
    timestamp: "2023-10-01T21:45:00Z",
  },
  {
    id: "conv108",
    category_id: "cat12",
    context: "Starting a new job",
    content: "I am new here.",
    timestamp: "2023-10-01T21:50:00Z",
  },
  {
    id: "conv109",
    category_id: "cat12",
    context: "Starting a new job",
    content: "Please teach me.",
    timestamp: "2023-10-01T21:55:00Z",
  },
  {
    id: "conv110",
    category_id: "cat12",
    context: "Starting a new job",
    content: "Where is my desk?",
    timestamp: "2023-10-01T22:00:00Z",
  },

  // =========================================================
  // Making a Purchase
  // =========================================================
  {
    id: "conv111",
    category_id: "cat13",
    context: "Making a purchase",
    content: "I'll take this, please.",
    timestamp: "2023-10-01T22:05:00Z",
  },
  {
    id: "conv112",
    category_id: "cat13",
    context: "Making a purchase",
    content: "How much is this?",
    timestamp: "2023-10-01T22:10:00Z",
  },
  {
    id: "conv113",
    category_id: "cat13",
    context: "Making a purchase",
    content: "Please give me two of these.",
    timestamp: "2023-10-01T22:15:00Z",
  },
  {
    id: "conv114",
    category_id: "cat13",
    context: "Making a purchase",
    content: "Do you have a bigger one?",
    timestamp: "2023-10-01T22:20:00Z",
  },
  {
    id: "conv115",
    category_id: "cat13",
    context: "Making a purchase",
    content: "I'll take that one over there.",
    timestamp: "2023-10-01T22:25:00Z",
  },
  {
    id: "conv116",
    category_id: "cat13",
    context: "Making a purchase",
    content: "Can I get a receipt?",
    timestamp: "2023-10-01T22:30:00Z",
  },

  // =========================================================
  // Asking Business Hours
  // =========================================================
  {
    id: "conv117",
    category_id: "cat14",
    context: "Asking business hours",
    content: "Until what time are you open?",
    timestamp: "2023-10-01T22:35:00Z",
  },
  {
    id: "conv118",
    category_id: "cat14",
    context: "Asking business hours",
    content: "What time do you open?",
    timestamp: "2023-10-01T22:40:00Z",
  },
  {
    id: "conv119",
    category_id: "cat14",
    context: "Asking business hours",
    content: "What time do you close?",
    timestamp: "2023-10-01T22:45:00Z",
  },
  {
    id: "conv120",
    category_id: "cat14",
    context: "Asking business hours",
    content: "Are you open on Sundays?",
    timestamp: "2023-10-01T22:50:00Z",
  },
  {
    id: "conv121",
    category_id: "cat14",
    context: "Asking business hours",
    content: "Are you open right now?",
    timestamp: "2023-10-01T22:55:00Z",
  },
  {
    id: "conv122",
    category_id: "cat14",
    context: "Asking business hours",
    content: "Are you open on public holidays?",
    timestamp: "2023-10-01T23:00:00Z",
  },

  // =========================================================
  // Confirming a Destination
  // =========================================================
  {
    id: "conv123",
    category_id: "cat15",
    context: "Confirming a destination",
    content: "Does this train go to Shinjuku?",
    timestamp: "2023-10-01T23:05:00Z",
  },
  {
    id: "conv124",
    category_id: "cat15",
    context: "Confirming a destination",
    content: "Does this go to the airport?",
    timestamp: "2023-10-01T23:10:00Z",
  },
  {
    id: "conv125",
    category_id: "cat15",
    context: "Confirming a destination",
    content: "Which platform is for Kyoto?",
    timestamp: "2023-10-01T23:15:00Z",
  },
  {
    id: "conv126",
    category_id: "cat15",
    context: "Confirming a destination",
    content: "How long does it take to get there?",
    timestamp: "2023-10-01T23:20:00Z",
  },
  {
    id: "conv127",
    category_id: "cat15",
    context: "Confirming a destination",
    content: "Please tell me when we arrive.",
    timestamp: "2023-10-01T23:25:00Z",
  },
  {
    id: "conv128",
    category_id: "cat15",
    context: "Confirming a destination",
    content: "Is this the right bus for the museum?",
    timestamp: "2023-10-01T23:30:00Z",
  },
]

export const translations: Translation[] = [
  // Convenience Store
  {
    conversation_id: "conv1",
    translation: "すみません、お菓子はどこにありますか？",
    pronunciation: "Sumimasen, okashi wa doko ni arimasu ka?",
  },
  {
    conversation_id: "conv2",
    translation: "この飲み物はいくらですか？",
    pronunciation: "Kono nomimono wa ikura desu ka?",
  },
  {
    conversation_id: "conv7",
    translation: "トイレはどこですか？",
    pronunciation: "Toire wa doko desu ka?",
  },
  {
    conversation_id: "conv9",
    translation: "クレジットカードで払えますか？",
    pronunciation: "Kurejitto kaado de haraemasu ka?",
  },
  {
    conversation_id: "conv10",
    translation: "袋をもらえますか？",
    pronunciation: "Fukuro o moraemasu ka?",
  },
  {
    conversation_id: "conv11",
    translation: "これを温めてもらえますか？",
    pronunciation: "Kore o atatamete moraemasu ka?",
  },
  {
    conversation_id: "conv12",
    translation: "ここでSIMカードを買えますか？",
    pronunciation: "Koko de SIM kaado o kaemasu ka?",
  },
  {
    conversation_id: "conv13",
    translation: "ATMは使えますか？",
    pronunciation: "ATM wa tsukaemasu ka?",
  },
  {
    conversation_id: "conv14",
    translation: "キャッシュレス決済は使えますか？",
    pronunciation: "Kyasshuresu kessai wa tsukaemasu ka?",
  },

  // Restaurant
  {
    conversation_id: "conv3",
    translation: "メニューを見せていただけますか？",
    pronunciation: "Menyuu o misete itadakemasu ka?",
  },
  {
    conversation_id: "conv4",
    translation: "寿司を注文したいです。",
    pronunciation: "Sushi o chuumon shitai desu.",
  },
  {
    conversation_id: "conv8",
    translation: "お会計をお願いします。",
    pronunciation: "Okaikei o onegaishimasu.",
  },
  {
    conversation_id: "conv15",
    translation: "二人ですが、席はありますか？",
    pronunciation: "Futari desu ga, seki wa arimasu ka?",
  },
  {
    conversation_id: "conv16",
    translation: "予約は必要ですか？",
    pronunciation: "Yoyaku wa hitsuyou desu ka?",
  },
  {
    conversation_id: "conv17",
    translation: "おすすめは何ですか？",
    pronunciation: "Osusume wa nan desu ka?",
  },
  {
    conversation_id: "conv18",
    translation: "この料理は辛いですか？",
    pronunciation: "Kono ryouri wa karai desu ka?",
  },
  {
    conversation_id: "conv19",
    translation: "豚肉を食べません。",
    pronunciation: "Buta-niku wo tabemasen",
  },
  {
    conversation_id: "conv20",
    translation: "お水をいただけますか？",
    pronunciation: "Omizu o itadakemasu ka?",
  },
  {
    conversation_id: "conv21",
    translation: "別々に払えますか？",
    pronunciation: "Betsubetsu ni haraemasu ka?",
  },
  {
    conversation_id: "conv22",
    translation: "サービス料は含まれていますか？",
    pronunciation: "Saabisu-ryou wa fukumarete imasu ka?",
  },

  // Shopping
  {
    conversation_id: "conv5",
    translation: "これの大きいサイズはありますか？",
    pronunciation: "Kore no ookii saizu wa arimasu ka?",
  },
  {
    conversation_id: "conv6",
    translation: "これを試着してもいいですか？",
    pronunciation: "Kore o shichaku shite mo ii desu ka?",
  },
  {
    conversation_id: "conv23",
    translation: "別の色はありますか？",
    pronunciation: "Betsu no iro wa arimasu ka?",
  },
  {
    conversation_id: "conv24",
    translation: "これはいくらですか？",
    pronunciation: "Kore wa ikura desu ka?",
  },
  {
    conversation_id: "conv25",
    translation: "これはセールですか？",
    pronunciation: "Kore wa seeru desu ka?",
  },
  {
    conversation_id: "conv26",
    translation: "もっと小さいサイズはありますか？",
    pronunciation: "Motto chiisai saizu wa arimasu ka?",
  },
  {
    conversation_id: "conv27",
    translation: "クレジットカードで払えますか？",
    pronunciation: "Kurejitto kaado de haraemasu ka?",
  },
  {
    conversation_id: "conv28",
    translation: "免税できますか？",
    pronunciation: "Menzei dekimasu ka?",
  },
  {
    conversation_id: "conv29",
    translation: "試着室はどこですか？",
    pronunciation: "Shichakushitsu wa doko desu ka?",
  },
  {
    conversation_id: "conv30",
    translation: "返品できますか？",
    pronunciation: "Henpin dekimasu ka?",
  },

  // Transportation
  {
    conversation_id: "conv31",
    translation: "切符売り場はどこですか？",
    pronunciation: "Kippu uriba wa doko desu ka?",
  },
  {
    conversation_id: "conv32",
    translation: "東京行きの電車はどれですか？",
    pronunciation: "Toukyou-yuki no densha wa dore desu ka?",
  },
  {
    conversation_id: "conv33",
    translation: "何番線に行けばいいですか？",
    pronunciation: "Nan-bansen ni ikeba ii desu ka?",
  },
  {
    conversation_id: "conv34",
    translation: "京都までの切符はいくらですか？",
    pronunciation: "Kyouto made no kippu wa ikura desu ka?",
  },
  {
    conversation_id: "conv35",
    translation: "この電車は大阪行きですか？",
    pronunciation: "Kono densha wa Oosaka-yuki desu ka?",
  },
  {
    conversation_id: "conv36",
    translation: "ICカードはどこでチャージできますか？",
    pronunciation: "IC kaado wa doko de chaaji dekimasu ka?",
  },
  {
    conversation_id: "conv37",
    translation: "次の電車はいつですか？",
    pronunciation: "Tsugi no densha wa itsu desu ka?",
  },
  {
    conversation_id: "conv38",
    translation: "この住所までお願いします。",
    pronunciation: "Kono juusho made onegaishimasu.",
  },
  {
    conversation_id: "conv39",
    translation: "いくらくらいかかりますか？",
    pronunciation: "Ikura kurai kakarimasu ka?",
  },
  {
    conversation_id: "conv40",
    translation: "このバスは駅に行きますか？",
    pronunciation: "Kono basu wa eki ni ikimasu ka?",
  },

  // Hotel
  {
    conversation_id: "conv41",
    translation: "予約しています。",
    pronunciation: "Yoyaku shiteimasu.",
  },
  {
    conversation_id: "conv42",
    translation: "チェックインをお願いします。",
    pronunciation: "Chekkuin o onegaishimasu.",
  },
  {
    conversation_id: "conv43",
    translation: "チェックアウトは何時ですか？",
    pronunciation: "Chekkuauto wa nanji desu ka?",
  },
  {
    conversation_id: "conv44",
    translation: "朝食は含まれていますか？",
    pronunciation: "Choushoku wa fukumarete imasu ka?",
  },
  {
    conversation_id: "conv45",
    translation: "荷物を預かってもらえますか？",
    pronunciation: "Nimotsu o azukatte moraemasu ka?",
  },
  {
    conversation_id: "conv46",
    translation: "タクシーを呼んでもらえますか？",
    pronunciation: "Takushii o yonde moraemasu ka?",
  },
  {
    conversation_id: "conv47",
    translation: "部屋にWi-Fiはありますか？",
    pronunciation: "Heya ni Wi-Fi wa arimasu ka?",
  },
  {
    conversation_id: "conv48",
    translation: "タオルをもう一枚いただけますか？",
    pronunciation: "Taoru o mou ichimai itadakemasu ka?",
  },

  // Airport
  {
    conversation_id: "conv49",
    translation: "チェックインカウンターはどこですか？",
    pronunciation: "Chekkuin kauntaa wa doko desu ka?",
  },
  {
    conversation_id: "conv50",
    translation: "手荷物受取所はどこですか？",
    pronunciation: "Tenimotsu uketori-jo wa doko desu ka?",
  },
  {
    conversation_id: "conv51",
    translation: "搭乗口はどこですか？",
    pronunciation: "Toujouguchi wa doko desu ka?",
  },
  {
    conversation_id: "conv52",
    translation: "何個まで荷物を預けられますか？",
    pronunciation: "Nanko made nimotsu o azukeraremasu ka?",
  },
  {
    conversation_id: "conv53",
    translation: "両替所はどこですか？",
    pronunciation: "Ryougaejo wa doko desu ka?",
  },
  {
    conversation_id: "conv54",
    translation: "SIMカードはどこで買えますか？",
    pronunciation: "SIM kaado wa doko de kaemasu ka?",
  },

  // Sightseeing
  {
    conversation_id: "conv55",
    translation: "ここへはどうやって行けばいいですか？",
    pronunciation: "Koko e wa dou yatte ikeba ii desu ka?",
  },
  {
    conversation_id: "conv56",
    translation: "入場料はいくらですか？",
    pronunciation: "Nyuujouryou wa ikura desu ka?",
  },
  {
    conversation_id: "conv57",
    translation: "何時に開きますか？",
    pronunciation: "Nanji ni akimasu ka?",
  },
  {
    conversation_id: "conv58",
    translation: "ここで写真を撮ってもいいですか？",
    pronunciation: "Koko de shashin o totte mo ii desu ka?",
  },
  {
    conversation_id: "conv59",
    translation: "この近くに有名な場所はありますか？",
    pronunciation: "Kono chikaku ni yuumei na basho wa arimasu ka?",
  },
  {
    conversation_id: "conv60",
    translation: "写真を撮っていただけますか？",
    pronunciation: "Shashin o totte itadakemasu ka?",
  },

  // Everyday conversation
  {
    conversation_id: "conv61",
    translation: "はじめまして。",
    pronunciation: "Hajimemashite.",
  },
  {
    conversation_id: "conv62",
    translation: "どちらから来ましたか？",
    pronunciation: "Dochira kara kimashita ka?",
  },
  {
    conversation_id: "conv63",
    translation: "英語を話せますか？",
    pronunciation: "Eigo o hanasemasu ka?",
  },
  {
    conversation_id: "conv64",
    translation: "もう少しゆっくり話していただけますか？",
    pronunciation: "Mou sukoshi yukkuri hanashite itadakemasu ka?",
  },
  {
    conversation_id: "conv65",
    translation: "もう一度言っていただけますか？",
    pronunciation: "Mou ichido itte itadakemasu ka?",
  },
  {
    conversation_id: "conv66",
    translation: "分かりません。",
    pronunciation: "Wakarimasen.",
  },
  {
    conversation_id: "conv67",
    translation: "助けていただいてありがとうございます。",
    pronunciation: "Tasukete itadaite arigatou gozaimasu.",
  },
  {
    conversation_id: "conv68",
    translation: "すみません。",
    pronunciation: "Sumimasen.",
  },

  // Emergency
  {
    conversation_id: "conv69",
    translation: "助けてください。",
    pronunciation: "Tasukete kudasai.",
  },
  {
    conversation_id: "conv70",
    translation: "一番近い病院はどこですか？",
    pronunciation: "Ichiban chikai byouin wa doko desu ka?",
  },
  {
    conversation_id: "conv71",
    translation: "財布をなくしました。",
    pronunciation: "Saifu o nakushimashita.",
  },
  {
    conversation_id: "conv72",
    translation: "パスポートをなくしました。",
    pronunciation: "Pasupooto o nakushimashita.",
  },
  {
    conversation_id: "conv73",
    translation: "届け出をしたいです。",
    pronunciation: "Todokede o shitai desu.",
  },

  // Animal Vocabulary (Doubutsu)
  { conversation_id: "conv74", translation: "いぬ", pronunciation: "inu" },
  { conversation_id: "conv75", translation: "うま", pronunciation: "uma" },
  { conversation_id: "conv76", translation: "くま", pronunciation: "kuma" },
  { conversation_id: "conv77", translation: "ぞう", pronunciation: "zou" },
  { conversation_id: "conv78", translation: "さい", pronunciation: "sai" },
  { conversation_id: "conv79", translation: "ねこ", pronunciation: "neko" },
  { conversation_id: "conv80", translation: "うし", pronunciation: "ushi" },
  { conversation_id: "conv81", translation: "しか", pronunciation: "shika" },
  { conversation_id: "conv82", translation: "かば", pronunciation: "kaba" },
  { conversation_id: "conv83", translation: "やぎ", pronunciation: "yagi" },
  { conversation_id: "conv84", translation: "ぶた", pronunciation: "buta" },
  { conversation_id: "conv85", translation: "ろば", pronunciation: "roba" },
  { conversation_id: "conv86", translation: "とら", pronunciation: "tora" },
  { conversation_id: "conv87", translation: "りす", pronunciation: "risu" },
  { conversation_id: "conv88", translation: "かめ", pronunciation: "kame" },
  { conversation_id: "conv89", translation: "ひょう", pronunciation: "hyou" },
  { conversation_id: "conv90", translation: "さる", pronunciation: "saru" },
  { conversation_id: "conv91", translation: "いか", pronunciation: "ika" },
  { conversation_id: "conv92", translation: "さめ", pronunciation: "same" },
  { conversation_id: "conv93", translation: "へび", pronunciation: "hebi" },
  { conversation_id: "conv94", translation: "わに", pronunciation: "wani" },
  { conversation_id: "conv95", translation: "たこ", pronunciation: "tako" },
  { conversation_id: "conv96", translation: "かに", pronunciation: "kani" },
  { conversation_id: "conv97", translation: "あり", pronunciation: "ari" },
  { conversation_id: "conv98", translation: "つる", pronunciation: "tsuru" },

  // Self-introduction
  {
    conversation_id: "conv99",
    translation: "私の名前はアンディです。",
    pronunciation: "Watashi no namae wa Andi desu.",
  },
  {
    conversation_id: "conv100",
    translation: "私はインドネシア人です。",
    pronunciation: "Watashi wa Indoneshia-jin desu.",
  },
  {
    conversation_id: "conv101",
    translation: "ジャカルタから来ました。",
    pronunciation: "Jakaruta kara kimashita.",
  },
  {
    conversation_id: "conv102",
    translation: "どうぞよろしくお願いします。",
    pronunciation: "Douzo yoroshiku onegaishimasu.",
  },
  {
    conversation_id: "conv103",
    translation: "こちらは田中さんです。",
    pronunciation: "Kochira wa Tanaka-san desu.",
  },
  {
    conversation_id: "conv104",
    translation: "お仕事は何ですか？",
    pronunciation: "Oshigoto wa nan desu ka?",
  },

  // Starting a New Job
  {
    conversation_id: "conv105",
    translation: "これからお世話になります。",
    pronunciation: "Kore kara osewa ni narimasu.",
  },
  {
    conversation_id: "conv106",
    translation: "これは私の名刺です。",
    pronunciation: "Kore wa watashi no meishi desu.",
  },
  {
    conversation_id: "conv107",
    translation: "頑張ります。",
    pronunciation: "Ganbarimasu.",
  },
  {
    conversation_id: "conv108",
    translation: "新人です。",
    pronunciation: "Shinjin desu.",
  },
  {
    conversation_id: "conv109",
    translation: "教えてください。",
    pronunciation: "Oshiete kudasai.",
  },
  {
    conversation_id: "conv110",
    translation: "私の机はどこですか？",
    pronunciation: "Watashi no tsukue wa doko desu ka?",
  },

  // Making a Purchase
  {
    conversation_id: "conv111",
    translation: "これをください。",
    pronunciation: "Kore o kudasai.",
  },
  {
    conversation_id: "conv112",
    translation: "これはいくらですか？",
    pronunciation: "Kore wa ikura desu ka?",
  },
  {
    conversation_id: "conv113",
    translation: "これを二つください。",
    pronunciation: "Kore o futatsu kudasai.",
  },
  {
    conversation_id: "conv114",
    translation: "もっと大きいのはありますか？",
    pronunciation: "Motto ookii no wa arimasu ka?",
  },
  {
    conversation_id: "conv115",
    translation: "あれをお願いします。",
    pronunciation: "Are o onegaishimasu.",
  },
  {
    conversation_id: "conv116",
    translation: "領収書をもらえますか？",
    pronunciation: "Ryoushuusho o moraemasu ka?",
  },

  // Asking Business Hours
  {
    conversation_id: "conv117",
    translation: "何時まで開いていますか？",
    pronunciation: "Nanji made aite imasu ka?",
  },
  {
    conversation_id: "conv118",
    translation: "何時に開きますか？",
    pronunciation: "Nanji ni akimasu ka?",
  },
  {
    conversation_id: "conv119",
    translation: "何時に閉まりますか？",
    pronunciation: "Nanji ni shimarimasu ka?",
  },
  {
    conversation_id: "conv120",
    translation: "日曜日は開いていますか？",
    pronunciation: "Nichiyoubi wa aite imasu ka?",
  },
  {
    conversation_id: "conv121",
    translation: "今開いていますか？",
    pronunciation: "Ima aite imasu ka?",
  },
  {
    conversation_id: "conv122",
    translation: "祝日は開いていますか？",
    pronunciation: "Shukujitsu wa aite imasu ka?",
  },

  // Confirming a Destination
  {
    conversation_id: "conv123",
    translation: "この電車は新宿へ行きますか？",
    pronunciation: "Kono densha wa Shinjuku e ikimasu ka?",
  },
  {
    conversation_id: "conv124",
    translation: "これは空港へ行きますか？",
    pronunciation: "Kore wa kuukou e ikimasu ka?",
  },
  {
    conversation_id: "conv125",
    translation: "京都行きはどのホームですか？",
    pronunciation: "Kyouto-yuki wa dono hoomu desu ka?",
  },
  {
    conversation_id: "conv126",
    translation: "そこまでどのくらいかかりますか？",
    pronunciation: "Soko made dono kurai kakarimasu ka?",
  },
  {
    conversation_id: "conv127",
    translation: "着いたら教えてください。",
    pronunciation: "Tsuitara oshiete kudasai.",
  },
  {
    conversation_id: "conv128",
    translation: "これは美術館行きのバスですか？",
    pronunciation: "Kore wa bijutsukan-yuki no basu desu ka?",
  },
]
