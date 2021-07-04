import styles from './ActionsHistory.module.scss';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@material-ui/core';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getActionsData } from '../../../../store/reducers/actionsReducer';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';
import Preloader from './../../common/Preloader';

const ActionsHistory = (props) => {
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
      ) : (
        <TableContainer>
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  actions: state.actions.actions,
  actionsLoadingStatus: state.actions.actionsLoadingStatus,
});

export default connect(mapStateToProps, { getActionsData })(ActionsHistory);
