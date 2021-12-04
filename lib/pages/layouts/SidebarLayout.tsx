import React, { useState } from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { HEIGHTS, WIDTHS } from "@/themes/constants";

const DrawerHeader: React.FC<{
    toggle: (b: boolean) => unknown;
    open: boolean;
}> = ({ toggle, open: boolean }) => {
    return (
        <Toolbar
            sx={{
                height: `${HEIGHTS.AppBar}px`,
                display: "flex",
                justifyContent: "flex-end",
            }}
        >
            <Typography variant={"h6"}>Close Menu</Typography>
            <IconButton
                color={"inherit"}
                edge={"end"}
                onClick={() => toggle(!open)}
            >
                <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
    );
};

export const SidebarLayout: React.FC = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
            }}
        >
            <CssBaseline />
            <AppBar
                position={"fixed"}
                sx={
                    sidebarOpen
                        ? {
                              width: `calc(100% - ${WIDTHS.SIDEBAR}px)`,
                          }
                        : undefined
                }
            >
                <Toolbar sx={{ height: `${HEIGHTS.AppBar}px` }}>
                    <IconButton
                        color={"inherit"}
                        edge={"start"}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        sx={{
                            mr: 2,
                            ...(sidebarOpen ? { display: "none" } : {}),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={"h6"}>Botsuro Management</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={"persistent"}
                open={sidebarOpen}
                sx={{
                    height: "100vh",
                    width: `${WIDTHS.SIDEBAR}px`,
                    "& .MuiDrawer-paper": {
                        width: WIDTHS.SIDEBAR,
                        boxSizing: "border-box",
                    },
                }}
            >
                <DrawerHeader toggle={setSidebarOpen} open={sidebarOpen} />
                <Divider />
            </Drawer>
            <Box
                component={"main"}
                sx={{
                    height: `calc(100% - ${HEIGHTS.AppBar}px)`,
                    overflow: "scroll",
                    flexGrow: 1,
                    mt: `${HEIGHTS.AppBar}px`,
                    ...(!sidebarOpen
                        ? {
                              ml: `-${WIDTHS.SIDEBAR}px`,
                          }
                        : {}),
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
