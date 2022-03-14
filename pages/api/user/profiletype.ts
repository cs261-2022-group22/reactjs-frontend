import type { NextApiRequest, NextApiResponse } from "next";
import { AccountClient } from "utils/rpcClients";
import { getSession } from "next-auth/react";

export default async function ProfileType(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (!session) {
        res.status(403).json({ error: "Not logged in" });
        return;
    }
    const client = new AccountClient();
    const profileResult = await client.listAccountProfilesAsync({
        userid: req.body.userid,
    });
    return res.status(200).send({
        isMentor: profileResult.isMentor,
        isMentee: profileResult.isMentee,
    });
}
