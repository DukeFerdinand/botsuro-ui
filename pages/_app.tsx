import type { AppProps } from "next/app";
import Head from "next/head";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { createGlobalThemeObject } from "@/themes/global";
import { createEmotionCache } from "@/themes/createEmotionCache";
import { QueryClient, QueryClientProvider } from "react-query";

interface BotsuroUIAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const globalThemeObject = createGlobalThemeObject();
const clientSideEmotionCache = createEmotionCache();

function BotsuroUIApp(props: BotsuroUIAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    const queryClient = new QueryClient();
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Botsuro Management UI</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>

            <ThemeProvider theme={globalThemeObject}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default BotsuroUIApp;
