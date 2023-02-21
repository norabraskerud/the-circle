import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_API, PROFILES_PATH } from "../../constants/api";

const getToken = window.localStorage.getItem("token");

export function Unfollow({ children, type, onClick }) {
  let { name } = useParams();
  const url = BASE_API + PROFILES_PATH + name + `/unfollow`;

  async function Follow() {
    const putData = async () => {
      const response = await axios({
        method: "put",
        url: url,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
      window.location.reload(true);
    };
    putData();
  }

  return (
    <button
      type={type ? type : "button"}
      className="btn"
      onClick={onClick ? onClick : Follow}
    >
      {children}
    </button>
  );
}
