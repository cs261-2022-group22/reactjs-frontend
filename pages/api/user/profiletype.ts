import type { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";

export default async function ProfileType(req: NextApiRequest, res: NextApiResponse) {
    const client = new AccountClient();
    const profileResult = await client.listAccountProfilesAsync({
        userid: req.body.userid
    });
    return res.status(200).send({
        isMentor: profileResult.isMentor,
        isMentee: profileResult.isMentee
    });
}
