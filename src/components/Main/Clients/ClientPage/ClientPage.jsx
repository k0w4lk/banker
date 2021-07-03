import { Formik, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddNavPanel from '../../common/AddNavPanel';
import {
  getCurrentClientData,
  setCurrentClientData,
} from '../../../../store/reducers/clientReducer';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Preloader from '../../common/Preloader';
import { TextField } from '@material-ui/core';
import { addClientValidation } from '../clientDataFormProps';
import { useRef } from 'react';

const ClientPage = (props) => {
  const initValues = {
    surname: props.client.surname,
    name: props.client.name,
    patronymic: props.client.patronymic,
    birthdate: props.client.birthdate,
    sex: props.client.sex,
    id: props.client.id,
    work: props.client.work,
    phone: props.client.phone,
    email: props.client.email,
    address: props.client.address,
  };
  const { clientId } = useParams();
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    props.getCurrentClientData(clientId);
  }, []);
  const resetRef = useRef();
  return (
    <div>
      <AddNavPanel />
      {props.isClientLoading ? (
        <Preloader />
      ) : (
        <>
          <h1>{`${props.client.surname} ${props.client.name} ${props.client.patronymic}`}</h1>
          <div>
            <NavLink to={`/main/clients/${clientId}/data`}>Данные</NavLink>
          </div>
          <AddNavPanel>
            {editMode ? (
              <div>
                <button type="submit" form="client-edit-data-form">
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    resetRef.current?.resetForm();
                  }}
                >
                  Отменить
                </button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)}>Редактировать</button>
            )}
          </AddNavPanel>
          <Formik
            innerRef={resetRef}
            initialValues={initValues}
            validationSchema={addClientValidation()}
            onSubmit={(values) => {
              props.setCurrentClientData({
                id: clientId,
                client: {
                  surname: values.surname,
                  name: values.name,
                  patronymic: values.patronymic,
                  birthdate: values.birthdate,
                  sex: values.sex,
                  id: values.id,
                  work: values.work,
                  phone: values.phone,
                  email: values.email,
                  address: values.address,
                },
              });
              setEditMode(false);
            }}
          >
            {(formProps) => {
              return (
                <form
                  onSubmit={formProps.handleSubmit}
                  id="client-edit-data-form"
                >
                  <span>Фамилия</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.surname}
                    name="surname"
                    onChange={formProps.handleChange}
                    error={Boolean(
                      formProps.touched.name && formProps.errors.name
                    )}
                    helperText={
                      formProps.touched.name && formProps.errors.name
                        ? formProps.errors.name
                        : null
                    }
                  />
                  <span>Имя</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.name}
                    name="name"
                    onChange={formProps.handleChange}
                  />
                  <span>Отчетсво</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.patronymic}
                    name="patronymic"
                    onChange={formProps.handleChange}
                  />
                  <span>Дата рождения</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.birthdate}
                    name="birthdate"
                    onChange={formProps.handleChange}
                  />
                  <span>Пол</span>
                  <TextField
                    variant="outlined"
                    disabled={true}
                    value={formProps.values.sex}
                    name="sex"
                    onChange={formProps.handleChange}
                  />
                  <span>Идентификационный номер</span>
                  <TextField
                    variant="outlined"
                    disabled={true}
                    value={formProps.values.id}
                    name="id"
                    onChange={formProps.handleChange}
                  />
                  <span>Место работы</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.work}
                    name="work"
                    onChange={formProps.handleChange}
                  />
                  <span>Телефон</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.phone}
                    name="phone"
                    onChange={formProps.handleChange}
                  />
                  <span>Электронная почта</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.email}
                    name="email"
                    onChange={formProps.handleChange}
                  />
                  <span>Адрес</span>
                  <TextField
                    variant="outlined"
                    disabled={!editMode}
                    value={formProps.values.address}
                    name="address"
                    onChange={formProps.handleChange}
                  />
                </form>
              );
            }}
          </Formik>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  client: state.client.client,
  isClientLoading: state.client.isClientLoading,
});

export default connect(mapStateToProps, {
  getCurrentClientData,
  setCurrentClientData,
})(ClientPage);
