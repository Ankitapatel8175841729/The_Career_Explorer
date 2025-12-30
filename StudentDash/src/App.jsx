import useAuth from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";

export default function App() {
    const user = useAuth();
    return user ? <Dashboard user={user} /> : <h2>Please Login</h2>;
}