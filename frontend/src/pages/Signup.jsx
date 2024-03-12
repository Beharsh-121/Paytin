import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignUpIcon from "../icons/SignUpIcon"
import PasswordInput from "../components/PasswordInput"

export const Signup = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

            <div className="flex  justify-center  items-center first-line:mb-4">
            <Heading label={"Sign up"}/>
          <div className="mt-7 ml-2">
            <SignUpIcon/>
          </div>
          </div>
 

            
            <SubHeading label={"Enter your Info to create an account"} />
            <InputBox onChange={e => {
              setFirstName(e.target.value)
            }} placeholder="Harsh" label={"First Name"}/>
            <InputBox onChange={e => {
              setLastName(e.target.value)
            }} placeholder="Tiwari" label={"Last Name"}/>
            <InputBox onChange={e => {
              setUserName(e.target.value)
            }} placeholder="30harsh.tiwari@gmail.com" label={"Email"}/>
            <PasswordInput onChange={e => {
              setPassword(e.target.value)
            }} placeholder="123456" label={"Password"}/>
            <div>
              <Button onClick={async () => {
                const response = await axios.post("https://paytin.onrender.com/payments/user/signup", {
                  username,
                  password,
                  firstName,
                  lastName
                });
                console.log(response);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                navigate("/dashboard")
              }} label={"Sign up"}/>
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
          </div>
        </div>
};
