# Vegan Event Planner

A web application for planning sustainable vegan events with environmental impact metrics.

## Features

- **Event Selection Form**: Choose from various event types (Thanksgiving Dinner, Afterwork Buffet, Christmas Dinner, etc.) or specify "Other"
- **Custom Event Details**: Input number of people, budget, and event address
- **Menu Recommendations**: View multiple vegan menu options with detailed items and pricing
- **Environmental Impact**: See carbon footprint saved (kg CO2e) and animal suffering avoided compared to traditional non-vegan menus
- **Responsive Design**: Clean, modern interface that works on all devices

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment Ready**: Optimized for production builds

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd vegan-event-planner
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
vegan-event-planner/
├── app/
│   ├── page.tsx              # Event selection form (homepage)
│   ├── menus/
│   │   └── page.tsx          # Menu results page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── public/
│   └── menus/
│       └── default-menus.json # Menu data (to be replaced by AI workflow)
├── AI_WORKFLOW_INTEGRATION.md # Integration guide for AI workflow
└── package.json
```

## Current Implementation

The application currently displays static menu data from `/public/menus/default-menus.json`. This data is designed to be replaced by an AI workflow that generates customized menus based on user input.

### Sample Menus Included

1. **Mediterranean Mezze Spread** - $15/person
2. **Asian Fusion Buffet** - $16/person
3. **American Comfort Classics** - $14/person
4. **Global Tapas Selection** - $17/person

Each menu includes:
- Detailed menu items
- Price per person and total price
- Carbon footprint saved (kg CO2e)
- Animal suffering avoided (animal lives)

## Environmental Metrics

The metrics shown represent the **difference** between choosing a vegan menu versus a traditional non-vegan version:

- **Carbon Footprint**: Reduced greenhouse gas emissions from plant-based ingredients
- **Suffering Avoided**: Number of animals that would typically be used in a traditional menu

## Future Integration

See `AI_WORKFLOW_INTEGRATION.md` for details on integrating with an AI workflow to generate dynamic menu recommendations.

## Demo Ready

This application is fully functional and ready for demonstration purposes. All features work end-to-end:
- Form validation
- Navigation between pages
- Display of all menu options with metrics
- Responsive design
- Clean, professional appearance
