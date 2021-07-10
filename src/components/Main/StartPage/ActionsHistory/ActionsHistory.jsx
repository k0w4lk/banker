import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { AuthContext } from '../../../../context/authContext';
import { getActionsData } from '../../../../store/reducers/actionsReducer';
import EmptyContainer from '../../../common/EmptyContainer/EmptyContainer';
import './../../../../assets/styles/main.scss';
import Preloader from './../../../common/Preloader';
import styles from './ActionsHistory.module.scss';

const useStyles = makeStyles({
  tableContainer: {
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
});

const ActionsHistory = (props) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    props.getActionsData({ id: user.uid });
  }, []);
  const actions = Object.values(props.actions);
  actions.reverse();
  return (
    <div className={styles.historyWrapper}>
      <h1>История действий</h1>
      {props.actionsLoadingStatus ? (
        <Preloader />
      ) : actions.length ? (
        <TableContainer className={classes.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Время</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actions.map((action, i) => (
                <TableRow key={i}>
                  <TableCell>{action.date}</TableCell>
                  <TableCell>{action.time}</TableCell>
                  <TableCell>{action.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyContainer text="Действия отсутствуют" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  actions: state.actions.actions,
  actionsLoadingStatus: state.actions.actionsLoadingStatus,
});

export default connect(mapStateToProps, { getActionsData })(ActionsHistory);
