import {getPool} from "@/lib/db";
import {toErrorResponse} from "@/lib/errors";

export async function GET() {
    try {
        await getPool().query('SELECT 1')
        return Response.json({status: "ok"});
    } catch (error) {
        return toErrorResponse(error);
    }
}