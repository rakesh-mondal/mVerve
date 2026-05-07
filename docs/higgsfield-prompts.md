# Higgsfield prompts — mVerve site assets

22 placeholders across 24 pages. Generate each in Higgsfield AI ([higgsfield.ai](https://higgsfield.ai)), then drop into the codebase by replacing `<HiggsfieldPlaceholder>` with `<EditorialFigure>` (see [src/components/Visuals.jsx](../src/components/Visuals.jsx)).

---

## Model guide — when to use what inside Higgsfield

| Need | Recommended Higgsfield model | Why |
|---|---|---|
| **Atmospheric editorial still** (factory, data center, clinic, studios) | **Soul** | Cinematic photorealism, natural light, mood-first |
| **Composed / branded still** (flat-lays, book covers, portraits with brand control) | **Nano Banana Pro** | Better at layout, text, complex composition, consistent palette |
| **Environmental portrait** with face partly visible | **Soul ID** *or* **Nano Banana Pro** | Soul ID gives character consistency across shots; Nano Banana Pro gives sharper editorial control |
| **Cinematic loop / animation** | **Soul** for the still → **DoP I2V** for the move | Generate hero frame in Soul, then animate it with DoP (image-to-video). Cleaner than text-to-video for our editorial moves. |
| **Triptych / cross-fade / multi-clip animation** | Generate each frame in Soul → animate each in DoP → cross-fade in any video editor (or use Higgsfield's stitch if available) |

If you have access to **Higgsfield Soul ID**, use it for any shot where mVerve's people / branded interior recurs (Careers studios, Consulting portrait) — it locks visual identity across multiple shots.

---

## Universal style lock — paste at the start of every prompt

```
Editorial photography in the spirit of Thoughtworks magazine and FT
Weekend. Restrained, atmospheric, cinematic, photorealistic. Palette
locked to coral (#CF4520) and ink (#0E1116) accents on a cream
(#F5F1EB) base. Single light source where possible — natural daylight,
sodium lamp, or warm pendant. Shallow depth of field. Documentary feel.
No stock-photo clichés, no smiling people, no AI-art shimmer, no
oversaturated HDR, no lens-flare overload.
```

## Universal negative prompt — paste in the negative field

```
stock photo, smiling people, posed expressions, AI-art shimmer,
oversaturated HDR, lens flare overload, plastic skin, watermark,
text overlay, fish-eye distortion, neon colors, sci-fi aesthetic,
cartoonish, illustration style, low-resolution
```

---

## The 22 prompts

> **Workflow per shot:**
> 1. Generate the still in **Soul** (or Nano Banana Pro where noted).
> 2. If aspect is 21:9 / 4:5 / 3:4, set it in Higgsfield's aspect picker.
> 3. For animations, take the resulting image into **DoP I2V** with the camera move noted.
> 4. Download → drop in the project, swap `<HiggsfieldPlaceholder>` for `<EditorialFigure>`.

---

### 01 · Home — Hero showcase loop
- **File:** [mverve-home-thoughtworks.jsx](../src/pages/mverve-home-thoughtworks.jsx) · component `Showcase`
- **Model:** Soul (still) → **DoP I2V** (animation)
- **Aspect:** 21:9
- **Camera move:** slow push-in (3.5–4 seconds)
- **Prompt:**
```
[universal style lock]
A working factory floor at dusk, viewed wide. Polished concrete reflecting
amber sodium lamps overhead. A single industrial robot arm in the mid-ground,
its joint catching coral light from an inspection lamp. Empty of people.
Atmosphere of considered industry, not noisy automation. Wide-angle lens,
slight wide-screen letterbox feel.
```

---

### 02 · Modernization — Case study
- **File:** [mverve-modernization-tw.jsx](../src/pages/mverve-modernization-tw.jsx) · `CaseStudy`
- **Model:** Soul
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Interior of a specialty-chemicals plant control room. Left side: bank of
1990s green-phosphor CRT terminals running legacy SAP. Right side: a
modern flat-panel dashboard with clean coral and ink data visualizations.
Sodium-lamp wash from above. Diagonal composition. No people, no faces.
The shot is the contrast between old and new running side-by-side.
```

---

### 03 · Manufacturing — Floor shot
- **File:** [mverve-manufacturing-tw.jsx](../src/pages/mverve-manufacturing-tw.jsx) · `FloorShot`
- **Model:** Soul → **DoP I2V**
- **Aspect:** 21:9
- **Camera move:** slow lateral dolly (left → right, 4 seconds)
- **Prompt:**
```
[universal style lock]
Active CNC production line at golden hour. Steel parts being machined,
faint sparks visible at one station, sodium lamps overhead casting amber.
Ink shadows long, coral highlights on tool tips. Wide cinematic frame,
shallow focus on the nearest machine. No faces visible — only hands and
machinery in motion. Documentary register.
```

---

### 04 · Service Design — Workshop
- **File:** [mverve-service-design-tw.jsx](../src/pages/mverve-service-design-tw.jsx) · `Workshop`
- **Model:** **Nano Banana Pro** (composition + many small elements)
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Top-down (90-degree) editorial flat-lay of a wall covered in service-blueprint
sticky notes. Notes are coral and ink on cream paper, arranged in four
horizontal rows. A pair of hands is gesturing in frame holding a sharpie,
no face visible. Soft natural daylight from a window above. Clean, considered,
not chaotic. Slight grain.
```

---

### 05 · Careers — Bengaluru studio
- **File:** [mverve-careers-tw.jsx](../src/pages/mverve-careers-tw.jsx) · `StudioLife` (left)
- **Model:** Soul (or Soul ID if locking studio identity)
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Wide editorial interior of a Bengaluru engineering studio. Exposed brick
walls, long oak tables, monitors glowing with code, warm afternoon light
through tall industrial windows. Two engineers in mid-conversation in the
middle distance, faces turned away from the camera. Plants in coral
ceramic pots. Documentary, not staged.
```

---

### 06 · Careers — Maryland office
- **File:** [mverve-careers-tw.jsx](../src/pages/mverve-careers-tw.jsx) · `StudioLife` (right)
- **Model:** Soul (or Soul ID)
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Wide editorial interior of a Maryland office. Minimal architecture: black
window frames, brushed concrete floor, late-evening light spilling in
horizontally. A single engineer at a whiteboard mid-thought, back to camera,
silhouette only. Sparse, considered, slightly austere. East coast autumn
mood.
```

---

### 07 · Automation — Inspection floor
- **File:** [mverve-automation-tw.jsx](../src/pages/mverve-automation-tw.jsx) · `Floor`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Quality-inspection station on a packaging line. Overhead vision camera
mounted on a steel arm, conveyor belt with units passing through, indicator
LEDs in coral. Ink shadows under the rig, amber rim-light from the line
beyond. No people. Wide cinematic crop, sharp documentary focus.
```

---

### 08 · GreenOps — Hyperscale data centre
- **File:** [mverve-greenops-tw.jsx](../src/pages/mverve-greenops-tw.jsx) · `DataCenter`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Long aisle of a hyperscale data centre, vanishing point in the distance.
Server racks lit by low blue-green ambient LEDs. A single coral exit-sign
glow at the far end of the aisle is the only warm color. No people, no
overdone sci-fi cliches — this should read like a quiet, working facility.
Cinematic 21:9 frame, low-light photorealism.
```

---

### 09 · Healthcare — Clinical room
- **File:** [mverve-healthcare-tw.jsx](../src/pages/mverve-healthcare-tw.jsx) · `ClinicalShot`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Interior of a modern outpatient clinic exam room. Single overhead pendant
light. A wall-mounted monitor in the right third shows a structured patient
summary, glowing softly with a coral accent on the active line. Foreground:
a clinician's hands resting on a tablet, no face visible. Warm clinical,
not cold sterile. Fabric chair, wood-grain cabinetry, clean lines.
```

---

### 10 · Cloud-Native — SRE control room
- **File:** [mverve-cloud-native-tw.jsx](../src/pages/mverve-cloud-native-tw.jsx) · `ControlRoom`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Wide shot of an SRE / on-call control room. Wall of mounted observability
dashboards glowing with green / ink charts, one tile glowing coral
indicating an active alarm. A single engineer in silhouette, back to
camera, mid-foreground left. Dim ambient. Quiet, focused atmosphere — not
crisis. Documentary feel.
```

---

### 11 · MVP Incubator — Senior pod mid-build
- **File:** [mverve-mvp-incubator-tw.jsx](../src/pages/mverve-mvp-incubator-tw.jsx) · `StudioShot`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Three engineers at a single long oak table, two screens each, a wall of
sticky notes in coral and ink behind them. Late-evening warm light from a
hanging pendant. All three with backs to camera. Sense of a small senior
team mid-build, not a large room of juniors. Wide cinematic frame.
```

---

### 12 · Agile Pods — Standup
- **File:** [mverve-agile-pods-tw.jsx](../src/pages/mverve-agile-pods-tw.jsx) · `StandupShot`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Six engineers gathered around a single tall standup desk with one large
screen showing a kanban board. Late afternoon light slanting through tall
warehouse windows. Exposed brick wall behind. No faces visible — backs,
profiles obscured, hands gesturing. Sense of focused conversation, not
performance. Wide cinematic crop.
```

---

### 13 · AI Lab — R&D lab
- **File:** [mverve-ailab-tw.jsx](../src/pages/mverve-ailab-tw.jsx) · `LabShot`
- **Model:** Soul (still) → **DoP I2V** (animation)
- **Aspect:** 21:9
- **Camera move:** slow forward push-in (3.5 seconds)
- **Prompt:**
```
[universal style lock]
Interior of an AI research lab seen from the doorway. Long workbench with
multiple monitors, two showing token streams in green-on-ink terminals,
one showing a hand-drawn architecture diagram on a digital whiteboard.
Single warm pendant light overhead. At the back of the room a small GPU
rack lit by a coral status LED. No people, no glamour. Working space.
```

---

### 14 · Expertise hub — Craft workshop
- **File:** [mverve-expertise-tw.jsx](../src/pages/mverve-expertise-tw.jsx) · `CraftShot`
- **Model:** Soul
- **Aspect:** 21:9
- **Prompt:**
```
[universal style lock]
Wide editorial interior of an engineering studio styled like a craft
workshop. Drafting tables, monitors, a corkboard pinned with hand-drawn
architecture diagrams. Late-evening warm light from a window left of frame.
Books and reference manuals on a shelf in the background. No people.
Sense of considered, slow craft.
```

---

### 15 · Consulting — Principal engineer portrait
- **File:** [mverve-consulting-tw.jsx](../src/pages/mverve-consulting-tw.jsx) · `Portrait`
- **Model:** **Nano Banana Pro** (or **Soul ID** for character consistency across shots)
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Editorial environmental portrait of a senior engineer at a desk. Two
monitors visible behind, both showing architecture diagrams in coral on
ink. Hands on a Moleskine notebook making a mark. Side-light from a
window at frame-left. Half-face visible, three-quarter angle, looking
down at the page — thoughtful, not posed. Mid-40s, neutral expression.
Quiet documentary register.
```

---

### 16 · Experience — Showreel
- **File:** [mverve-experience-tw.jsx](../src/pages/mverve-experience-tw.jsx) · `Showreel`
- **Model:** **Nano Banana Pro** (still) → **DoP I2V**
- **Aspect:** 21:9
- **Camera move:** slow horizontal scroll across three site mockups (4 seconds)
- **Prompt:**
```
[universal style lock]
A horizontal triptych of three editorial site screens displayed on
floating browser frames against a cream background. Left: a long-form
serif headline page with coral italic accent words. Middle: a wide
product photography page with a single hero image. Right: a clean
ink-on-cream dashboard with coral highlights. Type appears slightly
settling into place. Soft motion blur on the type only.
```

---

### 17 · CleanTech — Solar + storage field
- **File:** [mverve-cleantech-tw.jsx](../src/pages/mverve-cleantech-tw.jsx) · `FieldShot`
- **Model:** Soul (still) → **DoP I2V**
- **Aspect:** 21:9
- **Camera move:** slow lateral drift (5 seconds)
- **Prompt:**
```
[universal style lock]
Aerial shot at sunrise over a utility-scale solar farm. Foreground: rows
of photovoltaic panels in clean diagonal alignment. Mid-ground: white
battery storage containers. Distance: faint silhouettes of transmission
towers. Sky: coral horizon line bleeding into ink. Ground shadows long.
Documentary aerial — not a drone-marketing reel. No vehicles, no people.
```

---

### 18 · Success Stories — Triptych cross-fade
- **File:** [mverve-success-stories-tw.jsx](../src/pages/mverve-success-stories-tw.jsx) · `FeaturedStoryShot`
- **Model:** Soul (three stills) → **DoP I2V** for each → stitch in editor
- **Aspect:** 21:9
- **Camera moves:** static or 1-second hold per frame; cross-fade 0.4 seconds
- **Frames:**
  1. *Factory line* — reuse prompt 03 (manufacturing floor)
  2. *Server-rack aisle* — reuse prompt 08 (data centre)
  3. *Clinical exam room* — reuse prompt 09 (clinical room)
- **Notes:** generate the three stills with Soul, animate each with DoP if you want gentle motion, then cross-fade in CapCut / DaVinci / Higgsfield's stitch tool.

---

### 19 · White Papers — Cover flat-lay
- **File:** [mverve-white-papers-tw.jsx](../src/pages/mverve-white-papers-tw.jsx) · `CoverSpread` (1st)
- **Model:** **Nano Banana Pro** (handles text + composition)
- **Aspect:** 3:4
- **Prompt:**
```
[universal style lock]
Top-down flat-lay of a printed white paper cover on a cream desk surface.
Cover paper is heavy uncoated cream stock. Title set in a large serif
italic ("Beyond the Demo"), with a coral underline rule below it, and a
small mono uppercase tag at the top reading "MVERVE · 01 · Q1 2026".
Natural daylight from upper-left, slight shadow under the paper edge.
Photorealistic, editorial — like a magazine still-life.
```

---

### 20 · White Papers — Open spread
- **File:** [mverve-white-papers-tw.jsx](../src/pages/mverve-white-papers-tw.jsx) · `CoverSpread` (2nd)
- **Model:** **Nano Banana Pro**
- **Aspect:** 3:4
- **Prompt:**
```
[universal style lock]
Top-down flat-lay of an open printed white paper, two-page spread visible.
Left page: dense body type in a serif typeface. Right page: a clean
architectural diagram drawn in coral lines on cream paper, suggesting
a strangler-fig migration timeline. Slight grain on the paper. Natural
overhead daylight, no shadows of hands.
```

---

### 21 · White Papers — Library shelf
- **File:** [mverve-white-papers-tw.jsx](../src/pages/mverve-white-papers-tw.jsx) · `CoverSpread` (3rd)
- **Model:** Soul or **Nano Banana Pro**
- **Aspect:** 3:4
- **Prompt:**
```
[universal style lock]
Stacked spines of three printed reports on the corner of a wood desk.
Side-light from a window at right, soft focus on the back two volumes,
sharper on the top spine which has a coral foredge edge stain. Small
mono labels visible on each spine. Quiet, library-like atmosphere.
```

---

### 22 · Contact — Bengaluru studio exterior
- **File:** [mverve-contact-tw.jsx](../src/pages/mverve-contact-tw.jsx) · `StudioPair` (left)
- **Model:** Soul
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Editorial exterior shot of a Bengaluru engineering studio on a quiet
boutique street. Hand-painted signage above the door reading "mVerve"
in a serif italic. Monsoon-evening light, the street still wet from
recent rain. Coral accent on the door frame. No people in the shot.
Mid-distance composition — the door is the subject, the street is context.
```

---

### 23 · Contact — Maryland office exterior
- **File:** [mverve-contact-tw.jsx](../src/pages/mverve-contact-tw.jsx) · `StudioPair` (right)
- **Model:** Soul
- **Aspect:** 4:5
- **Prompt:**
```
[universal style lock]
Editorial exterior shot of a converted brick warehouse office building.
Late-autumn afternoon, slight golden side-light from camera-right. Black
steel-framed industrial windows. A coral accent on the entry door, small
brushed metal "mVerve" plaque beside it. No people, no cars. East-coast
mid-Atlantic mood, considered and quiet.
```

---

## Swap pattern when assets land

```jsx
// Before — labeled placeholder
<HiggsfieldPlaceholder
  kind="image"
  aspect="21/9"
  brief="…"
  caption="Production floor · Tier-1 automotive supplier"
/>

// After — real asset
import floorShot from "../assets/manufacturing-floor.jpg"; // or .mp4 for video

<EditorialFigure caption="Production floor · Tier-1 automotive supplier">
  <img
    src={floorShot}
    alt="Active CNC production line at golden hour"
    className="w-full block"
    style={{ aspectRatio: "21/9", objectFit: "cover" }}
  />
</EditorialFigure>

// For video / animation:
<EditorialFigure caption="Production floor · Tier-1 automotive supplier">
  <video
    src={floorClip}
    autoPlay
    loop
    muted
    playsInline
    className="w-full block"
    style={{ aspectRatio: "21/9", objectFit: "cover" }}
  />
</EditorialFigure>
```

Drop the assets in `src/assets/` (you may need to create the folder). Vite will inline-import them.

---

## Tips for batch generation

1. **Generate the still first, always.** Even for animations, run Soul or Nano Banana Pro for the hero frame. Then send that frame into DoP I2V. Quality is much higher than going text-to-video direct.
2. **Lock the style lock as a Higgsfield preset** if available. It saves pasting it 22 times.
3. **Generate 4 variants per prompt**, pick the best. Higgsfield's variation slider is your friend on the editorial shots.
4. **Color-correct in post if needed.** A 5-second pass in Photoshop / DaVinci to nudge any shot toward the cream/coral/ink palette will pay back. The duotone treatment in [Visuals.jsx](../src/components/Visuals.jsx) (`mix-blend-mode`) can also be applied via CSS later if you want every photo to share an even stronger family resemblance.
5. **For the Careers and Contact studios**, you may want to commit to **Soul ID** with one anchor image so all four shots (two interiors + two exteriors) feel like the same building. That single move will make the brand feel ten times more real.
