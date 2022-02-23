import Link from "next/link";

function Unauthenticated() {
    return (
        <div>
            <Link href="/api/auth/signin">You have not logged in.</Link>
        </div>
    );
}

export default Unauthenticated;
