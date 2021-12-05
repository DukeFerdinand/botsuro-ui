import { Connection } from "mongoose";
import mongoose from "mongoose";
import { RequestModel } from "@/global-services/db/Request.model";
import { serverSideGate } from "@/global-services/gates";

let connection: Connection | undefined;
export async function withDBConnection() {
    if (!connection) {
        const url = process.env.MONGO_CONNECTION;
        if (!url) {
            throw new Error("[env] Cannot find MONGO_CONNECTION in env!");
        }

        await mongoose.connect(url);
        connection = mongoose.connection;
    }
}

export const getRequestModel = serverSideGate(async () => {
    await withDBConnection();
    return RequestModel;
});
