import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, Container, Typography } from "@mui/material";

import { RequestsService, SongRequest } from "@/global-services/requests";
import { SidebarLayout } from "./layouts/SidebarLayout";

export const SongRequests: React.FC = () => {
    const rqService = new RequestsService();

    const {
        isLoading,
        data,
        error,
        refetch: refetchRequests,
    } = useQuery(["requests"], async () => {
        return await rqService.getRequests();
    });

    const columns: GridColumns = [
        {
            headerName: "Requested By",
            field: "user",
            type: "string",
            width: 150,
        },
        {
            headerName: "Artist",
            field: "artist",
            type: "string",
            width: 250,
        },
        {
            headerName: "Song Title",
            field: "song_title",
            type: "string",
            width: 250,
        },
        {
            headerName: "Ripped",
            field: "ripped",
            type: "boolean",
            editable: true,
        },
        {
            headerName: "Streamed",
            field: "streamed",
            type: "boolean",
            editable: true,
        },
        {
            headerName: "Streamed On",
            field: "stream_date",
            type: "date",
            editable: true,
            width: 150,
        },
        // {
        //     headerName: "Owned",
        //     field: "owned",
        //     type: "boolean",
        //     editable: true,
        // },
        {
            headerName: "Status",
            field: "status",
            type: "singleSelect",
            valueOptions: [
                "Own",
                "Do Not Own",
                "On the Way",
                "Stuck in Transit",
                "Out For Delivery",
                "IDK ????",
                "To Buy",
                "Will not buy",
            ],
            editable: true,
        },
        {
            headerName: "Notes",
            field: "notes",
            type: "string",
            editable: true,
            width: 350,
        },
    ];

    const genRows = () => {
        return data
            ? data
                  .map((r) => ({
                      ...r,
                      id: r._id,
                      stream_date: r.stream_date
                          ? new Date(r.stream_date)
                          : undefined,
                  }))
                  .reverse()
            : [];
    };

    const rows = useMemo(genRows, [data]);

    return (
        <SidebarLayout>
            <Container
                maxWidth={"xl"}
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
                            const field = p.field;

                            const row = rows.findIndex((r) => r.id === p.id);

                            if (row < 0) {
                                console.warn(`[warn] Cannot find row ${p.id}`);
                            } else {
                                const newRow: Partial<SongRequest> = {
                                    _id: p.id as string,
                                    [field]:
                                        p.value instanceof Date
                                            ? p.value.getTime()
                                            : p.value,
                                };

                                await rqService.updateRequest(newRow);
                                await refetchRequests();
                            }
                        }}
                    />
                </Box>
            </Container>
        </SidebarLayout>
    );
};
