import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { credentials } from "@grpc/grpc-js";
import { promisify } from "util";

// This file is generated by calling `npm run build:gen_proto`, if you get an error here, please note.
import { AuthenticateClient, AuthenticateRequest, AuthenticateReply } from "utils/proto/authentication"

const grpc_backend_address: string = process.env["GRPC_BACKEND_ADDRESS"] ?? "127.0.0.1:50051"
const grpc_backend_use_tls: boolean = process.env["GRPC_BACKEND_TLS"] == "true"

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

                // TODO: Can we reuse the client?
                const client = new AuthenticateClient(grpc_backend_address, grpc_backend_use_tls ? credentials.createSsl() : credentials.createInsecure());
                const loginAsync = promisify<AuthenticateRequest, AuthenticateReply>(client.tryLogin).bind(client);
                const loginResult = await loginAsync({
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
