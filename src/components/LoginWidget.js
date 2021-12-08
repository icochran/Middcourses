import {
    signIn, 
    signOut,
    useSession
  } from "next-auth/client"
import Button from "react-bootstrap/Button";
  
  export default function LoginWidget() {
    const [ session ] = useSession()
  
    if (session){
  return (<div>
           </div>);
    }else{
      return (<div>
              <Button variant="primary" size="lg" onClick={signIn}>Sign in</Button>
           </div>);
  
    }
  }