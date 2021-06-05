import firebase from 'firebase';

const Profile = () => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log(res);
      });
  };
  return <button onClick={handleLogout}>ВЫЙТИ</button>;
};

export default Profile;
