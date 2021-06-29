import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import styles from './ClientsList.module.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { showClients } from '../../../../store/reducers/clientsReducer';

const useStyles = makeStyles({
  tableContainer: {
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
    whiteSpace: 'normal',
    wordBreak: 'break-all',
  },
  table: {
    overflow: 'auto',
    width: '100%',
  },
});

const ClientsList = (props) => {
  const classes = useStyles();
  useEffect(() => {
    console.log(1);
    props.showClients();
  }, []);
  const clients = [];
  for (let client in props.clients) {
    clients.push({ client: props.clients[client], id: client });
  }
  console.log(clients);
  return (
    <div className={styles.clientsTableWrapper}>
      <TableContainer className={classes.tableContainer}>
        <Table size="small" stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              ></TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Фамилия
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Имя
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Отчество
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: '150px' }}
              >
                Дата рождения
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: '80px' }}
              >
                Пол
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: '190px' }}
              >
                Идентификационный номер
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Место работы
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Телефон
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Электронная почта
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ minWidth: 'max-content' }}
              >
                Адрес
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!clients.length ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  ПУСТО
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>*</TableCell>
                  <TableCell>{client.client.surname}</TableCell>
                  <TableCell>{client.client.name}</TableCell>
                  <TableCell>{client.client.patronymic}</TableCell>
                  <TableCell>{client.client.birthdate}</TableCell>
                  <TableCell>{client.client.sex}</TableCell>
                  <TableCell>{client.client.id}</TableCell>
                  <TableCell>{client.client.work}</TableCell>
                  <TableCell>{client.client.phone}</TableCell>
                  <TableCell>{client.client.email}</TableCell>
                  <TableCell>{client.client.address}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
});

export default connect(mapStateToProps, { showClients })(ClientsList);
