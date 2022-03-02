import Link from "next/link";

export default function Unauthenticated() {
    return (
        <div>
            <Link href="/api/auth/signin">You have not logged in.</Link>
        </div>
    );
}
