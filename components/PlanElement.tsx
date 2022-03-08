import { Card, Typography, Stack } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

export default function PlanElement({ element }: [number, string, boolean]) {
    const [active, setActive] = useState(element[2]);

    async function handleClick() {
        const res = await axios.post("/api/user/togglepoa", {
            planid: element[0] as number
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
                    {element[1]}
                </Typography>
                {active ? (
                    <CheckCircleIcon sx={{ color: "white", mr: "10px" }} />
                ) : (
                    <></>
                )}
            </Stack>
        </Card>
    );
}
