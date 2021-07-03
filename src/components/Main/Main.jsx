import { Route } from 'react-router';
import Navigation from './Navigation';
import Profile from './Profile';
import styles from './Main.module.scss';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import Preloader from './common/Preloader/Preloader';
import Clients from './Clients';
import StartPage from './StartPage';
import ClientPage from './Clients/ClientPage';

const Main = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <div className={styles.main__wrapper}>
      <Navigation />
      <Route exact path="/main" render={() => <StartPage />} />
      <Route exact path="/main/profile" render={() => <Profile />} />
      <Route exact path="/main/clients" render={() => <Clients />} />
      <Route
        path="/main/clients/:clientId/data"
        render={() => <ClientPage />}
      />
    </div>
  ) : (
    <Preloader />
  );
};

export default Main;
