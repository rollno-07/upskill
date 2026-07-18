/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    key: 'basics',
    name: 'HTML Basics',
    icon: 'Terminal',
    color: 'from-amber-500 to-orange-600',
    description: 'Fundamental concepts, DOCTYPE declarations, block vs. inline elements, and basic page structures.'
  },
  {
    key: 'structure',
    name: 'Document Structure & Semantics',
    icon: 'Layout',
    color: 'from-blue-500 to-indigo-600',
    description: 'HTML5 semantic tags, lists, tables, heading hierarchies, structural layouts, and article vs. section.'
  },
  {
    key: 'attributes',
    name: 'Attributes & Links',
    icon: 'Link',
    color: 'from-teal-500 to-emerald-600',
    description: 'Global attributes, link targets, custom data attributes, download behavior, and rel configuration.'
  },
  {
    key: 'metadata',
    name: 'Metadata & Script Loading',
    icon: 'Code',
    color: 'from-purple-500 to-violet-600',
    description: 'Viewport meta tags, async/defer scripts, preloading/prefetching resources, and caching directives.'
  },
  {
    key: 'forms',
    name: 'Forms & Validation',
    icon: 'CheckSquare',
    color: 'from-pink-500 to-rose-600',
    description: 'Input types, form submission methods, labels, client-side validation, select lists, and button behaviors.'
  },
  {
    key: 'media',
    name: 'Responsive Media & Embeds',
    icon: 'Image',
    color: 'from-cyan-500 to-blue-600',
    description: 'Picture element, srcset responsiveness, iframe security, SVGs, canvas drawing, and native lazy loading.'
  },
  {
    key: 'dom',
    name: 'DOM & Security',
    icon: 'Shield',
    color: 'from-emerald-500 to-green-600',
    description: 'Shadow DOM, Web Components, HTML templates, innerHTML vs textContent, XSS mitigation, and properties vs attributes.'
  },
  {
    key: 'seo_a11y',
    name: 'Accessibility & SEO',
    icon: 'Eye',
    color: 'from-red-500 to-pink-600',
    description: 'Screen readers, keyboard navigation, ARIA standards, progressive enhancement, canonical URLs, and robot directives.'
  }
];
