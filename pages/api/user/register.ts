import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { AccountClient } from "utils/rpcClients";
import { RegistrationData } from "utils/CommonTypes";
import { ServiceError } from "@grpc/grpc-js";

export default async function Register(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (session)
        console.log(
            "Received a registration attempt from user:",
            session.user?.email ?? "<unknown>"
        );

    if (req.method !== "POST") {
        res.status(405).send(
            `Method ${req.method} not allowed on this API endpoint.`
        );
        return;
    }

    const userinfo: RegistrationData = req.body;

    const client = new AccountClient();

    try {
        const result = await client.registerUserAsync({
            name: `${userinfo.firstName} ${userinfo.lastName}`,
            businessAreaId: userinfo.businessArea,
            dateOfBirth: new Date(userinfo.dateOfBirth),
            email: userinfo.email,
            password: userinfo.password,
        });

        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError;
        console.log(grpcError);
        res.status(503).json({ error: grpcError.message });
    }
}
