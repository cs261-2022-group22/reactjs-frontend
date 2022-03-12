import { ServiceError } from "@grpc/grpc-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { MatchingClient } from "utils/rpcClients";

export default async function GetAssignment(req: NextApiRequest, res: NextApiResponse) {
	try {	
		const client = new MatchingClient();
		const matchResult = await client.tryMatchAsync({
			menteeUserId: req.body.menteeUserId,
		});
		return res.status(200).send({
			status: matchResult.status
		});
	} catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ status: false });
    }
}
