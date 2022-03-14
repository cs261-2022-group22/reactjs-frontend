import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackClient } from "utils/rpcClients";
import { getSession } from "next-auth/react";

export default async function MenteeFeedback(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (
        !session ||
        (session["id"] as number) !== (req.body.mentorUserId as number)
    ) {
        res.status(403).json({ error: "Not logged in", status: false });
    }
    try {
        const client = new FeedbackClient();
        const result = await client.addFeedbackOnMenteeAsync({
            mentorUserId: req.body.mentorUserId,
            menteeUserId: req.body.menteeUserId,
            rating: req.body.rating,
        });
        res.status(200).json({ success: result.status });
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(500).json({ status: false });
        res.status(503).json({ status: false });
    }
}
