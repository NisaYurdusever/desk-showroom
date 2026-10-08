# Desk Setup Showroom

Interactive 3D desktop product showcase that runs in the browser (React Three Fiber).

## What I did
There's a lamp, laptop, phone, headphones, and a cat on the desk. Clicking on a product zooms in and opens the configurator panel:
color, screen color, surface (matte/glossy/metal), laptop lid, lamp light. Day/night transition, wall color selection,
there's a cat that follows the cursor and sleeps at night.

## Performance note
- No model files, all geometry procedurally (box, cylinder, sphere): 0 KB model.
- JS bundle: ___ KB (gzip ___ KB), canvas is loaded in a separate chunk with React.lazy. - ContactShadows for shadows, limited to DPR [1, 1.5].
- Static visual is shown if prefers-reduced-motion or low power is detected, 3D scene is not downloaded.
- Lighthouse performance: ___ / FPS: desktop ___, phone ___
- Known missing: ambient light texture comes from CDN; frameloop constantly runs due to cat animation.

## If I had more time
- Importing ambient HDR to local file
- Add to cart stream and product information cards
- More animations for the cat (walking, stretching)
- A real GLB product model and drag-and-drop upload