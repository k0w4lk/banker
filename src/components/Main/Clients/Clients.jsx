import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import Dialog from '@material-ui/core/Dialog';
import styles from './Clients.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';
import { useState } from 'react';
import AddClient from './AddClient';
import ClientsList from './ClientsList';

const Clients = (props) => {
  const [openAddClient, setOpenAddClient] = useState(false);
  const handleClickOpenAddClient = () => {
    setOpenAddClient(true);
  };
  const handleCloseAddClient = () => {
    setOpenAddClient(false);
  };
  return (
    <div className={styles.wrapper}>
      <AddNavPanel>
        <button
          title="Найти клиента"
          className={classNames(styles.searchClientButton, styles.panelButton)}
        ></button>
        <button
          title="Добавить клиента"
          onClick={handleClickOpenAddClient}
          className={classNames(styles.addClientButton, styles.panelButton)}
        ></button>
      </AddNavPanel>
      <ClientsList />
      <Dialog open={openAddClient}>
        <AddClient handleCloseAddClient={handleCloseAddClient} />
      </Dialog>
    </div>
  );
};

export default Clients;
