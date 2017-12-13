import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {
    CHANGE_LOGIN,
    CHANGE_PASS,

    PREPARE_FETCH_LOGIN,
    GOT_FETCH_LOGIN,
    ERROR_FETCH_LOGIN,
    DO_LOGOUT,
    PREPARE_FETCH_APROVAR,

    PREPARE_FETCH_SOLICITACAO,
    GOT_FETCH_SOLICITACAO,
    ERROR_FETCH_SOLICITACAO,
    RESET_FETCH_SOLICITACAO,

    CHANGE_PAGE_NO,
    CHANGE_PAGE_ORDER,
    CHANGE_PAGE_FILTER,
    CHANGE_PAGE_ORDER_TYPE,
    CHANGE_PAGE_FILTER_ACTIVE,

    GOT_FETCH_APROVAR,
    ERROR_FETCH_APROVAR,
    CLOSE_MESSAGE_APROVAR,

    CHANGE_CONTACT_NAME,
    CHANGE_CONTACT_CONTACT,
    CHANGE_CONTACT_SUBJECT,
    CHANGE_CONTACT_MESSAGE
} from '../actions/mainActions';

const listPageNo = (state = 1, action) => {
    switch (action.type) {
    case CHANGE_PAGE_NO:
        return action.pageNo;
    case DO_LOGOUT:
        return 1;
    default:
        return state;
    }
};

const resultAprovar = (state = '', action) => {
    switch (action.type) {
    case GOT_FETCH_APROVAR: {
        if ((!action.result) || (action.result === '')) { return 'Solicitação aprovada com sucesso'; }
        return action.result;
    }

    case ERROR_FETCH_APROVAR:
        return action.result;
    default:
        return state;
    }
};

const showAprovarMessage = (state = false, action) => {
    switch (action.type) {
    case GOT_FETCH_APROVAR:
        return true;
    case ERROR_FETCH_APROVAR:
        return true;
    case CLOSE_MESSAGE_APROVAR:
        return false;
    default:
        return state;
    }
};

const listFilter = (state = '', action) => {
    switch (action.type) {
    case CHANGE_PAGE_FILTER:
        return action.filter;
    case DO_LOGOUT:
        return '';
    case GOT_FETCH_APROVAR:
        if ((!action.result) || (action.result === '')) {
            return '';
        }
        return state;
    default:
        return state;
    }
};

const listFilterActive = (state = '', action) => {
    switch (action.type) {
    case CHANGE_PAGE_FILTER_ACTIVE:
        return action.filter;
    case DO_LOGOUT:
        return '';
    case GOT_FETCH_APROVAR:
        if ((!action.result) || (action.result === '')) {
            return '';
        }
        return state;
    default:
        return state;
    }
};


const listOrderColumn = (state = '', action) => {
    switch (action.type) {
    case CHANGE_PAGE_ORDER:
        return action.order;
    case DO_LOGOUT:
        return '';
    default:
        return state;
    }
};
const listOrderType = (state = 'ASC', action) => {
    switch (action.type) {
    case CHANGE_PAGE_ORDER_TYPE:
        return action.orderType;
    case DO_LOGOUT:
        return 'ASC';
    default:
        return state;
    }
};

const solicitacaoList = (state = [], action) => {
    switch (action.type) {
    case RESET_FETCH_SOLICITACAO:
        return [];
    case GOT_FETCH_SOLICITACAO:
        return action.solicitacaoList;
    case DO_LOGOUT:
        return [];
    case GOT_FETCH_APROVAR:
        if ((!action.result) || (action.result === '')) {
            return [];
        }
        return state;
    default:
        return state;
    }
};

const hasToFetchSolicitacao = (state = true, action) => {
    switch (action.type) {
    case PREPARE_FETCH_SOLICITACAO:
        return false;
    case RESET_FETCH_SOLICITACAO:
        return true;
    case GOT_FETCH_LOGIN:
        return true;
    case GOT_FETCH_APROVAR:
        if ((!action.result) || (action.result === '')) {
            return true;
        }
        return state;
    default:
        return state;
    }
};

const isLoading = (state = false, action) => {
    switch (action.type) {
    case PREPARE_FETCH_LOGIN:
        return true;
    case GOT_FETCH_LOGIN:
        return false;
    case GOT_FETCH_APROVAR:
        return false;
    case ERROR_FETCH_LOGIN:
        return false;
    case PREPARE_FETCH_SOLICITACAO:
        return true;
    case GOT_FETCH_SOLICITACAO:
        return false;
    case ERROR_FETCH_SOLICITACAO:
        return false;
    case PREPARE_FETCH_APROVAR:
        return true;
    default:
        return state;
    }
};

const loginErrorMsg = (state = '', action) => {
    switch (action.type) {
    case GOT_FETCH_LOGIN:
        return '';
    case ERROR_FETCH_LOGIN:
        return action.error;
    case DO_LOGOUT:
        return '';
    default:
        return state;
    }
};

const solicitacaoListError = (state = '', action) => {
    switch (action.type) {
    case PREPARE_FETCH_SOLICITACAO:
        return '';
    case ERROR_FETCH_SOLICITACAO:
        return action.error;
    case GOT_FETCH_SOLICITACAO:
        return '';
    case DO_LOGOUT:
        return '';
    default:
        return state;
    }
};

const loggedUser = (state = '', action) => {
    switch (action.type) {
    case GOT_FETCH_LOGIN:
        return action.loginUserName;
    case ERROR_FETCH_LOGIN:
        return '';
    default:
        return state;
    }
};

const loggedUserPass = (state = '', action) => {
    switch (action.type) {
    case GOT_FETCH_LOGIN:
        return action.loginPassword;
    case ERROR_FETCH_LOGIN:
        return '';
    case DO_LOGOUT:
        return '';
    default:
        return state;
    }
};

const loginUserName = (state = '', action) => {
    switch (action.type) {
    case CHANGE_LOGIN:
        return action.loginUserName;
    case DO_LOGOUT:
        return '';
    default:
        return state;
    }
};


const contactName = (state = '', action) => {
    switch (action.type) {
    case CHANGE_CONTACT_NAME:
        return action.name;
    case '@@redux-form/CHANGE':
        if (action.meta.field === 'contactName') {
            return action.payload;
        }
    default:
        return state;
    }
};

const contactContact = (state = '', action) => {
    switch (action.type) {
    case CHANGE_CONTACT_CONTACT:
        return action.contact;
    default:
        return state;
    }
};


const contactSubject = (state = '', action) => {
    switch (action.type) {
    case CHANGE_CONTACT_SUBJECT:
        return action.subject;
    default:
        return state;
    }
};


const contactMessage = (state = '', action) => {
    switch (action.type) {
    case CHANGE_CONTACT_MESSAGE:
        return action.message;
    default:
        return state;
    }
};


const loginPassword = (state = '', action) => {
    switch (action.type) {
    case CHANGE_PASS:
        return action.loginPassword;
    case DO_LOGOUT:
        return '';
    default:
        return state;
    }
};


const selectedPage = (state = 1, action) => {
    switch (action.type) {
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    loginUserName,
    loginPassword,
    isLoading,
    loggedUser,
    loggedUserPass,
    loginErrorMsg,
    solicitacaoListError,
    solicitacaoList,
    selectedPage,
    hasToFetchSolicitacao,
    listPageNo,
    listFilter,
    listOrderColumn,
    listOrderType,
    listFilterActive,
    resultAprovar,
    showAprovarMessage,
    contactName,
    contactContact,
    contactSubject,
    contactMessage,
    form: formReducer,
    router: routerReducer
});

export default rootReducer;
