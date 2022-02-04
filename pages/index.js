import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Unauthenticated from "../components/Unauthenticated";

export default function Home() {
	const { data: session } = useSession()
	if (!session) return <Unauthenticated />
	else {	
		return (
			<div>
				You must be signed in to get here <br></br>
				<Link href="/api/auth/signout">
					Sign out
				</Link>
			</div>
		)
	}
}