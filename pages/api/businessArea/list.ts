import { NextApiRequest, NextApiResponse } from "next";
import { ListBusinessAreasReply } from "utils/proto/account";
import { AccountClient } from "utils/rpcClients";

export default async function ListBusinessAreas(req: NextApiRequest, res: NextApiResponse) {
    req;

    let areas: ListBusinessAreasReply = { businessAreas: [] }

    try {
        areas = await new AccountClient().listBusinessAreasAsync({})
    } catch (error) {
        console.log(error)
        areas.businessAreas = [
            { id: 0, name: "test0" },
            { id: 1, name: "Hi" },
            { id: 2, name: "test2" },
        ];
    }
    res.status(200).json(areas)
}