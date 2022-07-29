import Image from "../node_modules/next/image";
import Link from "../node_modules/next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar({}) {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Feed</button>
          </Link>
        </li>
        {/*user is signed in*/}
        {username && (
          <>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}
        {!username && (
          <>
            <li>
              <Link href="/enter">
                <button className="btn-blue">Log in</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
