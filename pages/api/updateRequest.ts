import { NextApiRequest, NextApiResponse } from "next";
import { getRequestModel, withDBConnection } from "@/global-services/db";
import { SongRequest } from "@/global-services/requests";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "PUT") {
        return res.status(405).send("Only PUT allowed");
    }

    const data = req.body as SongRequest;

    await withDBConnection();

    const requests = await getRequestModel();

    let { _id, ...keys } = data;

    Object.keys(keys).forEach((key) => {
        if (key === "stream_date" && keys["stream_date"] !== undefined) {
            keys["stream_date"] = new Date(keys["stream_date"]);
        }
    });

    const test = await requests
        .findOneAndUpdate({ _id }, keys, { strict: false, new: true })
        .exec();

    res.json(test?.errors ? { error: test?.errors } : { data: test?.toJSON() });
}
