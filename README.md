# Desk Setup Showroom

Interactive 3D desktop product showcase that runs in the browser (React Three Fiber).

## What I did
There's a lamp, laptop, phone, headphones, and a cat on the desk. Clicking on a product zooms in and opens the configurator panel:
color, screen color, surface (matte/glossy/metal), laptop lid, lamp light. Day/night transition, wall color selection,
there's a cat that follows the cursor and sleeps at night.

## Performance note
- No 3D models or textures are downloaded; geometry is generated in code. Environment lighting uses procedural light panels rather than an external HDR.
- The app shell loads first; the 3D scene is a separate `React.lazy` chunk. Reduced-motion and low-power devices show a static preview until the visitor explicitly opts into 3D, so the scene chunk is not downloaded by default in that fallback.
- Coarse-pointer devices start at DPR 1. `PerformanceMonitor` lowers quality after a frame-rate decline, reducing DPR and contact-shadow resolution.
- The render loop remains active because the cat and laptop lid can animate. `frameloop="demand"` and baking the contact shadow would freeze those animations, so continuous rendering and dynamic shadows are an intentional quality/performance tradeoff.
- Build bundle sizes: main JavaScript 222.68 KB (gzip 70.03 KB); lazy 3D scene chunk 1,030.68 KB (gzip 276.21 KB). These are build-output sizes, not transfer measurements from a deployed site.
- Lighthouse and real-device FPS have not been measured yet. Measure with Chrome DevTools Lighthouse (Navigation) and the FPS counter on a physical desktop and phone; headless or GPU-less Lighthouse runs can overstate Total Blocking Time compared with GPU-backed browsing.

## If I had more time
- Tuning procedural environment lighting and testing metal-finish reflections on target devices
- Add to cart stream and product information cards
- More animations for the cat (walking, stretching)
- A real GLB product model and drag-and-drop upload