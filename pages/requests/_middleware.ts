// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(
    req: NextRequest,
    _ev: NextFetchEvent
): Promise<NextResponse> {
    console.log(req.headers);
    return NextResponse.next();
}
