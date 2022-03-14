import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";
import { ProfileType } from "utils/proto/account";
import { getSession } from "next-auth/react";

export default async function ChangeDetails(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });
    if (!session || (session["id"] as number) !== (req.body.userid as number)) {
        res.status(403).json({ error: "Not logged in", success: false });
    }
    try {
		const client = new AccountClient();
        const result = await client.updateProfileDetailsAsync({
			userid: req.body.userid as number,
			profileType: req.body.accountType == 0 ? ProfileType.MENTOR : ProfileType.MENTEE,
			newEmail: req.body.changeEmail ? req.body.newEmail : undefined,
			newBSId: req.body.changeBA ? req.body.newBA : undefined,
			skills: req.body.changeSkills ? req.body.newSkills : [],
        });
        res.status(200).json({success: result.success});
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ success: false });
    }
}