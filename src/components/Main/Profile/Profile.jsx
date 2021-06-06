import { AuthContext } from '../../../context/authContext.js';
import { useContext } from 'react';

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);
  return <button onClick={handleLogout}>ВЫЙТИ</button>;
};

export default Profile;
