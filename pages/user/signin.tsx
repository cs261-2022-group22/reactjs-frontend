import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Alert, Box, Button, Container, FormControl, Input, InputAdornment, InputLabel } from "@mui/material"
import { getCsrfToken, getSession } from "next-auth/react";
import { GetServerSideProps } from "next"
import React from "react";
import BottomBar from "components/BottomBar";

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
            <Container maxWidth="sm">
                {
                    hasValidSession && <div><Alert severity="info">You have already logged in as &apos;{currentEmail}&apos;</Alert><br /></div>
                }

                {
                    errorReason == "CredentialsSignin" && <div><Alert severity="warning">Wrong email address or password.</Alert><br /></div>
                }

                <form method="post" action="/api/auth/callback/credentials">
                    <Box sx={{ display: 'grid', rowGap: 2 }}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                        <FormControl >
                            <InputLabel htmlFor="login_email" variant='standard' required>Email</InputLabel>
                            <Input id="login_email" type="text" name="email" />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="login_password" variant='standard' required>Password</InputLabel>
                            <Input id="login_password" name="password" type={values.showPassword ? "text" : "password"}
                                endAdornment={<InputAdornment position="end">
                                    <Button aria-label="toggle password visibility"
                                        onClick={() => { setValues({ ...values, showPassword: !values.showPassword, }); }}
                                        onMouseDown={(event) => event.preventDefault()}>
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                </InputAdornment>}
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
