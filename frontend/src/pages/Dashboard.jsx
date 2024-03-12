import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { LogoutButton } from "../components/LogoutButton";
import {  useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    try {
      const getBalance = async () => {
        const response = await fetch(
          "http://localhost:3000/paytin/payments/account/balance",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );
        const data = await response.json();
        setBalance(data.balance)
      };
      const getTransaction = async() => {
        const response = await fetch("http://localhost:3000/paytin/payments/user/transactions", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        const data = await response.json();
        setTransactions(data);
      }
    

      getTransaction();
      getBalance();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const navigate = useNavigate();


   function handleLogout(){
        localStorage.removeItem("token");
        navigate('/signin')
  }

  function handleToggleSidebar() {
    setSidebarCollapsed(!sidebarCollapsed);
  }

  return (
    <div className="flex">
      <Sidebar array={transactions} collapsed={sidebarCollapsed} handleToggle={handleToggleSidebar}/>
      <div className="flex flex-col flex-1">
        <Appbar />
        <div className="flex-1 m-8">
          <Balance value={balance} />
          <Users />
        </div>
        <div>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
        
      </div>
    </div>
  );
}
