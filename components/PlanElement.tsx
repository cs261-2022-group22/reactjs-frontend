import { Card, Typography, Stack } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PlanElement({ element }) {
    const [active, setActive] = useState(element[1]);

    function handleClick() {
        setActive(!active);
    }

    console.log(active);
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
                    {element[0]}
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
