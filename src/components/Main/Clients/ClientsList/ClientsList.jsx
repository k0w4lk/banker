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
    minWidth: '150px',
    // width: '100%',
    // maxWidth: '300px',
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
              <TableCell className={classes.tableCell}></TableCell>
              <TableCell className={classes.tableCell}>Фамилия</TableCell>
              <TableCell className={classes.tableCell}>Имя</TableCell>
              <TableCell className={classes.tableCell}>Отчество</TableCell>
              <TableCell className={classes.tableCell}>Дата рождения</TableCell>
              <TableCell className={classes.tableCell}>Пол</TableCell>
              <TableCell className={classes.tableCell}>
                Идентификационный номер
              </TableCell>
              <TableCell className={classes.tableCell}>Место работы</TableCell>
              <TableCell className={classes.tableCell}>Телефон</TableCell>
              <TableCell className={classes.tableCell}>
                Электронная почта
              </TableCell>
              <TableCell className={classes.tableCell}>Адрес</TableCell>
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
                  <TableCell className={classes.tableCell}>*</TableCell>
                  <TableCell className={classes.tableCell}>
                    {client.client.surname}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {client.client.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {client.client.patronymic}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {client.client.birthdate}
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
