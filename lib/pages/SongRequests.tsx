import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, Container, Typography } from "@mui/material";

import { RequestsService } from "@/global-services/requests";
import { SidebarLayout } from "./layouts/SidebarLayout";

export const SongRequests: React.FC = () => {
    const rqService = new RequestsService();

    const { isLoading, data, error } = useQuery(["requests"], async () => {
        return await rqService.getRequests();
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
        console.log(data);
        return data ? data.map((r) => ({ ...r, id: r._id })).reverse() : [];
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
                        mt: 4,
                        mb: 2,
                        flexGrow: 0,
                    }}
                >
                    Song Requests
                </Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                        pb: 5,
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
                            // @ts-ignore
                            const newRow = { ...p.row, [field]: p.value };
                            console.log(newRow);
                            delete newRow.id;

                            await rqService.updateRequest(newRow);
                        }}
                    />
                </Box>
            </Container>
        </SidebarLayout>
    );
};
