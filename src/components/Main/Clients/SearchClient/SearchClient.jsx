import { Formik } from 'formik';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import styles from './SearchClient.module.scss';
import './../../../../assets/styles/main.scss';
import classNames from 'classnames';
import { setFilter } from '../../../../store/reducers/clientsReducer';
import reset from './../../../../assets/images/reset-clients-filter.svg';

const SearchClient = (props) => {
  return (
    <Formik
      initialValues={{
        surname: '',
        name: '',
        patronymic: '',
        id: '',
      }}
      onSubmit={(values) => {
        const filteredClients = {};
        for (let client in props.clients) {
          if (
            props.clients[client].surname
              .toLowerCase()
              .includes(values.surname.toLowerCase()) &&
            props.clients[client].name
              .toLowerCase()
              .includes(values.name.toLowerCase()) &&
            props.clients[client].patronymic
              .toLowerCase()
              .includes(values.patronymic.toLowerCase()) &&
            props.clients[client].id
              .toLowerCase()
              .includes(values.id.toLowerCase())
          ) {
            filteredClients[client] = props.clients[client];
          }
        }
        props.setFilter(filteredClients);
        props.handleCloseSearchClient();
      }}
    >
      {(formProps) => {
        return (
          <div className={styles.searchFormWrapper}>
            <button
              className={styles.resetButton}
              onClick={() => {
                formProps.setFieldValue('name', '');
                formProps.setFieldValue('surname', '');
                formProps.setFieldValue('patronymic', '');
                formProps.setFieldValue('id', '');
              }}
            >
              <img className={styles.resetButtonImg} src={reset} />
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
            <div className={'c-form__buttons-wrapper'}>
              <button
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
                className={classNames('c-form__button', 'c-form__button_apply')}
              >
                Найти
              </button>
              <button
                type="button"
                className={classNames('c-form__button', 'c-form_button_cancel')}
                onClick={props.handleCloseSearchClient}
              >
                Отменить
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const mapDispatchToProps = (state) => ({
  clients: state.clients.clients,
});

export default connect(mapDispatchToProps, { setFilter })(SearchClient);
