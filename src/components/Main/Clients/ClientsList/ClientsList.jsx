import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { showClients } from '../../../../store/reducers/clientsReducer';
import EmptyContainer from '../../../common/EmptyContainer/EmptyContainer';
import toClientPage from './../../../../assets/images/to-client-page.svg';
import './../../../../assets/styles/main.scss';
import Preloader from './../../../common/Preloader';
import styles from './ClientsList.module.scss';

const useStyles = makeStyles({
  tableContainer: {
    border: '1px solid #ccc',
    maxWidth: '100vw',
    height: '100%',
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#C5DEFB',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#60A9E0',
      borderRadius: '5px',
    },
  },
  tableCell: {
    wordBreak: 'unset',
  },
  table: {
    overflow: 'auto',
    width: '100%',
  },
});

const ClientsList = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.showClients();
  }, []);
  const clients = props.isFilter
    ? Object.values(props.filteredClients)
    : Object.values(props.clients);
  console.log(clients);
  if (props.isClientsLoading) {
    return <Preloader />;
  } else {
    return (
      <div className={styles.clientsTableWrapper}>
        {clients.length ? (
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
                {clients.map((client) => (
                  <TableRow
                    key={client.clientDatabaseId}
                    style={{ height: 'max-content' }}
                  >
                    <TableCell>
                      <NavLink
                        to={`/main/clients/${client.clientDatabaseId}/data`}
                      >
                        <img src={toClientPage} alt="user icon" />
                      </NavLink>
                    </TableCell>
                    <TableCell>{client.surname}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.patronymic}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.birthdate.split('-').reverse().join('.')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.sex}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.work}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.address}
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

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
  isClientsLoading: state.clients.isClientsLoading,
  isFilter: state.clients.isFilter,
  filteredClients: state.clients.filteredClients,
});

export default connect(mapStateToProps, { showClients })(ClientsList);
