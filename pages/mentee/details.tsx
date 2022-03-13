import {
    Container,
    Stack,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Box,
    Chip,
    OutlinedInput,
    SelectChangeEvent,
    Alert,
    Link,
} from "@mui/material";
import axios from "axios";
import Unauthenticated from "components/Unauthenticated";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AccountClient } from "utils/rpcClients";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BAResult, SkillResult } from "utils/CommonTypes";

export default function MenteeDetails(props: {
    businessAreas: BAResult[];
    skills: SkillResult[];
}) {
    const [emailToggle, setEmailToggle] = useState(false);
    const [emailInput, setEmailInput] = useState("");

    const [baToggle, setBAToggle] = useState(false);
    const [ba, setBA] = useState("");

    const [skillToggle, setSkillToggle] = useState(false);
    const [skillState, setskillState] = useState<string[]>([]);

    const [status, setStatus] = useState("normal");

    const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />;
    }

    let i = 0;

    const handleChange = (event: SelectChangeEvent<typeof skillState>) => {
        const {
            target: { value },
        } = event;
        setskillState(typeof value === "string" ? value.split(",") : value);
    };

    const convertBA = (baString: string) => {
        for (let i = 0; i < props.businessAreas.length; i++) {
            if (props.businessAreas[i].name == baString) {
                return props.businessAreas[i].id;
            }
        }
        return -1;
    };

    const convertSkills = (skillStrings: string[]) => {
        const skillIDs: number[] = [];
        skillStrings.forEach((skillString) => {
            for (let i = 0; i < props.skills.length; i++) {
                if (props.skills[i].name == skillString) {
                    skillIDs.push(props.skills[i].id);
                    continue;
                }
            }
        });
        return skillIDs;
    };

    const businessAreas: (string | number)[][] = [];
    props.businessAreas.forEach((ba) => {
        businessAreas.push([ba.id, ba.name]);
    });

    const skills: (string | number)[][] = [];
    props.skills.forEach((skill) => {
        skills.push([skill.id, skill.name]);
    });

    if (status == "normal") {
        return (
            <>
                <Container sx={{ textAlign: "center" }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography sx={{ mt: "5vh", mb: "5vh" }} variant="h3">
                            Change your details
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={emailToggle}
                                            onChange={() =>
                                                setEmailToggle(!emailToggle)
                                            }
                                        />
                                    }
                                    label={
                                        emailToggle
                                            ? "Change my email to:"
                                            : "Don't change my email"
                                    }
                                    sx={{
                                        minWidth: "40vh",
                                        maxWidth: "40vh",
                                    }}
                                ></FormControlLabel>
                            </FormGroup>

                            <TextField
                                label="New Email"
                                value={emailInput}
                                onChange={(e) => {
                                    setEmailInput(e.target.value);
                                }}
                                disabled={!emailToggle}
                                sx={{
                                    minWidth: "50vh",
                                    maxWidth: "50vh",
                                }}
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={baToggle}
                                            onChange={() =>
                                                setBAToggle(!baToggle)
                                            }
                                        />
                                    }
                                    label={
                                        baToggle
                                            ? "Change my Business area to:"
                                            : "Don't change my business area"
                                    }
                                    sx={{
                                        minWidth: "40vh",
                                        maxWidth: "40vh",
                                    }}
                                ></FormControlLabel>
                            </FormGroup>
                            <FormControl fullWidth>
                                <InputLabel>Business Area</InputLabel>
                                <Select
                                    value={ba}
                                    label="Business Area"
                                    onChange={(e) => {
                                        setBA(e.target.value as string);
                                    }}
                                    sx={{
                                        minWidth: "50vh",
                                        maxWidth: "50vh",
                                    }}
                                    disabled={!baToggle}
                                >
                                    {businessAreas.map((ba) => {
                                        return (
                                            <MenuItem key={i++} value={ba[1]}>
                                                {ba[1]}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={skillToggle}
                                            onChange={() =>
                                                setSkillToggle(!skillToggle)
                                            }
                                        />
                                    }
                                    label={
                                        skillToggle
                                            ? "Change my skills to:"
                                            : "Don't change my skills"
                                    }
                                    sx={{
                                        minWidth: "40vh",
                                        maxWidth: "40vh",
                                    }}
                                ></FormControlLabel>
                            </FormGroup>
                            <FormControl>
                                <InputLabel>Skill</InputLabel>
                                <Select
                                    multiple
                                    value={skillState}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Skill" />}
                                    sx={{
                                        minWidth: "50vh",
                                        maxWidth: "50vh",
                                    }}
                                    disabled={!skillToggle}
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {skills.map((skill) => (
                                        <MenuItem key={i++} value={skill[1]}>
                                            {skill[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            mt: "8vh",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={async () => {
                                const res = await axios.post(
                                    "/api/user/changedetails",
                                    {
                                        userid: session["id"] as number,
                                        accountType: 1,
                                        changeEmail: emailToggle,
                                        newEmail: emailInput,
                                        changeBA: baToggle,
                                        newBA: convertBA(ba),
                                        changeSkills: skillToggle,
                                        newSkills: convertSkills(skillState),
                                    }
                                );
                                if (res.data.success) {
                                    setStatus("success");
                                } else {
                                    setStatus("false");
                                }
                            }}
                        >
                            Register
                        </Button>
                        <Button variant="outlined" color="error" href="/">
                            Cancel
                        </Button>
                    </Stack>
                </Container>
            </>
        );
    } else if (status == "false") {
        return (
            <Container sx={{ textAlign: "center" }}>
                <Alert severity="warning" sx={{ mt: "3vh", mb: "3vh" }}>
                    An error has occurred, please try again
                </Alert>
                <Link href="/mentee/details">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<RefreshIcon />}
                    >
                        Try again
                    </Button>
                </Link>
            </Container>
        );
    } else {
        return (
            <Container sx={{ textAlign: "center" }}>
                <Alert severity="info" sx={{ mt: "3vh", mb: "3vh" }}>
                    You have successfully changed your details
                </Alert>
                <Link href="/mentee/dashboard">
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
    const businessAreasResult = await accountClient.listBusinessAreasAsync({});
    const skillsResult = await accountClient.listSkillsAsync({});
    return {
        props: {
            businessAreas: businessAreasResult.businessAreas,
            skills: skillsResult.skills,
        },
    };
}
