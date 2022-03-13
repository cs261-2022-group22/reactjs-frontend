import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackClient } from "utils/rpcClients";


export default async function MenteeFeedback(req: NextApiRequest, res: NextApiResponse) {
    try {
		const client = new FeedbackClient();
        const result = await client.CHANGETOTHING({
            mentorUserId: req.body.mentorUserId,
            menteeUserId: req.body.menteeUserId,
            message: req.body.message,
        });
       res.status(200).json({success: result.status});
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(500).json({ status: false });
        res.status(503).json({ status: false });
    }
}