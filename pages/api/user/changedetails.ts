import { ServiceError } from "@grpc/grpc-js";
import { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";
import { ProfileType } from "utils/proto/account";

export default async function registermentee(req: NextApiRequest, res: NextApiResponse) {
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