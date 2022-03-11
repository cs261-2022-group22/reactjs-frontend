import { Card, CardMedia, Container, Stack, Typography } from "@mui/material";
import BottomBar from "components/BottomBar";
import LoginButton from "components/LoginButton";
import RegisterButton from "components/RegisterButton";

export default function Tutorial() {
    return (
        <>
            <Container sx={{ textAlign: "center" }}>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                >
                    <Typography sx={{ mt: "5vh", mb: "1vh" }} variant="h3">
                        How to use MentorBank
                    </Typography>
                    <Typography>
                        Initially you will be greeted with the home page which
                        information about the system two large buttons to
                        login/register which look like this:
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="baseline"
                        spacing={3}
                    >
                        <LoginButton />
                        <RegisterButton />
                    </Stack>
                    <Typography>
                        Clicking on either will take you to the respective pages
                    </Typography>
                    <Typography>
                        If you don&apos;t have an account already, use the
                        register page, otherwise sign in on the login page to
                        access the full system
                    </Typography>
                    <Card
                        sx={{
                            maxWidth: "500px",
                            maxHeight: "500px",
                            boxShadow: 1,
                            "&:hover": { boxShadow: 5 },
                        }}
                    >
                        <CardMedia
                            sx={{ maxWidth: "110vh", maxHeight: "110vh" }}
                            component="img"
                            image="/Images/LoginPage.png"
                            alt="Login"
                        />
                    </Card>
                    <Typography>
                        After logging in, you are taken to the choice page where
                        you choose which dashboard you want to be taken to. When
                        you first sign up, you are neither a mentor nor a mentee
                        so must sign up to either or both depending on what you
                        want
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={8}
                    >
                        <Card
                            sx={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                boxShadow: 0,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/Images/MenteeIcon.png"
                                alt="Choice"
                            />
                        </Card>
                        <Card
                            sx={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                boxShadow: 0,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/Images/MentorIcon.png"
                                alt="Choice"
                            />
                        </Card>
                    </Stack>
                    <Typography>
                        Once signed up, you can now access the respective
                        dashboards each with there own features which you can
                        explore and use
                    </Typography>
                    <Typography>
                        The <strong>top left</strong> section contains quick
                        links to relevant pages specifically for the user type
                        you have chosen
                        <br />
                        As a mentee you can access the schedule a meeting; go to
                        their plan of action; or change your details pages.
                        <br />
                        AS a mentor you can go back; create a workshop; or
                        change your details
                    </Typography>
                    <Typography>
                        The <strong>top right</strong> section contains your
                        next (up to) five upcoming appointments including
                        meetings and workshops. Furthermore if the appointment
                        was made with a link, you can click it and it will take
                        you there.
                        <br />
                        As a mentee you can also click the cancel button for
                        meetings to cancel them and your mentor is notified
                    </Typography>
                    <Typography>
                        The <strong>bottom left</strong> section is your
                        notification area where any relevant messages are
                        displayed and sorted in reverse chronological order
                    </Typography>
                    <Typography>
                        The <strong>bottom right</strong> section is where you
                        mentor/mentees are displayed. Here you can also provide
                        feedback
                        <br />
                        As a mentee, your mentor is shown and you can provide
                        feedback on the pairing for future users to improve the
                        algorithm
                        <br />
                        As a mentor, each of your mentees is shown and you can
                        not only provide feedback on the pairing, but also
                        developmental feedback to each mentee
                    </Typography>
                    <Card
                        sx={{
                            maxWidth: "500px",
                            maxHeight: "500px",
                            boxShadow: 1,
                            "&:hover": { boxShadow: 5 },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image="/Images/POAPage.png"
                            alt="POA"
                        />
                    </Card>
                    <Typography>
                        Specifically for mentees, you can also access your plan
                        of action page via the quick links section which looks
                        like the above image.
                        <br />
                        To use it simply type in a milestone description and
                        click add to add it to your plan. Whenever you access
                        this page in the future it will persist until you click
                        it to mark it as complete
                    </Typography>
                    <Typography>
                        Now you have got to grips with the basics of MentorBank,
                        you can explore the other pages which are more intuitive
                        and utilise the system to its best.
                        <br />
                        Below you can click the respective buttons to take you
                        to pages mentioned at the beginning
                        <br />
                        <br />
                        (At the very bottom of this page you will find a
                        feedback button which allows you to send the developers
                        feedback which they can use to improve the site and your
                        experience)
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="baseline"
                        spacing={3}
                    >
                        <LoginButton />
                        <RegisterButton />
                    </Stack>
                    <Card></Card>
                </Stack>
            </Container>
            <BottomBar position="relative" />
        </>
    );
}
