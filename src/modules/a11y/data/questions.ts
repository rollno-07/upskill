/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionData } from '../types';

export const questionsData: QuestionData[] = [
  {
    id: 1,
    category: 'core',
    conceptName: 'Intro to Accessibility',
    question: 'What is web accessibility (a11y)?',
    answer: 'Web accessibility (a11y) means designing and building websites, tools, and technologies so that people with disabilities can use them. This includes making web content navigable, readable, and operable for individuals with visual, auditory, motor, speech, and cognitive impairments. Designing for accessibility ensures that assistive technologies (like screen readers, screen magnifiers, voice recognition software, and alternative input devices) can successfully read and interact with the page, creating an inclusive digital landscape.',
    keyTakeaways: [
      'Addresses visual, auditory, physical, speech, cognitive, and neurological disabilities.',
      'Benefits users without disabilities, such as elderly users, users on mobile devices, or those with temporary injuries.',
      'A digital civil right and often a legal requirement (e.g., ADA, Section 508, European Accessibility Act).'
    ],
    goodCode: `<!-- Accessible layout with landmarks, headings, and readable contrast -->
<main>
  <h1>Designing for Everyone</h1>
  <p>Our app supports keyboard navigation and high contrast out of the box.</p>
</main>`,
    badCode: `<!-- Non-semantic layout with hardcoded text-styling that breaks zooming -->
<div style="font-size: 10px; color: #CCCCCC;">
  <span>Designing for Everyone</span>
  <br/>
  <span>Our app has no layout structure.</span>
</div>`
  },
  {
    id: 2,
    category: 'core',
    conceptName: 'The a11y Numeronym',
    question: 'What does "a11y" mean?',
    answer: '"a11y" is a numeronym—a word abbreviation where numbers replace middle letters. Specifically, "a11y" stands for "accessibility" because there are exactly 11 letters between the starting letter "a" and the ending letter "y" (a-c-c-e-s-s-i-b-i-l-i-t-y). This shorthand is widely used in the developer and accessibility advocate communities on social media, in library names, and across technical specifications to refer to digital accessibility design and development practices.',
    keyTakeaways: [
      'It is a shorthand numeronym: "a" + 11 letters + "y".',
      'Commonly pronounced "A-eleven-Y" or "Ally" (which matches the community vibe).',
      'Used globally to tag accessibility topics, software packages, and specifications.'
    ]
  },
  {
    id: 3,
    category: 'core',
    conceptName: 'WCAG Principles',
    question: 'What are WCAG guidelines?',
    answer: 'WCAG stands for Web Content Accessibility Guidelines. Created by the W3C Web Accessibility Initiative (WAI), WCAG is the definitive global standard for web accessibility. The guidelines are structured around four core principles known by the acronym POUR: 1) Perceivable (information must be presented in ways users can perceive through sight, sound, or touch); 2) Operable (interface components must be keyboard-navigable and controllable); 3) Understandable (information and operation must be clear and logical); and 4) Robust (content must remain compatible with a wide variety of browsers, devices, and current/future assistive technologies).',
    keyTakeaways: [
      'POUR Principles: Perceivable, Operable, Understandable, Robust.',
      'Developed by W3C WAI as an international consensus standard.',
      'Underpins major global accessibility laws like ADA Title III and Section 508.'
    ],
    goodCode: `<!-- POUR compliant: Perceivable (alt text), Operable (button), Understandable (clear language) -->
<button aria-label="Close notification menu">
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
</button>`,
    badCode: `<!-- Violates POUR: No keyboard support, icon lacks label, color contrast is extremely low -->
<div onclick="closeMenu()" style="color: #eee; background: #fff; cursor: pointer;">
  <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59..."></path></svg>
</div>`
  },
  {
    id: 4,
    category: 'core',
    conceptName: 'WCAG Levels',
    question: 'What are the WCAG conformance levels?',
    answer: 'WCAG defines three levels of conformance to measure the degree of accessibility of a website:\n- Level A: The absolute minimum standard. If a site fails Level A, it has critical accessibility barriers that make it impossible for some groups to use.\n- Level AA: The global baseline target. This level eliminates the most common and significant barriers. It is the legally required standard for most commercial, government, and educational websites worldwide.\n- Level AAA: The highest and most strict standard. It requires advanced enhancements (such as sign language interpretation, 7:1 contrast, and distraction-free options). Full AAA compliance across an entire complex site is often not achievable, but developers should strive for it where possible.',
    keyTakeaways: [
      'Level A: Minimum baseline; critical barrier elimination.',
      'Level AA: Standard target; legally required globally; balanced feasibility.',
      'Level AAA: Maximum benchmark; specialized requirements; target high-priority pages.'
    ]
  },
  {
    id: 5,
    category: 'semantics',
    conceptName: 'Semantic HTML',
    question: 'What is semantic HTML and why does it matter for a11y?',
    answer: 'Semantic HTML is the practice of using HTML tags that reflect the actual meaning and purpose of their content (e.g., using <button> for clickable actions, <nav> for menus, <main> for core content, and <article> for self-contained blocks) instead of wrapping everything in generic, meaningless <div> or <span> tags. It is foundational for accessibility because modern web browsers parse these semantic tags and automatically construct the Accessibility Tree, which translates elements into roles, states, and properties that screen readers can convey to users. Semantic elements also come with built-in keyboard interaction patterns (like Enter and Space activation for buttons) for free.',
    keyTakeaways: [
      'HTML elements describe their structure and role to assistive technologies automatically.',
      'Saves hours of JS coding by providing built-in keyboard navigation, focus management, and event handling.',
      'Improves SEO, code maintainability, and ensures graceful fallback on alternative browsers.'
    ],
    goodCode: `<!-- Semantic: Built-in role, focus stream, keyboard activation, and clean DOM -->
<header>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><button type="button">Log Out</button></li>
    </ul>
  </nav>
</header>`,
    badCode: `<!-- Non-semantic: Requires custom tabIndex, manual keyboard listeners, ARIA roles, and looks complex -->
<div class="header-div">
  <div class="nav-div">
    <div class="nav-item" onclick="goTo('/home')">Home</div>
    <div class="nav-button" onclick="logout()">Log Out</div>
  </div>
</div>`
  },
  {
    id: 6,
    category: 'semantics',
    conceptName: 'Div Click vs Button',
    question: 'Why avoid using a <div> with an onClick instead of a <button>?',
    answer: 'Using a <div> with an onClick handler instead of a native <button> is a highly common accessibility anti-pattern. Native <button> elements provide several vital capabilities out-of-the-box: 1) Keyboard focus (they are automatically in the Tab stream); 2) Native keyboard activation (they fire click events when Enter or Space is pressed); 3) Assistive technology announcements (they are automatically identified as a "button" in the Accessibility Tree). A <div> has none of these properties. To make a <div> function like a button, you must manually add tabindex="0", a keyboard keydown event listener to check for Enter/Space keys, and role="button", leading to fragile and bloated code.',
    keyTakeaways: [
      'Divs do not receive keyboard focus by default; a keyboard-only user will bypass them completely.',
      'Divs do not listen to Space/Enter activation automatically, whereas buttons trigger "click" events natively.',
      'Screen readers announce a div with text as static content, leaving blind users unaware that it is interactive.'
    ],
    goodCode: `<!-- Simple, bulletproof, keyboard-operable native button -->
<button type="button" onclick="handleSubmit()">
  Submit Form
</button>`,
    badCode: `<!-- Interactive div: Invisible to keyboards and screen readers unless custom JS/CSS/HTML is added -->
<div onclick="handleSubmit()" class="my-custom-btn">
  Submit Form
</div>`
  },
  {
    id: 7,
    category: 'semantics',
    conceptName: 'What is ARIA',
    question: 'What is ARIA?',
    answer: 'ARIA stands for Accessible Rich Internet Applications. It is a set of specialized HTML attributes (prefixed with "aria-", such as aria-expanded, aria-label, aria-live, along with "role" attributes) defined by the W3C. ARIA acts as a bridge when native HTML is insufficient to convey the role, state, properties, or dynamic changes of highly complex UI components (like custom accordions, tabs, drag-and-drop lists, and slide-out panels). ARIA does not change the visual rendering, behavior, or keyboard behavior of elements—it solely communicates metadata to the browser Accessibility Tree to update screen readers.',
    keyTakeaways: [
      'Supplemental bridge: ARIA changes the semantic representation, not the behavior/style of an element.',
      'Consists of Roles (what is this?), States (is it expanded?), and Properties (what is its label?).',
      'Designed for rich, custom-built, highly dynamic components where native HTML lacks support.'
    ],
    goodCode: `<!-- Complex UI: Using ARIA to convey state to screen readers -->
<button aria-expanded="false" aria-controls="faq-answer-1" onclick="toggleFaq()">
  What is ARIA?
</button>
<div id="faq-answer-1" class="hidden">
  ARIA stands for Accessible Rich...
</div>`,
    badCode: `<!-- Screen reader has no idea if the dynamic panel below is open, closed, or related -->
<div class="faq-header" onclick="toggleFaq()">
  What is ARIA?
</div>
<div class="faq-content">
  ARIA stands for Accessible Rich...
</div>`
  },
  {
    id: 8,
    category: 'semantics',
    conceptName: 'First Rule of ARIA',
    question: 'What is the first rule of ARIA use?',
    answer: 'The first rule of ARIA is: "If you can use a native HTML element or attribute with the semantics and behavior you require, then do so instead of re-purposing an element and adding an ARIA role, state, or property to make it accessible." Native HTML elements are highly robust, heavily tested across diverse operating systems and screen readers, and automatically implement focus management and keyboard interactions. Overusing or incorrectly using ARIA attributes can actually introduce severe accessibility bugs, confuse screen readers, and result in an unstable user experience.',
    keyTakeaways: [
      'First Rule: Native HTML first, ARIA only as a backup.',
      'No ARIA is better than bad ARIA—misapplied roles/states mislead assistive technologies.',
      'Native elements are future-proofed and have native browser keyboard standards.'
    ],
    goodCode: `<!-- Best Practice: Native element handles expand/collapse and focus natively -->
<details>
  <summary>FAQ: Is ARIA always needed?</summary>
  <p>No, native elements should be used first.</p>
</details>`,
    badCode: `<!-- Bad practice: Overcomplicating with ARIA instead of native elements -->
<div role="button" aria-expanded="false" tabindex="0" onclick="toggle()" onkeydown="handleKey()">
  FAQ: Is ARIA always needed?
</div>
<div role="region" class="panel">No, native elements...</div>`
  },
  {
    id: 9,
    category: 'aria',
    conceptName: 'aria-label',
    question: 'What does aria-label do?',
    answer: 'The aria-label attribute provides an explicit, invisible-on-screen string label that acts as the accessible name for an element. This is crucial for interactive elements that contain no visible text content, such as icon-only buttons (like an "X" for closing, a trash can for deleting, or a magnifying glass for searching). When a screen reader focuses on an element with an aria-label, it ignores any nested text or SVG graphics and announces the exact value of the aria-label instead, ensuring blind users understand the element\'s action.',
    keyTakeaways: [
      'Overrides child elements: Replaces visual/textual children in the accessibility calculation.',
      'Invisible label: Useful for sleek, icon-only, or graphical UI designs.',
      'Must be localized/translated since it represents user-facing text announced by screen readers.'
    ],
    goodCode: `<!-- Screen reader announces: "Delete task, button" -->
<button aria-label="Delete task" onclick="deleteTask(5)">
  <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1..."></path></svg>
</button>`,
    badCode: `<!-- Screen reader announces: "Graphic, path... button" or "unlabeled button" -->
<button onclick="deleteTask(5)">
  <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1..."></path></svg>
</button>`
  },
  {
    id: 10,
    category: 'aria',
    conceptName: 'aria-labelledby',
    question: 'What does aria-labelledby do?',
    answer: 'The aria-labelledby attribute establishes an accessible name for an element by referencing the ID (or multiple IDs) of other elements on the page. Unlike aria-label (which takes a static string), aria-labelledby takes a space-separated list of IDs. This is highly powerful because it connects elements dynamically: if the text inside the referenced label element changes, the accessible name of the linked element is automatically updated in the Accessibility Tree, preventing duplication.',
    keyTakeaways: [
      'Dynamic connection: References other DOM element IDs instead of accepting raw text strings.',
      'Multi-reference support: Can reference multiple element IDs to build a combined label.',
      'Takes highest precedence: Overrides aria-label, aria-describedby, and native labels.'
    ],
    goodCode: `<!-- Modal with clear accessible name linked to the title element -->
<div role="dialog" aria-labelledby="modal-title-id">
  <h2 id="modal-title-id">Confirm Deletion</h2>
  <p>Are you sure you want to proceed?</p>
</div>`,
    badCode: `<!-- Screen reader opens a generic dialog with no accessible name context -->
<div role="dialog">
  <h2>Confirm Deletion</h2>
  <p>Are you sure you want to proceed?</p>
</div>`
  },
  {
    id: 11,
    category: 'aria',
    conceptName: 'aria-describedby',
    question: 'What does aria-describedby do?',
    answer: 'The aria-describedby attribute provides an accessible description (supplemental explanation or hint text) for an element by referencing the ID of another element containing the descriptive text. Unlike aria-labelledby (which defines the primary "name" of the element), aria-describedby is announced slightly after the accessible name, giving supplementary context (like password requirements, input format hints, or inline form validation errors). This helps keep screen reader announcements structured and distinct.',
    keyTakeaways: [
      'Primary vs Secondary: aria-labelledby defines "What is this?", aria-describedby defines "More details".',
      'Excellent for forms: Links custom tooltips, input formatting constraints, or error messages.',
      'Announced with a short delay or after the role/state, allowing users to skip if not needed.'
    ],
    goodCode: `<!-- Password input dynamically linked to its hint and security requirements -->
<label for="pwd">Password</label>
<input type="password" id="pwd" aria-describedby="pwd-hint" />
<p id="pwd-hint">Must contain at least 8 characters, including a number.</p>`,
    badCode: `<!-- Screen reader announces "Password, password edit text", completely unaware of the strict criteria -->
<label for="pwd">Password</label>
<input type="password" id="pwd" />
<p>Must contain at least 8 characters, including a number.</p>`
  },
  {
    id: 12,
    category: 'aria',
    conceptName: 'aria-hidden',
    question: 'What is aria-hidden for?',
    answer: 'The aria-hidden attribute is used to remove an element and all of its descendants from the browser\'s Accessibility Tree, making them completely invisible to screen readers, while keeping them visible on the screen. It should be used for purely decorative visual elements (like vector icons, decorative background patterns, or duplicate text) or visual elements that are offscreen/hidden. Setting aria-hidden="true" tells assistive technologies to skip the element entirely, reducing clutter and preventing screen readers from reading meaningless or confusing visual assets.',
    keyTakeaways: [
      'Removes elements from the Accessibility Tree while retaining them visually on screen.',
      'Ideal for inline decorative icons paired with adjacent descriptive text.',
      'Do not apply aria-hidden="true" to any element that can currently receive keyboard focus.'
    ],
    goodCode: `<!-- Decorative search icon is skipped; adjacent label text is announced -->
<button>
  <svg aria-hidden="true" class="search-icon" viewBox="0 0 24 24"><path d="..."/></svg>
  Search Site
</button>`,
    badCode: `<!-- Screen reader stumbles into SVG paths or says "graphic" inside an already clear button -->
<button>
  <svg class="search-icon" viewBox="0 0 24 24"><path d="..."/></svg>
  Search Site
</button>`
  },
  {
    id: 13,
    category: 'aria',
    conceptName: 'aria-live',
    question: 'What is aria-live and when would you use it?',
    answer: 'The aria-live attribute turns an HTML element into a "live region," meaning the browser will automatically announce any dynamic updates or changes made to that element\'s content to screen reader users, even if they currently do not have focus on that element. It is crucial for dynamic websites where content updates in real-time (e.g., toast notification popups, incoming chat messages, dynamic search results summaries, live stock tickers, or multi-step form validation alerts). Without aria-live, a blind user would be completely unaware of these updates since their keyboard focus remains elsewhere.',
    keyTakeaways: [
      'Dynamic announcements: Informs users of dynamic content changes without shifting keyboard focus.',
      'Three main levels: aria-live="off" (default), aria-live="polite", and aria-live="assertive".',
      'The live region container must exist in the DOM prior to updating its contents for best screen reader compatibility.'
    ],
    goodCode: `<!-- Container exists in DOM; screen reader speaks whenever feedback text is injected -->
<div id="status-alerts" aria-live="polite" class="status-box">
  <!-- Injected dynamically via JS: "Successfully saved settings." -->
  <p>Successfully saved settings.</p>
</div>`,
    badCode: `<!-- Content changes silently; keyboard-only/blind users have no idea an alert popped up -->
<div id="status-alerts" class="status-box">
  <p>Successfully saved settings.</p>
</div>`
  },
  {
    id: 14,
    category: 'aria',
    conceptName: 'Polite vs Assertive',
    question: 'What\'s the difference between aria-live="polite" and aria-live="assertive"?',
    answer: 'The difference lies in how aggressively they interrupt the screen reader\'s current speech queue:\n- polite (recommended baseline): The browser waits until the screen reader has finished reading its current sentence or user action before announcing the update. This is respectful, non-disruptive, and ideal for 90% of dynamic updates (like "Saving draft...", "Chart updated," or chat messages).\n- assertive (use sparingly): The browser immediately interrupts any ongoing speech to announce the live region update. This is highly disruptive and should be reserved exclusively for critical, time-sensitive, or emergency notifications (like "Your session is about to expire," "Loss of internet connection," or major form submission errors).',
    keyTakeaways: [
      'Polite: Queue-friendly, non-intrusive, awaits screen reader silence.',
      'Assertive: Interruptive, high priority, overrides ongoing speech immediately.',
      'Assertive misuse can make a site highly frustrating, annoying, and difficult to navigate.'
    ],
    goodCode: `<!-- Time-sensitive connection loss: Assertive is justified here -->
<div aria-live="assertive" class="error-banner">
  Connection lost. Retrying in 5s...
</div>`,
    badCode: `<!-- Overusing assertive for minor background actions disrupts continuous reading -->
<div aria-live="assertive" class="toast-popup">
  User 'Sarah' logged in.
</div>`
  },
  {
    id: 15,
    category: 'keyboard',
    conceptName: 'Focus Trap',
    question: 'What is a focus trap and when is it needed?',
    answer: 'A focus trap is a script-controlled mechanism that restricts the user\'s keyboard focus (tabbing sequence) to a specific container, preventing the Tab or Shift+Tab key from jumping outside of it. It is required for modal dialogues, slide-out hamburger menus, and overlay drawers. When a modal is open, if focus is not trapped, pressing Tab will eventually move focus through the links and inputs located on the background page. This is extremely disorienting because keyboard users are tabbing through elements they cannot see (since they are covered by the modal background overlay) and can lead to accidental background form submissions or page interactions.',
    keyTakeaways: [
      'Keyboard confinement: Cycles Tab/Shift+Tab focus exclusively inside an active modal or overlay.',
      'Avoids background interaction: Prevents keyboard focus from leaking into invisible or obscured layers.',
      'Must be released immediately when the modal is closed to return focus to the trigger button.'
    ],
    goodCode: `<!-- High-level logic: When active, listen to keydown and loop focus -->
function handleModalTab(e, firstElement, lastElement) {
  if (e.key === 'Tab') {
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}`,
    badCode: `<!-- Bad Modal: Modal is visually open but pressing Tab skips right through onto hidden background content -->
<div class="modal-overlay">
  <div class="modal-content">
    <h3>Simple Overlay</h3>
    <button onclick="close()">OK</button>
  </div>
</div>`
  },
  {
    id: 16,
    category: 'keyboard',
    conceptName: 'Modal Accessibility',
    question: 'How would you implement accessible modal behavior?',
    answer: 'To make a modal dialogue fully accessible, you must coordinate several technical patterns:\n1. Move Focus: When the modal opens, programmatic focus must be immediately moved into the modal (e.g., to the close button or first interactive element).\n2. Trap Focus: Ensure keyboard focus cannot leave the modal via Tab/Shift+Tab (Focus Trap).\n3. Keyboard Support: Allow pressing the Escape key to close the modal.\n4. Restore Focus: When the modal closes, programmatic focus must return precisely to the element that triggered it.\n5. Hide Background: Mark the background elements with aria-hidden="true" or use the HTML5 inert attribute so assistive technology skips background nodes while the modal is active.',
    keyTakeaways: [
      'Immediate focus transfer on open; clean focus restoration on close.',
      'Full Escape key support and native modal containment (using <dialog> element simplifies this).',
      'Prevent background screen reading by setting background container inert or aria-hidden.'
    ],
    goodCode: `<!-- Modern HTML <dialog> natively handles focus trap, Escape, and inert background! -->
<button onclick="document.getElementById('m-dialog').showModal()">Open</button>

<dialog id="m-dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Accessible Dialog</h2>
  <button onclick="document.getElementById('m-dialog').close()">Close</button>
</dialog>`,
    badCode: `<!-- Custom modal div: Lacks focus moving, trapping, escape listeners, and backdrop prevention -->
<div class="custom-modal-overlay">
  <div class="custom-modal-box">
    <h2>Accessible Dialog?</h2>
    <button onclick="hide()">Close</button>
  </div>
</div>`
  },
  {
    id: 17,
    category: 'keyboard',
    conceptName: 'Keyboard Navigation',
    question: 'What is keyboard navigability and why does it matter?',
    answer: 'Keyboard navigability is the ability to navigate, interact with, and complete any action on a website using only a standard keyboard, without relying on a mouse, trackpad, or touch screen. This is crucial for users with motor/physical disabilities (who may use mouthsticks, switches, or customized keyboards) and blind users (who navigate via screen readers using keyboard commands). A site is considered keyboard navigable when every interactive control (links, buttons, inputs, dropdowns) is reachable in logical focus order, clearly highlights itself visually when focused, and responds perfectly to standard keys (Tab, Enter, Space, Arrows).',
    keyTakeaways: [
      'Every action achievable with a mouse must be fully executable with a keyboard.',
      'Interactive components must show highly visible, clear, high-contrast focus rings.',
      'Keyboard support must have no "keyboard traps" where a user gets stuck and cannot move focus away.'
    ]
  },
  {
    id: 18,
    category: 'keyboard',
    conceptName: 'Skip to Content Link',
    question: 'What is a "skip to content" link?',
    answer: 'A "skip to content" (or "skip navigation") link is an internal anchor link placed at the absolute top of a webpage as the first focusable element. It remains visually hidden by default but becomes visible once it receives keyboard focus (e.g., when a user lands on the page and presses Tab for the first time). Its purpose is to let keyboard-only users jump directly over large blocks of repetitive navigation links, logo banners, and top menu search bars, straight to the primary content area, sparing them from having to press the Tab key dozens of times on every single page refresh.',
    keyTakeaways: [
      'First focusable item: Placed at the top of the body before headers or menus.',
      'Hidden until focused: Uses clever offscreen positioning via CSS, rendering only when active.',
      'Enhances speed: Drastically improves the browsing experience and speed for keyboard-only users.'
    ],
    goodCode: `/* CSS for Skip Link */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0; /* Brings it down visually only when focused */
}`,
    badCode: `<!-- No skip link: Keyboard users must tab through all 50 header navigation items on every page -->
<header>
  <nav><!-- 50 complex navigation menu links --></nav>
</header>`
  },
  {
    id: 19,
    category: 'keyboard',
    conceptName: 'Focus & DOM Order',
    question: 'What is focus order and why does DOM order matter?',
    answer: 'Focus order is the sequence in which interactive components receive focus when navigating a page using the Tab key. By default, browsers automatically follow the order of elements as they appear in the HTML document source (the DOM order). If a developer uses CSS flexbox or grid to visually reposition layout sections (e.g., using flex-direction: row-reverse, order: -1, or absolute layout alignments) without restructuring the HTML source, the visual order will conflict with the Tab sequence. This results in a highly confusing and disjointed experience where the focus cursor jumps erratically across different sections of the screen.',
    keyTakeaways: [
      'Tab order follows source code order (DOM order) from top-to-bottom, left-to-right.',
      'CSS styling should match, not contradict, the underlying structural markup sequence.',
      'Logical focus order ensures reading and interactive comprehension matches visual intention.'
    ],
    goodCode: `<!-- DOM matches visual layout: Tab moves from Header -> Sidebar -> Footer -->
<div class="layout-grid">
  <header><a href="#">Logo</a></header>
  <main><a href="#">Primary Content Link</a></main>
  <footer><a href="#">Contact Us</a></footer>
</div>`,
    badCode: `<!-- DOM is reversed but visual layout is normal: Tab jumps to Footer first, then Logo, then Main! -->
<div class="layout-grid flex flex-col-reverse">
  <footer><a href="#">Contact Us</a></footer>
  <main><a href="#">Primary Content Link</a></main>
  <header><a href="#">Logo</a></header>
</div>`
  },
  {
    id: 20,
    category: 'keyboard',
    conceptName: 'tabindex="0"',
    question: 'What does tabindex="0" do?',
    answer: 'The tabindex="0" attribute is used to add a naturally non-focusable HTML element (such as a <div>, <span>, <li>, or <td>) into the keyboard\'s natural Tab navigation sequence, based on its relative position in the DOM source code. It also allows the element to receive focus programmatically (via JavaScript element.focus()) and visually style itself via the CSS :focus pseudo-class. Adding tabindex="0" is only the first step in making custom components accessible—you must still manually write keyboard event handlers so the custom element reacts to Space and Enter keys.',
    keyTakeaways: [
      'Adds elements to the standard focus stream based on DOM ordering.',
      'Only provides focusability; keyboard event listeners for Space and Enter are still required manually.',
      'Should be used cautiously—prefer native interactive elements (<button>, <a>) whenever possible.'
    ],
    goodCode: `<!-- Custom card is focusable; keydown is handled to act like a click -->
<div tabindex="0" onclick="selectCard()" onkeydown="if(e.key==='Enter'||e.key===' ') selectCard()" class="card">
  <h3>Interactive Custom Card</h3>
</div>`,
    badCode: `<!-- Div has click event, but keyboard-only users will jump straight past it -->
<div onclick="selectCard()" class="card">
  <h3>Interactive Custom Card</h3>
</div>`
  },
  {
    id: 21,
    category: 'keyboard',
    conceptName: 'tabindex="-1"',
    question: 'What does tabindex="-1" do?',
    answer: 'The tabindex="-1" attribute removes an element from the natural keyboard Tab sequence, meaning users cannot navigate to it using the Tab key. However, it still allows the element to receive focus programmatically using JavaScript via element.focus(). This is highly useful for managing focus during dynamic UI transitions, such as: 1) Shifting focus to an open sidebar or sliding panel; 2) Directing focus to a newly injected form validation error container; or 3) Shifting focus to the main heading of a new page in a Single Page Application (SPA).',
    keyTakeaways: [
      'Removes element from keyboard Tab stream.',
      'Maintains programmatic focusability (via element.focus() in JavaScript).',
      'Perfect for dynamic error boxes, sliding drawers, and page-container routing focus.'
    ],
    goodCode: `<!-- Offscreen menu is not in Tab stream; Javascript focuses it when opened -->
<div id="side-drawer" tabindex="-1" class="drawer">
  <h2>Menu Options</h2>
  <a href="#">Option 1</a>
</div>`,
    badCode: `<!-- Focus is not programmatically managed on open, leaving the user with an unclear starting node -->
<div id="side-drawer" class="drawer">
  <h2>Menu Options</h2>
  <a href="#">Option 1</a>
</div>`
  },
  {
    id: 22,
    category: 'keyboard',
    conceptName: 'Avoid Positive tabindex',
    question: 'Why should you avoid positive tabindex values (e.g. tabindex="5")?',
    answer: 'Using positive tabindex values (e.g., tabindex="1", tabindex="2") is a major accessibility bad practice. Positive values override the natural DOM focus sequence and force a custom tab order. For example, a browser will focus on all elements with tabindex="1" first, then tabindex="2", and so on, before finally focusing on natural elements (like buttons, links, and inputs). This results in a highly unpredictable, fragmented, and broken navigation experience, especially as websites evolve, new elements are inserted, and code is refactored, leading to a focus order that is extremely difficult to maintain.',
    keyTakeaways: [
      'Overrides native browser sequence, forcing elements to jump ahead of the tab queue.',
      'Causes rapid, disorienting focus cursor jumps across the screen.',
      'Extremely fragile to maintain—refactoring code breaks the numbering sequence.'
    ],
    goodCode: `<!-- Let DOM order naturally dictate the focus stream -->
<div>
  <input type="text" placeholder="First Name" />
  <input type="text" placeholder="Last Name" />
  <button>Submit</button>
</div>`,
    badCode: `<!-- Broken focus order: First name (2) -> Last name (3) -> Submit (1) -> jumps erratically! -->
<div>
  <input tabindex="2" type="text" placeholder="First Name" />
  <input tabindex="3" type="text" placeholder="Last Name" />
  <button tabindex="1">Submit</button>
</div>`
  },
  {
    id: 23,
    category: 'design',
    conceptName: 'Color Contrast',
    question: 'What is color contrast and what\'s the WCAG AA minimum ratio?',
    answer: 'Color contrast is the difference in luminance (brightness) between foreground text and its background. It ensures that text is readable for users with low vision, visual impairments, color blindness, or someone viewing a screen in bright sunlight. WCAG 2.1 Level AA defines the minimum contrast requirements:\n- 4.5:1 ratio for normal text (under 18pt or 14pt bold).\n- 3:1 ratio for large text (at least 18pt/24px or 14pt/18.67px bold) and graphical UI components like input borders and icon controls.\nLevel AAA increases these criteria to 7:1 for normal text and 4.5:1 for large text.',
    keyTakeaways: [
      'Normal text (<18pt): 4.5:1 minimum ratio for AA conformance.',
      'Large text (>=18pt or bold): 3:1 minimum ratio for AA conformance.',
      'Essential for low-vision users, older adults, and outdoor viewing conditions.'
    ],
    goodCode: `/* Good contrast: Deep charcoal gray text on soft off-white background (Ratio ~15:1) */
.accessible-box {
  background-color: #F8F9FA;
  color: #212529;
}`,
    badCode: `/* Bad contrast: Light gray text on white background (Ratio ~1.6:1) - Unreadable */
.unreadable-box {
  background-color: #FFFFFF;
  color: #CCCCCC;
}`
  },
  {
    id: 24,
    category: 'design',
    conceptName: 'Color as Info',
    question: 'Why shouldn\'t color alone convey information (e.g. red/green)?',
    answer: 'Relying exclusively on color changes to communicate information (like showing red borders to indicate form validation errors or turning a green light on to signal a success state) creates critical barriers for colorblind, low-vision, or screen-reader users who cannot see the visual color shifts. Colorblind users (affecting roughly 8% of males and 0.5% of females) may perceive red and green as identical shades of olive brown. To ensure accessibility, color shifts must always be paired with secondary visual signifiers such as explicit text labels, descriptive icons, bold patterns, or structural borders.',
    keyTakeaways: [
      'Color blindness (Protanopia, Deuteranopia, Tritanopia) prevents seeing specific color distinctions.',
      'Always supplement color shifts with text descriptions, custom icons, or visual patterns.',
      'Ensures screen readers can parse the text representation rather than a purely visual state.'
    ],
    goodCode: `<!-- Good: Employs an error icon, error text label, and red borders together -->
<div class="input-container error">
  <input type="text" id="username" class="border-red-500" aria-invalid="true" />
  <span class="error-msg text-red-700">
    <svg aria-hidden="true" class="icon"><!-- Warning Icon --></svg>
    Error: Username is already taken.
  </span>
</div>`,
    badCode: `<!-- Bad: Only changes input border color to red; blind and colorblind users cannot perceive this error -->
<input type="text" id="username" class="border-red-500" />`
  },
  {
    id: 25,
    category: 'design',
    conceptName: 'Image Alt Text',
    question: 'What is alt text and when should it be empty (alt="")?',
    answer: 'Alt text (alternative text) is a textual description provided via the HTML alt attribute on <img> elements. Screen readers read this text aloud to convey the meaning and purpose of images to blind users. \n- Informative Images (essential charts, descriptive photos): Must have a clear alt text summarizing the image\'s core info (e.g. alt="Chart showing 20% sales increase").\n- Decorative Images (background icons, visual spacers, generic stock layout files): Must have an explicit, empty alt attribute (alt=""). This tells the screen reader to skip the graphic entirely. If you omit the alt attribute completely, the screen reader will read the raw image file name (e.g. "image_v4_draft_final.png"), causing an annoying and confusing user experience.',
    keyTakeaways: [
      'Informative: Descriptive alt text conveying the exact value or core meaning of the visual.',
      'Decorative: Explicitly empty alt text (alt="") to cleanly skip screen reader narration.',
      'Omitted alt: Screen readers fall back to reading file names, which is a major validation failure.'
    ],
    goodCode: `<!-- Informative image with descriptive alt, decorative icon with empty alt -->
<img src="quarterly-report.jpg" alt="Bar chart showing Q3 revenue grew by 15%." />
<img src="divider-line.png" alt="" />`,
    badCode: `<!-- Omitted alt: Screen reader announces file names, interrupting reading flows -->
<img src="quarterly-report-v2-final.jpg" />
<img src="divider.png" />`
  },
  {
    id: 26,
    category: 'testing',
    conceptName: 'Custom Dropdowns',
    question: 'How do you make a custom dropdown/select component accessible?',
    answer: 'Building an accessible custom select dropdown from scratch requires recreating the complex keyboard behavior and ARIA semantic structures of native elements:\n1. Roles & States: Apply role="combobox" on the trigger, role="listbox" on the dropdown container, and role="option" on individual items. Track state with aria-expanded="true/false" and aria-selected="true/false".\n2. Keyboard Operations: Support opening with Space/Enter, selecting and navigating through options using the Up and Down Arrow keys, selecting with Enter, and dismissing/closing with the Escape key.\n3. Focus Management: Manage active selection using aria-activedescendant pointing to the active option\'s ID, keeping programmatic focus on the combobox trigger itself so the keyboard stream remains intact.',
    keyTakeaways: [
      'Requires exact role mapping (combobox, listbox, option) to recreate standard selects.',
      'Demands arrow key navigation, closing on Escape, and selection on Enter.',
      'Use aria-activedescendant to point focus programmatically without scrambling focus.'
    ],
    goodCode: `<!-- Semantic layout structure for an interactive dropdown combobox -->
<div class="custom-select">
  <button id="combo-btn" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-controls="combo-list" onclick="toggleDropdown()">
    Select Color
  </button>
  <ul id="combo-list" role="listbox" aria-labelledby="combo-btn" class="hidden">
    <li id="opt-red" role="option" aria-selected="false" tabindex="-1">Red</li>
    <li id="opt-blue" role="option" aria-selected="false" tabindex="-1">Blue</li>
  </ul>
</div>`,
    badCode: `<!-- Non-accessible custom dropdown: Keyboard-invisible list with zero semantic indicators -->
<div class="custom-dropdown">
  <div class="trigger-btn" onclick="toggleList()">Select Color</div>
  <div class="options-panel">
    <div onclick="selectVal('Red')">Red</div>
    <div onclick="selectVal('Blue')">Blue</div>
  </div>
</div>`
  },
  {
    id: 27,
    category: 'testing',
    conceptName: 'Accessibility Tree',
    question: 'What is the accessibility tree?',
    answer: 'The Accessibility Tree is a specialized subset of the browser\'s Document Object Model (DOM). Web browsers parse the HTML markup and CSS style rules, translate the semantic tags and ARIA configurations, and construct a structured tree of accessible nodes. Each node represents an element and contains attributes like: 1) Role (e.g., button, heading, checkbox); 2) Name (its accessible label); 3) State (e.g., expanded, checked, focused); and 4) Value (e.g., slider slider-value, input string text). Assistive technologies, like screen readers, query this tree directly to announce elements and receive real-time update notifications when values shift.',
    keyTakeaways: [
      'Sub-tree created by browsers specifically for screen readers and alternative controls.',
      'Built from semantic elements, labels, and ARIA configurations; updated in real-time.',
      'Debugging the Accessibility Tree is a core capability in Chrome and Safari DevTools.'
    ]
  },
  {
    id: 28,
    category: 'testing',
    conceptName: 'Testing Accessibility',
    question: 'How do you test accessibility during development?',
    answer: 'Accessible development combines automated tests with comprehensive manual testing:\n1. Automated Scans: Use auditing software like axe-core, Lighthouse, or browser extensions (WAVE, ARC Toolkit). These are incredibly fast at catching technical, clear-cut violations (such as missing alt text, low color contrast, or broken heading hierarchies).\n2. Manual Audits: Test the entire site using only your keyboard (Tab, Enter, Space, Escape, Arrows) to check for focus styling, skip-links, focus traps, and logical orders.\n3. Screen Reader Audits: Turn on a real screen reader (VoiceOver on macOS/iOS, NVDA or JAWS on Windows, TalkBack on Android) and listen to how pages are narrated, checking reading flow, content clarity, and dynamic update alerts.',
    keyTakeaways: [
      'Automated testing catches ~30% to 50% of technical bugs (high efficiency, low subjective review).',
      'Keyboard testing is essential for catching missing focus states, keyboard traps, and bad orders.',
      'Screen readers verify the actual human experience, ensuring content layout translates logically.'
    ]
  },
  {
    id: 29,
    category: 'testing',
    conceptName: 'Automated Limits',
    question: 'What\'s a limitation of automated accessibility testing tools?',
    answer: 'The primary limitation of automated testing tools is that they can only evaluate code syntax rules—they cannot evaluate context, accuracy, or quality. For example, an automated scanner can check if an <img> has an alt attribute, but it cannot tell if the description is helpful (e.g. it passes alt="photo" or alt="asdfasdf", which is useless to a user). Similarly, it can confirm a <label> exists, but cannot judge if the label text makes sense, if the keyboard navigation flow is logical, or if an interactive focus trap behaves cleanly in practice. Automation checks technical violations, but humans judge visual and practical utility.',
    keyTakeaways: [
      'Automated scans find syntax errors, not semantic validity.',
      'A passing Lighthouse a11y score of 100 does not guarantee a site is actually usable for blind users.',
      'Human-centered, manual testing is irreplaceable for evaluation of accessibility.'
    ]
  },
  {
    id: 30,
    category: 'semantics',
    conceptName: 'Labels in Forms',
    question: 'What is the purpose of <label> in forms, and what happens without it?',
    answer: 'The HTML <label> element is designed to associate an explicit descriptive text name with a form input element (like textboxes, checkboxes, and radio buttons). This does two critical things: 1) Provides an accessible name for screen readers, so they announce "Username, edit text" rather than a vague "edit text" or "blank line" when focused; 2) Increases the click/touch target size of the input, as clicking on the label text automatically activates or focuses the associated input, significantly assisting users with motor difficulties. Without a label, a form is largely unusable for blind users, who are left guessing what information to input.',
    keyTakeaways: [
      'Establishes an direct, semantic connection between descriptive text and its input field.',
      'Vital for touch targets: Clicking the label automatically activates or focuses the form input.',
      'Forms lacking labels are serious WCAG failures and make input pages highly inaccessible.'
    ],
    goodCode: `<!-- Explicit connection + enhanced tap target -->
<label for="user-email">Email Address</label>
<input type="email" id="user-email" placeholder="name@example.com" />`,
    badCode: `<!-- Screen readers can't read the static div name; small tap target -->
<div class="label-text">Email Address</div>
<input type="email" placeholder="name@example.com" />`
  },
  {
    id: 31,
    category: 'semantics',
    conceptName: 'Associating Labels',
    question: 'How do you associate a <label> with an input?',
    answer: 'There are two semantic ways to associate a <label> element with an input field:\n1. Explicit Association (Highly Recommended): Set the "for" attribute on the <label> element to match the exact "id" attribute value of the associated <input> element. This is clean, flexible, works with diverse layout styles, and is highly robust across older browsers and assistive devices.\n2. Implicit Association (Nested): Nest the <input> element directly inside the <label> element. While this doesn\'t require matching IDs, it is slightly less flexible for styling with CSS grids or flexbox, and occasionally experiences inconsistencies with older screen readers.',
    keyTakeaways: [
      'Explicit: <label for="my-id"> paired with <input id="my-id"> (most robust).',
      'Implicit: <label> Text Content <input type="text"> </label> (nested structure).',
      'Always ensure IDs are unique on the page—duplicated IDs break label associations.'
    ],
    goodCode: `<!-- Explicit association (Recommended standard) -->
<label for="username-field">Username</label>
<input type="text" id="username-field" />

<!-- Implicit association (Nested format) -->
<label>
  Username Nested
  <input type="text" />
</label>`,
    badCode: `<!-- Incorrect association: "for" is set to "name" attribute instead of "id", which fails -->
<label for="usr-name">Username</label>
<input type="text" id="username-id" name="usr-name" />`
  },
  {
    id: 32,
    category: 'aria',
    conceptName: 'Validation Errors',
    question: 'How should form validation errors be communicated accessibly?',
    answer: 'Communicating form validation errors accessibly requires dynamically updating both the visual and semantic state of form inputs:\n1. Input State: When a field has an error, apply aria-invalid="true" to the input so screen readers immediately announce "invalid data" when focusing.\n2. Link the Error: Use aria-describedby on the input, referencing the ID of the error message container so the error text is read automatically alongside the input value.\n3. Dynamic Announcement: If errors appear on-the-fly, use polite live regions (aria-live="polite") to speak them or programmatically shift focus to an error summary banner at the top of the form on submission fail.',
    keyTakeaways: [
      'Mark fields with aria-invalid="true" to visually/semantically flag erroneous entries.',
      'Directly link error containers to inputs using aria-describedby="error-id".',
      'Announce submissions dynamically or shift focus directly to a summary list of errors.'
    ],
    goodCode: `<!-- Fully accessible form error communication -->
<label for="email-field">Email</label>
<input type="email" id="email-field" aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" class="error-msg text-red-600">
  Error: Enter a valid email address containing an '@'.
</span>`,
    badCode: `<!-- Bad: User has no idea why input is flagged, error text is ignored by focus -->
<label for="email-field">Email</label>
<input type="email" id="email-field" class="border-red" />
<span class="error-msg">Error!</span>`
  },
  {
    id: 33,
    category: 'aria',
    conceptName: 'Accessible Name',
    question: 'What is the accessible name of an element and how is it computed?',
    answer: 'The accessible name is the user-facing text label that browsers expose for an element in the Accessibility Tree, which screen readers announce to describe what that element is. It is computed via a priority calculation standard called the Accessible Name and Description Computation (AccName). The browser checks sources in order: \n1) aria-labelledby (highest priority, references other IDs)\n2) aria-label (invisible string overrides)\n3) Content labels (such as <label> for inputs or alt text for images)\n4) Visible inner text (e.g., text inside a <button>)\n5) Fallback attributes like title or placeholder (lowest priority).',
    keyTakeaways: [
      'Accessible Name: The critical tag screen readers speak to identify elements.',
      'AccName Priority: aria-labelledby > aria-label > native element labels > inner text > title.',
      'Understanding priority prevents duplicate descriptions or silent elements.'
    ],
    goodCode: `<!-- Priority check: aria-label overrides inner text -->
<!-- Resulting Accessible Name: "Close Settings Menu" -->
<button aria-label="Close Settings Menu" title="Close Panel">
  Exit
</button>`,
    badCode: `<!-- No accessible name: CSS elements are ignored, leaving the node blank in AccName -->
<button class="settings-btn" onclick="openMenu()"></button>`
  },
  {
    id: 34,
    category: 'keyboard',
    conceptName: 'SPA Route Management',
    question: 'Why is focus management important for single-page apps (SPAs) on route change?',
    answer: 'In standard multi-page websites, changing pages triggers a full browser reload, which automatically moves focus back to the top of the body, allowing screen readers to announce the new page title. In Single Page Applications (SPAs), page navigation occurs dynamically via JavaScript without a full page reload. If focus is not manually managed on route change, the user\'s keyboard focus will remain stuck on a random visual node or reset to the body. This leaves keyboard/screen-reader users completely disoriented, unsure if navigation actually occurred or where they are. To resolve this, developers must programmatically shift focus to the new page heading on navigation.',
    keyTakeaways: [
      'Dynamic routing does not trigger browser reloads, leaving focus stuck on the page body or old elements.',
      'Manually transfer focus to the new page\'s principal heading (<h1>) on navigation.',
      'Mark the target heading with tabindex="-1" to allow program focus without adding standard tab indexes.'
    ],
    goodCode: `/* React Route hook style */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function PageHeader({ title }) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Focus heading on page route transition
    headerRef.current?.focus();
  }, [location.pathname]);

  return <h1 ref={headerRef} tabindex="-1" class="focus:outline-none">{title}</h1>;
}`,
    badCode: `<!-- Routing has no focus handlers: Screen reader says nothing when tabs are swapped -->
function RoutePage({ title }) {
  return <h1>{title}</h1>;
}`
  },
  {
    id: 35,
    category: 'aria',
    conceptName: 'Custom Toggles',
    question: 'How would you make a custom toggle/switch component accessible?',
    answer: 'A custom toggle switch needs to emulate the semantic roles, states, and behaviors of standard checklists. 1) Role & State: Set role="switch" on the button, and represent the toggle status with aria-checked="true" or "false". 2) Accessible Name: Ensure the button has a descriptive name either by visible text content, aria-labelledby, or aria-label. 3) Keyboard Support: Use a native <button> as the base (so it has focus and Space/Enter support for free), or manually apply tabindex="0" and write keyboard listeners. 4) Contrast & Visuals: Ensure the switch colors exceed 3:1 contrast in both states, and do not rely purely on color to signal the state (add sliding indicators or text toggles).',
    keyTakeaways: [
      'Configure toggle semantics using role="switch" paired with aria-checked.',
      'Provide clear text labels or descriptive aria-labels so screen readers understand what is toggled.',
      'Support standard keyboard input (Space/Enter) and ensure high-contrast visual indicators.'
    ],
    goodCode: `<!-- Standard Switch Button with correct roles, keyboard support, and label -->
<div class="flex justify-between items-center">
  <span id="dark-mode-label">Dark Mode Toggle</span>
  <button role="switch" aria-checked="false" aria-labelledby="dark-mode-label" onclick="toggleSwitch(this)" class="switch-btn">
    <span class="switch-thumb"></span>
  </button>
</div>`,
    badCode: `<!-- Bad Switch: Keyboard invisible, screen-reader deaf, relies purely on color circles -->
<div onclick="toggleMode()" class="switch-container flex">
  <span class="text">Dark Mode Toggle</span>
  <div class="color-dot bg-green-500"></div>
</div>`
  },
  {
    id: 36,
    category: 'semantics',
    conceptName: 'role="button" vs Native',
    question: 'What is the difference between role="button" on a div and using a native <button>?',
    answer: 'The difference lies in the massive manual development work required to make a div work securely compared to the free features of a native <button>:\n- role="button" on a div: Simply adds a label in the Accessibility Tree so screen readers announce it as "button." It does NOT make the div focusable, does NOT bind Enter or Space key activators, does NOT support disabled state styling, and does NOT support form submission natively.\n- Native <button>: Provides automatic keyboard focus, triggers Space/Enter click events out of the box, supports standard disabled behavior (which screen readers recognize and prevent clicks on automatically), and handles visual focus borders natively.',
    keyTakeaways: [
      'ARIA roles only alter semantic descriptions; they do not introduce functional interaction behavior.',
      'Using role="button" requires manually writing tabindex, Enter key, Space key, and state logic.',
      'Using native <button> simplifies codebases and eliminates cross-browser interaction bugs.'
    ],
    goodCode: `<!-- Bulletproof native element -->
<button type="button" disabled onclick="action()">Proceed</button>`,
    badCode: `<!-- Extremely complex mock button with missing keyboard, disabled safety, and visual rings -->
<div role="button" tabindex="0" onclick="if(!disabled) action()" class="btn">Proceed</div>`
  },
  {
    id: 37,
    category: 'semantics',
    conceptName: 'Landmarks',
    question: 'What are landmark roles and why use them?',
    answer: 'Landmark roles are semantic structural regions on a webpage (such as banner, navigation, main, contentinfo, search, and complementary) that browsers and assistive technologies use to identify major layouts. Users of screen readers navigate pages by jumping from landmark to landmark (using specialized keyboard shortcut lists), allowing them to bypass repetitive headers and footer margins, jump directly to the main column, or jump straight to the sidebar search box. You can define landmarks either by using HTML5 structural elements (<header>, <nav>, <main>, <footer>, <aside>, <form role="search">) or by applying corresponding role attributes.',
    keyTakeaways: [
      'Provides a high-level table of contents letting screen-reader users jump directly across structural regions.',
      'Defined natively via HTML5 elements: <header> (banner), <nav> (navigation), <main> (main), <footer> (contentinfo).',
      'Minimizes the need for excessive "skip to content" links when structured correctly.'
    ],
    goodCode: `<!-- Best Practice layout with landmarks -->
<header> <!-- banner landmark -->
  <nav>Navigation Section</nav> <!-- navigation landmark -->
</header>
<main> <!-- main content landmark -->
  <article>Primary Article</article>
</main>
<aside> <!-- complementary landmark -->
  <h3>Search Site</h3>
</aside>
<footer>Footer Information</footer> <!-- contentinfo landmark -->`,
    badCode: `<!-- Generic layout: Screen reader users have no landmarks to jump between -->
<div class="header">
  <div class="navigation">Navigation Section</div>
</div>
<div class="content">
  <div class="primary">Primary Article</div>
</div>
<div class="footer">Footer Information</div>`
  },
  {
    id: 38,
    category: 'design',
    conceptName: 'Data Visualization',
    question: 'How would you make a data visualization (chart) accessible?',
    answer: 'Visual charts (rendered via Canvas or SVGs) are completely blank/invisible to screen reader users. To make charts accessible, you must employ multiple strategies: 1) Text Summary: Provide an adjacent, clear text summary describing the trend and primary highlights of the chart (e.g., "Our revenue grew by 20% in Q3, led by software subscriptions"). 2) Accessible Data Table: Provide a structurally linked HTML <table> beneath the chart detailing the exact raw numbers, allowing screen reader and keyboard users to inspect values directly. 3) SVG Semantics: If using SVG elements directly, apply role="img" with a nested <title> and <desc> tag to outline the data structure.',
    keyTakeaways: [
      'Visual charts are screen-reader blind; always provide alternative ways to consume data.',
      'Include an adjacent structural <table> with the complete dataset.',
      'Provide a short text summary that highlights key milestones, trends, and data peaks.'
    ],
    goodCode: `<!-- Accessible SVG chart with table companion -->
<div role="region" aria-label="Sales Chart Companion">
  <!-- Interactive Visual Chart -->
  <svg role="img" aria-label="Quarterly sales trend rising from $10k in Q1 to $30k in Q4">
    <title>Quarterly Sales Chart</title>
    <!-- Vector elements -->
  </svg>

  <!-- Accessible Structured Table -->
  <table class="sr-only-focusable">
    <caption>Quarterly Sales Raw Numbers</caption>
    <thead>
      <tr><th>Quarter</th><th>Revenue</th></tr>
    </thead>
    <tbody>
      <tr><td>Q1</td><td>$10,000</td></tr>
      <tr><td>Q2</td><td>$15,000</td></tr>
    </tbody>
  </table>
</div>`,
    badCode: `<!-- Inaccessible canvas: No text description, no table, completely invisible to blind users -->
<canvas id="revenue-chart" width="400" height="200"></canvas>`
  },
  {
    id: 39,
    category: 'keyboard',
    conceptName: 'outline: none Impact',
    question: 'What\'s the impact of outline: none on focus indicators?',
    answer: 'Applying outline: none (or outline: 0) to interactive elements without providing a clear, high-contrast custom replacement style is one of the most common and damaging accessibility failures. The browser outline is the visual cursor for keyboard-only users, letting them see exactly which button, link, or input currently has focus as they navigate the page. Removing this outline makes the keyboard cursor completely invisible. This makes navigating the site like attempting to use a mouse where the pointer cursor is hidden—users have no idea what they are focusing on, leading to extreme frustration and random, blind interactions.',
    keyTakeaways: [
      'Never remove default focus outlines (outline: none) without designing custom focus states.',
      'Keyboard-only users rely 100% on visual focus rings to navigate digital environments.',
      'Modern CSS allows :focus-visible to apply rings only during keyboard inputs, keeping mouse interactions clean.'
    ],
    goodCode: `/* CSS with clear, custom focus indicator */
.btn-submit:focus-visible {
  outline: 3px solid #3B82F6; /* High contrast blue outline */
  outline-offset: 2px;
}`,
    badCode: `/* Removes focus states entirely, rendering the site unusable for keyboards */
button:focus, a:focus, input:focus {
  outline: none !important;
}`
  },
  {
    id: 40,
    category: 'design',
    conceptName: 'Dashboard Accessibility',
    question: 'How would you approach accessibility for a live-updating dashboard?',
    answer: 'Accessibility for real-time dashboards (e.g., active websocket charts, live tickers, sports feeds) requires careful information flow management to prevent overwhelming screen reader users:\n1. Respectful Updates: Do not announce every single microscopic ticker update or data decimal fluctuation, which would flood screen readers with a continuous wall of disruptive speech. Use polite regions (aria-live="polite") only for meaningful milestones or critical thresholds.\n2. Summaries & Controls: Provide play/pause controls so users can freeze the live update stream. Ensure updated elements use aria-atomic="true" if the entire container needs to be read as a unit when a segment changes.\n3. Visual Alternates: Never rely on color shifts or flashing animations alone to communicate stock direction—pair changes with textual arrows (e.g. "▲ Up 1.2%" or "▼ Down 0.4%").',
    keyTakeaways: [
      'Throttle alerts: Limit automatic speech announcements to high-priority events.',
      'Control updates: Always provide play/pause buttons to halt dynamic websocket updates.',
      'Multi-sensory signals: Combine flashing shifts with textual arrow labels (e.g., "Up", "Down").'
    ],
    goodCode: `<!-- Ticker updates politely; visual arrows supplement green/red color shifts -->
<div aria-live="polite" aria-atomic="true" class="stock-panel">
  <span class="ticker-name">AAPL:</span>
  <span class="ticker-price text-green-600">$185.20</span>
  <span class="ticker-trend text-green-600">
    <span class="sr-only">Up</span> ▲ 1.45%
  </span>
</div>`,
    badCode: `<!-- Floods screen reader assertively; direction is green-only with no text arrows -->
<div aria-live="assertive" class="stock bg-green">
  AAPL: $185.20 (1.45)
</div>`
  }
];
