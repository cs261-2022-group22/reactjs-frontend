import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
			async authorize(credentials) {
				const res = await axios.post("http://localhost:3000/api/checkcredentials", {
					email: credentials.username,
					password: credentials.password,
				})
				if (res.status == 200) {
					if (res.data.authenticated == "True") {
						return {
							id: res.data.id,
							email: credentials.username,
						};
					}
				}
				return null
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
    },
});
