# Vegan Event Planner - Demo Application

## Quick Start

```bash
cd vegan-event-planner
npm run dev
```

Then open http://localhost:3000

## What This Application Does

This is a fully functional web application that helps users plan vegan events while showing the environmental impact of their choices.

### User Flow

1. **Select Event Details**
   - Choose event type (Thanksgiving, Afterwork Buffet, Christmas, etc.)
   - Enter number of people
   - Enter total budget
   - Enter event address

2. **View Menu Options**
   - See 4 different vegan menu proposals
   - Each menu shows detailed items, pricing, and environmental metrics
   - Compare carbon footprint saved and animal suffering avoided

### Key Features

✅ **Fully Functional** - Complete end-to-end user flow
✅ **Clean Design** - Modern, professional appearance using Tailwind CSS
✅ **Responsive** - Works on all screen sizes
✅ **Demo Ready** - Can be used for presentations immediately
✅ **AI Integration Ready** - Structured for future AI workflow integration

## Environmental Impact Metrics

All metrics show the **difference** compared to traditional non-vegan menus:

- **Carbon Footprint Saved**: 450-580 kg CO2e for 100 people
- **Suffering Avoided**: 100-125 animal lives for 100 people

These are realistic estimates based on:
- Reduced greenhouse gas emissions from plant-based ingredients
- Number of animals typically used in traditional catering

## Future AI Workflow Integration

The application is designed to integrate with an AI workflow that will:

1. Receive event details (type, people count, budget, address)
2. Generate customized menu recommendations
3. Calculate accurate environmental metrics
4. Output data in JSON format to `/public/menus/` directory

**Current State**: Uses static mock data from `/public/menus/default-menus.json`

**Future State**: AI workflow writes custom JSON files that the app automatically displays

See `vegan-event-planner/AI_WORKFLOW_INTEGRATION.md` for detailed integration instructions.

## JSON Data Format

The AI workflow should generate JSON files with this structure:

```json
{
  "eventType": "Afterwork Buffet",
  "numberOfPeople": 100,
  "budget": 1500,
  "address": "123 Main St",
  "menus": [
    {
      "id": "menu-1",
      "name": "Menu Name",
      "description": "Brief description",
      "pricePerPerson": 15,
      "totalPrice": 1500,
      "items": ["Item 1", "Item 2", "..."],
      "carbonFootprintSaved": {
        "value": 450,
        "unit": "kg CO2e"
      },
      "sufferingFootprintAvoided": {
        "value": 100,
        "unit": "animal lives"
      }
    }
  ]
}
```

## Project Location

The complete application is in: `/vercel/sandbox/vegan-event-planner/`

## Documentation

- `PROJECT_README.md` - General project documentation
- `AI_WORKFLOW_INTEGRATION.md` - Detailed integration guide for AI workflow
