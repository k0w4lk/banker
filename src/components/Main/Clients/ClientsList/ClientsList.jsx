import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { connect } from 'react-redux';

const ClientsList = (props) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Фамилия</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Отчество</TableCell>
            <TableCell>Дата рождения</TableCell>
            <TableCell>Пол</TableCell>
            <TableCell>Идентификационный номер</TableCell>
            <TableCell>Место работы</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Электронная почта</TableCell>
            <TableCell>Адрес</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={11} align="center">
              ПУСТО
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default connect(null, null)(ClientsList);
