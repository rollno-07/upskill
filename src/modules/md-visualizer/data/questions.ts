import { Question } from "../types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is CSS?",
    category: "Box Model & Core",
    shortAnswer: "Cascading Style Sheets (CSS) is the language used to design and style HTML documents, separating content from layout.",
    deepDive: "CSS controls typography, layout, colors, spacing, and responsiveness. Decoupling HTML structure from CSS styling enables reusable layouts, cleaner codebases, and global design updates.",
    codeExample: "body {\n  font-family: sans-serif;\n  color: #333;\n}",
    sandboxType: "BOX_MODEL",
    sandboxConfig: { tab: "box-model" }
  },
  {
    id: 2,
    question: "What does 'cascading' mean in CSS?",
    category: "Selectors & Specificity",
    shortAnswer: "Cascading determines how styles are applied and resolved based on origin, importance, specificity, and declaration order.",
    deepDive: "When conflicting rules target the same element, the cascade resolves the conflict by evaluating priority in order: Importance (!important), Specificity (IDs > Classes > Elements), and Source Order (later declarations win).",
    codeExample: "p { color: red; }\np { color: blue; } /* Wins due to source order */",
    sandboxType: "SELECTORS",
    sandboxConfig: { mode: "cascade" }
  },
  {
    id: 3,
    question: "What is the CSS box model?",
    category: "Box Model & Core",
    shortAnswer: "The box model is a rectangular layout structure consisting of Content, Padding, Border, and Margin.",
    deepDive: "Every element is a box. Content (inner text/images) is padded by Padding, wrapped by a Border, and separated from siblings by Margin.",
    codeExample: ".box {\n  margin: 10px;\n  border: 2px solid;\n  padding: 15px;\n}",
    sandboxType: "BOX_MODEL",
    sandboxConfig: { padding: 15, border: 2, margin: 10 }
  },
  {
    id: 4,
    question: "What is the difference between content-box and border-box (box-sizing)?",
    category: "Box Model & Core",
    shortAnswer: "content-box excludes padding/border from width; border-box includes them, making element sizing predictable.",
    deepDive: "Under 'content-box' (default), setting width to 100px with 10px padding results in a total rendered width of 120px. Under 'border-box', total rendered width stays 100px, automatically squeezing the content area to 80px.",
    codeExample: "* { box-sizing: border-box; }",
    sandboxType: "BOX_MODEL",
    sandboxConfig: { boxSizing: "border-box" }
  },
  {
    id: 5,
    question: "What is specificity in CSS?",
    category: "Selectors & Specificity",
    shortAnswer: "Specificity is a weight system used by browsers to determine which rule wins when multiple selectors target the same node.",
    deepDive: "Specificity is calculated as a tuple (Inline, IDs, Classes, Tags). Inline overrides IDs, which override classes, which override element tags.",
    codeExample: "#nav .active { color: gold; } /* Specificity: (1, 1, 0) */",
    sandboxType: "SELECTORS",
    sandboxConfig: { selectorA: "#nav .active", selectorB: ".active" }
  },
  {
    id: 6,
    question: "How is specificity calculated (hierarchy)?",
    category: "Selectors & Specificity",
    shortAnswer: "Calculated by counting Inline (1,0,0), IDs (1,0,0), Classes/pseudo-classes (0,1,0), and elements/pseudo-elements (0,0,1).",
    deepDive: "Instead of base-10 addition, specificity scales column-by-column. A single ID selector (0,1,0,0) will always defeat any number of class selectors combined (e.g. 10 classes = 0,0,10,0).",
    codeExample: "div.header .menu-item:hover { } /* Specificity: 0, 2, 1 */",
    sandboxType: "SELECTORS"
  },
  {
    id: 7,
    question: "What does !important do, and why is it discouraged?",
    category: "Selectors & Specificity",
    shortAnswer: "!important forces a declaration to bypass normal specificity checks. It is discouraged because it breaks cascading and debugging.",
    deepDive: "Using '!important' makes style overrides exceptionally difficult, as it requires writing even heavier selectors with '!important', leading to rigid, hard-to-maintain stylesheets.",
    codeExample: ".alert { color: red !important; }",
    sandboxType: "SELECTORS",
    sandboxConfig: { useImportant: true }
  },
  {
    id: 8,
    question: "What is the difference between class and id selectors in terms of specificity?",
    category: "Selectors & Specificity",
    shortAnswer: "An ID selector is highly specific and unique to one node, while a class selector has lower specificity and is reusable on multiple nodes.",
    deepDive: "An ID carries a specificity rating of (0,1,0,0), while a class carries (0,0,1,0). Since IDs are unique singletons, they are highly weighted, making them harder to override in standard stylesheets.",
    codeExample: "#header { background: #fff; } /* ID */\n.card { padding: 10px; } /* Class */",
    sandboxType: "SELECTORS"
  },
  {
    id: 9,
    question: "What is the universal selector (*)?",
    category: "Selectors & Specificity",
    shortAnswer: "The universal selector (*) matches any HTML element, frequently used to set base rules and resets.",
    deepDive: "While ideal for resetting margins, overusing '*' on complicated properties can cause tiny performance hits during full-page paint passes as the browser applies rules to everything.",
    codeExample: "* { margin: 0; box-sizing: border-box; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 10,
    question: "What is the difference between a descendant selector and a child selector?",
    category: "Selectors & Specificity",
    shortAnswer: "Descendant (space) selects elements at any level of nesting; child (>) only selects direct, first-level nested children.",
    deepDive: "The descendant selector 'div p' targets every paragraph inside the div. The child selector 'div > p' strictly targets paragraphs directly nested inside the div.",
    codeExample: "div p { color: gray; } /* Descendant */\ndiv > p { font-weight: bold; } /* Child */",
    sandboxType: "SELECTORS"
  },
  {
    id: 11,
    question: "What is an adjacent sibling selector (+)?",
    category: "Selectors & Specificity",
    shortAnswer: "Matches an element that immediately follows another element at the same hierarchy level.",
    deepDive: "Written as 'E + F', it styles element F only if it directly follows sibling E. Excellent for spacing headings and paragraphs dynamically.",
    codeExample: "h1 + p { margin-top: 20px; } /* Applies only to first paragraph after h1 */",
    sandboxType: "SELECTORS"
  },
  {
    id: 12,
    question: "What is a general sibling selector (~)?",
    category: "Selectors & Specificity",
    shortAnswer: "Matches any sibling element that appears anywhere after another sibling element.",
    deepDive: "Written as 'E ~ F', it styles element F as long as it is placed after E under the same parent, regardless of adjacent positioning.",
    codeExample: "input:checked ~ p { color: green; } /* Styles all sibling paragraphs after checkbox is checked */",
    sandboxType: "SELECTORS"
  },
  {
    id: 13,
    question: "What are pseudo-classes?",
    category: "Selectors & Specificity",
    shortAnswer: "Pseudo-classes are keyword selectors targeting an element's transient states or contextual tree relationships.",
    deepDive: "Pseudo-classes like ':hover', ':focus', ':nth-child()', or ':disabled' allow styling elements dynamically based on user interaction or DOM context.",
    codeExample: "button:hover { background: #333; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 14,
    question: "What are pseudo-elements?",
    category: "Selectors & Specificity",
    shortAnswer: "Pseudo-elements are structural markers used to style virtual sub-parts of nodes, declared with double colons (::).",
    deepDive: "They style sub-components of an element, such as generating content before or after elements (::before, ::after) or styling the first letter (::first-letter).",
    codeExample: "p::first-letter { font-size: 2rem; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 15,
    question: "What is the difference between :nth-child() and :nth-of-type()?",
    category: "Selectors & Specificity",
    shortAnswer: ":nth-child() counts siblings regardless of tag type; :nth-of-type() counts only siblings matching the target tag.",
    deepDive: "In a container of mixed tags, 'p:nth-child(2)' targets the second child *if* it is a paragraph. 'p:nth-of-type(2)' targets the second paragraph tag under that parent.",
    codeExample: "p:nth-of-type(even) { background: #eee; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 16,
    question: "What is the difference between display: none and visibility: hidden?",
    category: "Box Model & Core",
    shortAnswer: "display: none completely removes the element from layouts; visibility: hidden hides it but preserves its space.",
    deepDive: "Under 'display: none', the box model collapses and adjacent nodes shift. Under 'visibility: hidden', the element remains physically in layout but appears invisible.",
    codeExample: ".collapsed { display: none; }\n.invisible { visibility: hidden; }",
    sandboxType: "BOX_MODEL",
    sandboxConfig: { tab: "visibility" }
  },
  {
    id: 17,
    question: "What is the difference between visibility: hidden and opacity: 0?",
    category: "Box Model & Core",
    shortAnswer: "visibility: hidden blocks interactions; opacity: 0 keeps the element fully clickable and focusable in the layout.",
    deepDive: "An element with 'opacity: 0' is visually transparent but fully interactive (intercepts mouse clicks). 'visibility: hidden' makes it invisible and inactive for clicks/tab focus.",
    codeExample: ".transparent-clickable { opacity: 0; }",
    sandboxType: "BOX_MODEL",
    sandboxConfig: { tab: "opacity" }
  },
  {
    id: 18,
    question: "What is the difference between relative, absolute, fixed, and sticky positioning?",
    category: "Positioning & Stacking",
    shortAnswer: "relative offsets from normal; absolute offsets relative to ancestor; fixed binds to viewport; sticky offsets on scroll threshold.",
    deepDive: "- relative: offsets within normal flow.\n- absolute: detaches from flow, positions relative to nearest positioned ancestor.\n- fixed: docks to the screen viewport.\n- sticky: behaves relative until reaching a scroll threshold, then locks fixed.",
    codeExample: ".nav { position: sticky; top: 0; }",
    sandboxType: "POSITIONING"
  },
  {
    id: 19,
    question: "What does 'nearest positioned ancestor' mean for position: absolute?",
    category: "Positioning & Stacking",
    shortAnswer: "The closest parent element that has an explicit 'position' of relative, absolute, fixed, or sticky.",
    deepDive: "Absolute nodes look up their parent chain. The first non-static parent becomes the (0,0) coordinate origin. If none are found, coordinates reference the viewport.",
    codeExample: ".parent { position: relative; }\n.child { position: absolute; top: 0; }",
    sandboxType: "POSITIONING"
  },
  {
    id: 20,
    question: "What is z-index and how does it work?",
    category: "Positioning & Stacking",
    shortAnswer: "z-index controls stacking order of positioned elements; higher values render in front of lower values.",
    deepDive: "Only applies to positioned nodes (or flex/grid items). Stack order determines overlap, but comparisons are strictly isolated within local Stacking Contexts.",
    codeExample: ".overlay { position: relative; z-index: 10; }",
    sandboxType: "Z_INDEX"
  },
  {
    id: 21,
    question: "What creates a new stacking context?",
    category: "Positioning & Stacking",
    shortAnswer: "Certain styles like opacity < 1, transforms, filters, and positioned elements with non-auto z-indexes isolate children stacking.",
    deepDive: "If a parent creates a stacking context, its children are locked inside. A child with 'z-index: 9999' will render behind an external sibling with 'z-index: 1' if its parent has a lower stack level.",
    codeExample: ".parent { opacity: 0.9; } /* Creates stacking context */",
    sandboxType: "Z_INDEX"
  },
  {
    id: 22,
    question: "What is Flexbox?",
    category: "Flexbox & Grid",
    shortAnswer: "A one-dimensional layout model designed for distributing space and aligning items along a single row or column.",
    deepDive: "Flexbox manages items along a main axis and a cross axis. It is ideal for UI widgets, side-by-side alignments, and fluid sizing rules.",
    codeExample: ".container { display: flex; justify-content: center; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 23,
    question: "What is the difference between justify-content and align-items in Flexbox?",
    category: "Flexbox & Grid",
    shortAnswer: "justify-content aligns items on the main axis; align-items aligns items on the cross axis.",
    deepDive: "In row layout, 'justify-content' centers or spreads elements horizontally. 'align-items' controls how elements stretch or center vertically.",
    codeExample: ".box { display: flex; justify-content: space-between; align-items: center; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 24,
    question: "What does flex: 1 shorthand mean?",
    category: "Flexbox & Grid",
    shortAnswer: "Shorthand for 'flex-grow: 1; flex-shrink: 1; flex-basis: 0%'.",
    deepDive: "Using 'flex: 1' makes an item scale dynamically. Setting flex-basis to 0% forces the item to divide all leftover container space equally with other active flex boxes.",
    codeExample: ".item { flex: 1; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 25,
    question: "What is the difference between flex-grow and flex-shrink?",
    category: "Flexbox & Grid",
    shortAnswer: "flex-grow controls how items expand to fill extra space; flex-shrink controls how they contract to avoid overflow.",
    deepDive: "If a container has excess space, grow coefficients scale item widths. If a container is too narrow, shrink coefficients dictate how much elements squeeze.",
    codeExample: ".grow { flex-grow: 2; }\n.no-shrink { flex-shrink: 0; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 26,
    question: "What does flex-basis define?",
    category: "Flexbox & Grid",
    shortAnswer: "The initial, starting size of a flex item before grow or shrink offsets are computed.",
    deepDive: "It sets the starting footprint (like width in a row layout) and accepts explicit values (px, %, rem) or 'auto' (the default content sizing).",
    codeExample: ".col { flex-basis: 200px; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 27,
    question: "What is CSS Grid?",
    category: "Flexbox & Grid",
    shortAnswer: "A two-dimensional layout model designed to organize contents into structured rows and columns simultaneously.",
    deepDive: "Grid is outstanding for large layout grids and bento boxes. It manages alignment on both horizontal rows and vertical columns, establishing a rigid layout frame.",
    codeExample: ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}",
    sandboxType: "GRID"
  },
  {
    id: 28,
    question: "What is the difference between Flexbox and Grid, and when would you choose each?",
    category: "Flexbox & Grid",
    shortAnswer: "Flexbox is 1D (flows linear rows or cols); Grid is 2D (controls both). Use Flexbox for content alignment, Grid for structural layout grids.",
    deepDive: "Choose Flexbox when item size dictates wrapping (content-first). Choose Grid when you want a strict blueprint first, placing items into pre-calculated sectors (layout-first).",
    codeExample: "/* Flex: navbar */\n.nav { display: flex; }\n/* Grid: page framework */\n.layout { display: grid; }",
    sandboxType: "GRID"
  },
  {
    id: 29,
    question: "What does grid-template-columns: repeat(3, 1fr) do?",
    category: "Flexbox & Grid",
    shortAnswer: "Declares three columns of identical widths, with each column taking up one equal fraction of the available grid space.",
    deepDive: "The 'repeat' and '1fr' helpers simplify grid creation. Instead of declaring '1fr 1fr 1fr', it scales 3 equal columns that automatically resize symmetrically.",
    codeExample: ".columns { grid-template-columns: repeat(3, 1fr); }",
    sandboxType: "GRID"
  },
  {
    id: 30,
    question: "What is the fr unit in CSS Grid?",
    category: "Flexbox & Grid",
    shortAnswer: "The 'fr' unit is a fractional unit representing a share of leftover space in the grid container.",
    deepDive: "If grid columns are declared '150px 1fr 2fr', the browser reserves 150px first, then divides remaining space in a 1:2 ratio between the other columns.",
    codeExample: ".ratio-grid { grid-template-columns: 100px 1fr 2fr; }",
    sandboxType: "GRID"
  },
  {
    id: 31,
    question: "What is grid-template-areas used for?",
    category: "Flexbox & Grid",
    shortAnswer: "Enables mapping layout structures visually by naming areas, simplifying structural re-ordering on responsive viewports.",
    deepDive: "You specify a text representation of your grid columns. This is highly legible, enabling layout adaptations within media queries simply by reordering text tags.",
    codeExample: ".grid { grid-template-areas: 'header header' 'sidebar content'; }",
    sandboxType: "GRID"
  },
  {
    id: 32,
    question: "What is the difference between implicit and explicit grid tracks?",
    category: "Flexbox & Grid",
    shortAnswer: "Explicit tracks are defined manually; implicit tracks are auto-created by the browser as content overflows boundaries.",
    deepDive: "When you declare 'grid-template-rows: 100px', you specify one explicit row. Overflow items generate implicit tracks, which can be styled using 'grid-auto-rows'.",
    codeExample: ".grid { grid-auto-rows: 50px; } /* implicit tracks styled */",
    sandboxType: "GRID"
  },
  {
    id: 33,
    question: "What does grid-auto-flow: dense do?",
    category: "Flexbox & Grid",
    shortAnswer: "dense packs smaller grid items out of source order to fill empty layout gaps.",
    deepDive: "By default, items align in order. If large items leave gaps, 'dense' pulls subsequent smaller items in markup backward to fill the holes, saving space but breaking linear readability.",
    codeExample: ".grid { grid-auto-flow: dense; }",
    sandboxType: "GRID"
  },
  {
    id: 34,
    question: "What are CSS custom properties (variables)?",
    category: "Architecture & Modern",
    shortAnswer: "Live variables declared with a '--' prefix, accessible dynamically via 'var()'.",
    deepDive: "Unlike Sass, CSS variables exist live in the browser. They inherit through the cascade, can be tweaked via JS, and update dynamically inside media queries.",
    codeExample: ":root { --theme: #007bff; }\n.btn { background: var(--theme); }",
    sandboxType: "VARIABLES"
  },
  {
    id: 35,
    question: "How do CSS custom properties differ from Sass/Less variables?",
    category: "Architecture & Modern",
    shortAnswer: "CSS variables are dynamic, cascade-aware, and editable in browser runtimes, while preprocessor variables are compiled into static values at build time.",
    deepDive: "Preprocessor variables cease to exist once compiled. CSS variables can be recalculated at runtime, e.g. toggling dark theme variables with a simple CSS class swap.",
    codeExample: ".dark { --theme: #121212; }",
    sandboxType: "VARIABLES"
  },
  {
    id: 36,
    question: "What is the calc() function used for?",
    category: "Sizing & Responsive",
    shortAnswer: "Performs real-time mathematical operations directly in CSS values, allowing mixed units.",
    deepDive: "Useful for mixing incompatible units, e.g., combining percentages with absolute offsets like 'width: calc(100% - 30px)'. Needs space around + and - signs.",
    codeExample: ".full-offset { width: calc(100vw - 40px); }",
    sandboxType: "VARIABLES"
  },
  {
    id: 37,
    question: "What is a media query?",
    category: "Sizing & Responsive",
    shortAnswer: "A rule that conditionally applies styles based on viewport dimensions, screen traits, or system preferences.",
    deepDive: " bedrock of responsive designs, resolving structural elements based on queries like '@media (min-width: 768px)' or orientation setups.",
    codeExample: "@media (min-width: 768px) { .menu { display: flex; } }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 38,
    question: "What is the mobile-first approach to media queries?",
    category: "Sizing & Responsive",
    shortAnswer: "Styling mobile viewports first by default, then layering tablet and desktop styles using progressive 'min-width' queries.",
    deepDive: "Ensures light performance weight for handheld devices. Code stays clean since 'min-width' appends features progressively rather than overriding heavy layouts.",
    codeExample: ".card { width: 100%; }\n@media (min-width: 768px) { .card { width: 50%; } }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 39,
    question: "What is the difference between min-width and max-width media queries?",
    category: "Sizing & Responsive",
    shortAnswer: "min-width applies to sizes at or above the threshold; max-width applies to sizes at or below the threshold.",
    deepDive: "- min-width: 768px means '768px and wider'.\n- max-width: 767px means '767px and narrower'.",
    codeExample: "@media (max-width: 480px) { .hide-mobile { display: none; } }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 40,
    question: "What is a CSS unit's difference between px, %, em, rem, vh/vw?",
    category: "Sizing & Responsive",
    shortAnswer: "px is fixed; % is relative to parent; em is relative to text size; rem is relative to root size; vh/vw is viewport-relative.",
    deepDive: "- px: absolute pixels.\n- %: scales relative to parent container size.\n- em: relative to element's font size (compounds inside nestings).\n- rem: relative to root <html> font-size.\n- vh/vw: percentage of viewport height/width.",
    codeExample: "h1 { font-size: 2.5rem; padding: 1em; }",
    sandboxType: "FONT_UNITS"
  },
  {
    id: 41,
    question: "Why might rem be preferred over em for consistent sizing?",
    category: "Sizing & Responsive",
    shortAnswer: "rem references root font size, avoiding cascading scaling errors associated with em nesting.",
    deepDive: "Because 'em' uses parent font sizes, nesting elements creates a compound multiplication effect, causing fonts to shrink or grow unpredictably. 'rem' provides flat predictability.",
    codeExample: ".nested { font-size: 1rem; } /* predictable root scale */",
    sandboxType: "FONT_UNITS"
  },
  {
    id: 42,
    question: "What is responsive design?",
    category: "Sizing & Responsive",
    shortAnswer: "Creating layouts that adapt fluidly to any screen size using percentage grids, elastic text, and media queries.",
    deepDive: "Focuses on liquid, proportional elements that dynamically adjust. Ensures layout accessibility regardless of device shapes or screen heights.",
    codeExample: ".grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 43,
    question: "What is the difference between responsive and adaptive design?",
    category: "Sizing & Responsive",
    shortAnswer: "Responsive stretches continuously and fluidly; adaptive snaps into fixed layout widths at designated breakpoints.",
    deepDive: "Responsive design behaves like liquid, adapting continuously to any size change. Adaptive design identifies specific device frames (e.g. mobile 320px) and snaps to a fixed template layout.",
    codeExample: "/* Adaptive fixed width layout */\n.page { width: 960px; }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 44,
    question: "What is a CSS reset/normalize stylesheet?",
    category: "Architecture & Modern",
    shortAnswer: "Base stylesheets designed to override or standardize default browser-agent rendering differences.",
    deepDive: "Ensures a uniform visual slate. Eliminates unexpected default paddings, list bullets, or border discrepancies across modern browser rendering engines.",
    codeExample: "* { margin: 0; padding: 0; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 45,
    question: "What is the difference between a CSS reset and normalize.css?",
    category: "Architecture & Modern",
    shortAnswer: "Resets aggressively strip all styling; normalize.css standardizes default stylings without wiping them.",
    deepDive: "A reset makes all tags look uniform (headings become small, unbolded text). Normalize.css preserves useful defaults (like h1 margins and text formatting) while fixing browser bugs.",
    codeExample: "/* Reset */\nh1 { font-size: 1rem; }\n/* Normalize preserves scale but ensures consistency */",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 46,
    question: "What is the CSS float property historically used for, and why is it less common now?",
    category: "Architecture & Modern",
    shortAnswer: "Used to wrap text around images, and historically for columns; now replaced by Flexbox and Grid for layout.",
    deepDive: "Floats wrap text. Before Flexbox/Grid, developers floated columns left/right. Because floated nodes slip out of document flow, they collapse heights, making floats highly fragile for layouts.",
    codeExample: ".img { float: left; margin: 10px; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 47,
    question: "What does clear do in relation to float?",
    category: "Architecture & Modern",
    shortAnswer: "Forces an element to sit below preceding floated siblings instead of wrapping beside them.",
    deepDive: "Forces normal document stack flow to resume. Prevents elements like footers from squeezing alongside floated sidebar columns.",
    codeExample: ".footer { clear: both; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 48,
    question: "What is the 'clearfix' hack?",
    category: "Architecture & Modern",
    shortAnswer: "A style rule forcing parent containers to properly contain their floated children and maintain height.",
    deepDive: "If all children are floated, parent height collapses to 0. A clearfix injects a hidden block after children, applying 'clear: both' to force parent boundary expansion.",
    codeExample: ".clearfix::after {\n  content: '';\n  display: block;\n  clear: both;\n}",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 49,
    question: "What is the difference between inline, inline-block, and block display values?",
    category: "Box Model & Core",
    shortAnswer: "inline flows with text; inline-block respects width/height; block takes full width and starts a new line.",
    deepDive: "- inline: ignores width/height/vertical margin.\n- inline-block: flows like text but respects sizing/padding boxes.\n- block: occupies full parent horizontal line width.",
    codeExample: ".box { display: inline-block; width: 100px; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 50,
    question: "What is the CSS :root pseudo-class commonly used for?",
    category: "Architecture & Modern",
    shortAnswer: "Targets the document's highest element (<html>), commonly used for global design-token variable declarations.",
    deepDive: "While functionally equivalent to targeting 'html', ':root' possesses higher specificity weight. It is the designated location to configure global colors, dark modes, and variables.",
    codeExample: ":root { --accent: #ff0055; }",
    sandboxType: "VARIABLES"
  },
  {
    id: 51,
    question: "What is a CSS transition?",
    category: "Transitions & Animations",
    shortAnswer: "Smoothly interpolates a style value over time when triggered by a state change (like hover).",
    deepDive: "Animates value changes directly between two states. Requires a trigger like ':hover' or a JS class swap.",
    codeExample: ".btn {\n  transition: opacity 0.3s;\n}\n.btn:hover { opacity: 0.8; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 52,
    question: "What is a CSS animation (@keyframes)?",
    category: "Transitions & Animations",
    shortAnswer: "Orchestrates multi-step style alterations that play automatically and can loop infinitely without triggers.",
    deepDive: "Requires a '@keyframes' rule defining timeline frames (0% to 100%). Provides control over iterations, delays, direction, and speed curves.",
    codeExample: "@keyframes pulse {\n  50% { transform: scale(1.1); }\n}\n.pulse { animation: pulse 2s infinite; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 53,
    question: "What is the difference between transition and animation?",
    category: "Transitions & Animations",
    shortAnswer: "Transitions need triggers and only interpolate start-to-end; animations run autonomously and support multi-step timelines.",
    deepDive: "Use transitions for interactive feedback (like mouse hover). Use animations for complex repeating graphics (like page loading indicators).",
    codeExample: "/* Transition */\n.btn { transition: color 0.2s; }\n/* Animation */\n.ring { animation: rotate 1s infinite; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 54,
    question: "What CSS properties are cheapest to animate for performance, and why?",
    category: "Transitions & Animations",
    shortAnswer: "transform and opacity, because they bypass reflow and repaint phases and execute directly on the GPU.",
    deepDive: "Browsers avoid heavy math when shifting elements via 'transform' or 'opacity'. The GPU moves pre-rendered composite layers, yielding 60fps animations.",
    codeExample: ".fade-slide { transform: translateY(10px); opacity: 0; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 55,
    question: "What is a browser reflow (layout) and why is it expensive?",
    category: "Transitions & Animations",
    shortAnswer: "The process of computing element shapes and dimensions on screen, which demands high CPU calculations.",
    deepDive: "Triggered by sizing modifications (e.g., width, margin, font-size). Recalculating geometry cascadingly triggers updates in child and sibling elements, causing frame drops.",
    codeExample: ".box { width: 100px; } /* Animating this triggers heavy CPU reflow */",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 56,
    question: "What is a repaint, and how does it differ from a reflow?",
    category: "Transitions & Animations",
    shortAnswer: "Repainting redraws visual pixels on screen without altering the element's layout geometry.",
    deepDive: "Modifying properties like 'color', 'background-color', or 'box-shadow' triggers repaint. Faster than reflow because layout layout sizes are untouched, but slower than GPU transforms.",
    codeExample: ".hover-btn:hover { background-color: purple; } /* Repaint only */",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 57,
    question: "What is will-change used for?",
    category: "Transitions & Animations",
    shortAnswer: "A performance optimization hint to prepare browser GPU rendering layers before an animation starts.",
    deepDive: "Allows browsers to promote a node to its own compositor layer. Use sparingly on target animation nodes to prevent wasting graphic hardware memory.",
    codeExample: ".will-animate { will-change: transform; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 58,
    question: "What is the CSS transform property used for?",
    category: "Transitions & Animations",
    shortAnswer: "Alters the coordinate system of elements (scale, rotate, translate, skew) without shifting surrounding layouts.",
    deepDive: "Allows visual rendering manipulation inside the compositor layer, meaning elements can hover or spin visually without causing layout adjustments.",
    codeExample: ".spin { transform: rotate(45deg); }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 59,
    question: "What is the difference between transform: translate() and changing top/left?",
    category: "Transitions & Animations",
    shortAnswer: "translate uses cheap GPU compositing, while top/left forces expensive CPU reflow.",
    deepDive: "Changing 'top/left' alters physical layout coordinates, invoking browser layout geometry passes. 'translate()' floats visual elements without touching physical bounding frames.",
    codeExample: ".card { transform: translate(10px, 10px); }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 60,
    question: "What is a CSS pseudo-class like :not() used for?",
    category: "Selectors & Specificity",
    shortAnswer: "Excludes specific selectors from receiving stylesheet rules, simplifying list definitions.",
    deepDive: "Also called negation selector. Avoids tedious nth-child rules by applying properties to everything except target exception elements.",
    codeExample: "li:not(:last-child) { border-bottom: 1px solid; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 61,
    question: "What is the :is() / :where() selector for?",
    category: "Selectors & Specificity",
    shortAnswer: "Groups selectors compactly. :is() uses the highest specificity in the list, while :where() carries zero specificity.",
    deepDive: "Excellent for clean stylesheets. ':is(h1, h2)' groups selectors together. ':where(h1, h2)' does the same but yields 0 specificity, allowing base styles to override.",
    codeExample: ":where(article) p { color: #666; } /* Zero specificity */",
    sandboxType: "SELECTORS"
  },
  {
    id: 62,
    question: "What is CSS specificity's interaction with the cascade layer feature (@layer)?",
    category: "Selectors & Specificity",
    shortAnswer: "@layer organizes CSS into priority stages. Styles in higher layers override lower ones, regardless of specificity weight.",
    deepDive: "Eliminates specificity battles. You arrange layers like 'base, components, utilities'. Any rule placed in 'utilities' overrides rules in 'components' even if 'components' uses ID selectors.",
    codeExample: "@layer utilities { .blue { color: blue; } }",
    sandboxType: "SELECTORS"
  },
  {
    id: 63,
    question: "What is a CSS containment property (contain) used for?",
    category: "Transitions & Animations",
    shortAnswer: "Isolates the rendering boundaries of components to speed up layout calculations.",
    deepDive: "Declaring 'contain: layout paint' tells browsers that changes inside cannot overflow outer boxes, preventing full-page recalculation.",
    codeExample: ".card { contain: content; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 64,
    question: "What is content-visibility: auto used for?",
    category: "Transitions & Animations",
    shortAnswer: "Skips layout and paint passes for off-screen elements, improving initial page loading speeds.",
    deepDive: "Instructs browsers to delay rendering of sections below the fold. It behaves like image lazy loading, but applied to full HTML components.",
    codeExample: ".section { content-visibility: auto; contain-intrinsic-size: 400px; }",
    sandboxType: "TRANSITIONS"
  },
  {
    id: 65,
    question: "What is the difference between min-width/max-width and just width for responsive elements?",
    category: "Sizing & Responsive",
    shortAnswer: "width defines a rigid element size; min/max width establish fluid boundaries to fit smaller screens.",
    deepDive: "Using 'width: 500px' overflows mobile screens. Combining 'width: 500px' with 'max-width: 100%' enables fluid scaling on mobile while capping desktop size at 500px.",
    codeExample: ".box { width: 500px; max-width: 100%; }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 66,
    question: "What is object-fit used for?",
    category: "Sizing & Responsive",
    shortAnswer: "Controls how images and video stretch, scale, or crop inside their containers.",
    deepDive: "'cover' crops images to fill borders without stretching. 'contain' fits full assets inside boundaries without cropping.",
    codeExample: "img { width: 100px; height: 100px; object-fit: cover; }",
    sandboxType: "OBJECT_FIT"
  },
  {
    id: 67,
    question: "What is aspect-ratio used for?",
    category: "Sizing & Responsive",
    shortAnswer: "Sets preferred sizing ratios for boxes (e.g. 16/9), preserving proportions as they scale.",
    deepDive: "Prevents Cumulative Layout Shift (CLS) by reserving exact vertical spaces on load before images or videos download.",
    codeExample: ".player { aspect-ratio: 16 / 9; width: 100%; }",
    sandboxType: "OBJECT_FIT"
  },
  {
    id: 68,
    question: "What is Cumulative Layout Shift (CLS) and how does CSS help prevent it?",
    category: "Sizing & Responsive",
    shortAnswer: "A visual performance metric measuring content jumps. Prevented by specifying size placeholders.",
    deepDive: "Occurs when dynamic content shifts items. Prevented by declaring image 'aspect-ratio' and reserving layout blocks with 'min-height'.",
    codeExample: ".ad { min-height: 250px; }",
    sandboxType: "OBJECT_FIT"
  },
  {
    id: 69,
    question: "What is the CSS gap property?",
    category: "Flexbox & Grid",
    shortAnswer: "Applies layout gaps directly between adjacent flex or grid child items.",
    deepDive: "Eliminates structural margins. Prevents double-spacing hazards and removes the need for margin wipe-outs like ':last-child'.",
    codeExample: ".container { display: flex; gap: 10px; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 70,
    question: "What is the difference between margin collapsing and padding?",
    category: "Box Model & Core",
    shortAnswer: "Adjacent vertical margins collapse into a single space; padding never collapses.",
    deepDive: "Margins separate sibling boxes and can merge into a single gap. Padding resides inside the element border, and always remains fully distinct.",
    codeExample: ".b1 { margin-bottom: 20px; }\n.b2 { margin-top: 15px; } /* Gap is 20px, not 35px */",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 71,
    question: "What triggers margin collapsing, and how can it be avoided?",
    category: "Box Model & Core",
    shortAnswer: "Triggered by adjacent block margins in normal flow. Avoided with paddings, borders, or layout tools (Flex/Grid).",
    deepDive: "Collapsing is disabled under Flexbox/Grid. It can also be prevented by placing a non-zero padding or border on parent containers.",
    codeExample: ".parent { display: flex; flex-direction: column; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 72,
    question: "What is the difference between overflow: hidden, scroll, and auto?",
    category: "Box Model & Core",
    shortAnswer: "hidden clips layouts; scroll forces visible scrolls; auto adds scrolls only if elements overflow.",
    deepDive: "Use 'auto' to ensure scrollbars appear only when content exceeds boundaries, keeping layout frames clean and dynamic.",
    codeExample: ".box { height: 100px; overflow: auto; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 73,
    question: "What is a CSS combinator?",
    category: "Selectors & Specificity",
    shortAnswer: "Selectors that link elements together to define layout structural relationships.",
    deepDive: "Selectors link element types (A B descendant, A > B child, A + B adjacent sibling, A ~ B general sibling).",
    codeExample: "div > p { color: black; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 74,
    question: "What is the difference between an attribute selector like [type='text'] and a class selector?",
    category: "Selectors & Specificity",
    shortAnswer: "Attribute selectors target nodes based on raw HTML attributes; both share identical specificity weights.",
    deepDive: "Attribute selectors carry (0,1,0) specificity. They match elements based on values inside attributes like href or type without requiring custom classes.",
    codeExample: "a[href$='.pdf'] { color: red; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 75,
    question: "What is the CSS :focus-visible pseudo-class for?",
    category: "Selectors & Specificity",
    shortAnswer: "Applies focus borders only during keyboard tab actions, preventing visual rings on mouse clicks.",
    deepDive: "Isolates focus indicators to keyboard navigation, satisfying both visual design and accessibility standards.",
    codeExample: "button:focus-visible { outline: 2px solid; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 76,
    question: "Why is :focus-visible preferred over :focus for custom focus styling in many cases?",
    category: "Selectors & Specificity",
    shortAnswer: "Maintains clear keyboard accessibility markers without cluttering clean mouse click designs.",
    deepDive: "Disabling focus outlines globally ruins keyboard accessibility. Using ':focus-visible' guarantees key outlines stay active only for keyboard users.",
    codeExample: "button:focus { outline: none; }\nbutton:focus-visible { outline: 2px solid blue; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 77,
    question: "What is a CSS preprocessor (Sass/Less) and what problems does it solve?",
    category: "Architecture & Modern",
    shortAnswer: "Tools adding variables, nesting, and mixins to CSS to make stylesheets modular and easy to scale.",
    deepDive: "Solves CSS duplication. Allows composing modular sheets, nested classes, and helper functions before compiling into flat CSS.",
    codeExample: "$col: red;\nbody { color: $col; }",
    sandboxType: "VARIABLES"
  },
  {
    id: 78,
    question: "What is CSS nesting (native, without a preprocessor)?",
    category: "Architecture & Modern",
    shortAnswer: "Writing child rules directly inside parent blocks in pure CSS, avoiding code duplication.",
    deepDive: "Supported natively across modern browsers. Helps group related rules cleanly under parent blocks without preprocessor dependencies.",
    codeExample: ".card {\n  color: black;\n  &:hover { color: blue; }\n}",
    sandboxType: "VARIABLES"
  },
  {
    id: 79,
    question: "What is a CSS Modules approach in frontend frameworks?",
    category: "Architecture & Modern",
    shortAnswer: "Automatically generates unique class names to isolate and scope component styles locally.",
    deepDive: "Prevents global naming collisions. A class like '.button' is compiled to a unique string like '.button__x89fa' at build time, scoping styles to that component.",
    codeExample: "/* compiled */\n.sidebar_button_xyz12 { ... }",
    sandboxType: "VARIABLES"
  },
  {
    id: 80,
    question: "What is CSS-in-JS (e.g. styled-components)?",
    category: "Architecture & Modern",
    shortAnswer: "Declaring style rules directly inside JavaScript code, dynamically integrating component props.",
    deepDive: "Styles are tied directly to UI components. It compiles styles dynamically based on React props, but carries minor runtime JS evaluation costs.",
    codeExample: "const Box = styled.div` background: ${props => props.bg}; `",
    sandboxType: "VARIABLES"
  },
  {
    id: 81,
    question: "What is Tailwind CSS's utility-first approach?",
    category: "Architecture & Modern",
    shortAnswer: "Using pre-packaged utility classes directly in HTML to build UI without writing custom CSS.",
    deepDive: "Eliminates bloating CSS files. You construct designs inside markup using classes like 'flex p-4 rounded', enforcing consistent design standards.",
    codeExample: "<div class='p-4 bg-blue-500 rounded-lg'></div>",
    sandboxType: "VARIABLES"
  },
  {
    id: 82,
    question: "What is the BEM naming convention?",
    category: "Architecture & Modern",
    shortAnswer: "A naming system (Block__Element--Modifier) that organizes classes to keep code modular and low-specificity.",
    deepDive: "Avoids complex cascading selectors by using flat, self-documenting class names, making styles easy to maintain and scale.",
    codeExample: ".card__title--large { font-size: 20px; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 83,
    question: "What is the purpose of a CSS specificity 'battle' and how do methodologies like BEM help avoid it?",
    category: "Selectors & Specificity",
    shortAnswer: "deep-nesting makes styles hard to override. BEM avoids this by keeping selectors to a flat, single-class specificity.",
    deepDive: "BEM class names carry a single class specificity (0,1,0), eliminating deeply nested styles and the need for '!important' overrides.",
    codeExample: ".menu-item--active { color: blue; }",
    sandboxType: "SELECTORS"
  },
  {
    id: 84,
    question: "What is a CSS custom property's fallback value syntax?",
    category: "Architecture & Modern",
    shortAnswer: "Passing a backup value inside the var() function to use if the primary variable is undefined.",
    deepDive: "Syntax: 'var(--name, fallback)'. Extremely useful for building resilient component libraries that degrade gracefully.",
    codeExample: ".text { color: var(--main-color, #333); }",
    sandboxType: "VARIABLES"
  },
  {
    id: 85,
    question: "What is the difference between inherit, initial, and unset as CSS values?",
    category: "Box Model & Core",
    shortAnswer: "inherit forces parent inheritance; initial resets to specs; unset acts dynamically based on natural inheritance.",
    deepDive: "- inherit: copies parent style.\n- initial: resets to default browser specs.\n- unset: inherits if natural (like color), otherwise resets to initial.",
    codeExample: ".card { color: unset; border: unset; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 86,
    question: "What CSS properties are inherited by default, generally speaking?",
    category: "Box Model & Core",
    shortAnswer: "Text properties (font, color, alignment) inherit; box-model layouts (width, padding, borders) do not.",
    deepDive: "Text formatting naturally cascades down the DOM tree. Layout styles are blocked from inheriting to prevent duplicating inside nested children.",
    codeExample: "body { font-family: 'Inter'; } /* inherited */",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 87,
    question: "What is the currentColor keyword used for?",
    category: "Architecture & Modern",
    shortAnswer: "A native keyword referring directly to the element's current active text color.",
    deepDive: "Dynamically binds borders, shadows, or SVG fills to the element's text color. Updates automatically if text color changes.",
    codeExample: ".card { border: 2px solid currentColor; }",
    sandboxType: "VARIABLES"
  },
  {
    id: 88,
    question: "What is the difference between logical properties (margin-inline-start) and physical properties (margin-left)?",
    category: "Sizing & Responsive",
    shortAnswer: "Logical properties scale layout based on text direction; physical properties stay locked to exact screen coordinates.",
    deepDive: "'margin-left' is permanently locked to the left. 'margin-inline-start' flips dynamically to the right side on Right-to-Left (RTL) language pages.",
    codeExample: ".text { margin-inline-start: 10px; }",
    sandboxType: "LOGICAL_PROPERTIES"
  },
  {
    id: 89,
    question: "What is a CSS 'sprite' and why was it historically used?",
    category: "Architecture & Modern",
    shortAnswer: "Combining small images to save HTTP requests, positioned using background-position.",
    deepDive: "Under older web networks, this optimized page speeds. Modern HTTP/2 multiplexing and vector SVGs have made sprites mostly obsolete.",
    codeExample: ".icon { background: url('sprite.png') -10px -20px; }",
    sandboxType: "OBJECT_FIT"
  },
  {
    id: 90,
    question: "What is the purpose of backdrop-filter?",
    category: "Transitions & Animations",
    shortAnswer: "Applies blur, contrast, or color shifts to content visible directly behind the element.",
    deepDive: "Unlike standard filters, 'backdrop-filter' blurs what's underneath, enabling professional frosted-glass overlay layouts.",
    codeExample: ".overlay { backdrop-filter: blur(5px); }",
    sandboxType: "Z_INDEX"
  },
  {
    id: 91,
    question: "What is the difference between background-size: cover and contain?",
    category: "Sizing & Responsive",
    shortAnswer: "cover scales the image to completely fill boundaries (crops); contain fits the image without cropping (leaves spaces).",
    deepDive: "Use 'cover' for background frames to ensure no blank spaces remain, even if some outer parts of the image are clipped.",
    codeExample: ".hero { background-size: cover; }",
    sandboxType: "OBJECT_FIT"
  },
  {
    id: 92,
    question: "What is the purpose of vendor prefixes (-webkit-, -moz-)?",
    category: "Architecture & Modern",
    shortAnswer: "Enabled testing of experimental features in specific browser engines before official standards were set.",
    deepDive: "Commonly used for legacy properties. Today, modern features are shipped unprefixed, with builders handling support.",
    codeExample: "-webkit-transform: rotate(5deg);",
    sandboxType: "VARIABLES"
  },
  {
    id: 93,
    question: "What is a CSS container query?",
    category: "Sizing & Responsive",
    shortAnswer: "Styles elements based on their immediate parent's width instead of the global viewport width.",
    deepDive: "Enables modular component design. A card styles itself dynamically depending on if it's placed in a narrow sidebar or a wide main section.",
    codeExample: "@container (min-width: 300px) { .card { flex-direction: row; } }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 94,
    question: "How do container queries differ from traditional media queries?",
    category: "Sizing & Responsive",
    shortAnswer: "Media queries track browser dimensions; container queries track the size of the nearest container parent.",
    deepDive: "Container queries let components adapt locally to their layout column, rather than forcing layout decisions based globally on window resizes.",
    codeExample: "@container parent (min-width: 350px) { ... }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 95,
    question: "What is the purpose of @supports in CSS?",
    category: "Sizing & Responsive",
    shortAnswer: "Checks if a browser supports a CSS feature, allowing progressive enhancement.",
    deepDive: "Enables using modern features (e.g. subgrid) while keeping robust CSS fallbacks active for legacy browser engines.",
    codeExample: "@supports (display: grid) { .grid { display: grid; } }",
    sandboxType: "RESPONSIVE"
  },
  {
    id: 96,
    question: "What is a common technique for centering an element both horizontally and vertically?",
    category: "Flexbox & Grid",
    shortAnswer: "Applying Flexbox centering or CSS Grid layout centering on the parent container.",
    deepDive: "The most modern techniques are using 'display: grid; place-items: center' or Flexbox align/justify. This maintains layouts cleanly across resizes.",
    codeExample: ".parent { display: grid; place-items: center; }",
    sandboxType: "FLEXBOX"
  },
  {
    id: 97,
    question: "What is the purpose of place-items shorthand in CSS Grid?",
    category: "Flexbox & Grid",
    shortAnswer: "Shorthand for vertical 'align-items' and horizontal 'justify-items' in one rule.",
    deepDive: "Writing 'place-items: center' centers elements along both horizontal and vertical axes inside their allocated grid tracks.",
    codeExample: ".grid { display: grid; place-items: center; }",
    sandboxType: "GRID"
  },
  {
    id: 98,
    question: "What is the difference between justify-self and justify-content in Grid?",
    category: "Flexbox & Grid",
    shortAnswer: "justify-content aligns the full grid track block; justify-self aligns a single element inside its track cell.",
    deepDive: "Use 'justify-content' to center columns inside the container. Use 'justify-self' to align a specific item within its bounding column width.",
    codeExample: ".item { justify-self: end; }",
    sandboxType: "GRID"
  },
  {
    id: 99,
    question: "What is a common cause of horizontal scrollbar appearing unexpectedly on a page?",
    category: "Box Model & Core",
    shortAnswer: "Elements exceeding viewport size, typically due to content-box padding, unscaled images, or absolute overflows.",
    deepDive: "Adding padding to width 100% elements expands total size past viewports under standard content-box rules, forcing scrollbars. Fixed image dimensions also trigger scrollbars.",
    codeExample: "img { max-width: 100%; height: auto; }",
    sandboxType: "BOX_MODEL"
  },
  {
    id: 100,
    question: "How would you debug a layout issue where an element isn't appearing where expected?",
    category: "Box Model & Core",
    shortAnswer: "Inspect computed elements, audit margins/paddings, look up stacking context layers, and verify rule overrides.",
    deepDive: "Use browser DevTools. Click the target to verify dimensions, inspect specificity to see if custom rules are overridden, and check positioning contexts.",
    codeExample: "* { outline: 1px solid rgba(255,0,0,0.3) !important; }",
    sandboxType: "BOX_MODEL"
  }
];
