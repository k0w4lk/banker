import { Formik } from 'formik';
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
import styles from './ClientPage.module.scss';
import './../../../../assets/styles/main.scss';
import classNames from 'classnames';
import { transferActionData } from '../../../../store/reducers/actionsReducer';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';

const ClientPage = (props) => {
  const initValues = {
    surname: props.client.surname,
    name: props.client.name,
    patronymic: props.client.patronymic,
    birthdate: props.client.birthdate.split('.').reverse().join('-'),
    sex: props.client.sex,
    id: props.client.id,
    work: props.client.work,
    phone: props.client.phone,
    email: props.client.email,
    address: props.client.address,
  };
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    props.getCurrentClientData(clientId);
  }, []);
  const resetRef = useRef();
  return (
    <div>
      <AddNavPanel />
      {props.isClientLoading ? (
        <div className={styles.preloaderWrapper}>
          <Preloader />
        </div>
      ) : (
        <>
          <h1>{`${props.client.surname} ${props.client.name} ${props.client.patronymic}`}</h1>
          <div className={styles.tabsWrapper}>
            <NavLink
              to={`/main/clients/${clientId}/data`}
              className="c-add-nav-panel__tab"
              activeClassName="c-add-nav-panel__tab_active"
            >
              Данные
            </NavLink>
          </div>
          <AddNavPanel>
            {editMode ? (
              <div>
                <button
                  className="c-add-nav-panel__text-button"
                  type="submit"
                  form="client-edit-data-form"
                >
                  Сохранить
                </button>
                <button
                  className={classNames(
                    'c-add-nav-panel__text-button',
                    'c-add-nav-panel__text-button_cancel'
                  )}
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
              <button
                onClick={() => setEditMode(true)}
                className="c-add-nav-panel__text-button"
              >
                Редактировать
              </button>
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
              props.transferActionData({
                id: user.uid,
                date: new Date().toLocaleDateString('ru'),
                time: new Date().toLocaleTimeString('ru'),
                action: `Изменена анкета клиента ${values.surname} ${values.name} ${values.patronymic} (ИН: ${values.id})`,
              });
              setEditMode(false);
            }}
          >
            {(formProps) => {
              return (
                <form
                  className={styles.form}
                  onSubmit={formProps.handleSubmit}
                  id="client-edit-data-form"
                >
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Фамилия</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.surname}
                      name="surname"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.surname && formProps.errors.surname
                      )}
                      helperText={
                        formProps.touched.surname && formProps.errors.surname
                          ? formProps.errors.surname
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Имя</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.name}
                      name="name"
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
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Отчетсво</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.patronymic}
                      name="patronymic"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.patronymic &&
                          formProps.errors.patronymic
                      )}
                      helperText={
                        formProps.touched.patronymic &&
                        formProps.errors.patronymic
                          ? formProps.errors.patronymic
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Дата рождения</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.birthdate}
                      name="birthdate"
                      type="date"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.birthdate &&
                          formProps.errors.birthdate
                      )}
                      helperText={
                        formProps.touched.birthdate &&
                        formProps.errors.birthdate
                          ? formProps.errors.birthdate
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Пол</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={true}
                      value={formProps.values.sex}
                      name="sex"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.sex && formProps.errors.sex
                      )}
                      helperText={
                        formProps.touched.sex && formProps.errors.sex
                          ? formProps.errors.sex
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>
                      Идентификационный номер
                    </span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={true}
                      value={formProps.values.id}
                      name="id"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.id && formProps.errors.id
                      )}
                      helperText={
                        formProps.touched.id && formProps.errors.id
                          ? formProps.errors.id
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Место работы</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.work}
                      name="work"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.work && formProps.errors.work
                      )}
                      helperText={
                        formProps.touched.work && formProps.errors.work
                          ? formProps.errors.work
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Телефон</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.phone}
                      name="phone"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.phone && formProps.errors.phone
                      )}
                      helperText={
                        formProps.touched.phone && formProps.errors.phone
                          ? formProps.errors.phone
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Электронная почта</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.email}
                      name="email"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.email && formProps.errors.email
                      )}
                      helperText={
                        formProps.touched.email && formProps.errors.email
                          ? formProps.errors.email
                          : null
                      }
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <span className={styles.inputLabel}>Адрес</span>
                    <TextField
                      className={styles.input}
                      variant="outlined"
                      disabled={!editMode}
                      value={formProps.values.address}
                      name="address"
                      onChange={formProps.handleChange}
                      error={Boolean(
                        formProps.touched.address && formProps.errors.address
                      )}
                      helperText={
                        formProps.touched.address && formProps.errors.address
                          ? formProps.errors.address
                          : null
                      }
                    />
                  </div>
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
  transferActionData,
})(ClientPage);
