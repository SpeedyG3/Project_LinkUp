import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const {username} = useParams();
  const toast = useShowToast();

  useEffect(() => {
    const getUser = async() => {
      try{
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if(data.error){
          toast("Error", data.error, "error");
          return;
        };
        setUser(data);
      }catch(error){
        toast("Error", error, "error");
      }
    };
    getUser();
  }, [username, toast]);

  if(!user) return null;

  return (<>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={731} postImg="/post1.png" postTitle="lets talk about threads" />
    <UserPost likes={290} replies={631} postImg="/post2.png" postTitle="Nice tutorial" />
    <UserPost likes={598} replies={423} postImg="/post3.png" postTitle="I love this guy" />
    <UserPost likes={773} replies={712} postTitle="My first thread" />
  </>);
}

export default UserPage;