# How to Integrate Your AI Workflow - Step by Step

## Overview

This document provides the exact steps to connect your AI workflow to this application.

## Current Setup

Right now, the app loads menu data from:
```
public/data/menu-results.json
```

This file contains mock data that's shown to all users. Your AI workflow will replace this with custom data for each query.

## Integration Method: File-Based (Simplest for Demo)

### Step 1: Understand the Input

When a user submits the form, these parameters are available:

```javascript
{
  eventType: "Afterwork Buffet",        // String: type of event
  numberOfPeople: 100,                   // Number: guest count
  budget: 2000,                          // Number: total budget in dollars
  address: "123 Main St, SF, CA"        // String: event location
}
```

### Step 2: Your AI Workflow Should Generate

A JSON file matching this EXACT structure:

```json
{
  "menus": [
    {
      "id": "menu-1",
      "name": "Menu Name Here",
      "description": "Brief description of the menu theme and style",
      "dishes": [
        {
          "name": "Dish Name",
          "description": "What's in this dish"
        }
      ],
      "pricePerPerson": 18.50,
      "impactMetrics": {
        "carbonSaved": {
          "amount": 285,
          "unit": "kg CO2e",
          "comparison": "vs. traditional meat-based Mediterranean buffet",
          "equivalentTo": "Driving 710 miles in an average car"
        },
        "sufferingPrevented": {
          "animalsSpared": 42,
          "breakdown": {
            "chickens": 40,
            "fish": 2
          },
          "description": "Animals that would have been raised and slaughtered for this meal"
        }
      }
    }
  ],
  "metadata": {
    "generatedFor": {
      "eventType": "Afterwork Buffet",
      "numberOfPeople": 100,
      "budget": 2000,
      "address": "123 Main St, San Francisco, CA"
    },
    "dataSource": "ai-generated",
    "timestamp": "2025-12-13T22:00:00Z"
  }
}
```

### Step 3: Write the File

Your AI workflow should:

1. Receive the input parameters
2. Generate 3-5 menu options
3. Calculate impact metrics (formulas below)
4. Format as JSON
5. Write to: `public/data/menu-results.json`

```python
# Example in Python
import json
from datetime import datetime

def generate_menu_json(event_type, num_people, budget, address):
    # Your AI logic here to generate menus
    menus = your_ai_generate_menus(event_type, num_people, budget, address)

    result = {
        "menus": menus,
        "metadata": {
            "generatedFor": {
                "eventType": event_type,
                "numberOfPeople": num_people,
                "budget": budget,
                "address": address
            },
            "dataSource": "ai-generated",
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    }

    # Write to the public data directory
    with open('public/data/menu-results.json', 'w') as f:
        json.dump(result, f, indent=2)

    return result
```

### Step 4: User Sees Results

Once the file is written, the frontend will automatically load and display it when the user visits the results page.

## Impact Calculation Formulas

### Carbon Footprint

**Formula**:
```
carbon_saved = (meat_meal_emissions - vegan_meal_emissions) × number_of_people
```

**Average Values**:
- Meat-based meal: ~6 kg CO2e per meal
- Vegan meal: ~1 kg CO2e per meal
- **Savings**: ~5 kg CO2e per person

**For 100 people**:
```
carbon_saved = 5 kg × 100 = 500 kg CO2e
```

Adjust based on menu type:
- Beef-heavy: 7-8 kg per meal → higher savings
- Chicken-based: 4-5 kg per meal → moderate savings
- Fish-based: 3-4 kg per meal → lower savings

### Animal Suffering

**Formula**:
```
animals_spared = average_servings_per_meal × number_of_people
```

**Typical Servings** (for a buffet with 100 people):
- Chicken dishes: 0.4 chickens per person = 40 chickens total
- Beef dishes: 0.04 cows per person = 4 cows total
- Pork dishes: 0.06 pigs per person = 6 pigs total
- Fish dishes: 0.2 fish per person = 20 fish total

**Example** (American Comfort menu for 100 people):
```python
{
  "animalsSpared": 58,
  "breakdown": {
    "cows": 4,      # BBQ items
    "pigs": 6,      # Bacon/ham items
    "chickens": 48  # Buffalo wings equivalent
  }
}
```

### User-Friendly Equivalents

For carbon footprint, use these conversions:

```python
def get_carbon_equivalent(kg_co2):
    if kg_co2 < 100:
        return f"Not using a dryer for {int(kg_co2 / 3)} loads"
    elif kg_co2 < 300:
        return f"Planting {int(kg_co2 / 22)} trees and letting them grow for 10 years"
    elif kg_co2 < 500:
        return f"Driving {int(kg_co2 * 2.5)} miles in an average car"
    else:
        return f"Taking {kg_co2 / 250:.1f} cars off the road for a month"
```

## Testing Your Integration

### Test 1: Generate Sample Output

Run your AI workflow with test inputs:
```bash
python your_ai_workflow.py \
  --event "Afterwork Buffet" \
  --people 100 \
  --budget 2000 \
  --address "123 Main St, SF"
```

### Test 2: Verify File Structure

Check that `public/data/menu-results.json` exists and has valid JSON:
```bash
cd vegan-menu-planner
cat public/data/menu-results.json | python -m json.tool
```

### Test 3: View in Browser

1. Refresh `http://localhost:3000/results`
2. Verify your menus appear
3. Check that all fields display correctly
4. Verify impact metrics are visible

### Test 4: Validate Required Fields

Every menu MUST have:
- ✅ id (unique string)
- ✅ name (string)
- ✅ description (string)
- ✅ dishes (array with name + description)
- ✅ pricePerPerson (number)
- ✅ impactMetrics.carbonSaved (object with amount, unit, comparison, equivalentTo)
- ✅ impactMetrics.sufferingPrevented (object with animalsSpared, breakdown, description)

## Common Issues

### Issue: Menus not showing
**Fix**: Check browser console for errors. Likely JSON syntax error.

### Issue: Impact metrics missing
**Fix**: Ensure `impactMetrics` object has both `carbonSaved` and `sufferingPrevented` keys.

### Issue: Prices seem wrong
**Fix**: Ensure `pricePerPerson` is a number (not string). Check budget vs total cost.

### Issue: Numbers look unrealistic
**Fix**: Review calculation formulas above. Scale linearly with number of people.

## Advanced: API-Based Integration (Production)

For production with multiple concurrent users, create an API endpoint:

1. Create `app/api/generate-menu/route.ts`:

```typescript
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { event, people, budget, address } = await request.json();

  // Call your AI workflow
  const response = await fetch('YOUR_AI_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, people, budget, address })
  });

  const menuData = await response.json();

  return Response.json(menuData);
}
```

2. Update `app/results/page.tsx` (line 45):

```typescript
// Replace this:
fetch('/data/menu-results.json')

// With this:
fetch('/api/generate-menu', {
  method: 'POST',
  body: JSON.stringify({ event, people, budget, address })
})
```

## Quick Reference

| What | Where | Format |
|------|-------|--------|
| Output file | `public/data/menu-results.json` | JSON |
| Number of menus | 3-5 recommended | Array |
| Dishes per menu | 4-6 recommended | Array |
| Price range | $15-25 per person | Number |
| Carbon saved | 200-500 kg for 100 people | Number |
| Animals spared | 30-80 for 100 people | Number |

## Questions?

- See current mock data: `public/data/menu-results.json`
- See results page code: `app/results/page.tsx`
- See full integration guide: `AI_WORKFLOW_INTEGRATION.md`

## You're Ready!

Once your AI workflow can generate the JSON in the correct format, you're done. The frontend handles everything else automatically.
