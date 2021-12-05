import { NextApiRequest, NextApiResponse } from "next";
import { getRequestModel, withDBConnection } from "@/global-services/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await withDBConnection();
    const request = await getRequestModel();
    const requests = await request.find();

    return res.json({ data: requests.map((v) => v.toJSON()) });
}
