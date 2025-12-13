# AI Workflow Integration Guide

## Overview
This application is designed to integrate with an AI workflow that generates customized vegan menu recommendations based on event details.

## Current Implementation
The application currently uses static mock data from `/public/menus/default-menus.json` to display menu options regardless of user input.

## Data Format for AI Workflow

The AI workflow should generate a JSON file with the following structure:

```json
{
  "eventType": "string",
  "numberOfPeople": number,
  "budget": number,
  "address": "string",
  "menus": [
    {
      "id": "string (unique identifier)",
      "name": "string (menu name)",
      "description": "string (brief description)",
      "pricePerPerson": number,
      "totalPrice": number,
      "items": ["string array of menu items"],
      "carbonFootprintSaved": {
        "value": number,
        "unit": "string (e.g., 'kg CO2e')"
      },
      "sufferingFootprintAvoided": {
        "value": number,
        "unit": "string (e.g., 'animal lives')"
      }
    }
  ]
}
```

## Integration Steps

### Option 1: Session-Based (Recommended for Production)
1. When a user submits the form, generate a unique session ID
2. Send the event details to your AI workflow API
3. The AI workflow generates the menu data and saves it to `/public/menus/{sessionId}.json`
4. Update the menus page to fetch from `/menus/{sessionId}.json` instead of `/menus/default-menus.json`
5. Pass the session ID through the URL or use browser storage

### Option 2: Direct File Replacement (Current Simple Approach)
1. The AI workflow receives event details
2. Generates the menu JSON
3. Writes/overwrites `/public/menus/default-menus.json`
4. The application automatically displays the new menus

### Option 3: API Endpoint (Most Scalable)
1. Create a Next.js API route (e.g., `/api/menus`)
2. The API route calls your AI workflow service
3. Returns the generated menu data directly
4. Update the frontend to fetch from the API instead of static JSON

## File Locations

- **Static Menu Data**: `/public/menus/default-menus.json`
- **Menu Display Page**: `/app/menus/page.tsx`
- **Event Form Page**: `/app/page.tsx`

## Example Metrics Calculation

For an event with 100 people:
- **Carbon Footprint Saved**: Typically 400-600 kg CO2e (compared to traditional non-vegan menu)
- **Suffering Avoided**: Typically 100-130 animal lives (based on animals used in traditional catering)

These metrics represent the **difference** between choosing a vegan menu versus a traditional non-vegan version of the same meal.

## Testing the Integration

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Fill out the event form
4. Submit to see the menu options
5. Replace `/public/menus/default-menus.json` with AI-generated data
6. Refresh the menus page to see updated results

## Notes

- The application is built with Next.js 16, React, TypeScript, and Tailwind CSS
- All menus are displayed in a responsive grid layout
- The form validates all required fields before submission
- Event details are passed via URL query parameters to the menus page
