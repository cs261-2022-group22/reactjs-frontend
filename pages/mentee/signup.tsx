import { Box, Chip, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, Typography, Button } from "@mui/material";
import Unauthenticated from "components/Unauthenticated";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AccountClient } from "utils/rpcClients";
// var google_protobuf_timestamp = require("google-protobuf/google/protobuf/timestamp_pb");
// var grpc = require("@grpc/grpc-js");
// var protoLoader = require("@grpc/proto-loader");

// const PROTO_PATH = __dirname + "/../common/account.proto";
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true,
// });
// const Proto = grpc.loadPackageDefinition(packageDefinition).account_package;
// const GRPC_SERVER_ADDRESS = "localhost:50051";

const skills = [
    "Technical",
    "How To Progress Career",
    "Management",
    "Leadership",
    "Healthy Work-Life balance"
];

export default function MenteeSignUp() {
	const { data: session } = useSession();
    if (!session) {
        return <Unauthenticated />;
    }
	const [skillState, setskillState] = useState<string[]>([]);
	const [displayRequired, setDisplayRequired] = useState(false)

    const handleChange = (event: SelectChangeEvent<typeof skillState>) => {
        const {
            target: { value },
        } = event;
        setskillState(
            typeof value === "string" ? value.split(",") : value
        );	
    };
    return (
        <>
            <Container sx={{ textAlign: "center" }}>
                <Stack
                    direction="column"
                >
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
					<Stack sx={{
                        direction: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
						{ displayRequired ? <Typography>Please add at least one skill</Typography> : <></>}
						<Box
							sx={{
								display: "grid",
								rowGap: 2,
								mt: "10vh",
								maxWidth: "20vh",
							}}
						>
							<Button variant="contained" onClick={async () => {
								console.log(skillState)
								if (skillState.length <= 0) {
									setDisplayRequired(true)
								} else {
									console.log("test")
								}
							}}>Register</Button>
							<Button variant="outlined" color="error" href="/">
								Cancel
							</Button>
						</Box>
					</Stack>
                </Stack>
            </Container>
        </>
    );
}