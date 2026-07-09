/** @type {import('tailwindcss').Config} */
export default {
        darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
        theme: {
          extend: {
            "colors": {
                    "primary": "#1E3A8A",
                    "on-primary": "#FFFFFF",
                    "primary-container": "#E0E7FF",
                    "on-primary-container": "#1E3A8A",
                    "secondary": "#059669",
                    "on-secondary": "#FFFFFF",
                    "secondary-container": "#D1FAE5",
                    "on-secondary-container": "#059669",
                    "background": "#F8FAFC",
                    "on-background": "#0F172A",
                    "surface": "#FFFFFF",
                    "on-surface": "#0F172A",
                    "surface-variant": "#E2E8F0",
                    "on-surface-variant": "#475569",
                    "surface-container-lowest": "#FFFFFF",
                    "surface-container-low": "#F1F5F9",
                    "surface-container": "#E2E8F0",
                    "surface-container-high": "#CBD5E1",
                    "surface-container-highest": "#94A3B8",
                    "outline": "#64748B",
                    "outline-variant": "#E2E8F0",
                    "error": "#EF4444",
                    "on-error": "#FFFFFF",
                    "error-container": "#FEE2E2",
                    "on-error-container": "#EF4444",
                    "primary-fixed": "#D8E2FF",
                    "primary-fixed-dim": "#AFC6FB",
                    "on-primary-fixed": "#001A41",
                    "on-primary-fixed-variant": "#2E4673",
                    "secondary-fixed": "#D1FAE5",
                    "secondary-fixed-dim": "#A7F3D0",
                    "on-secondary-fixed": "#064E3B",
                    "on-secondary-fixed-variant": "#047857",
                    "tertiary": "#361E00",
                    "on-tertiary": "#FFFFFF",
                    "tertiary-container": "#543100",
                    "on-tertiary-container": "#CC995F",
                    "tertiary-fixed": "#FFDDBB",
                    "tertiary-fixed-dim": "#F4BC7F",
                    "on-tertiary-fixed": "#2B1700",
                    "on-tertiary-fixed-variant": "#643E0C"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "header_height": "64px",
                    "margin_desktop": "32px",
                    "sidebar_width": "240px",
                    "stack_sm": "8px",
                    "stack_lg": "24px",
                    "base": "8px",
                    "stack_md": "16px",
                    "margin_mobile": "16px",
                    "gutter": "24px"
            },
            "fontFamily": {
                    "body-md": ["Inter"],
                    "label-sm": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "headline-md": ["Inter"],
                    "body-lg": ["Inter"],
                    "headline-sm": ["Inter"],
                    "headline-lg": ["Inter"],
                    "label-md": ["Inter"]
            },
            "fontSize": {
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-sm": ["11px", {"lineHeight": "14px", "fontWeight": "500"}],
                    "headline-lg-mobile": ["26px", {"lineHeight": "32px", "fontWeight": "700"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-md": ["12px", {"lineHeight": "16px", "fontWeight": "600"}]
            }
          }
        }
      };