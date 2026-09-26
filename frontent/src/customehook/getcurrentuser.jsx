import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { setuserdata } from "../redux/userslice";
import { useDispatch } from "react-redux";

const getcurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/user/current`,
                    {
                        withCredentials: true
                    }
                );

             //   console.log("CURRENT USER:", result.data);

                dispatch(setuserdata(result.data));
            } catch (error) {

             //   console.log("CURRENT USER ERROR:", error.response?.data || error);
            }
        };

        fetchuser();
    }, [dispatch]);
};

export default getcurrentUser;