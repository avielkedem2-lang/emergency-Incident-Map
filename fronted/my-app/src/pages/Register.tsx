import { useRef, useState } from "react"
import { register } from "../fetch"
import { useNavigate } from "react-router"


type UserType = {
  email: string,
  password: string
}


export default function Register() {
  const navigate = useNavigate()
  const user = useRef<UserType>({ email: "", password: "" });
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        register(user.current).then((data) => {
          if (data?.data) {
            return (navigate("/login"))
          } else {
            setIsError(true);
            setError(data?.message.message)
          }

        })
      }}>
        <input type="email" placeholder="Enter your email" onChange={(e) => user.current = { ...user.current, email: e.target.value }} />
        <input type="password" placeholder="**********" onChange={(e) => user.current = { ...user.current, password: e.target.value }} />
        <button type="submit">submit</button>
        <br />
        {isError && (
          <p>{error}</p>
        )}
      </form>
    </div>
  )
}
