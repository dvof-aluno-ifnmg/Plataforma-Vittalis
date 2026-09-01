# Design System Specification: The Clinical Sentinel

## 1. Overview & Creative North Star
This design system is built upon the North Star of **"The Clinical Sentinel."** In the context of school health data, our UI must act as a precise, authoritative, and calming presence. We are moving away from the "generic SaaS dashboard" look characterized by heavy borders and cluttered grids. Instead, we embrace an **Editorial Precision**—using high-contrast typography, generous white space, and intentional asymmetry to guide a school nurse or administrator through complex data entry without cognitive fatigue.

The aesthetic avoids traditional "boxes within boxes." By leveraging tonal layering and a "No-Line" philosophy, we create an environment that feels more like a high-end medical journal and less like a spreadsheet.

---

## 2. Colors & Surface Architecture
The palette is rooted in deep, authoritative teals and a sophisticated range of neutrals. 

### The "No-Line" Rule
To achieve a premium, custom feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through background color shifts. Use `surface_container_low` (#f3f4f5) to define a content area against the `surface` (#f8f9fa) background. 

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
- **Base Layer:** `surface` (#f8f9fa)
- **Secondary Content Areas:** `surface_container_low` (#f3f4f5)
- **Interactive Cards/Forms:** `surface_container_lowest` (#ffffff)
- **Deep Contextual Areas:** `surface_container_high` (#e7e8e9)

### Signature Textures & Glass
- **The Depth Gradient:** For main CTAs and the primary side of split-screen layouts, use a subtle linear gradient transitioning from `primary` (#004253) to `primary_container` (#005b71) at a 135-degree angle. This adds "visual soul" and dimension.
- **Glassmorphism:** Floating modals or navigation overlays should use `surface_container_lowest` with 80% opacity and a `20px` backdrop blur. This ensures the health data feels integrated into a single, cohesive ecosystem.

---

## 3. Typography
We utilize **Inter** for its mathematical precision and exceptional legibility at small sizes.

- **Display Scale (`display-lg` to `display-sm`):** Reserved for high-level data visualization (e.g., "Total Screenings"). These should be set with a `-0.02em` letter spacing to feel "tighter" and more editorial.
- **Headline & Title:** Use `headline-md` (#191c1d) for form headers. The high contrast against the light neutral background provides the "Sentinel" authority.
- **Body & Labels:** `body-md` is our workhorse for data entry. Use `label-md` in `on_surface_variant` (#40484c) for input labels to create a clear visual hierarchy between the question (label) and the answer (input text).

---

## 4. Elevation & Depth
In this design system, shadows are a last resort. Depth is achieved through **Tonal Layering.**

- **The Layering Principle:** Place a `surface_container_lowest` (Pure White) card on top of a `surface_container_low` section. This creates a soft, natural "lift" that is easier on the eyes than a drop shadow.
- **Ambient Shadows:** For floating elements (e.g., a critical patient alert), use a shadow with a 40px blur, 0% spread, and 6% opacity of `on_surface`. The color should be slightly tinted with our `primary` (#004253) to feel like natural light passing through a clinical environment.
- **The "Ghost Border" Fallback:** If a border is required for accessibility in high-density forms, use the `outline_variant` (#bfc8cc) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components & Layout

### Split-Screen Layout (Form Focus)
This is our signature layout for data collection.
- **Left Panel (Context):** Uses the `primary` to `primary_container` gradient. Contains the `headline-lg` of the record (e.g., "Student Health Intake") and summarized metadata in `on_primary_container`.
- **Right Panel (Action):** Pure `surface_container_lowest`. This is the clean, white workspace where the form resides.

### Form Elements (The Core)
- **Input Fields:** Use a height of `spacing.12` (4rem). The background should be `surface_container_low`. On focus, the background shifts to `surface_container_lowest` and a "Ghost Border" of `primary` at 40% opacity appears.
- **Buttons:** 
    - **Primary:** `primary` (#004253) background with `on_primary` text. Border radius: `md` (0.375rem).
    - **Secondary:** No background. `primary` text. Use a `surface_container_high` background shift on hover.
- **Cards & Lists:** **Prohibit divider lines.** Use `spacing.6` (2rem) of vertical white space to separate student records. If records must be grouped, use a subtle toggle between `surface` and `surface_container_low`.
- **Chips:** For health status (e.g., "Vaccinated," "Pending"), use `secondary_container` with `on_secondary_container` text. These should have a `full` (9999px) radius to contrast against the subtle `md` radius of the form fields.

---

## 6. Do's and Don'ts

### Do
- **DO** use the `spacing.8` and `spacing.10` values to create "breathing room" around data-heavy tables.
- **DO** use `tertiary` (#5c3200) for "Warning" states rather than standard yellow; it feels more sophisticated and clinical.
- **DO** align all form labels to the top-left of the input for maximum scanning speed.

### Don't
- **DON'T** use 1px black or grey borders to separate sections. Use background color shifts.
- **DON'T** use standard "Drop Shadows" from a UI kit. Stick to the Tonal Layering or Ambient Shadow rules.
- **DON'T** crowd the split-screen. The "Context" panel should remain minimalist; it is a mental anchor, not a secondary dashboard.
- **DON'T** use a border-radius larger than `xl` (0.75rem) for anything other than chips; we want a "Subtle" and "Professional" geometric feel.