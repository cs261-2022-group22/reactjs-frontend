import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { credentials } from '@grpc/grpc-js';
import { promisify } from 'util';

import { AuthenticateClient, AuthenticateRequest, AuthenticateReply } from "../../../utils/proto/authentication"


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email?",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },

            async authorize(cred, _req) {
                if (cred == undefined) {
                    return null;
                }

                try {
                    const client = new AuthenticateClient('127.0.0.1:50051', credentials.createInsecure());
                    const loginAsync = promisify<AuthenticateRequest, AuthenticateReply>(client.tryLogin).bind(client);
                    let loginResult = await loginAsync({ username: cred.username, password: cred.password });
                    if (!loginResult.status)
                        return null;

                    return {
                        id: loginResult.id,
                        email: cred.username,
                    };
                } catch (error) {
                    return null;

                }
            }

        }),
    ],
    callbacks: {
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
    // secret: process.env["JWT_SECRET"],
    secret: "somerandomshit",
    jwt: {
        // secret: process.env["JWT_SECRET"],
        secret: "some-other-random-shit"
    },
});
