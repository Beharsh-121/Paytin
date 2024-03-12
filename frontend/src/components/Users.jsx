import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersIcon from "../icons/UsersIcons"


export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");


    useEffect(() => {

        axios.get("http://localhost:3000/paytin/payments/user/bulk?filter=" + filter, {
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("token")
            }
        })
            .then(response => {
                setUsers(response.data.user)
            }).catch(err => {
                console.log(err)
            })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg flex">
            <span className="mx-1">Users</span>  
            <UsersIcon />
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"></input>
        </div>
        <div>
            {users.map((user , index)=> <User user={user} key={index}/>)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-blue-100 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send ₹"} />
        </div>
    </div>
}