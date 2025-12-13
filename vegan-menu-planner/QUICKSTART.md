# Quick Start Guide

## Running the Demo

The application is **already running** on `http://localhost:3000`

Simply open your web browser and visit:
```
http://localhost:3000
```

## Testing the Flow

1. **Home Page**: Select an event type (e.g., "Afterwork Buffet")
2. **Details Page**: Enter:
   - Number of people: `100`
   - Budget: `2000`
   - Address: `123 Main St, San Francisco, CA`
3. **Results Page**: Browse through 5 different vegan menu options with impact metrics

## What You'll See

Each menu shows:
- Menu name and description
- List of dishes (click to expand)
- Price per person and total cost
- **Carbon Footprint Saved**: kg of CO2e prevented vs traditional menu
- **Animal Lives Spared**: Number and types of animals saved
- User-friendly equivalents (e.g., "like driving 710 miles")

## Current Behavior

Right now, all users see the **same menu options** regardless of input. This is intentional for the demo phase.

The mock data is optimized for:
- Event: Afterwork Buffet
- People: 100
- Budget: ~$1,650-$2,000

## Next Steps for AI Integration

When you're ready to connect your AI workflow:

1. **Read the Integration Guide**: See `AI_WORKFLOW_INTEGRATION.md` for detailed instructions

2. **Test AI Output**: Have your AI generate a JSON file and replace:
   ```
   public/data/menu-results.json
   ```

3. **Verify Format**: Your AI output should match the structure in the current file

4. **Refresh Page**: The results page will automatically load your new data

## Stopping the Server

To stop the development server:
```bash
# Press Ctrl+C in the terminal where it's running
```

## Restarting the Server

```bash
cd vegan-menu-planner
npm run dev
```

## Building for Production

```bash
npm run build
npm start
```

The production build will be optimized and ready to deploy to any hosting platform (Vercel, Netlify, AWS, etc.).

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
npm run dev
```

**Changes not showing?**
- Next.js has hot reload - just save your files
- If stuck, restart the dev server (Ctrl+C then `npm run dev`)
- Clear browser cache and refresh

**Need help?**
Check the main `README.md` and `AI_WORKFLOW_INTEGRATION.md` files for more details.
