import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import Dialog from '@material-ui/core/Dialog';
import styles from './Clients.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Formik } from 'formik';
import { addClient } from '../../../store/reducers/clientsReducer.js';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';

const MAX_NAME_LENGTH = 25;
const MAX_SURNAME_LENGTH = 25;
const MAX_PATRONYMIC_LENGTH = 25;
const REQUIRED_ERROR = 'Поле обязательно';

const Clients = (props) => {
  const [openAddClient, setOpenAddClient] = useState(false);
  const handleClickOpenAddClient = () => {
    setOpenAddClient(true);
  };
  const handleCloseAddClient = () => {
    setOpenAddClient(false);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className={styles.wrapper}>
      <AddNavPanel>
        <button
          className={classNames(styles.searchClientButton, styles.panelButton)}
        ></button>
        <button
          onClick={handleClickOpenAddClient}
          className={classNames(styles.addClientButton, styles.panelButton)}
        ></button>
      </AddNavPanel>
      <div>
        <Dialog open={openAddClient}>
          <Formik
            initialValues={{
              name: '',
              surname: '',
              patronymic: '',
              birthdate: '',
              sex: '',
              work: '',
              id: '',
              phone: '',
              email: '',
              address: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(
                  MAX_NAME_LENGTH,
                  `Имя должно иметь не более ${MAX_NAME_LENGTH} символов`
                )
                .matches(
                  /^[А-Яа-я]+$/,
                  'Имя должно содержать только символы кириллического алфавита'
                )
                .required(REQUIRED_ERROR),
              surname: Yup.string()
                .max(
                  MAX_NAME_LENGTH,
                  `Фамилия должна иметь не более ${MAX_SURNAME_LENGTH} символов`
                )
                .matches(
                  /^[А-Яа-я]+$/,
                  'Фамилия должно содержать только символы кириллического алфавита'
                )
                .required(REQUIRED_ERROR),
              patronymic: Yup.string()
                .max(
                  MAX_PATRONYMIC_LENGTH,
                  `Отчество должно иметь не более ${MAX_PATRONYMIC_LENGTH} символов`
                )
                .matches(
                  /^[А-Яа-я]+$/,
                  'Отчество должно содержать только символы кириллического алфавита'
                )
                .required(REQUIRED_ERROR),
            })}
            onSubmit={(values) => {
              props.addClient({
                name: values.name,
                surname: values.surname,
                patronymic: values.patronymic,
                birthdate: values.birthdate,
                sex: values.sex,
                work: values.work,
                id: values.id,
                phone: values.phone,
                email: values.email,
                address: values.address,
              });
            }}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                className={styles.addClientForm}
              >
                <TextField
                  onChange={props.handleChange}
                  value={props.values.surname}
                  name="surname"
                  label="Фамилия"
                  error={props.touched.surname && props.errors.surname}
                  helperText={
                    props.touched.surname && props.errors.surname
                      ? props.errors.surname
                      : null
                  }
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.name}
                  name="name"
                  label="Имя"
                  error={props.touched.name && props.errors.name}
                  helperText={
                    props.touched.name && props.errors.name
                      ? props.errors.name
                      : null
                  }
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.patronymic}
                  name="patronymic"
                  label="Отчество"
                  error={props.touched.patronymic && props.errors.patronymic}
                  helperText={
                    props.touched.patronymic && props.errors.patronymic
                      ? props.errors.patronymic
                      : null
                  }
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
                {/* <TextField
                  onChange={props.handleChange}
                  value={props.values.birthdate}
                  name="birthdate"
                  label="Дата рождения"
                /> */}
                <TextField
                  onChange={props.handleChange}
                  value={props.values.sex}
                  name="sex"
                  label="Пол"
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.work}
                  name="work"
                  label="Место работы"
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.id}
                  name="id"
                  label="Идентификационный номер"
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.phone}
                  name="phone"
                  label="Телефон"
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.email}
                  name="email"
                  label="Электронная почта"
                />
                <TextField
                  onChange={props.handleChange}
                  value={props.values.address}
                  name="address"
                  label="Адрес"
                />
                <button type="submit">Добавить</button>
                <button type="button" onClick={handleCloseAddClient}>
                  Отменить
                </button>
              </form>
            )}
          </Formik>
        </Dialog>
      </div>
    </div>
  );
};

export default connect(null, { addClient })(Clients);
