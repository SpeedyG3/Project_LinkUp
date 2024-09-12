import { useEffect, useState } from 'react'
import useShowToast from './useShowToast';
import { useParams } from 'react-router-dom';

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {username} = useParams();
  const toast = useShowToast();

  useEffect(() => {
    console.log(`Fetching user profile for: ${username}`);
    const getUser = async () => {
      try {
        const encodedUsername = encodeURIComponent(username);
        console.log(`Encoded username: ${encodedUsername}`);
        const res = await fetch(`/api/users/profile/${encodedUsername}`);
        console.log(`Response status: ${res.status}`);
        const data = await res.json();
        console.log(`Data received:`, data);
  
        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        toast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, toast]);
  

  return {loading, user};
}

export default useGetUserProfile;