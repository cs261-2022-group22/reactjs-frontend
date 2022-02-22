import type { NextApiRequest, NextApiResponse } from "next";
import { credentials } from "@grpc/grpc-js";
import { promisify } from "util";
import {
    AccountServiceClient,
    ProfilesRequest,
    ProfilesReply,
} from "utils/proto/account";

export default async function ProfileType(req: NextApiRequest, res: NextApiResponse) {
    const client = new AccountServiceClient(
        "127.0.0.1:50051",
        credentials.createInsecure()
    );
    const profileAsync = promisify<ProfilesRequest, ProfilesReply>(
        client.accountProfiles
    ).bind(client);
    const profileResult = await profileAsync({
        userid: req.body.userid
    });
	return res.status(200).send({
		isMentor: profileResult.isMentor,
		isMentee: profileResult.isMentee
	});
}
