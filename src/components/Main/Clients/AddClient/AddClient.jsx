import styles from './AddClient.module.scss';
import './../../../../assets/styles/main.scss';
import { Formik } from 'formik';
import classNames from 'classnames';
import { addClient } from './../../../../store/reducers/clientsReducer.js';
import { connect, useStore } from 'react-redux';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { addClientInitialValues, addClientValidation } from './formProps';

const AddClient = (props) => {
  const store = useStore();
  const clientsData = store.getState().clients.clients;
  const ids = [];
  for (let client in clientsData) {
    ids.push(clientsData[client].id);
  }
  return (
    <div>
      <Formik
        initialValues={addClientInitialValues}
        validationSchema={addClientValidation(ids)}
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
          props.handleCloseAddClient();
        }}
      >
        {(props) => (
          <form
            id="add-client-form"
            onSubmit={props.handleSubmit}
            className={styles.addClientForm}
          >
            <TextField
              onChange={props.handleChange}
              value={props.values.surname}
              name="surname"
              label="Фамилия"
              error={Boolean(props.touched.surname && props.errors.surname)}
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
              error={Boolean(props.touched.name && props.errors.name)}
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
              error={Boolean(
                props.touched.patronymic && props.errors.patronymic
              )}
              helperText={
                props.touched.patronymic && props.errors.patronymic
                  ? props.errors.patronymic
                  : null
              }
            />
            <TextField
              onChange={props.handleChange}
              value={props.values.birthdate}
              name="birthdate"
              type="date"
              label="Дата рождения"
              error={Boolean(props.touched.birthdate && props.errors.birthdate)}
              helperText={
                props.touched.birthdate && props.errors.birthdate
                  ? props.errors.birthdate
                  : null
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl error={Boolean(props.touched.sex && props.errors.sex)}>
              <InputLabel id="new-client-sex-select">Пол</InputLabel>
              <Select
                labelId="new-client-sex-select"
                name="sex"
                value={props.values.sex}
                onChange={props.handleChange}
              >
                <MenuItem value="Мужчина">Мужчина</MenuItem>
                <MenuItem value="Женщина">Женщина</MenuItem>
              </Select>
              <FormHelperText>
                {props.touched.sex && props.errors.sex
                  ? props.errors.sex
                  : null}
              </FormHelperText>
            </FormControl>
            <TextField
              onChange={props.handleChange}
              value={props.values.id}
              name="id"
              label="Идентификационный номер"
              error={Boolean(props.touched.id && props.errors.id)}
              helperText={
                props.touched.id && props.errors.id ? props.errors.id : null
              }
            />
            <TextField
              onChange={props.handleChange}
              value={props.values.work}
              name="work"
              label="Место работы"
              error={Boolean(props.touched.work && props.errors.work)}
              helperText={
                props.touched.work && props.errors.work
                  ? props.errors.work
                  : null
              }
            />
            <TextField
              onChange={props.handleChange}
              value={props.values.phone}
              name="phone"
              label="Телефон"
              error={Boolean(props.touched.phone && props.errors.phone)}
              helperText={
                props.touched.phone && props.errors.phone
                  ? props.errors.phone
                  : null
              }
            />
            <TextField
              onChange={props.handleChange}
              value={props.values.email}
              name="email"
              label="Электронная почта"
              error={Boolean(props.touched.email && props.errors.email)}
              helperText={
                props.touched.email && props.errors.email
                  ? props.errors.email
                  : null
              }
            />
            <TextField
              onChange={props.handleChange}
              value={props.values.address}
              name="address"
              label="Адрес"
              error={Boolean(props.touched.address && props.errors.address)}
              helperText={
                props.touched.address && props.errors.address
                  ? props.errors.address
                  : null
              }
            />
          </form>
        )}
      </Formik>
      <div className={'c-form__buttons-wrapper'}>
        <button
          className={classNames('c-form__button', 'c-form__button_apply')}
          type="submit"
          form="add-client-form"
        >
          ДОБАВИТЬ
        </button>
        <button
          className={classNames('c-form__button', 'c-form__button_cancel')}
          type="button"
          onClick={props.handleCloseAddClient}
        >
          ОТМЕНИТЬ
        </button>
      </div>
    </div>
  );
};

export default connect(null, { addClient })(AddClient);
