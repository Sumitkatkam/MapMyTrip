export const SelectTravelsList = [
    {
        id: 1,
        title: "Solo Explorer",
        desc: "Embark on a journey of self-discovery and adventure.",
        icon: "👤",
        people: "1 Person"
    },
    {
        id: 2,
        title: "Romantic Getaway",
        desc: "Share unforgettable moments with your special someone.",
        icon: "💑",
        people: "2 People"
    },
    {
        id: 3,
        title: "Family Adventure",
        desc: "Create cherished memories with your loved ones.",
        icon: "👨‍👩‍👦",
        people: "3 to 5 People"
    },
    {
        id: 4,
        title: "Friend's Escape",
        desc: "Dive into excitement with your thrill-seeking crew.",
        icon: "🎉",
        people: "5 to 10 People"
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Budget-Friendly",
        desc: "Travel smart and save while enjoying the essentials.",
        icon: "💵"
    },
    {
        id: 2,
        title: "Balanced",
        desc: "Enjoy comfort and quality without overspending.",
        icon: "💰"
    },
    {
        id: 3,
        title: "Premium Experience",
        desc: "Indulge in luxury without any compromises.",
        icon: "💎"
    }
];

export const AI_PROMPT = `
Create a detailed travel itinerary in JSON format based on the following preferences:
- Location: {location}
- Duration: {noOfDays} days
- Budget: {budget}
- Traveler type: {traveller}

The itinerary must strictly follow this JSON structure, dynamically accommodating the specified number of days ({noOfDays}):

{
  "id": "string",
  "tripData": [
    {
      "hotel_options": [
        {
          "address": "string",
          "description": "string",
          "geo_coordinates": {
            "latitude": "string",
            "longitude": "string"
          },
          "hotel_image_url": "string",
          "hotel_name": "string",
          "price_per_night": "string",
          "rating": "string"
        },
        // Ensure to get a minimum of 2 and a maximum of 5 hotel options for each day
      ],
      "itinerary": {
        "day_1": {
          "schedule": [
            {
              "place": {
                "description": "string",
                "geo_coordinates": {
                  "latitude": "string",
                  "longitude": "string"
                },
                "place_image_url": "string",
                "place_name": "string",
                "recommended_visiting_time": "string",
                "ticket_pricing": "string",
                "timing": "string",
                "time": "string"
              }
            }
          ]
        },
        ...
        "day_n": {  // Dynamically generated based on {noOfDays}
          "schedule": [
            {
              "place": {
                "description": "string",
                "geo_coordinates": {
                  "latitude": "string",
                  "longitude": "string"
                },
                "place_image_url": "string",
                "place_name": "string",
                "recommended_visiting_time": "string",
                "ticket_pricing": "string",
                "timing": "string",
                "time": "string"
              }
            }
          ]
        }
      },
      "trip_details": {
        "budget": "string",
        "duration": "string",
        "location": "string",
        "traveler_type": "string"
      }
    }
  ],
  "userSelection": {
    "budget": "string",
    "location": {
      "label": "string",
      "value": {
        "description": "string"
      },
      "matched_substrings": [
        {
          "length": "number",
          "offset": "number"
        }
      ],
      "place_id": "string",
      "reference": "string",
      "structured_formatting": {
        "main_text": "string",
        "main_text_matched_substrings": [
          {
            "length": "number",
            "offset": "number"
          }
        ],
        "secondary_text": "string"
      },
      "terms": [
        {
          "offset": "number",
          "value": "string"
        }
      ],
      "types": ["string"]
    },
    "noOfDays": "string",
    "traveller": "string",
    "usersEmail": "string"
  }
}
`;




