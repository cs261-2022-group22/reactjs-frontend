import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Container, FormControl, Input, InputAdornment, InputLabel } from "@mui/material"
import BottomBar from "components/BottomBar";
import { CtxOrReq } from "next-auth/client/_utils"
import { getCsrfToken } from "next-auth/react"
import React from "react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    return (
		<>
			<Container maxWidth="sm">
				<form method="post" action="/api/auth/callback/credentials">
					<Box sx={{ display: 'grid', rowGap: 2 }}>
						<input name="csrfToken" type="hidden" defaultValue={csrfToken} />

						<FormControl >
							<InputLabel htmlFor="login_username" variant='standard' required>Email</InputLabel>
							<Input id="login_username" type="text" name="username" />
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
			<BottomBar position="fixed"/>
		</>
    )
}

export async function getServerSideProps(context: CtxOrReq) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
