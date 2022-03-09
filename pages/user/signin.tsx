import { EmailOutlined, KeyOutlined, PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Container, FormControl, Input, TextField, InputAdornment, InputLabel, Typography, IconButton } from "@mui/material";
import BottomBar from "components/BottomBar";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession } from "next-auth/react";
import React from "react";

type SigninProperty = {
    csrfToken: string;
    hasValidSession: boolean;
    currentEmail: string;
    errorReason: string;
};

export default function SignIn({ csrfToken, hasValidSession, currentEmail, errorReason }: SigninProperty) {
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: "4vh" }}>
                <Typography variant="h5">Sign in with your email and password</Typography>
                <br />
                {
                    hasValidSession && <div><Alert severity="info">You have already logged in as &apos;{currentEmail}&apos;</Alert><br /></div>
                }

                {
                    errorReason == "CredentialsSignin" && <div><Alert severity="warning">Incorrect email address or password.</Alert><br /></div>
                }

                <form method="post" action="/api/auth/callback/credentials">
                    <Box sx={{ display: 'grid', rowGap: 2 }}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                        <FormControl >
                            <TextField label="Email" variant="standard" id="login_email" type="email" name="email"
                                InputProps={{ startAdornment: <EmailOutlined sx={{ marginRight: 1 }} /> }} />
                        </FormControl>

                        <FormControl>
                            <TextField label="Password" variant="standard" name="password" type={values.showPassword ? "text" : "password"}
                                InputProps={{
                                    startAdornment: <KeyOutlined sx={{ marginRight: 1 }} />,
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility"
                                            onClick={() => { setValues({ ...values, showPassword: !values.showPassword, }); }}
                                            onMouseDown={(event) => event.preventDefault()}>
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                        </FormControl>

                        <Button type="submit" variant="contained">Sign In</Button>
                        <Button href="/">Go back</Button>
                    </Box>
                </form>
            </Container>
            <BottomBar position="fixed" />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        console.log(session)
    }

    return {
        props: {
            csrfToken: await getCsrfToken(context) ?? "",
            errorReason: context.query["error"] ?? "",
            hasValidSession: !!session && !context.query["error"],
            currentEmail: session?.user?.email ?? "",
        }
    }
}
