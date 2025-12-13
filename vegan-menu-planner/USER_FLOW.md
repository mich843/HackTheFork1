# User Flow Visualization

## Complete Journey Through the Application

### Step 1: Landing Page (/)
```
┌──────────────────────────────────────────────┐
│                                              │
│        🌱 Vegan Event Planner                │
│                                              │
│   Plan your perfect vegan menu and see      │
│   the positive impact you're making          │
│                                              │
│  What type of event are you planning?       │
│                                              │
│  ┌────────────────┐  ┌──────────────────┐  │
│  │ Thanksgiving   │  │ Afterwork Buffet │  │
│  │    Dinner      │  │                  │  │
│  └────────────────┘  └──────────────────┘  │
│                                              │
│  ┌────────────────┐  ┌──────────────────┐  │
│  │   Christmas    │  │  Birthday Party  │  │
│  │    Dinner      │  │                  │  │
│  └────────────────┘  └──────────────────┘  │
│                                              │
│  ┌────────────────┐  ┌──────────────────┐  │
│  │    Wedding     │  │  Corporate Lunch │  │
│  │   Reception    │  │                  │  │
│  └────────────────┘  └──────────────────┘  │
│                                              │
│  ┌────────────────┐  ┌──────────────────┐  │
│  │    Holiday     │  │      Other       │  │
│  │    Potluck     │  │                  │  │
│  └────────────────┘  └──────────────────┘  │
│                                              │
│         [ Continue to Details ]             │
│                                              │
└──────────────────────────────────────────────┘
```

**User Action**: Clicks on an event type (e.g., "Afterwork Buffet")
**Button State**: Green when selected, continue button becomes active

---

### Step 2: Details Page (/details)
```
┌──────────────────────────────────────────────┐
│  ← Back                                      │
│                                              │
│           Event Details                      │
│        Afterwork Buffet                      │
│                                              │
│  Number of People                            │
│  ┌────────────────────────────────────────┐ │
│  │ 100                                    │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Total Budget ($)                            │
│  ┌────────────────────────────────────────┐ │
│  │ 2000                                   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  Event Address                               │
│  ┌────────────────────────────────────────┐ │
│  │ 123 Main St, San Francisco, CA         │ │
│  └────────────────────────────────────────┘ │
│                                              │
│         [ Find Vegan Menus ]                │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ What happens next?                     │ │
│  │ • Customized vegan menu options        │ │
│  │ • Carbon footprint saved               │ │
│  │ • Animal suffering prevented           │ │
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

**User Action**: Fills in all fields and clicks "Find Vegan Menus"
**Validation**: All fields required before submission

---

### Step 3: Results Page (/results)
```
┌───────────────────────────────────────────────────────┐
│  ← Back                                               │
│                                                       │
│         Your Vegan Menu Options                       │
│                                                       │
│  Event: Afterwork Buffet    Guests: 100 people       │
│  Budget: $2000              Location: 123 Main St...  │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Mediterranean Feast                            │ │
│  │  A vibrant spread featuring Mediterranean...    │ │
│  │                                   $18.50/person │ │
│  │                                   Total: $1,850 │ │
│  │                                                 │ │
│  │  ▶ Show Menu Items                              │ │
│  │                                                 │ │
│  │  ┌─────────────────────┐ ┌──────────────────┐  │ │
│  │  │ 🌍 Carbon Saved     │ │ 💚 Animals Saved │  │ │
│  │  │                     │ │                  │  │ │
│  │  │   285 kg CO2e       │ │   42 animals     │  │ │
│  │  │                     │ │                  │  │ │
│  │  │ vs. traditional     │ │ 40 chickens      │  │ │
│  │  │ meat-based buffet   │ │ 2 fish           │  │ │
│  │  │                     │ │                  │  │ │
│  │  │ 💡 Like driving     │ │                  │  │ │
│  │  │    710 miles        │ │                  │  │ │
│  │  └─────────────────────┘ └──────────────────┘  │ │
│  │                                                 │ │
│  │         [ Select This Menu ]                    │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Asian Fusion Buffet                            │ │
│  │  A delicious journey through Asian cuisines...  │ │
│  │                                   $19.00/person │ │
│  │  ...                                            │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  [3 more menu options...]                            │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  About These Impact Metrics                     │ │
│  │  Carbon Footprint: We calculate the CO2...      │ │
│  │  Animal Suffering: These numbers represent...   │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

**User Action**:
- Expand menus to see full dish lists
- Compare carbon and animal impact metrics
- Select a menu (shows alert in demo version)

---

## Data Flow

### Current Demo Flow:
```
User Input → Form Submission → Results Page → Load menu-results.json
   ↓                               ↓              ↓
Event Type                    Query Params    Static Mock Data
People: 100                   Displayed       (Same for all users)
Budget: $2000                 on page
Address: SF
```

### Future AI-Integrated Flow:
```
User Input → Form Submission → Results Page → Trigger AI Workflow
   ↓                               ↓              ↓
Event Type                    Query Params    Generate Custom Data
People: 100                   Displayed            ↓
Budget: $2000                 on page         Write to JSON file
Address: SF                                        ↓
                                              Load Custom Data
                                                   ↓
                                              Display Results
```

### Alternative API Flow (Production):
```
User Input → Form Submission → API Call → AI Workflow → Return JSON
   ↓              ↓                ↓            ↓           ↓
Form Data → POST /api/        Process     Generate    Display
            generate-menu     Params      Menus       Results
```

---

## Key Features at Each Stage

### Landing Page
✅ 8 event type options
✅ Visual feedback on selection
✅ Disabled button until selection made
✅ Smooth transitions

### Details Page
✅ Form validation (all fields required)
✅ Numeric validation for people/budget
✅ Event type carried from previous page
✅ Preview of what to expect

### Results Page
✅ 5 different menu options
✅ Expandable dish lists
✅ Side-by-side impact metrics
✅ Color-coded cards (green=carbon, purple=animals)
✅ User-friendly equivalents
✅ Educational explanations
✅ Selection buttons (ready for booking integration)

---

## URLs

| Page | URL | Query Params |
|------|-----|--------------|
| Landing | `http://localhost:3000/` | None |
| Details | `http://localhost:3000/details` | `?event=Afterwork+Buffet` |
| Results | `http://localhost:3000/results` | `?event=...&people=100&budget=2000&address=...` |

---

## Color Scheme

- **Primary Green**: `#059669` (emerald-600) - Plant-based theme
- **Light Green**: `#ecfdf5` to `#d1fae5` (green-50 to emerald-100) - Backgrounds
- **Purple**: `#9333ea` (purple-700) - Animal welfare metrics
- **Gray**: Various shades - Text and UI elements

---

## Responsive Breakpoints

- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Adaptive grid
- **Desktop**: > 1024px - Full multi-column layout

All pages are fully responsive and tested on various screen sizes.
