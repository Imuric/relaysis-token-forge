// src/lib/generator.ts
import { tailwindPalette } from './data';

type ColorScale = Record<number, string>;
export type GeneratedSystem = Record<string, string>;

function getNeutralScale(brandName: string): ColorScale {
  const warm = ['red', 'orange', 'amber', 'yellow', 'rose'];
  const cool = ['blue', 'indigo', 'sky', 'cyan', 'slate', 'zinc'];
  
  if (warm.includes(brandName)) return tailwindPalette.stone;
  if (cool.includes(brandName)) return tailwindPalette.slate;
  return tailwindPalette.gray;
}

function getFeedbackScales(brandName: string) {
  let error = tailwindPalette.rose;
  let success = tailwindPalette.emerald;
  let warning = tailwindPalette.amber;
  let info = tailwindPalette.sky;

  if (brandName === 'rose') error = tailwindPalette.red;
  if (brandName === 'emerald') success = tailwindPalette.green;
  if (brandName === 'sky') info = tailwindPalette.blue;
  if (brandName === 'amber') warning = tailwindPalette.yellow;

  return { error, success, warning, info };
}

export function generateDesignSystem(brandName: string, mode: 'light' | 'dark' = 'light'): GeneratedSystem {
  const brand = tailwindPalette[brandName] || tailwindPalette.indigo;
  const neutral = getNeutralScale(brandName);
  const { error, success, warning, info } = getFeedbackScales(brandName);

  const isDark = mode === 'dark';

  return {
    // --- FOUNDATION ---
    '--base-white': '#ffffff',
    '--base-black': '#000000',
    '--base-transparent': 'transparent',

    // --- TEXT ---
    '--text-heading': isDark ? '#ffffff' : neutral[900],
    '--text-body': isDark ? neutral[200] : neutral[700],
    '--text-caption': isDark ? neutral[400] : neutral[500],
    '--text-placeholder': isDark ? neutral[500] : neutral[400],
    '--text-code': isDark ? neutral[400] : neutral[600],
    '--text-selected': isDark ? brand[300] : brand[900],
    
    // Inverse
    '--text-inv-heading': isDark ? neutral[900] : '#ffffff',
    '--text-inv-body': isDark ? neutral[800] : neutral[100],
    '--text-inv-caption': isDark ? neutral[600] : neutral[300],
    '--text-inv-placeholder': isDark ? neutral[500] : neutral[500],

    // Interactive Text
    '--text-link-def': isDark ? brand[400] : brand[600],
    '--text-link-hov': isDark ? brand[300] : brand[700],
    '--text-link-act': isDark ? brand[200] : brand[800],
    '--text-link-visited': isDark ? brand[500] : brand[900],

    '--text-action-def': '#ffffff', 
    '--text-action-hov': '#ffffff',
    '--text-action-act': neutral[100],
    '--text-action-dis': isDark ? neutral[500] : neutral[400],

    // Feedback Text
    '--text-success-def': isDark ? success[400] : success[600],
    '--text-success-hov': isDark ? success[300] : success[700],
    '--text-success-oncolor': '#ffffff',
    '--text-success-oncolor-hov': success[50],

    '--text-error-def': isDark ? error[400] : error[600],
    '--text-error-hov': isDark ? error[300] : error[700],
    '--text-error-oncolor': '#ffffff',
    '--text-error-oncolor-hov': error[50],

    '--text-warning-def': isDark ? warning[400] : warning[600],
    '--text-warning-hov': isDark ? warning[300] : warning[700],
    '--text-warning-oncolor': '#ffffff',
    '--text-warning-oncolor-hov': warning[50],

    '--text-info-def': isDark ? info[400] : info[600],
    '--text-info-hov': isDark ? info[300] : info[700],
    '--text-info-oncolor': '#ffffff',
    '--text-info-oncolor-hov': info[50],

    '--text-disabled-def': isDark ? neutral[600] : neutral[300],
    '--text-disabled-oncolor': isDark ? neutral[500] : neutral[400],

    // --- SURFACE ---
    '--surf-page-pri': isDark ? neutral[950] : neutral[50],
    '--surf-page-sec': isDark ? neutral[900] : neutral[100],
    '--surf-overlay': isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.5)',
    '--surf-selected': isDark ? brand[900] : brand[100],

    '--surf-card-pri-def': isDark ? neutral[900] : '#ffffff',
    '--surf-card-pri-hov': isDark ? neutral[800] : neutral[50],
    '--surf-card-pri-act': isDark ? neutral[700] : neutral[100],
    '--surf-card-sec-def': isDark ? neutral[800] : neutral[50],
    '--surf-card-sec-hov': isDark ? neutral[700] : neutral[100],
    '--surf-card-sec-act': isDark ? neutral[600] : neutral[200],

    '--surf-action-pri-def': isDark ? brand[600] : brand[600],
    '--surf-action-pri-hov': isDark ? brand[500] : brand[700],
    '--surf-action-pri-act': isDark ? brand[400] : brand[800],
    '--surf-action-pri-dis': isDark ? neutral[800] : neutral[200],

    '--surf-action-sec-def': isDark ? 'transparent' : '#ffffff', 
    '--surf-action-sec-hov': isDark ? neutral[800] : neutral[50],
    '--surf-action-sec-act': isDark ? neutral[700] : neutral[100],
    '--surf-action-sec-dis': isDark ? neutral[800] : neutral[100],

    '--surf-action-sub-def': 'transparent',
    '--surf-action-sub-hov': isDark ? neutral[800] : neutral[100],
    '--surf-action-sub-act': isDark ? neutral[700] : neutral[200],
    '--surf-action-sub-dis': 'transparent',

    '--surf-input-def': isDark ? neutral[900] : '#ffffff',
    '--surf-input-hov': isDark ? neutral[800] : neutral[50],
    '--surf-input-focus': isDark ? neutral[900] : '#ffffff',
    '--surf-input-dis': isDark ? neutral[800] : neutral[100],

    // Feedback Surfaces
    '--surf-success-solid-def': isDark ? success[600] : success[600],
    '--surf-success-solid-hov': isDark ? success[500] : success[700],
    '--surf-success-solid-act': isDark ? success[400] : success[800],
    '--surf-success-soft-def': isDark ? 'rgba(16, 185, 129, 0.1)' : success[50], 
    '--surf-success-soft-hov': isDark ? 'rgba(16, 185, 129, 0.2)' : success[100],
    '--surf-success-soft-act': isDark ? 'rgba(16, 185, 129, 0.3)' : success[200],

    '--surf-error-solid-def': isDark ? error[600] : error[600],
    '--surf-error-solid-hov': isDark ? error[500] : error[700],
    '--surf-error-solid-act': isDark ? error[400] : error[800],
    '--surf-error-soft-def': isDark ? 'rgba(244, 63, 94, 0.1)' : error[50],
    '--surf-error-soft-hov': isDark ? 'rgba(244, 63, 94, 0.2)' : error[100],
    '--surf-error-soft-act': isDark ? 'rgba(244, 63, 94, 0.3)' : error[200],

    '--surf-warning-solid-def': isDark ? warning[600] : warning[600],
    '--surf-warning-solid-hov': isDark ? warning[500] : warning[700],
    '--surf-warning-solid-act': isDark ? warning[400] : warning[800],
    '--surf-warning-soft-def': isDark ? 'rgba(245, 158, 11, 0.1)' : warning[50],
    '--surf-warning-soft-hov': isDark ? 'rgba(245, 158, 11, 0.2)' : warning[100],
    '--surf-warning-soft-act': isDark ? 'rgba(245, 158, 11, 0.3)' : warning[200],

    '--surf-info-solid-def': isDark ? info[600] : info[600],
    '--surf-info-solid-hov': isDark ? info[500] : info[700],
    '--surf-info-solid-act': isDark ? info[400] : info[800],
    '--surf-info-soft-def': isDark ? 'rgba(14, 165, 233, 0.1)' : info[50],
    '--surf-info-soft-hov': isDark ? 'rgba(14, 165, 233, 0.2)' : info[100],
    '--surf-info-soft-act': isDark ? 'rgba(14, 165, 233, 0.3)' : info[200],

    // --- BORDER (CRITICAL CONTRAST FIXES) ---
    
    // General Dividers: Bumped to 700/600 in dark mode
    '--border-div-pri': isDark ? neutral[700] : neutral[200],
    '--border-div-sec': isDark ? neutral[800] : neutral[100],
    
    // Interactive Borders: Bumped to 600 in dark mode
    '--border-action-def': isDark ? brand[600] : brand[600],
    '--border-action-hov': isDark ? brand[500] : brand[700],
    '--border-action-act': isDark ? brand[400] : brand[800],
    '--border-action-dis': isDark ? neutral[600] : neutral[300], // FIX: Visible Disabled Border

    // Input Borders: Bumped to 600 for visibility
    '--border-input-def': isDark ? neutral[600] : neutral[300], // FIX: Visible Input/Toggle Border
    '--border-input-hov': isDark ? neutral[500] : neutral[400],
    '--border-input-focus': isDark ? brand[500] : brand[500],
    '--border-input-dis': isDark ? neutral[700] : neutral[200],

    '--border-focus-ring': isDark ? brand[900] : brand[200],
    '--border-selected': isDark ? brand[500] : brand[500],

    '--border-success-def': isDark ? success[500] : success[500],
    '--border-success-hov': isDark ? success[400] : success[600],
    '--border-success-subtle': isDark ? success[900] : success[200],
    '--border-success-subtle-hov': isDark ? success[700] : success[300],
    '--border-success-focus': isDark ? success[500] : success[500],

    '--border-error-def': isDark ? error[500] : error[500],
    '--border-error-hov': isDark ? error[400] : error[600],
    '--border-error-subtle': isDark ? error[800] : error[200],
    '--border-error-subtle-hov': isDark ? error[700] : error[300],
    '--border-error-focus': isDark ? error[500] : error[500],

    '--border-warning-def': isDark ? warning[500] : warning[500],
    '--border-warning-hov': isDark ? warning[400] : warning[600],
    '--border-warning-subtle': isDark ? warning[800] : warning[200],
    '--border-warning-subtle-hov': isDark ? warning[700] : warning[300],
    '--border-warning-focus': isDark ? warning[500] : warning[500],

    '--border-info-def': isDark ? info[500] : info[500],
    '--border-info-hov': isDark ? info[400] : info[600],
    '--border-info-subtle': isDark ? info[800] : info[200],
    '--border-info-subtle-hov': isDark ? info[700] : info[300],
    '--border-info-focus': isDark ? info[500] : info[500],
  };
}