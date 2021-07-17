import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import styles from "./SearchClient.module.scss";
import { setFilter } from "../../../../store/reducers/clientsReducer";
import reset from "./../../../../assets/images/reset-clients-filter.svg";
import ClientFormButton from "../../../common/ClientFormButton";
import { getClients } from "./../../../../selectors/clientsSelectors";

const SearchClient = (props) => {
  const dispatch = useDispatch();
  const clients = useSelector(getClients);
  return (
    <Formik
      initialValues={{
        surname: "",
        name: "",
        patronymic: "",
        id: "",
      }}
      onSubmit={(values) => {
        const filteredClients = {};
        for (let client in clients) {
          if (
            clients[client].surname
              .toLowerCase()
              .includes(values.surname.toLowerCase()) &&
            clients[client].name
              .toLowerCase()
              .includes(values.name.toLowerCase()) &&
            clients[client].patronymic
              .toLowerCase()
              .includes(values.patronymic.toLowerCase()) &&
            clients[client].id.toLowerCase().includes(values.id.toLowerCase())
          ) {
            filteredClients[client] = clients[client];
          }
        }
        dispatch(setFilter(filteredClients));
        props.handleCloseSearchClient();
      }}
    >
      {(formProps) => {
        return (
          <div className={styles.searchFormWrapper}>
            <button
              className={styles.resetButton}
              onClick={() => {
                formProps.setFieldValue("name", "");
                formProps.setFieldValue("surname", "");
                formProps.setFieldValue("patronymic", "");
                formProps.setFieldValue("id", "");
              }}
            >
              <img
                className={styles.resetButtonImg}
                src={reset}
                alt="search icon"
              />
            </button>
            <form
              className={styles.form}
              onSubmit={formProps.handleSubmit}
              id="search-client-form"
            >
              <TextField
                className={styles.formInput}
                value={formProps.values.surname}
                label="Фамилия"
                name="surname"
                onChange={formProps.handleChange}
              />
              <TextField
                className={styles.formInput}
                value={formProps.values.name}
                label="Имя"
                name="name"
                onChange={formProps.handleChange}
              />
              <TextField
                className={styles.formInput}
                value={formProps.values.patronymic}
                label="Отчетсво"
                name="patronymic"
                onChange={formProps.handleChange}
              />
              <TextField
                className={styles.formInput}
                value={formProps.values.id}
                label="Идентификационный номер"
                name="id"
                onChange={formProps.handleChange}
              />
            </form>
            <div className={styles.buttonsWrapper}>
              <ClientFormButton
                type="submit"
                disabled={
                  !(
                    formProps.values.name ||
                    formProps.values.surname ||
                    formProps.values.patronymic ||
                    formProps.values.id
                  )
                }
                form="search-client-form"
                text="Найти"
                buttonType="submit"
              />
              <ClientFormButton
                type="button"
                onClick={props.handleCloseSearchClient}
                text="Отменить"
                buttonType="cancel"
              />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SearchClient;
