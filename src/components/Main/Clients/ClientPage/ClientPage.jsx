import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext";
import {
  getClient,
  getClientLoadingStatus,
} from "../../../../selectors/clientSelectors";
import { transferActionData } from "../../../../store/reducers/actionsReducer";
import {
  getCurrentClientData,
  setCurrentClientData,
} from "../../../../store/reducers/clientReducer";
import AddNavPanelTextButton from "../../../common/AddNavPanel/TextButton";
import { addClientValidation } from "../clientDataFormProps";
import AddNavPanel from "./../../../common/AddNavPanel";
import Preloader from "./../../../common/Preloader";
import styles from "./ClientPage.module.scss";

const ClientPage = (props) => {
  const dispatch = useDispatch();
  const client = useSelector(getClient);
  client.birthdate = client.birthdate.split(".").reverse().join("-") || "";
  const isClientLoading = useSelector(getClientLoadingStatus);
  const initValues = {
    surname: client.surname,
    name: client.name,
    patronymic: client.patronymic,
    birthdate: client.birthdate,
    sex: client.sex,
    id: client.id,
    work: client.work,
    phone: client.phone,
    email: client.email,
    address: client.address,
  };
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    dispatch(getCurrentClientData(clientId));
  }, []);
  const resetRef = useRef();

  return (
    <div>
      <AddNavPanel />
      {isClientLoading ? (
        <Preloader />
      ) : (
        <>
          <h1>{`${client.surname} ${client.name} ${client.patronymic}`}</h1>
          <div className={styles.tabsWrapper}>
            <NavLink
              to={`/main/clients/${clientId}/data`}
              className={styles.clientNavigationItem}
              activeClassName={styles.clientNavigationItemActive}
            >
              Данные
            </NavLink>
          </div>
          <AddNavPanel>
            {editMode ? (
              <div>
                <AddNavPanelTextButton
                  type="submit"
                  form="client-edit-data-form"
                  text="Сохранить"
                />
                <AddNavPanelTextButton
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    resetRef.current?.resetForm();
                  }}
                  text="Отменить"
                  className={styles.cancelButton}
                />
              </div>
            ) : (
              <AddNavPanelTextButton
                onClick={() => setEditMode(true)}
                text="Редактировать"
              />
            )}
          </AddNavPanel>
          <Formik
            innerRef={resetRef}
            initialValues={initValues}
            validationSchema={addClientValidation()}
            onSubmit={(values) => {
              if (
                Object.values(values).join("") !==
                Object.values(client).join("")
              ) {
                dispatch(
                  setCurrentClientData({
                    clientDatabaseId: clientId,
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
                  })
                );
                dispatch(
                  transferActionData({
                    id: user.uid,
                    date: new Date().toLocaleDateString("ru"),
                    time: new Date().toLocaleTimeString("ru"),
                    action: `Изменена анкета клиента ${values.surname} ${values.name} ${values.patronymic} (ИН: ${values.id})`,
                  })
                );
              }
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

export default ClientPage;
