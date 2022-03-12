import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MeetingClient } from 'utils/rpcClients'
import { CreatingData } from "utils/CommonTypes"
import { ServiceError } from '@grpc/grpc-js'

export default async function create(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (session)
        console.log("Received a creating attempt from user:")

    if (req.method !== "POST") {
        res.status(405).send(`Method ${req.method} not allowed on this API endpoint.`)
        return
    }

    const workshopinfo: CreatingData = req.body

    const client = new MeetingClient()

    try {
        const result = await client.scheduleWorkshopAsync({
            start: new Date(workshopinfo.dateOfWorkshop),
            duration: workshopinfo.durationOfWorkshop,
            link: workshopinfo.link,
            skill: workshopinfo.skill
        });

        console.log(result);

        res.status(200).json(result)
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError
        console.log(grpcError)
        res.status(503).json({ error: grpcError.message })
    }
}