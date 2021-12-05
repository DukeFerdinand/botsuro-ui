import type { NextPage } from "next";

import { Box, Container, Typography } from "@mui/material";
import { SidebarLayout } from "../lib/pages/layouts/SidebarLayout";
import { useQuery } from "react-query";
import { IRequest } from "@/global-services/db/Request.model";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { useMemo } from "react";

const Home: NextPage = () => {
    const { isLoading, data, error } = useQuery<{
        data: Array<IRequest & { _id: string }>;
    }>(["requests"], async () => {
        return await fetch("/api/requests", {
            method: "GET",
        }).then((res) => res.json());
    });

    const columns: GridColumns = [
        {
            field: "user",
            type: "string",
            width: 150,
        },
        {
            field: "artist",
            type: "string",
            width: 250,
        },
        {
            field: "song_title",
            type: "string",
            width: 250,
        },
        {
            field: "ripped",
            type: "boolean",
            editable: true,
        },
        {
            field: "streamed",
            type: "boolean",
            editable: true,
        },
    ];

    const genRows = () => {
        return data
            ? data.data.map((r) => ({ ...r, id: r._id })).reverse()
            : [];
    };

    const rows = useMemo(genRows, [data]);

    return (
        <SidebarLayout>
            <Container
                component={"main"}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    variant={"h4"}
                    sx={{
                        my: 2,
                        flexGrow: 0,
                    }}
                >
                    Song Requests
                </Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    {error && <Typography>{JSON.stringify(error)}</Typography>}
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        loading={isLoading}
                        onCellEditCommit={async (p) => {
                            console.log(p);
                            const field = p.field;
                            const newRow = { ...p.row, [field]: p.value };
                            console.log(newRow);
                        }}
                    />
                </Box>
            </Container>
        </SidebarLayout>
    );
};

export default Home;
