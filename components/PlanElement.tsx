import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Card, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export declare type PoAData = { id: number; content: string; completed: boolean };

export default function PlanElement({ element }: { element: PoAData }) {
    const [active, setActive] = useState(element.completed);

    async function handleClick() {
        const res = await axios.post("/api/user/togglepoa", {
            planid: element.id
        });
        if (res.data.successful) {
            setActive(!active);
        }
    }

    return (
        <Card
            sx={{
                mb: "2vh",
                pl: "2vh",
                height: "6vh",
                boxShadow: 1,
                "&:hover": { boxShadow: 3, cursor: "pointer" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: !active ? "white" : "#3576CB",
                color: !active ? "black" : "white",
            }}
            onClick={handleClick}
        >
            <Stack direction="row" justifyContent="space-between">
                <Typography
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    {element.content}
                </Typography>
                {active && (<CheckCircleIcon sx={{ color: "white", mr: "10px" }} />)}
            </Stack>
        </Card>
    );
}
