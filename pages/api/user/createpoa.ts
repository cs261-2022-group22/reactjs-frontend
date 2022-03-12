import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { MeetingClient } from "utils/rpcClients";

export default async function CreatePOA(req: NextApiRequest, res: NextApiResponse) {
	try {
        const meetingClient = new MeetingClient();
        const result = await meetingClient.createPlansOfActionAsync({
            menteeUserId: req.body.userid as number,
            plansOfAction: req.body.plansOfAction as string,
        });
        res.status(200).json({
            successful: result.successful,
            plan: result.plansOfAction,
        });
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ successful: false });
    }
}