# Fixes Summary - Vegan Menu Planner

## Date: December 14, 2025

## Issues Fixed

### 1. ✅ Broken Images Fixed
**Problem:** 
- Thanksgiving Dinner image was not loading (404 error)
- Afterwork Buffet image showed grilled chicken (not appropriate for vegan app)

**Solution:**
- Updated Thanksgiving Dinner image URL to: `https://images.unsplash.com/photo-1606728035253-49e8a23146de`
- Updated Afterwork Buffet image URL to: `https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445`
- Applied changes across:
  - `app/page.tsx` (homepage event cards)
  - `app/eventThemes.ts` (theme configuration)
  - `app/eventColors.ts` (color configuration)
  - All menu JSON files in `public/data/`

**Result:** All images now display properly with appropriate vegan food imagery.

---

### 2. ✅ Background Image Visibility Improved
**Problem:** 
- Background images on details and results pages were too faded (opacity: 0.05)
- Users could barely see the event-themed backgrounds

**Solution:**
- Increased opacity from `0.05` to `0.15` (3x more visible)
- Updated in:
  - `app/details/page.tsx`
  - `app/results/page.tsx`

**Result:** Event-themed backgrounds are now clearly visible while maintaining readability of foreground content.

---

### 3. ✅ Impact Metrics Refined with Fermi Estimates
**Problem:** 
- Numbers were inflated and unrealistic
- Example: 105 animals spared for 100 people (claimed 5 turkeys + 100 chickens)
- Carbon savings were not based on proper calculations
- Different meats have different carbon intensities (beef > pork > chicken)

**Solution:**
Created detailed Fermi estimates based on:

#### Carbon Footprint (per kg):
- Beef: ~27 kg CO2e
- Pork: ~12 kg CO2e
- Chicken: ~6.9 kg CO2e
- Turkey: ~10.9 kg CO2e
- Fish: ~5.5 kg CO2e
- Dairy: ~13.5 kg CO2e
- Vegan alternatives: ~2 kg CO2e

#### Animals Spared (realistic serving sizes):
- Chicken: 1.8 kg dressed → 0.17 chickens per 100g serving
- Turkey: 7 kg dressed → 0.03 turkeys per 100g serving
- Beef: 220 kg per cow → 0.0005 cows per 100g serving
- Pork: 90 kg per pig → 0.001 pigs per 100g serving
- Fish: 0.5 kg per fish → 0.2 fish per 100g serving

#### Example Corrections (100 people):

**Thanksgiving - Traditional Harvest Feast:**
- Before: 420 kg CO2e, 105 animals (5 turkeys, 100 chickens)
- After: 206 kg CO2e, 7 animals (2 turkeys, 5 chickens)
- Reasoning: 15kg turkey equivalent + dairy/eggs = realistic savings

**Afterwork - Global Street Food:**
- Before: 320 kg CO2e, 68 animals (55 chickens, 5 pigs, 8 fish)
- After: 116 kg CO2e, 20 animals (10 chickens, 10 fish)
- Reasoning: Based on actual dish analysis (tacos, cauliflower wings, spring rolls)

**Afterwork - American Sports Bar:**
- Before: 365 kg CO2e, 92 animals (70 chickens, 12 pigs, 10 cows)
- After: 309 kg CO2e, 7 animals (7 chickens)
- Reasoning: Jackfruit sliders, cauliflower wings - conservative estimates

**Result:** All metrics are now based on realistic, defensible calculations documented in `IMPACT_CALCULATIONS.md`.

---

## Files Modified

### Code Files:
1. `app/page.tsx` - Updated event images
2. `app/eventThemes.ts` - Updated theme images
3. `app/eventColors.ts` - Updated color scheme images
4. `app/details/page.tsx` - Increased background opacity
5. `app/results/page.tsx` - Increased background opacity

### Data Files (All Updated with Refined Metrics):
1. `public/data/menus-thanksgiving-dinner.json`
2. `public/data/menus-afterwork-buffet.json`
3. `public/data/menus-christmas-dinner.json`
4. `public/data/menus-wedding-reception.json`
5. `public/data/menus-corporate-lunch.json`
6. `public/data/menus-other.json`

### Documentation:
1. `IMPACT_CALCULATIONS.md` - New file with detailed Fermi estimates
2. `FIXES_SUMMARY.md` - This file

---

## Testing Results

✅ **Visual Testing:**
- All images load correctly
- No meat imagery visible
- Background images clearly visible on details/results pages

✅ **Data Validation:**
- All impact metrics are reasonable and defensible
- Numbers based on scientific research and realistic serving sizes
- Animal counts rounded down (conservative approach)

✅ **Build Testing:**
- Application builds successfully with no errors
- No TypeScript compilation errors
- All routes render correctly

---

## Key Principles Applied

1. **Conservative Estimates:** When in doubt, we rounded down to avoid inflating numbers
2. **Realistic Serving Sizes:** Based on actual consumption patterns (e.g., one person doesn't eat a whole chicken)
3. **Dish-Specific Analysis:** Each menu item analyzed for what it replaces
4. **Carbon Intensity Matters:** Beef has higher carbon footprint than chicken, reflected in calculations
5. **Transparency:** All calculations documented in IMPACT_CALCULATIONS.md

---

## Verification

To verify the fixes:
1. Run `npm run dev` in the vegan-menu-planner directory
2. Navigate to http://localhost:3000
3. Check that all event images display properly (no broken images, no meat)
4. Select "Thanksgiving Dinner" and proceed through the flow
5. Verify background images are visible on details and results pages
6. Check that impact metrics show reasonable numbers (e.g., 7 animals instead of 105)

---

## Notes

- All calculations are documented in `IMPACT_CALCULATIONS.md` for future reference
- Numbers can be adjusted if better research data becomes available
- The approach prioritizes accuracy over impressive-looking numbers
- This maintains credibility and trust with users
