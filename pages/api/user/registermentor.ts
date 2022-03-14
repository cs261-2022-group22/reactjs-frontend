import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";
import { getSession } from "next-auth/react";

export default async function RegisterMentor(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });
    if (!session || (session["id"] as number) !== (req.body.userid as number)) {
        res.status(403).json({ error: "Not logged in", success: false });
    }
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