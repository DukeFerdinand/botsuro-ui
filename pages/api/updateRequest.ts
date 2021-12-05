import { NextApiRequest, NextApiResponse } from "next";
import { getRequestModel, withDBConnection } from "@/global-services/db";
import { SongRequest } from "@/global-services/requests";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).send("Only POST allowed");
    }

    const data = req.body as SongRequest;

    await withDBConnection();

    const requests = await getRequestModel();
    await requests.findByIdAndUpdate(data._id, {
        $set: {
            ...data,
        },
    });

    return res.json({ data: true });
}
