import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { me } = useSelector((store) => store.userQuery);
  return (
    <div>
      <h1> USER INFO</h1>

      <h2>{me.username}</h2>
      <h2>{me.email}</h2>
    </div>
  );
};

export default ProfilePage;
