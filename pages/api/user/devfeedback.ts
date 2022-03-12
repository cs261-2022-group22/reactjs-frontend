import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackClient } from "utils/rpcClients";

export default async function ChangeDetails(req: NextApiRequest, res: NextApiResponse) {
    try {
		const client = new FeedbackClient();
        const result = await client.FILLINWITHFUNCTIONWHENDONE({
			message: req.body.message,
        });
        res.status(200).json({success: result.success});
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ success: false });
    }
}