import { NextApiRequest, NextApiResponse } from "next";
import { getRequestModel, withDBConnection } from "@/global-services/db";
import { SongRequest } from "@/global-services/requests";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "DELETE") {
        return res.status(405).send("Only DELETE allowed");
    }

    const { id, ids } = req.body as {
        id?: SongRequest["_id"];
        ids?: Array<SongRequest["_id"]>;
    };

    await withDBConnection();

    const requests = await getRequestModel();

    if (id) {
        const response = await requests.deleteOne({ _id: id }).exec();
        return res.json({ data: { deleted: response.deletedCount } });
    }

    if (ids) {
        const response = await requests
            .deleteMany({ _id: { $in: ids } })
            .exec();
        return res.json({ data: { deleted: response.deletedCount } });
    }

    return res.status(422).json({ error: "Key `id` or `ids` required" });
}
