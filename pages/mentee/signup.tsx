import {
    Box,
    Chip,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    Button,
	Link
} from "@mui/material";
import axios from "axios";
import Unauthenticated from "components/Unauthenticated";
import { useSession } from "next-auth/react";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const skills = [
    "Technical",
    "How To Progress Career",
    "Management",
    "Leadership",
    "Healthy Work-Life balance",
];

export default function MenteeSignUp() {
    const [skillState, setskillState] = useState<string[]>([]);
    const [displayRequired, setDisplayRequired] = useState(false);
	// 3 status': normal, false, success
	const [status, setStatus] = useState("normal")
    const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />;
    }

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
							Mentee Registration
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
									maxWidth: "20vh",
								}}
							>
								<Button
									variant="contained"
									onClick={async () => {
										console.log(skillState);
										if (skillState.length <= 0) {
											setDisplayRequired(true);
										} else {
											const res = await axios.post("/api/user/registermentee", {
												userid: session["id"] as number,
												desiredSkills: skillState
											})
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
								<Button variant="outlined" color="error" href="/">
									Cancel
								</Button>
							</Box>
						</Stack>
					</Stack>
				</Container>
			</>
		);
	} else if (status == "false") {
		<Container sx={{ textAlign: "center" }}>
            <Link href="/mentee/signup">
                <Typography variant="h3">
                    An error has occurred, please try again (You may already
                    have an acccount)
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<RefreshIcon />}
                >
                    Try again
                </Button>
            </Link>
        </Container>;
	} else {
		<Container sx={{ textAlign: "center" }}>
            <Link href="/mentee/dashboard">
                <Typography variant="h3">
                    You have successfully signed up. Click below to take you to
                    the dashboard
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<ArrowForwardIcon />}
                >
                    Go to dashboard
                </Button>
            </Link>
        </Container>;
	}
}
