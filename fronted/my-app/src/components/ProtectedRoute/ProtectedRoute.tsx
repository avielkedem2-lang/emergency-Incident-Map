import { Navigate } from "react-router"


type ChildrenType = {
    children: React.ReactNode
}


export default function ProtectedRoute({ children }: ChildrenType) {
    const token = localStorage.getItem("token")
    if (!token) return (<Navigate to={"/login"}/>)
    return (
        <div>
            {children}
        </div>
    )
}
