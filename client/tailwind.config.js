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
                    "on-tertiary-fixed-variant": "#643e0c",
                    "on-surface-variant": "#44474f",
                    "tertiary-fixed-dim": "#f4bc7f",
                    "on-secondary-container": "#004a7d",
                    "error": "#ba1a1a",
                    "tertiary": "#361e00",
                    "on-error-container": "#93000a",
                    "surface-tint": "#475e8c",
                    "on-primary-container": "#8ba2d5",
                    "on-background": "#1a1b1f",
                    "primary-fixed-dim": "#afc6fb",
                    "background": "#faf9fd",
                    "surface": "#faf9fd",
                    "surface-container-low": "#f4f3f7",
                    "error-container": "#ffdad6",
                    "on-secondary-fixed": "#001d36",
                    "tertiary-container": "#543100",
                    "surface-variant": "#e3e2e6",
                    "secondary-fixed-dim": "#9ecaff",
                    "on-primary": "#ffffff",
                    "tertiary-fixed": "#ffddbb",
                    "primary": "#03224d",
                    "on-secondary": "#ffffff",
                    "on-tertiary-fixed": "#2b1700",
                    "secondary-fixed": "#d1e4ff",
                    "surface-container-lowest": "#ffffff",
                    "on-secondary-fixed-variant": "#00497c",
                    "on-tertiary-container": "#cc995f",
                    "on-tertiary": "#ffffff",
                    "primary-container": "#1f3864",
                    "surface-container": "#efedf2",
                    "surface-container-high": "#e9e7ec",
                    "surface-dim": "#dbd9de",
                    "primary-fixed": "#d8e2ff",
                    "on-primary-fixed-variant": "#2e4673",
                    "outline-variant": "#c4c6d0",
                    "inverse-on-surface": "#f2f0f4",
                    "secondary": "#0b61a1",
                    "surface-container-highest": "#e3e2e6",
                    "inverse-primary": "#afc6fb",
                    "on-primary-fixed": "#001a41",
                    "secondary-container": "#7cbaff",
                    "inverse-surface": "#2f3034",
                    "surface-bright": "#faf9fd",
                    "on-error": "#ffffff",
                    "outline": "#747780",
                    "on-surface": "#1a1b1f"
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