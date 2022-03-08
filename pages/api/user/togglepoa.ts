import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { MeetingClient } from "utils/rpcClients";

export default async function togglepoa(req: NextApiRequest, res: NextApiResponse) {
	try {
        const meetingClient = new MeetingClient();
        const result = await meetingClient.togglePlansOfActionAsync({
            planid: req.body.planid
        });

        console.log(result);

        res.status(200).json({ successful: result.successful });
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ successful: false });
    }
}