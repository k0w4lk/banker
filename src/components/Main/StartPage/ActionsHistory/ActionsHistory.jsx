import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../../context/authContext";
import {
  getActions,
  getActionsLoadingStatus,
} from "../../../../selectors/actionsSelectors";
import { getActionsData } from "../../../../store/reducers/actionsReducer";
import EmptyContainer from "../../../common/EmptyContainer/EmptyContainer";
import Preloader from "./../../../common/Preloader";
import styles from "./ActionsHistory.module.scss";

const useStyles = makeStyles({
  tableContainer: {
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
});

const ActionsHistory = (props) => {
  const dispatch = useDispatch();
  const actions = useSelector(getActions);
  const actionsLoadingStatus = useSelector(getActionsLoadingStatus);
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    dispatch(getActionsData({ id: user.uid }));
  }, []);
  const actionsArr = Object.values(actions);
  actionsArr.reverse();
  return (
    <div className={styles.historyWrapper}>
      <h1>История действий</h1>
      {actionsLoadingStatus ? (
        <Preloader />
      ) : actionsArr.length ? (
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
              {actionsArr.map((action, i) => (
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

export default ActionsHistory;
