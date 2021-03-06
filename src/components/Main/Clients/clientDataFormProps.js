import * as Yup from 'yup';

const MAX_NAME_LENGTH = 25;
const MAX_SURNAME_LENGTH = 25;
const MAX_PATRONYMIC_LENGTH = 25;
const MAX_WORK_LENGTH = 150;
const MAX_ADDRESS_LENGTH = 200;
const REQUIRED_ERROR = 'Поле обязательно';
const ONLY_CYRILLIC_SYMBOLS = 'Доступны только символы кириллического алфавита';
const WRONG_ID_FORMAT = 'Неправильный формат идентификационного номера';
const WRONG_PHONE_NUMBER_FORMAT = 'Неправильный формат телефонного номера';
const WRONG_EMAIL_FORMAT = 'Неправильный формат адреса электронной почты';
const RESERVED_ID =
  'Клиент с данным идентификациооным номером уже зарегистрирован. Проверьте вводимые данные';

export const addClientInitialValues = {
  surname: '',
  name: '',
  patronymic: '',
  birthdate: '',
  sex: '',
  id: '',
  work: '',
  phone: '',
  email: '',
  address: '',
};

export const addClientValidation = (ids = []) =>
  Yup.object().shape(
    {
      name: Yup.string()
        .max(MAX_NAME_LENGTH, `Не более ${MAX_NAME_LENGTH} символов`)
        .matches(/^[А-Яа-я]+$/, ONLY_CYRILLIC_SYMBOLS)
        .required(REQUIRED_ERROR),
      surname: Yup.string()
        .max(MAX_NAME_LENGTH, `Не более ${MAX_SURNAME_LENGTH} символов`)
        .matches(/^[А-Яа-я]+$/, ONLY_CYRILLIC_SYMBOLS)
        .required(REQUIRED_ERROR),
      patronymic: Yup.string()
        .max(
          MAX_PATRONYMIC_LENGTH,
          `Не более ${MAX_PATRONYMIC_LENGTH} символов`
        )
        .matches(/^[А-Яа-я]+$/, ONLY_CYRILLIC_SYMBOLS)
        .required(REQUIRED_ERROR),
      birthdate: Yup.date()
        .max(new Date(), 'Дата рождения не может быть позже текущей даты')
        .required(REQUIRED_ERROR),
      sex: Yup.string().required(REQUIRED_ERROR),
      work: Yup.string().max(
        MAX_WORK_LENGTH,
        `Не более ${MAX_WORK_LENGTH} символов`
      ),
      id: Yup.string()
        .matches(
          /^[0-9]{7}[A-Za-z]{1}[0-9]{3}[A-Za-z]{2}[0-9]{1}$/,
          WRONG_ID_FORMAT
        )
        .notOneOf(ids, RESERVED_ID)
        .required(REQUIRED_ERROR),
      phone: Yup.string()
        .ensure()
        .matches(/^$|^[+]{1}[0-9]{12}$/, WRONG_PHONE_NUMBER_FORMAT)
        .when(['email', 'address'], {
          is: (email, address) => !email && !address,
          then: Yup.string().required(REQUIRED_ERROR),
        }),
      email: Yup.string()
        .ensure()
        .email(WRONG_EMAIL_FORMAT)
        .when(['phone', 'address'], {
          is: (phone, address) => !phone && !address,
          then: Yup.string().required(REQUIRED_ERROR),
        }),
      address: Yup.string()
        .max(MAX_ADDRESS_LENGTH, `Не более ${MAX_ADDRESS_LENGTH} символов`)
        .ensure()
        .when(['phone', 'email'], {
          is: (phone, email) => !phone && !email,
          then: Yup.string().required(REQUIRED_ERROR),
        }),
    },
    [
      ['email', 'address'],
      ['phone', 'address'],
      ['phone', 'email'],
    ]
  );
