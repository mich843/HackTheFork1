# AI Workflow Integration Guide

## Current Implementation

The website is currently working with **mock data** stored in `/public/data/menu-results.json`. This allows you to demo the full user experience without needing the AI pipeline.

## Data Format for AI Workflow

The AI workflow should output JSON in the following format and save it to `/public/data/menu-results.json`:

```json
{
  "menus": [
    {
      "id": "menu-1",
      "name": "Menu Name",
      "description": "Brief description of the menu theme",
      "dishes": [
        {
          "name": "Dish Name",
          "description": "Description of the dish"
        }
      ],
      "pricePerPerson": 18.50,
      "impactMetrics": {
        "carbonSaved": {
          "amount": 285,
          "unit": "kg CO2e",
          "comparison": "vs. traditional meat-based version",
          "equivalentTo": "User-friendly comparison"
        },
        "sufferingPrevented": {
          "animalsSpared": 42,
          "breakdown": {
            "chickens": 40,
            "fish": 2
          },
          "description": "Explanation of what these numbers mean"
        }
      }
    }
  ],
  "metadata": {
    "generatedFor": {
      "eventType": "Event Type",
      "numberOfPeople": 100,
      "budget": 2000,
      "address": "Event address"
    },
    "dataSource": "ai-generated",
    "timestamp": "2025-12-13T22:00:00Z"
  }
}
```

## Integration Steps

When you're ready to integrate the AI workflow:

### Option 1: File-Based Integration (Recommended for Demo)

1. **AI Workflow Output**: Have your AI pipeline generate the JSON file in the format above
2. **Save to Public Directory**: Write the file to `/public/data/menu-results.json`
3. **Frontend Auto-Updates**: The frontend will automatically fetch and display the new data when users visit the results page

**Pros:**
- Simple to implement
- No backend server needed
- Easy to debug and test
- Works immediately with the current implementation

**Cons:**
- All users see the same results temporarily
- Not suitable for concurrent users in production

### Option 2: API-Based Integration (Better for Production)

For a production system with multiple concurrent users:

1. **Create API Route**: Add `/app/api/generate-menu/route.ts`:
```typescript
export async function POST(request: Request) {
  const { event, people, budget, address } = await request.json();

  // Call your AI workflow
  const menuData = await callAIWorkflow({ event, people, budget, address });

  return Response.json(menuData);
}
```

2. **Update Results Page**: Modify `/app/results/page.tsx` to POST to this API instead of fetching the static JSON

3. **AI Workflow Integration**: Your AI pipeline becomes a service that the API route calls

## AI Workflow Requirements

Your AI workflow should:

1. **Accept these inputs:**
   - `eventType`: String (e.g., "Afterwork Buffet")
   - `numberOfPeople`: Number (e.g., 100)
   - `budget`: Number (e.g., 2000)
   - `address`: String (e.g., "123 Main St, San Francisco, CA")

2. **Generate realistic outputs:**
   - 3-5 menu options that fit the event type
   - Dishes appropriate for the cuisine style
   - Prices that fit within the budget
   - Impact metrics calculated based on actual research (see references below)

3. **Impact Calculation Guidelines:**
   - **Carbon Footprint**: Average meat meal = ~6kg CO2e, vegan meal = ~1kg CO2e (5kg saved per meal)
   - **Animal Suffering**: Estimate based on typical meat servings per meal type
   - Scale linearly with number of people
   - Provide user-friendly equivalents (miles driven, trees planted, etc.)

## Testing the Integration

1. **Replace the Mock Data**:
   - Generate output from your AI workflow
   - Save it to `/public/data/menu-results.json`
   - Refresh the results page to see your AI-generated menus

2. **Verify Output Format**:
   - All required fields are present
   - Numbers are realistic
   - Descriptions are coherent
   - Impact metrics make sense

## References for Impact Calculations

- Carbon footprint data: Research from Oxford University, Poore & Nemecek (2018)
- Animal welfare statistics: Based on typical meat consumption per meal
- Conversion factors for user-friendly comparisons from EPA calculator

## Need Help?

The current mock data in `/public/data/menu-results.json` serves as a complete example of the expected format. Use it as a reference when building your AI workflow output generator.
