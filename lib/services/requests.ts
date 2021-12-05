import { IRequest } from "@/global-services/db/Request.model";

export interface RequestsResponse<T> {
    data: T;
    error: string;
}

export type SongRequest = IRequest & { _id: string };

export class RequestsService {
    async getRequests(): Promise<Array<SongRequest>> {
        const res: RequestsResponse<Array<SongRequest>> = await fetch(
            "/api/requests",
            {
                method: "GET",
            }
        ).then((res) => res.json());

        if (res.error) {
            throw new Error(res.error);
        }

        return res.data;
    }

    async updateRequest(newData: Partial<SongRequest>): Promise<boolean> {
        const res: RequestsResponse<boolean> = await fetch(
            "/api/updateRequest",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            }
        ).then((res) => res.json());

        if (res.error) {
            throw new Error(res.error);
        }

        return res.data;
    }
}
