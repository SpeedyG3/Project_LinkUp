import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const {username} = useParams();
  const toast = useShowToast();
  const [loading, setLoading] = useState(true);

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
      }finally{
        setLoading(false);
      }
    };
    getUser();
  }, [username, toast]);

  if(!user && loading){
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if(!user && !loading) return <h1> User not Found </h1>;

  return (<>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={731} postImg="/post1.png" postTitle="lets talk about threads" />
    <UserPost likes={290} replies={631} postImg="/post2.png" postTitle="Nice tutorial" />
    <UserPost likes={598} replies={423} postImg="/post3.png" postTitle="I love this guy" />
    <UserPost likes={773} replies={712} postTitle="My first thread" />
  </>);
}

export default UserPage;