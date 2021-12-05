import { NextPage } from "next";
import { Box, Container, TextField, Typography } from "@mui/material";

const Home: NextPage = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                // background: theme.palette.primary.main,
            }}
        >
            <Container
                maxWidth={"xs"}
                sx={{
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography variant={"h4"}>Botsuro Login</Typography>
                    <Box
                        sx={{
                            pt: 2,
                            "& .MuiTextField-root": {
                                width: "100%",
                                "&:first-of-type": {
                                    mb: 2,
                                },
                            },
                        }}
                    >
                        <TextField placeholder={"Email"} />
                        <TextField placeholder={"Password"} type={"password"} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
