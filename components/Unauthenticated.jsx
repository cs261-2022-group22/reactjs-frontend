import Link from "next/link";

function Unauthenticated() {
	return (
		<div>
			<Link href="/api/auth/signin">
				You haven&apos;t logged in.
			</Link>
		</div>
	)
}

export default Unauthenticated;
