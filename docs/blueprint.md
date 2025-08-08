# **App Name**: Darshan

## Core Features:

- Locomotive Scroll Integration: Smooth scrolling with Locomotive Scroll to create a modern and engaging browsing experience.
- Framer Motion Animations: Framer Motion animations for subtle page transitions and element animations to enhance visual appeal.
- Dynamic Accent Color Theme: A dynamic accent color picker allows users to customize the portfolio's look, with the preference saved in localStorage for consistent theming.
- Contact Form with Firestore: Firestore database is used to save the messages that have been entered using the Contact form.
- Unique Animated Project Cards: Unique Animated Project Cards: Glassmorphic Hover Reveal, Interactive Tilt Card (3D Effect), Vertical Slide Reveal, Animated Tags Cloud, Live Preview Thumbnail, Split Card Animation, Floating Action Buttons, Stack-Flip Animation, Storytelling Scroll Cards, Accent-Adaptive Cards

## Style Guidelines:

- DEFAULT THEME: Background: Very soft dark gray (#0f0f0f) with subtle noise texture.
- DEFAULT THEME: Text: Neutral light gray (#f5f5f5).
- DEFAULT THEME: Accent Color: Neon blue (#00f6ff) as default.
- DEFAULT THEME: Glassmorphism elements: Slight transparency (bg-white/10) with backdrop-blur-lg.
- DEFAULT THEME: Shadows: Soft layered shadows for depth without harsh edges.
- OTHER THEMES: Light Mode: Background: Off-white (#fafafa)
- OTHER THEMES: Light Mode: Text: Dark gray (#1a1a1a)
- OTHER THEMES: Light Mode: Accent: Vibrant teal (#14b8a6)
- OTHER THEMES: Cyberpunk Mode: Background: Gradient from deep purple (#2e026d) to black (#000000)
- OTHER THEMES: Cyberpunk Mode: Text: Light neon green (#a3ffae)
- OTHER THEMES: Cyberpunk Mode: Accent: Neon pink (#ff007f)
- OTHER THEMES: Minimal Beige Mode: Background: Soft beige (#f5efe7)
- OTHER THEMES: Minimal Beige Mode: Text: Charcoal (#2b2b2b)
- OTHER THEMES: Minimal Beige Mode: Accent: Warm orange (#ff7b54)
- ACCENT COLOR CUSTOMIZATION: Theme switcher includes an accent color picker allowing the user to select custom HEX colors.
- ACCENT COLOR CUSTOMIZATION: All accent colors dynamically apply to: Links, Buttons, Highlighted text, Hover states, Project card borders
- Heading Font: "Clash Display" (modern serif/sans hybrid, from Fontshare or Google Fonts alternative like "Playfair Display" with weight 700–900).
- Body Font: "Inter" or "Plus Jakarta Sans" (clean, highly readable sans-serif).
- Font Sizes: h1: text-6xl md:text-8xl with tracking-tight
- Font Sizes: h2: text-4xl md:text-5xl with font-semibold
- Font Sizes: h3: text-2xl md:text-3xl with font-semibold
- Font Sizes: Body: text-base md:text-lg
- Font Sizes: Small labels: text-sm uppercase tracking-widest
- Text Styles: Headings: Slight letter-spacing reduction, tight line-height.
- Text Styles: Body: Comfortable line-height (1.75), max-width on paragraphs for readability.
- CURSOR INTERACTIONS: Custom circular cursor follower: Default: 20px circle with semi-transparent accent color.
- CURSOR INTERACTIONS: Hover over interactive element: Expands to 40px and changes to solid accent color with subtle glow.
- CURSOR INTERACTIONS: Smooth trailing effect using requestAnimationFrame for fluid motion.
- MICRO-INTERACTIONS: Button hover: Scale up slightly (1.05) with soft shadow.
- MICRO-INTERACTIONS: Link hover: Underline slides in from left to right with accent color.
- MICRO-INTERACTIONS: Section entrance: Fade-up with slight delay using Framer Motion.
- MICRO-INTERACTIONS: Theme switcher toggle: Animated icon rotation with color shift.
- MICRO-INTERACTIONS: Project card hover: Parallax tilt + accent glow border.
- MICRO-INTERACTIONS: Navbar: Glassmorphic with backdrop-blur-md and shadow-lg; turns more opaque on scroll.
- RESPONSIVENESS: Mobile-first approach with fluid typography and stack-based layouts.
- RESPONSIVENESS: Collapsible menu for mobile with smooth slide-down animation.
- RESPONSIVENESS: Ensure Locomotive scroll + parallax animations degrade gracefully on mobile.
- PERFORMANCE OPTIMIZATION: Use `next/image` for all images with blur placeholders.
- PERFORMANCE OPTIMIZATION: Lazy-load heavy animations and images outside of viewport.
- PERFORMANCE OPTIMIZATION: Keep animations at 60fps for smoothness.
- Minimal, line-based icons to complement the overall minimal design. These will focus on representing user skills, contact methods, and project types.
- Mobile-first, fully responsive layout that adapts seamlessly to different screen sizes, ensuring a consistent and user-friendly experience on all devices.
- Smooth, subtle animations and transitions to enhance user experience without being distracting.