import { Navigate, useNavigate } from "react-router"
import { isToken } from "../../fetch";


type ChildrenType = {
    children: React.ReactNode
}


export default function ProtectedRoute({ children }: ChildrenType) {
    const token = localStorage.getItem("token")
    if (!token) return (<Navigate to={"/login"} />);
    const navigate = useNavigate()
    isToken(token).then((data) => {
        if (data?.message) {
            return navigate("/login")
        }
    })
    return (
        <div>
            {children}
        </div>
    )
}
