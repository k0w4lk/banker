import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import './../../../../assets/styles/main.scss';
import styles from './ClientsList.module.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { showClients } from '../../../../store/reducers/clientsReducer';
import Preloader from './../../common/Preloader';
import toClientPage from './../../../../assets/images/to-client-page.svg';
import { NavLink } from 'react-router-dom';
import emptyBox from './../../../../assets/images/empty-box.svg';

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
  const clients = [];
  for (let client in props.clients) {
    clients.push({ client: props.clients[client], id: client });
  }
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
                  <TableRow key={client.id} style={{ height: 'max-content' }}>
                    <TableCell>
                      <NavLink to={`/main/clients/${client.id}/data`}>
                        <img src={toClientPage} alt="user icon" />
                      </NavLink>
                    </TableCell>
                    <TableCell>{client.client.surname}</TableCell>
                    <TableCell>{client.client.name}</TableCell>
                    <TableCell>{client.client.patronymic}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.birthdate.split('-').reverse().join('.')}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.sex}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.id}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.work}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.phone}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {client.client.address}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="c-empty-container__wrapper">
            <img
              src={emptyBox}
              className="c-empty-container__img"
              alt="empty icon"
            />
            <p className="c-empty-container__text">Клиенты отсутствуют</p>
          </div>
        )}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
  isClientsLoading: state.clients.isClientsLoading,
});

export default connect(mapStateToProps, { showClients })(ClientsList);
