import React from "react";
import {
    Components,
    createTheme,
    PaletteOptions,
    Theme,
    TypographyVariantsOptions,
} from "@mui/material";

import { SFUIText, SFUITextVariant } from "@/themes/fonts";

// Module overrides
// - Allows for custom variants
// - NOTE: for some reason this does
//   not work when placed in "*.d.ts"
// ====================================
declare module "@mui/material/styles" {
    interface TypographyVariants {
        pageTitle: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        pageTitle?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        pageTitle: true;
    }
}

// Theme partials
// - Assemble larger keys for theme
//   here to avoid some clutter
// ====================================
// --raisin-black: #212227ff;
// --slate-gray: #717c89ff;
// --red-crayola: #;
// --cerulean-crayola: #00a7e1ff;
// --white: #ffffffff;

const paletteThemePartial: PaletteOptions = {
    primary: {
        main: "#212227",
    },
    secondary: {
        main: "#ef3054ff",
    },
};

const typographyThemePartial: TypographyVariantsOptions = {
    pageTitle: {
        ...SFUITextVariant.Normal,
        fontSize: "36px",
        fontWeight: 400,
        lineHeight: "42px",
        color: "#50505A",
    },
};

const componentsThemePartial: Components = {
    // This will take the place of a global CSS file
    MuiCssBaseline: {
        styleOverrides: `
        ${SFUIText}
      `,
    },
};

// The full, actual theme
// ====================================
export const createGlobalThemeObject = (): Theme =>
    createTheme({
        palette: paletteThemePartial,
        typography: typographyThemePartial,
        components: componentsThemePartial,
    });
