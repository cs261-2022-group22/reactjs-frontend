import styles from "../styles/Home.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
    console.log(session);
    if (!session) {
        // Unauthenticated
        return (
            <button onClick={() => router.push("/api/auth/signin")}>
                Sign in
            </button>
        );
    }
    return <button onClick={signOut}>Log out</button>;
}
