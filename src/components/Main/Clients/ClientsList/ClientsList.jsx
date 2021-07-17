import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getClients,
  getClientsIsFilteredStatus,
  getClientsLoadingStatus,
  getFilteredClients,
} from "../../../../selectors/clientsSelectors";
import { showClients } from "../../../../store/reducers/clientsReducer";
import EmptyContainer from "../../../common/EmptyContainer/EmptyContainer";
import toClientPage from "./../../../../assets/images/to-client-page.svg";
import Preloader from "./../../../common/Preloader";
import styles from "./ClientsList.module.scss";

const useStyles = makeStyles({
  tableContainer: {
    border: "1px solid #ccc",
    maxWidth: "100vw",
    height: "100%",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#C5DEFB",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#60A9E0",
      borderRadius: "5px",
    },
  },
  tableCell: {
    wordBreak: "unset",
  },
  table: {
    overflow: "auto",
    width: "100%",
  },
});

const ClientsList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const clients = useSelector(getClients);
  const clientsLoadingStatus = useSelector(getClientsLoadingStatus);
  const filteredClients = useSelector(getFilteredClients);
  const isClientsFiltered = useSelector(getClientsIsFilteredStatus);
  useEffect(() => {
    dispatch(showClients());
  }, []);

  const clientsData = isClientsFiltered ? filteredClients : clients;
  const clientsArr = [];
  for (let client in clientsData) {
    clientsArr.push({ data: clientsData[client], id: client });
  }
  if (clientsLoadingStatus) {
    return <Preloader />;
  } else {
    return (
      <div className={styles.clientsTableWrapper}>
        {clientsArr.length ? (
          <TableContainer className={classes.tableContainer}>
            <Table size="small" stickyHeader className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}></TableCell>
                  <TableCell className={classes.tableCell}>Фамилия</TableCell>
                  <TableCell className={classes.tableCell}>Имя</TableCell>
                  <TableCell className={classes.tableCell}>Отчество</TableCell>
                  <TableCell className={classes.tableCell}>
                    Дата рождения
                  </TableCell>
                  <TableCell className={classes.tableCell}>Пол</TableCell>
                  <TableCell className={classes.tableCell}>
                    Идентификационный номер
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Место работы
                  </TableCell>
                  <TableCell className={classes.tableCell}>Телефон</TableCell>
                  <TableCell className={classes.tableCell}>
                    Электронная почта
                  </TableCell>
                  <TableCell className={classes.tableCell}>Адрес</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientsArr.map((client) => (
                  <TableRow key={client.id} style={{ height: "max-content" }}>
                    <TableCell>
                      <NavLink to={`/main/clients/${client.id}/data`}>
                        <img src={toClientPage} alt="user icon" />
                      </NavLink>
                    </TableCell>
                    <TableCell>{client.data.surname}</TableCell>
                    <TableCell>{client.data.name}</TableCell>
                    <TableCell>{client.data.patronymic}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.birthdate?.split("-").reverse().join(".")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.sex}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.work}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.data.address}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EmptyContainer text="Клиенты отсутствуют" />
        )}
      </div>
    );
  }
};

export default ClientsList;
