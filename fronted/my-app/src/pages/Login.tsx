import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../fetch";



type UserType = {
  email: string,
  password: string
}



export default function Login() {
  const navigate = useNavigate()
  const user = useRef<UserType>({ email: "", password: "" });
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        login(user.current).then((data) => {
          if (data?.data) {
            console.log(data.data.data.data);
            
            localStorage.setItem("token", data.data.data.data)
            return (navigate("/me"))
          } else {
            console.log(data?.message);

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
      <Link to={"/register"}><button>back to register</button></Link>
    </div>
  )
}