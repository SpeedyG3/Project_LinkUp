import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useShowToast";

const useLogout = () => {
    const setUser= useSetRecoilState(userAtom);
    const toast = useShowToast();

    const logout = async() => {
        try{
            //fetch - req
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
            })
            const data = await res.json();
            // console.log(data);
            if(data.error){
                toast("Error", data.error, "error");
                return;
            }
            localStorage.removeItem("user-threads");
            setUser(null);
        }catch(error){
            // console.log(error);
            toast("Error", error, "error");
        }
    }
    return logout;
}

export default useLogout;