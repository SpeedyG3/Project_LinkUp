import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const {username} = useParams();
  const toast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

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

    const getPosts = async() => {
      setFetchingPosts(true);
      try{
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      }catch(error){
        toast("Error", error.message, "error");
        setPosts([]);
      }finally{
        setFetchingPosts(false);
      }
    };

    getUser();
    getPosts();
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
    {!fetchingPosts && posts.length===0 && <h1> User hasn't posted! </h1>}
    {fetchingPosts && (
      <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"} />
      </Flex>
    )}

    {posts.map((post) => (
      <Post key={post._id} post={post} postedBy={post.postedBy}/>
    ))}
  </>);
}

export default UserPage;