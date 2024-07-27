import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (<>
    <UserHeader />
    <UserPost likes={1200} replies={731} postImg="/post1.png" postTitle="lets talk about threads" />
    <UserPost likes={290} replies={631} postImg="/post2.png" postTitle="Nice tutorial" />
    <UserPost likes={598} replies={423} postImg="/post3.png" postTitle="I love this guy" />
    <UserPost likes={773} replies={712} postTitle="My first thread" />
  </>);
}

export default UserPage;