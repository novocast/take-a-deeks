# Take a deeks — page generation rules

You are generating a new topic page for a personal static HTML learning site called "Take a deeks".

Read these rules in full, then generate the page based on whatever topic the user has given you. Derive the slug, pick an accent color that suits the topic, and choose a format that best serves the content — the user doesn't need to specify these.

---

## Rules

**File location**
Output the file as `{topic-slug}/index.html`.
The slug is lowercase-kebab-case, derived from the topic name.
Example: "The Solar System" → `the-solar-system/index.html`

**Shared header**
- Do NOT write any `<header>` HTML — it is injected automatically by `header.js`
- Place this as the very last tag before `</body>`:
  ```html
  <script src="../header.js"></script>
  ```
- header.js inserts the site title, a Home button (top-left), and a Favourite toggle (top-right)

**Colour palette**
You may use one, two, or three colours — use however many genuinely suit the content. Don't force extra colours in just to fill the slots.

| Variable | Role | Where to set it |
|----------|------|-----------------|
| `--accent` | Header background. **Always required.** Pick something that fits the topic's mood. | Inline on `<body>` |
| `--c1` | Primary content colour — punchy/vibrant. For headings, highlights, key interactive elements. | `:root` in `<style>` |
| `--c2` | Contrast/complement colour. For secondary borders, badges, alternate callouts. | `:root` in `<style>` |

```html
<body data-page-id="{topic-slug}" style="--accent: #rrggbb;">
```
```css
/* in <style> — include only the variables you're actually using */
:root {
  --c1: #rrggbb; /* primary */
  --c2: #rrggbb; /* contrast */
}
```

Rules:
- `data-page-id` must equal the slug exactly
- Every colour value must be a 6-character hex — NOT `rgb()`, NOT a named colour
- `header.js` reads `--accent` directly and auto-detects luminance to choose white or dark header text
- Use all defined palette colours throughout the page so the design feels cohesive — not just in one spot
- DO NOT look at other learning articles as I want the content and style to be untainted.
- You are welcome to spend more time searching the web and thinking to gather the required data for content.
- If it will aid in learning, you can embed assets from the web within the page (images, videos, audio, etc), but ensure that any sources are credited in a caption.
- Use interactivity to aid in learning if it will produce a better learning outcome.

**Favourites**
- Fully handled by `header.js` — write no favourite logic in the page

**Style**
- Pure HTML/CSS/JS only — no frameworks, no CDN links, no external dependencies
- All styles in a `<style>` block in `<head>`
- The page must be fully self-contained
- Each page can look completely different — let the content and format drive the design — be creative
- Make it genuinely engaging: use interactivity, diagrams, quizzes, timelines, callouts — whatever suits the topic
- It's aimed at smart adult humans, but they may or may not be familiar with the topic.

**Content depth**
- Pages must be long and substantive — aim for 6–10 distinct named sections
- Go well beyond headline facts. Every topic should cover several of these angles, chosen to suit the subject:
  - *How it works* — the underlying mechanics, science, or process
  - *History and discovery* — how humanity found out, key figures, pivotal moments
  - *Surprising details* — counterintuitive facts, edge cases, things that defy common assumptions
  - *Scale and comparison* — make abstract numbers concrete with analogies
  - *Human context* — exploration, cultural significance, future prospects, open questions
  - *Deep dive on one aspect* — pick the most fascinating sub-topic and really go into it
- Each section should have enough prose to genuinely teach something — not just a stat with a label, but sentences that explain the *why* and *so what*
- Interactive elements (quizzes, toggles, sliders, hover reveals) are strongly encouraged but must complement real explanatory content, not replace it

**In-page navigation**
- Include a sticky side-rail nav (desktop) or a collapsible top nav (mobile) with anchor links to every major section
- Each section must have a matching `id` on its heading element
- Use `IntersectionObserver` in JS to highlight the active nav link as the user scrolls
- Style the nav with `var(--accent)` for the active state

**Index entry**
After writing the page file, edit `index.html` to insert the new entry as the first `<li>` inside `<ul class="topic-list">`, immediately after the comment block. Use the Edit tool — do not ask the user to paste anything.

The entry format:
```html
<li class="topic-entry" style="--entry-accent: #rrggbb;">
  <a href="{topic-slug}/">
    <span class="topic-title">{Title}</span>
    <span class="topic-desc">{One sentence description.}</span>
    <span class="topic-meta"><span class="topic-date">{YYYY-MM-DD}</span></span>
  </a>
</li>
```
Use today's date for `topic-date`. Use the same hex color as `--accent` on the page body.
Ensure you include and folders AND filenames in the topic-slug so that it shows index.html etc as this may be hosted locally in file://