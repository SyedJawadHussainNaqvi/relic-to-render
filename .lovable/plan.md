# Add Quantum Horizons credit to every page footer

## Goal
Display "Developed and Secured by Quantum Horizons Pvt Ltd" in the site footer on every public page, with the text "www.quantum-horizons.com" linking to that URL.

## Approach
The footer is rendered by a single shared component, `src/components/site/Footer.tsx`, so the change only needs to happen there to appear on every route.

## Implementation
1. Update the bottom copyright bar in `src/components/site/Footer.tsx`.
   - Keep the existing copyright line and staff-login link.
   - Add a new line/segment after the copyright that reads:
     `Developed and Secured by ` followed by a link labeled `www.quantum-horizons.com` pointing to `https://www.quantum-horizons.com/`.
   - Open the external link in a new tab with `rel="noopener noreferrer"`.
   - Match existing footer text color and hover treatment (`text-white/70`, `hover:text-accent-on-brand`).

## Verification
- Build the project and confirm no errors.
- Spot-check the homepage and one or two leaf routes in the preview to confirm the credit line appears and the link navigates correctly.
