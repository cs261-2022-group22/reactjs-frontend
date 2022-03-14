import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackClient } from "utils/rpcClients";
import { getSession } from "next-auth/react";

export default async function developmentfeedback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (
        !session ||
        (session["id"] as number) !== (req.body.mentorUserId as number)
    ) {
        res.status(403).json({ error: "Not logged in", success: false });
    }
    try {
        const client = new FeedbackClient();
        const result = await client.addProgFeedbackAsync({
            mentorUserId: req.body.mentorUserId,
            menteeUserId: req.body.menteeUserId,
            content: req.body.message,
        });
        res.status(200).json({ success: result.status });
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ success: false });
    }
}
