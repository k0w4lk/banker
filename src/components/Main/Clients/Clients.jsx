import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import Dialog from '@material-ui/core/Dialog';
import styles from './Clients.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';
import { useState } from 'react';
import AddClient from './AddClient';
import ClientsList from './ClientsList';
import SearchClient from './SearchClient';
import { connect } from 'react-redux';
import { showClients } from '../../../store/reducers/clientsReducer.js';

const Clients = (props) => {
  const [openAddClient, setOpenAddClient] = useState(false);
  const handleClickOpenAddClient = () => {
    setOpenAddClient(true);
  };
  const handleCloseAddClient = () => {
    setOpenAddClient(false);
  };
  const [openSearchClient, setOpenSearchClient] = useState(false);
  const handleClickOpenSearchClient = () => {
    setOpenSearchClient(true);
  };
  const handleCloseSearchClient = () => {
    setOpenSearchClient(false);
  };
  return (
    <div className={styles.wrapper}>
      <AddNavPanel>
        <button
          title="Найти клиента"
          onClick={handleClickOpenSearchClient}
          className={classNames(styles.searchClientButton, styles.panelButton)}
        ></button>
        <button
          title="Добавить клиента"
          onClick={handleClickOpenAddClient}
          className={classNames(styles.addClientButton, styles.panelButton)}
        ></button>
        {props.isFilter ? (
          <button
            className="c-add-nav-panel__text-button"
            onClick={props.showClients}
          >
            Очистить фильтр
          </button>
        ) : null}
      </AddNavPanel>
      <ClientsList />
      <Dialog open={openAddClient}>
        <AddClient handleCloseAddClient={handleCloseAddClient} />
      </Dialog>
      <Dialog open={openSearchClient}>
        <SearchClient handleCloseSearchClient={handleCloseSearchClient} />
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = (state) => ({
  isFilter: state.clients.isFilter,
});

export default connect(mapDispatchToProps, { showClients })(Clients);
