import {findAll} from "@/lib/dashboards/repository";
import {toErrorResponse} from "@/lib/errors";

export async function GET() {
    try {
        const dashboards = await findAll();
        return Response.json(dashboards);
    } catch (error) {
        return toErrorResponse(error);
    }
}