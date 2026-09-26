
import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { setotheruserdata, setuserdata } from "../redux/userslice";
import { useDispatch } from "react-redux";

const getotherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/user/others`,
                    {
                        withCredentials: true
                    }
                );

             //   console.log("CURRENT USER:", result.data);

                dispatch(setotheruserdata(result.data));
            } catch (error) {

             //   console.log("CURRENT USER ERROR:", error.response?.data || error);
            }
        };

        fetchuser();
    }, [dispatch]);
};
export default getotherUsers;