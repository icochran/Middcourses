import {useSession} from "next-auth/client";

export default function SecureItem(display){
  const [session] = useSession();
  


    return (
        <div>
            <p>{(session) ? {display} : "You are not logged in"}</p>
        </div>
    )
}