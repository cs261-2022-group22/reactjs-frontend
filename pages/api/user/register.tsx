import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { AccountClient } from 'utils/rpcClients'
import { RegistrationData } from "utils/CommonTypes"



export default async function register(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (session)
        console.log("Received a registration attempt from user:", session.user?.email ?? "<unknown>")

    if (req.method !== "POST") {
        res.status(405).send(`Method ${req.method} not allowed on this API endpoint.`)
        return
    }

    const userinfo: RegistrationData = req.body

    res.status(200).json({ "error": "OK" })
}