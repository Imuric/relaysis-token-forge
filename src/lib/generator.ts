// src/lib/generator.ts
import { tailwindPalette } from './data';

// --- Types ---
type ColorScale = Record<number, string>;
export type GeneratedSystem = Record<string, string>;

// --- Logic Layer 1: Smart Neutrals ---
function getNeutralScale(brandName: string): ColorScale {
  const warm = ['red', 'orange', 'amber', 'yellow', 'rose'];
  const cool = ['blue', 'indigo', 'sky', 'cyan', 'slate', 'zinc'];
  // Default/Nature/Other falls to 'gray' (Emerald, Teal, Lime, Purple, Pink, etc.)
  
  if (warm.includes(brandName)) return tailwindPalette.stone;
  if (cool.includes(brandName)) return tailwindPalette.slate;
  return tailwindPalette.gray;
}

// --- Logic Layer 2: Feedback Collision & Swap ---
function getFeedbackScales(brandName: string) {
  // Defaults
  let error = tailwindPalette.rose;
  let success = tailwindPalette.emerald;
  let warning = tailwindPalette.amber;
  let info = tailwindPalette.sky;

  // Swap Rules
  if (brandName === 'rose') error = tailwindPalette.red;
  if (brandName === 'emerald') success = tailwindPalette.green;
  if (brandName === 'sky') info = tailwindPalette.blue;
  if (brandName === 'amber') warning = tailwindPalette.yellow;

  return { error, success, warning, info };
}

// --- Logic Layer 3: The 165 Variables ---
export function generateDesignSystem(brandName: string): GeneratedSystem {
  // 1. Get Scales
  const brand = tailwindPalette[brandName] || tailwindPalette.indigo;
  const neutral = getNeutralScale(brandName);
  const { error, success, warning, info } = getFeedbackScales(brandName);

  // 2. Map Variables (No Math, just Mapping)
  return {
    // --- FOUNDATION (3) ---
    '--color-white': '#ffffff',
    '--color-black': '#000000',
    '--color-transparent': 'transparent',

    // --- TEXT (40) ---
    // Headings (High Contrast)
    '--text-heading': neutral[900],
    '--text-heading-hover': neutral[950], // Darker on hover
    // Body (Standard Reading)
    '--text-body': neutral[700],
    '--text-body-strong': neutral[800],
    '--text-body-soft': neutral[600],
    // Caption (Subtle)
    '--text-caption': neutral[500],
    '--text-caption-hover': neutral[600],
    // Inverse (On dark backgrounds)
    '--text-inverse': '#ffffff',
    '--text-inverse-soft': neutral[200],
    // Links (Brand colors)
    '--text-link': brand[600],
    '--text-link-hover': brand[700],
    '--text-link-active': brand[800],
    '--text-link-visited': brand[900],
    // Interactive/Actions
    '--text-action-primary': '#ffffff', // On primary buttons
    '--text-action-secondary': neutral[900],
    '--text-action-ghost': neutral[600],
    '--text-action-ghost-hover': neutral[900],
    '--text-disabled': neutral[400],
    // Feedback Text
    '--text-error': error[600],
    '--text-error-hover': error[700],
    '--text-success': success[600],
    '--text-success-hover': success[700],
    '--text-warning': warning[600],
    '--text-warning-hover': warning[700],
    '--text-info': info[600],
    '--text-info-hover': info[700],

    // --- ICON (24) ---
    '--icon-xs': '16px', // Helpers for sizing logic if needed
    '--icon-sm': '20px',
    '--icon-base': '24px',
    // Colors
    '--icon-primary': neutral[900],
    '--icon-secondary': neutral[500],
    '--icon-tertiary': neutral[400],
    '--icon-inverse': '#ffffff',
    '--icon-disabled': neutral[300],
    '--icon-brand': brand[600],
    // Action Icons
    '--icon-action-primary': '#ffffff',
    '--icon-action-secondary': neutral[700],
    // Feedback Icons
    '--icon-error': error[500],
    '--icon-success': success[500],
    '--icon-warning': warning[500],
    '--icon-info': info[500],

    // --- SURFACE (60) ---
    // Page & Layout
    '--surface-page': neutral[50],
    '--surface-panel': '#ffffff',
    '--surface-panel-hover': neutral[50],
    '--surface-overlay': 'rgba(0, 0, 0, 0.5)', // Backdrop
    // Cards
    '--surface-card': '#ffffff',
    '--surface-card-hover': neutral[50],
    '--surface-card-active': neutral[100],
    // Primary Button (Brand)
    '--surface-primary': brand[600],
    '--surface-primary-hover': brand[700],
    '--surface-primary-active': brand[800],
    '--surface-primary-disabled': neutral[200],
    // Secondary Button (Neutral)
    '--surface-secondary': '#ffffff',
    '--surface-secondary-hover': neutral[50],
    '--surface-secondary-active': neutral[100],
    // Ghost Button
    '--surface-ghost': 'transparent',
    '--surface-ghost-hover': neutral[100],
    '--surface-ghost-active': neutral[200],
    // Form Inputs
    '--surface-input': '#ffffff',
    '--surface-input-disabled': neutral[100],
    // Feedback Surfaces (Solid - for Badges/Alerts)
    '--surface-error': error[600],
    '--surface-success': success[600],
    '--surface-warning': warning[600],
    '--surface-info': info[600],
    // Feedback Surfaces (Soft - for backgrounds)
    '--surface-error-soft': error[50],
    '--surface-success-soft': success[50],
    '--surface-warning-soft': warning[50],
    '--surface-info-soft': info[50],
    // Feedback Surfaces (Soft Hover)
    '--surface-error-soft-hover': error[100],
    '--surface-success-soft-hover': success[100],
    '--surface-warning-soft-hover': warning[100],
    '--surface-info-soft-hover': info[100],

    // --- BORDER (38) ---
    // Structural
    '--border-base': neutral[200],
    '--border-subtle': neutral[100],
    '--border-strong': neutral[300],
    '--border-inverse': '#ffffff',
    // Interactive
    '--border-input': neutral[300],
    '--border-input-hover': neutral[400],
    '--border-input-focus': brand[500], // Focus ring color
    '--border-focus-ring': brand[200],  // Outer glow
    // Action Borders
    '--border-primary': brand[600],
    '--border-secondary': neutral[300],
    // Feedback Borders
    '--border-error': error[300],
    '--border-error-focus': error[500],
    '--border-success': success[300],
    '--border-warning': warning[300],
    '--border-info': info[300],
    // Left-border accents (for Callouts)
    '--border-accent-error': error[600],
    '--border-accent-success': success[600],
    '--border-accent-warning': warning[600],
    '--border-accent-info': info[600],
  };
}