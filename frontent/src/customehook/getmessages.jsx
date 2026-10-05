

import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { setotheruserdata, setselecteduser, setuserdata } from "../redux/userslice";
import { useDispatch, useSelector } from "react-redux";
import {setmessages} from "../redux/messageslice"

const getmessages = () => {
    const dispatch = useDispatch();
    let {userdata, selecteduser}=useSelector(state=>state.user)

    useEffect(() => {
        const fetchmessage = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/message/get/${selecteduser._id}`,
                    {
                        withCredentials: true
                    }
                );

             //   console.log("CURRENT USER:", result.data);

                dispatch(setmessages(result.data));
            } catch (error) {

             //   console.log("CURRENT USER ERROR:", error.response?.data || error);
            }
        };

        fetchmessage();
    }, [selecteduser, userdata]);
};
export default getmessages;