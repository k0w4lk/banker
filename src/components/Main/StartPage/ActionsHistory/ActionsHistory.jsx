import styles from './ActionsHistory.module.scss';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@material-ui/core';
import './../../../../assets/styles/main.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getActionsData } from '../../../../store/reducers/actionsReducer';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';
import Preloader from './../../common/Preloader';
import emptyBox from './../../../../assets/images/empty-box.svg';
import { makeStyles } from '@material-ui/styles';

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
  const actions = [];
  for (let action in props.actions) {
    actions.push(props.actions[action]);
  }
  actions.reverse();
  return (
    <div className={styles.historyWrapper}>
      <h1>История действий</h1>
      {props.actionsLoadingStatus ? (
        <Preloader />
      ) : actions.length ? (
        <TableContainer className={classes.tableContainer}>
          <Table>
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
        <div className="c-empty-container__wrapper">
          <img
            src={emptyBox}
            className="c-empty-container__img"
            alt="empty icon"
          />
          <p className="c-empty-container__text">Действия отсутствуют</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  actions: state.actions.actions,
  actionsLoadingStatus: state.actions.actionsLoadingStatus,
});

export default connect(mapStateToProps, { getActionsData })(ActionsHistory);
