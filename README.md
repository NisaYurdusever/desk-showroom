# Desk Setup Showroom

An interactive 3D desktop product showcase built with React Three Fiber.

The scene features a lamp, laptop, phone, headphones, and a cat. Clicking a product zooms in and opens its configurator panel, with options for color, screen color, surface finish, laptop lid, and lamp lighting. The scene also includes day/night and wall color controls. The cat follows the cursor and sleeps at night.

## Performance
- No model or texture files are used; all geometry is procedural (0 KB of models). Environment lighting is generated in code, with no external HDR download.
- Initial JavaScript: 222.68 KB (70.03 KB gzip). The 3D scene (three.js, React Three Fiber, and drei) is lazy-loaded in a separate chunk: 1,030.76 KB (276.25 KB gzip). If reduced motion or low-power mode is detected, a static image is shown and the scene chunk is not downloaded unless the visitor opts into 3D.
- DPR is capped at 1.5. Touch devices start at DPR 1, and `PerformanceMonitor` reduces DPR to 1 when frame rate declines. Contact-shadow resolution is reduced at the same time.
- PageSpeed lab data (desktop, GPU-less): Performance and TBT not measured. Software-rendered WebGL can inflate TBT.
- PageSpeed field data (small sample): desktop LCP 2.4 s / INP 67 ms; mobile LCP 3.5 s / INP 202 ms. Slow mobile FCP and TTFB are largely attributable to server and network conditions.
- Known trade-off: the cat and laptop lid animate continuously, so `frameloop="demand"` and baked shadows are not used.
- Known limitation: mobile INP is just above the 200 ms good threshold, and the 3D scene may still be demanding on low-powered phones.

## If I had more time
- Tuning procedural environment lighting and testing metal-finish reflections on target devices
- Add-to-cart flow and product information cards
- More animations for the cat (walking, stretching)
- A real GLB product model and drag-and-drop upload