import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { MeetingClient } from "utils/rpcClients";

export default async function createpoa(req: NextApiRequest, res: NextApiResponse) {
	try {
		console.log("here")
        const meetingClient = new MeetingClient();
        const result = await meetingClient.createPlansOfActionAsync({
            menteeUserId: req.body.userid,
            plansOfAction: req.body.plansOfAction,
        });

        console.log(result);

        res.status(200).json({ successful: result.successful, plan: result.plansOfAction  });
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ successful: false });
    }
}