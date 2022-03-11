import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { AccountClient } from "utils/rpcClients";

export default NextAuth({
    pages: {
        signIn: '/user/signin',
        signOut: '/user/signout',
        error: '/user/autherror',
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
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

            async authorize(cred, _req) {
                console.log("User:", cred?.email, "tries to login via", _req.method)
                _req; // unused
                if (cred == undefined) {
                    return null;
                }

                const client = new AccountClient();
                const loginResult = await client.tryLoginAsync({
                    username: cred.email,
                    password: cred.password,
                });
                if (!loginResult.status) return null;

                return {
                    id: loginResult.id,
                    email: cred.email,
                };
            },
        }),
    ],
    callbacks: {
        redirect: async (params: { url: string, baseUrl: string }) => {
            // If baseurl === url (The case when clicking login) -> "/choice"
            // Otherwise (Logging out) -> AsIs
            return params.baseUrl === params.url ? "/choice" : params.url
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token["id"] = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session["id"] = token["id"];
            }
            return session;
        },
    },

    secret: process.env["JWT_SECRET"],
    jwt: {
        secret: process.env["JWT_SECRET"],
    },
});
