import type { NextApiRequest, NextApiResponse } from 'next'

export default function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        res.status(200).json({ "error": "OK" })
        // res.status(200).redirect("/api/auth/signin")
    } else {
        res.status(200).json({ "error": "cannot register" })
    }
}