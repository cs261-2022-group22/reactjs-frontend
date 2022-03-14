import {
    ArrowForward as ArrowForwardIcon,
    Refresh as RefreshIcon
} from "@mui/icons-material";
import {
    Alert, Box, Button, Chip, Container, FormControl,
    InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack,
    Typography, Link as RefreshLink
} from "@mui/material";
import axios from "axios";
import Unauthenticated from "components/Unauthenticated";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SkillResult } from "utils/CommonTypes";
import { AccountClient } from "utils/rpcClients";

export default function MentorSignUp(props: { skills: SkillResult[] }) {
    const [skillState, setskillState] = useState<string[]>([]);
    const [displayRequired, setDisplayRequired] = useState(false);
    // 3 status': normal, false, success
    const [status, setStatus] = useState("normal");
    const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />;
    }

    const skills: string[] = [];
    props.skills.forEach((skill) => {
        skills.push(skill.name);
    });

    const handleChange = (event: SelectChangeEvent<typeof skillState>) => {
        const {
            target: { value },
        } = event;
        setskillState(typeof value === "string" ? value.split(",") : value);
    };
    if (status == "normal") {
        return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Stack direction="column">
                        <Typography sx={{ mt: "5vh", mb: "5vh" }} variant="h3">
                            Mentor Registration
                        </Typography>
                        <FormControl>
                            <InputLabel>Skill</InputLabel>
                            <Select
                                multiple
                                value={skillState}
                                onChange={handleChange}
                                input={<OutlinedInput label="Skill" />}
                                sx={{
                                    minHeight: "8vh",
                                }}
                                renderValue={(selected) => (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5,
                                        }}
                                    >
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {skills.map((skill) => (
                                    <MenuItem key={skill} value={skill}>
                                        {skill}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack
                            sx={{
                                direction: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {displayRequired ? (
                                <Typography>
                                    Please add at least one skill
                                </Typography>
                            ) : (
                                <></>
                            )}
                            <Box
                                sx={{
                                    display: "grid",
                                    rowGap: 2,
                                    mt: "10vh",
                                    maxWidth: "20vw",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={async () => {
                                        if (skillState.length <= 0) {
                                            setDisplayRequired(true);
                                        } else {
                                            const res = await axios.post(
                                                "/api/user/registermentor",
                                                {
                                                    userid: session[
                                                        "id"
                                                    ] as number,
                                                    desiredSkills: skillState,
                                                }
                                            );
                                            if (res.data.status) {
                                                setStatus("success");
                                            } else {
                                                setStatus("false");
                                            }
                                        }
                                    }}
                                >
                                    Register
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    href="/"
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Container>
            </>
        );
    } else if (status == "false") {
        return (
            <Container sx={{ textAlign: "center" }}>
                <Alert severity="warning" sx={{ mt: "3vh", mb: "3vh" }}>
                    An error has occurred, please try again (You may already
                    have an account)
                </Alert>
                <RefreshLink href="/mentor/signup">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<RefreshIcon />}
                    >
                        Try again
                    </Button>
                </RefreshLink>
            </Container>
        );
    } else {
        return (
            <Container sx={{ textAlign: "center" }}>
                <Alert severity="info" sx={{ mt: "3vh", mb: "3vh" }}>
                    You have successfully signed up. Click below to take you to
                    the dashboard
                </Alert>
                <Link href="/mentor/dashboard" passHref>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ArrowForwardIcon />}
                    >
                        Go to dashboard
                    </Button>
                </Link>
            </Container>
        );
    }
}

export async function getServerSideProps() {
    const accountClient = new AccountClient();
    const skillsResult = await accountClient.listSkillsAsync({});
    return {
        props: {
            skills: skillsResult.skills,
        },
    };
}
