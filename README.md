# Devika & Ashik — Cinematic Digital Wedding Invitation
> *"A story that began in school, travelled across the miles, and now begins forever."*
> 
> **Two hearts. One journey. A lifetime of love.**

A luxury, mobile-first, cinematic digital wedding invitation website celebrating the journey of **Devika & Ashik** from their school-day romance to sacred marriage at Guruvayur and celebration at Anthikad on **Saturday, 26 December 2026**.

---

## ✨ Features & Chapters

1. **Section 01 – Cinematic Opening:**
   - Full-screen warm ivory and golden cinematic lighting with floating stardust.
   - Auspicious traditional Lord Ganesha motif.
   - Interactive envelope with royal wax seal and smooth unfolding animation on "OPEN OUR STORY".
   - Soft background romantic melody initiated upon interaction.

2. **Section 02 – School Days (Chapter 01 – The Beginning):**
   - Vintage notebook paper texture with faint blue ruled lines and red margin.
   - Nostalgic storytelling: *"Before forever, there was a classroom. Before promises, there were little moments..."*
   - Floating origami paper airplane and delicate sketched motifs.

3. **Section 03 – Long-Distance Romance (Chapter 02 – Miles Apart, Hearts Together):**
   - Cinematic midnight starry sky with twinkling constellations.
   - Two glowing points connected by an animated golden trajectory carrying messages of love.
   - Postal stamp and airmail details symbolizing patience and faith across the miles.

4. **Section 04 – Together Again (Chapter 03 – The Beautiful Present):**
   - Editorial frames showcasing present-day couple photographs with golden accents and hover zooms.
   - Preserves original photo proportions with no face cropping.
   - Automatic elegant fallback cards if photos are being uploaded.

5. **Section 05 – The Grand Wedding Reveal:**
   - Deep royal burgundy (`#702B3D`) and antique gold (`#B89A62`) full-screen reveal.
   - Floating jasmine flower garlands and golden dust particles.
   - Grand typographic announcement: **DEVIKA & ASHIK — THE FOREVER BEGINS**.

6. **Section 06 – Official Traditional Wedding Invitation Card:**
   - Re-imagined Kerala wedding invitation card on warm ivory (`#F8F3EB`) with double-line gold borders and corner ornaments.
   - Traditional Nilavilakku (temple brass lamp) and Ganesha motifs.
   - Complete family lineages, parents' names, grand lineage, muhurtham, thalikettu venue, and celebration venue.
   - Family residence addresses and "Sharing the happiness: Gopu".
   - Instant "Save / Print Invitation Card" feature.

7. **Section 07 – Live Wedding Countdown:**
   - Live counter updating every second to **Saturday, 26 December 2026, 10:30 AM IST (Asia/Kolkata)**.
   - Timezone-safe calculations ensuring user location does not shift the event time.
   - "Add to Google Calendar" 1-click integration.

8. **Section 08 – Event Venues:**
   - **Card 1: Sree Krishna Temple, Guruvayur** (Thalikettu: 10:30 AM – 11:30 AM).
   - **Card 2: Celebration Convention Centre, Anthikad** (Wedding Celebration).
   - "GET DIRECTIONS" buttons with exact Google Maps search links.

9. **Section 09 – RSVP & Family Contact:**
   - Instant 1-tap call to family (`+91 94460 39152`).
   - 1-tap WhatsApp message to family.
   - Interactive RSVP form with automatic WhatsApp message pre-fill.

10. **Section 10 – Final Closing Screen:**
    - Intimate editorial portrait in black outfits.
    - Native Web Share API integration with automatic clipboard fallback.
    - Back to top smooth scroll navigation.

11. **Romantic Audio Engine:**
    - Floating glassmorphism music pill with soundwave animation.
    - Procedurally synthesizes a soothing romantic piano & strings melody using Web Audio API out of the box.
    - Seamlessly plays custom `public/audio/bgm.mp3` when provided.

---

## 📸 Adding Couple Photographs

Place the edited photographs in the `public/images/` directory using these exact filenames:

```
public/
  images/
    couple-01-black-outfits.png  # Warmly lit portrait (Main portrait & final closing)
    couple-02-maroon-saree.png   # Cream kurta & maroon saree (Festive couple moment)
    couple-03-blue-saree.png     # White shirt & royal-blue saree (Togetherness)
    couple-04-night-candid.png   # Nighttime candid portrait (Romantic memory)
    original-invitation.jpg      # Original invitation reference
```

The website automatically detects and displays them with smooth image loading and high-resolution rendering.

---

## 🎵 Adding Custom Music

To play a custom romantic instrumental track:
1. Place your MP3 file at `public/audio/bgm.mp3`.
2. The website will automatically detect and loop this file whenever a guest taps "OPEN OUR STORY" or the music controller.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Cormorant Garamond, Playfair Display, Great Vibes, Inter (via Google Fonts)

---

## 🚀 Getting Started

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

### 3. Local Preview of Production Build
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

This project is a static React application and can be deployed with zero backend configuration:

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel` or link your GitHub repository on [vercel.com](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Deploy to Netlify
1. Drag and drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect via GitHub.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to GitHub Pages
1. In `vite.config.js`, set `base: './'`.
2. Run `npm run build`.
3. Deploy the `dist` folder to your `gh-pages` branch.

---

## 💍 Official Wedding Details Reference

- **Bride:** Devika  
  - Parents: Mrs. Sreeja Reji & Mr. Reji K.V.  
  - Grandparents: Grand D/o K.K. Vimalasurendran (Late) & Tharabai Vimalasurendran (Late) and Kaliparambil Vasudevan (Late) & Mrs. Radha Vasudevan  
  - Address: Karinjett House, Naduvilkara, Vadanappilly  
  - Contact: 9446039152  

- **Groom:** Ashik  
  - Parents: Mrs. Sreedevi & Mr. Anishkumar  
  - Address: Madambatt House, Puthenpeedika  

- **Wedding Ceremony:**  
  - Date: Saturday, 26 December 2026  
  - Malayalam Date: 1202 Dhanu 11  
  - Muhurtham: 10:30 AM to 11:30 AM  
  - Thalikettu Venue: Sree Krishna Temple, Guruvayur  

- **Wedding Celebration:**  
  - Venue: Celebration Convention Centre, Anthikad  

- **Footer:**  
  - *"Sharing the happiness: Gopu"*

