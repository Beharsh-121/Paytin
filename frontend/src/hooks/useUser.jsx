import { useEffect, useState } from "react";
import axios from "axios";

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  async function getDetails() {
    try {
      const res = await axios.get(
        "http://localhost:3000/paytin/payments/user/me",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
      setUserDetails(res.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return {
    loading,
    userDetails,
  };
};
