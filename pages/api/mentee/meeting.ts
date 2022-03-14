import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MeetingClient } from 'utils/rpcClients'
import { SchedulingData } from "utils/CommonTypes"
import { ServiceError } from '@grpc/grpc-js'

export default async function schedule(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (session)
        console.log("Received a scheduling attempt from user:")

	if (!session) {
		res.status(403).json({ error: "Not logged in" });
	}

    if (req.method !== "POST") {
        res.status(405).send(`Method ${req.method} not allowed on this API endpoint.`)
        return
    }

    const meetinginfo: SchedulingData = req.body

    const client = new MeetingClient()

    try {
        const result = await client.scheduleMeetingAsync({
            menteeUserId: meetinginfo.menteeID,
            start: new Date(meetinginfo.dateOfMeeting),
            duration: meetinginfo.durationOfMeeting,
            link: meetinginfo.link
        });

        console.log(result);

        res.status(200).json(result)
    } catch (error) {
        const grpcError: ServiceError = error as ServiceError
        console.log(grpcError)
        res.status(503).json({ error: grpcError.message })
    }
}