# 🌱 Vegan Event Planner

A web application that helps users plan vegan menus for events and shows the positive environmental and ethical impact of their choices.

## Features

- **Event Selection**: Choose from various event types (Thanksgiving Dinner, Afterwork Buffet, Christmas Dinner, etc.)
- **Custom Parameters**: Input number of guests, budget, and event location
- **Menu Recommendations**: Get 5 curated vegan menu options with detailed dish descriptions
- **Impact Metrics**: See the carbon footprint saved and animal suffering prevented compared to traditional non-vegan alternatives
- **Beautiful UI**: Clean, modern interface with responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd vegan-menu-planner
```

2. Install dependencies (already done if using this repo):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Usage Flow

1. **Select Event Type**: Choose the type of event you're planning from the list
2. **Enter Details**: Provide the number of guests, total budget, and event address
3. **View Results**: Browse through customized vegan menu options
4. **Review Impact**: See detailed metrics on carbon footprint saved and animals spared
5. **Select Menu**: Choose your preferred menu (currently shows an alert; will connect to booking in production)

## Current Implementation

The application currently uses **mock data** for demonstration purposes. All users see the same pre-generated menu options regardless of their input. This allows you to demo the complete user experience.

The mock menus are based on an afterwork buffet with 100 people and showcase realistic pricing and impact metrics.

## AI Workflow Integration

For information on integrating with an AI workflow to generate custom menus based on user input, see [AI_WORKFLOW_INTEGRATION.md](./AI_WORKFLOW_INTEGRATION.md).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment Ready**: Optimized for Vercel deployment

## Project Structure

```
vegan-menu-planner/
├── app/
│   ├── page.tsx              # Event selection page
│   ├── details/
│   │   └── page.tsx          # User input form
│   └── results/
│       └── page.tsx          # Menu results display
├── public/
│   └── data/
│       └── menu-results.json # Mock menu data (AI workflow output)
└── AI_WORKFLOW_INTEGRATION.md # Integration guide
```

## Impact Metrics Explained

### Carbon Footprint
The carbon footprint calculations compare vegan meals to their traditional non-vegan equivalents. Research shows:
- Average meat-based meal: ~6kg CO2e
- Average vegan meal: ~1kg CO2e
- **Savings**: ~5kg CO2e per meal

### Animal Suffering
Numbers represent animals that would have been raised and slaughtered for traditional versions of the same meals. Calculations consider:
- Typical serving sizes for each meat type
- Number of meals served
- Industry standard statistics on animal consumption

## Building for Production

```bash
npm run build
npm start
```

## Future Enhancements

- Real-time AI-powered menu generation
- Integration with catering service APIs
- User accounts and saved events
- Sharing impact metrics on social media
- More detailed environmental impact breakdowns
- Dietary restriction filters
- Photo galleries of dishes

## License

MIT License - feel free to use this for your project!

## Questions?

Check out the [AI_WORKFLOW_INTEGRATION.md](./AI_WORKFLOW_INTEGRATION.md) file for detailed information about connecting your AI pipeline.
