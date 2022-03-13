import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MeetingClient } from "utils/rpcClients";

export default async function TogglePOA(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });
    if (!session) {
        res.status(403).json({ error: "Not logged in", success: false });
    }
	try {
        const meetingClient = new MeetingClient();
        const result = await meetingClient.togglePlansOfActionAsync({
            planid: req.body.planid as number
        });

        res.status(200).json({ successful: result.successful });
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ successful: false });
    }
}