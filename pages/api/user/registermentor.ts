import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";

export default async function registermentor(req: NextApiRequest, res: NextApiResponse) {
    try {
		const client = new AccountClient();
        const result = await client.registerMentorAsync({
			userid: req.body.userid,
			desiredSkills: req.body.desiredSkills,
        });

        res.status(200).json({status: result.status});
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ status: false });
    }
}