import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientsIsFilteredStatus } from "../../../selectors/clientsSelectors";
import { showClients } from "../../../store/reducers/clientsReducer.js";
import AddNavPanelTextButton from "../../common/AddNavPanel/TextButton";
import AddNavPanel from "./../../common/AddNavPanel";
import AddClient from "./AddClient";
import styles from "./Clients.module.scss";
import ClientsList from "./ClientsList";
import SearchClient from "./SearchClient";

const Clients = (props) => {
  const isClientsFiltered = useSelector(getClientsIsFilteredStatus);
  const dispatch = useDispatch();
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
        {isClientsFiltered ? (
          <AddNavPanelTextButton
            text="Очистить фильтр"
            onClick={() => dispatch(showClients())}
          />
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

export default Clients;
