import {
    signIn, 
    useSession
  } from "next-auth/client"
import Button from "react-bootstrap/Button";
  
  export default function LoginWidget() {
    const [ session ] = useSession()
    return ( 
      <div>
        {(session) ? <div/> : <div>
              <Button variant="primary" size="lg" onClick={signIn}>Sign in</Button>
           </div>}
      </div>

    );
  }