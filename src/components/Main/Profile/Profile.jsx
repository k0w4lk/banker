import firebase from 'firebase';

const Profile = () => {
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  return <button onClick={handleLogout}>ВЫЙТИ</button>;
};

export default Profile;
