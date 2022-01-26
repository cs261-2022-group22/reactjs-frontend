import Link from "next/link";

function Unauthenticated() {
	return (
		<div>
			<Link href="/api/auth/signin">
				Click here to sign in
			</Link>
		</div>
	)
}

export default Unauthenticated;
