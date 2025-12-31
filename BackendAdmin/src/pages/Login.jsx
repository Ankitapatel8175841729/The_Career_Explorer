import { signInWIthPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWIthPopup(auth, provider);
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <button onClick={login}>Login with Google</button>
        </div>
    )
}