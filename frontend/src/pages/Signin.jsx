import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import UserIcon from "../icons/UserIcon"
import PasswordInput from "../components/PasswordInput"

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await fetch("http://localhost:3000/paytin/payments/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);  
      localStorage.setItem("username", data.username);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <div className="flex  justify-center  items-center first-line:mb-4">
          <Heading label={"Sign in"} />
          <div className="mt-7 ml-2">
            <UserIcon/>
          </div>
          </div>
          
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="30harsh.tiwari@gmail.com"
            label={"Email"}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div>
            <Button onClick={handleSignin} label={"Sign in"}/>
          </div>
          <BottomWarning 
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
