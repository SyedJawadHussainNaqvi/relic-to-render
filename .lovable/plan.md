# Update global footer developer credit

## Goal
Replace the existing footer developer credit with the exact text and hyperlink specified, ensuring it appears on every page and remains visually consistent with the established brand footer.

## Current state
- The shared footer is `src/components/site/Footer.tsx`, rendered in `src/routes/__root.tsx`, so a single change covers every route.
- No references to “Alfoze Technologies” exist in the codebase.
- The bottom bar currently reads: "Developed and Secured by www.quantum-horizons.com" (the URL is the link text).

## Implementation
1. Edit `src/components/site/Footer.tsx` bottom copyright bar (lines 117-127).
   - Change the credit line to: "Developed and Secure by Quantum Horizons Pvt Ltd".
   - Make the text "Quantum Horizons Pvt Ltd" the hyperlink to `https://www.quantum-horizons.com/`.
   - Keep `target="_blank"` and `rel="noopener noreferrer"`.
   - Preserve the existing Tailwind classes: `text-white/70` for the base text and `hover:text-accent-on-brand` for the link hover state, maintaining the current professional dark-brand footer treatment.

## Verification
- Build the project and confirm no errors.
- Spot-check the homepage footer in the preview to confirm the new wording, link label, and hover color are correct.
