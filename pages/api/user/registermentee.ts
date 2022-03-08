import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";

export default async function registermentee(req: NextApiRequest, res: NextApiResponse) {
	console.log("got to api")
	console.log(req, req.body);

    const client = new AccountClient();

    try {
        const result = await client.registerMenteeAsync({
			userid: req.body.userid,
			desiredSkills: req.body.desiredSkills,
        });

        console.log(result);

        res.status(200).json({status: result.status});
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ status: false });
    }
}