import styles from "./AddClient.module.scss";
import { Formik } from "formik";
import { addClient } from "./../../../../store/reducers/clientsReducer.js";
import { useDispatch, useStore } from "react-redux";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  ClickAwayListener,
  Tooltip,
} from "@material-ui/core";
import {
  addClientInitialValues,
  addClientValidation,
} from "../clientDataFormProps";
import { transferActionData } from "../../../../store/reducers/actionsReducer";
import { useContext, useState } from "react";
import { AuthContext } from "./../../../../context/authContext";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ClientFormButton from "../../../common/ClientFormButton";

const AddClient = (props) => {
  const store = useStore();
  const dispatch = useDispatch();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { user } = useContext(AuthContext);
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
          dispatch(
            addClient({
              name: values.name,
              surname: values.surname,
              patronymic: values.patronymic,
              birthdate: values.birthdate.split("-").reverse().join("."),
              sex: values.sex,
              work: values.work,
              id: values.id.toUpperCase(),
              phone: values.phone,
              email: values.email,
              address: values.address,
            })
          );
          dispatch(
            transferActionData({
              id: user.uid,
              date: new Date().toLocaleDateString("ru"),
              time: new Date().toLocaleTimeString("ru"),
              action: `Заведена анкета клиента ${values.surname} ${values.name} ${values.patronymic} (ИН: ${values.id})`,
            })
          );
          props.handleCloseAddClient();
        }}
      >
        {(props) => (
          <div>
            <div className={styles.tooltipWrapper}>
              <ClickAwayListener onClickAway={() => setIsHelpOpen(false)}>
                <Tooltip
                  open={isHelpOpen}
                  title={
                    <>
                      <h3>Имя, Фамилия, Отчество:</h3>
                      <p>
                        Доступны только символы кириллического алфавита. Не
                        более 25 символов. Обязательные поля
                      </p>
                      <br />
                      <h3>Дата рождения:</h3>
                      <p>Не может быть позже текущей даты. Обязательное поле</p>
                      <br />
                      <h3>Пол:</h3>
                      <p>Обязательное поле</p>
                      <br />
                      <h3>Место работы:</h3>
                      <p>Максимальная длина - 150 символов</p>
                      <br />
                      <h3>Идентификационный номер:</h3>
                      <p>
                        14 символов (латинские буквы (L) и цифры (N)) в формате
                        NNNNNNNLNNNLLN. Обязательное поле
                      </p>
                      <br />
                      <h3>Телефон:</h3>
                      <p>
                        Код страны ("+" и 3 цифры), код оператора (2 цифры),
                        номер абонента (7 цифр). Необязательное поле при
                        заполненном поле “Электронная почта” или “Адрес”.
                      </p>
                      <br />
                      <h3>Электронная почта:</h3>
                      <p>
                        Необязательное поле при заполненном поле “Телефон” или
                        “Адрес”
                      </p>
                      <br />
                      <h3>Адрес:</h3>
                      <p>
                        Необязательное поле при заполненном поле “Электронная
                        почта” или “Телефон”. Максимальная длина - 200 символов.
                      </p>
                    </>
                  }
                  placement="bottom-end"
                >
                  <HelpOutlineIcon onClick={() => setIsHelpOpen(!isHelpOpen)} />
                </Tooltip>
              </ClickAwayListener>
            </div>
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
                error={Boolean(
                  props.touched.birthdate && props.errors.birthdate
                )}
                helperText={
                  props.touched.birthdate && props.errors.birthdate
                    ? props.errors.birthdate
                    : null
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl
                error={Boolean(props.touched.sex && props.errors.sex)}
              >
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
                inputProps={{
                  className: styles.inputId,
                }}
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
          </div>
        )}
      </Formik>
      <div className={styles.buttonsWrapper}>
        <ClientFormButton
          type="submit"
          form="add-client-form"
          text="ДОБАВИТЬ"
          buttonType="submit"
        />
        <ClientFormButton
          type="button"
          onClick={props.handleCloseAddClient}
          text="ОТМЕНИТЬ"
          buttonType="cancel"
        />
      </div>
    </div>
  );
};

export default AddClient;
