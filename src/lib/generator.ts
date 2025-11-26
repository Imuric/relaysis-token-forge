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

export function generateDesignSystem(brandName: string): GeneratedSystem {
  const brand = tailwindPalette[brandName] || tailwindPalette.indigo;
  const neutral = getNeutralScale(brandName);
  const { error, success, warning, info } = getFeedbackScales(brandName);

  return {
    // 1. FOUNDATION (3)
    '--base-white': '#ffffff',
    '--base-black': '#000000',
    '--base-transparent': 'transparent',

    // 2. TEXT TOKENS (36)
    '--text-heading': neutral[900],
    '--text-body': neutral[700],
    '--text-caption': neutral[500],
    '--text-placeholder': neutral[400],
    '--text-code': neutral[600],
    '--text-selected': brand[900],
    '--text-inv-heading': '#ffffff',
    '--text-inv-body': neutral[100],
    '--text-inv-caption': neutral[300],
    '--text-inv-placeholder': neutral[500],
    '--text-link-def': brand[600],
    '--text-link-hov': brand[700],
    '--text-link-act': brand[800],
    '--text-link-visited': brand[900],
    '--text-action-def': '#ffffff',
    '--text-action-hov': '#ffffff',
    '--text-action-act': neutral[100],
    '--text-action-dis': neutral[400],
    '--text-success-def': success[600],
    '--text-success-hov': success[700],
    '--text-success-oncolor': '#ffffff',
    '--text-success-oncolor-hov': success[50],
    '--text-error-def': error[600],
    '--text-error-hov': error[700],
    '--text-error-oncolor': '#ffffff',
    '--text-error-oncolor-hov': error[50],
    '--text-warning-def': warning[600],
    '--text-warning-hov': warning[700],
    '--text-warning-oncolor': '#ffffff',
    '--text-warning-oncolor-hov': warning[50],
    '--text-info-def': info[600],
    '--text-info-hov': info[700],
    '--text-info-oncolor': '#ffffff',
    '--text-info-oncolor-hov': info[50],
    '--text-disabled-def': neutral[300],
    '--text-disabled-oncolor': neutral[400],

    // 3. ICON TOKENS (27)
    '--icon-size-heading': '24px',
    '--icon-size-body': '20px',
    '--icon-size-caption': '16px',
    '--icon-size-placeholder': '20px',
    '--icon-inv-heading': '#ffffff',
    '--icon-inv-body': neutral[200],
    '--icon-inv-caption': neutral[400],
    '--icon-action-def': brand[600],
    '--icon-action-hov': brand[700],
    '--icon-action-act': brand[800],
    '--icon-action-dis': neutral[300],
    '--icon-success-def': success[500],
    '--icon-success-hov': success[600],
    '--icon-success-oncolor': '#ffffff',
    '--icon-success-oncolor-hov': success[50],
    '--icon-error-def': error[500],
    '--icon-error-hov': error[600],
    '--icon-error-oncolor': '#ffffff',
    '--icon-error-oncolor-hov': error[50],
    '--icon-warning-def': warning[500],
    '--icon-warning-hov': warning[600],
    '--icon-warning-oncolor': '#ffffff',
    '--icon-warning-oncolor-hov': warning[50],
    '--icon-info-def': info[500],
    '--icon-info-hov': info[600],
    '--icon-info-oncolor': '#ffffff',
    '--icon-info-oncolor-hov': info[50],

    // 4. SURFACE TOKENS (50)
    '--surf-page-pri': neutral[50],
    '--surf-page-sec': neutral[100],
    '--surf-overlay': 'rgba(0, 0, 0, 0.5)',
    '--surf-selected': brand[100],
    '--surf-card-pri-def': '#ffffff',
    '--surf-card-pri-hov': neutral[50],
    '--surf-card-pri-act': neutral[100],
    '--surf-card-sec-def': neutral[50],
    '--surf-card-sec-hov': neutral[100],
    '--surf-card-sec-act': neutral[200],
    '--surf-action-pri-def': brand[600],
    '--surf-action-pri-hov': brand[700],
    '--surf-action-pri-act': brand[800],
    '--surf-action-pri-dis': neutral[200],
    '--surf-action-sec-def': '#ffffff',
    '--surf-action-sec-hov': neutral[50],
    '--surf-action-sec-act': neutral[100],
    '--surf-action-sec-dis': neutral[100],
    '--surf-action-sub-def': 'transparent',
    '--surf-action-sub-hov': neutral[100],
    '--surf-action-sub-act': neutral[200],
    '--surf-action-sub-dis': 'transparent',
    '--surf-input-def': '#ffffff',
    '--surf-input-hov': neutral[50],
    '--surf-input-focus': '#ffffff',
    '--surf-input-dis': neutral[100],
    '--surf-success-solid-def': success[600],
    '--surf-success-solid-hov': success[700],
    '--surf-success-solid-act': success[800],
    '--surf-success-soft-def': success[50],
    '--surf-success-soft-hov': success[100],
    '--surf-success-soft-act': success[200],
    '--surf-error-solid-def': error[600],
    '--surf-error-solid-hov': error[700],
    '--surf-error-solid-act': error[800],
    '--surf-error-soft-def': error[50],
    '--surf-error-soft-hov': error[100],
    '--surf-error-soft-act': error[200],
    '--surf-warning-solid-def': warning[600],
    '--surf-warning-solid-hov': warning[700],
    '--surf-warning-solid-act': warning[800],
    '--surf-warning-soft-def': warning[50],
    '--surf-warning-soft-hov': warning[100],
    '--surf-warning-soft-act': warning[200],
    '--surf-info-solid-def': info[600],
    '--surf-info-solid-hov': info[700],
    '--surf-info-solid-act': info[800],
    '--surf-info-soft-def': info[50],
    '--surf-info-soft-hov': info[100],
    '--surf-info-soft-act': info[200],

    // 5. BORDER TOKENS (32)
    '--border-div-pri': neutral[200],
    '--border-div-sec': neutral[100],
    '--border-action-def': brand[600],
    '--border-action-hov': brand[700],
    '--border-action-act': brand[800],
    '--border-action-dis': neutral[300],
    '--border-input-def': neutral[300],
    '--border-input-hov': neutral[400],
    '--border-input-focus': brand[500],
    '--border-input-dis': neutral[200],
    '--border-focus-ring': brand[200],
    '--border-selected': brand[500],
    '--border-success-def': success[500],
    '--border-success-hov': success[600],
    '--border-success-subtle': success[200],
    '--border-success-subtle-hov': success[300],
    '--border-success-focus': success[500],
    '--border-error-def': error[500],
    '--border-error-hov': error[600],
    '--border-error-subtle': error[200],
    '--border-error-subtle-hov': error[300],
    '--border-error-focus': error[500],
    '--border-warning-def': warning[500],
    '--border-warning-hov': warning[600],
    '--border-warning-subtle': warning[200],
    '--border-warning-subtle-hov': warning[300],
    '--border-warning-focus': warning[500],
    '--border-info-def': info[500],
    '--border-info-hov': info[600],
    '--border-info-subtle': info[200],
    '--border-info-subtle-hov': info[300],
    '--border-info-focus': info[500],
  };
}