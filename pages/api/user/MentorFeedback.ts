import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { AccountClient, FeedbackClient } from "utils/rpcClients";
import { ProfileType } from "utils/proto/account";

export default async function MentorFeedback(req: NextApiRequest, res: NextApiResponse) {
    try {
		const client = new FeedbackClient();
        const result = await client.addFeedbackOnMentorAsync({
            mentorUserId: req.body.mentorUserId,
            menteeUserId: req.body.menteeUserId,
            rating: req.body.rating,
	
        });
       res.status(200).json({success: result.status});
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ status: false });
        res.status(500).json({ status: false });
    }
}