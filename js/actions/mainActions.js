export const version = '2.0.0';

export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_PASS = 'CHANGE_PASS';

// FETCH_LOGIN
export const PREPARE_FETCH_LOGIN = 'PREPARE_FETCH_LOGIN';
export const GOT_FETCH_LOGIN = 'GOT_FETCH_LOGIN';
export const ERROR_FETCH_LOGIN = 'ERROR_FETCH_LOGIN';
export const DO_LOGOUT = 'DO_LOGOUT';

// FETCH_SOLICITACAO
export const PREPARE_FETCH_SOLICITACAO = 'PREPARE_FETCH_SOLICITACAO';
export const GOT_FETCH_SOLICITACAO = 'GOT_FETCH_SOLICITACAO';
export const ERROR_FETCH_SOLICITACAO = 'ERROR_FETCH_SOLICITACAO';
export const RESET_FETCH_SOLICITACAO = 'RESET_FETCH_SOLICITACAO';
export const CHANGE_PAGE_ORDER = 'CHANGE_PAGE_ORDER';
export const CHANGE_PAGE_FILTER = 'CHANGE_PAGE_FILTER';
export const CHANGE_PAGE_FILTER_ACTIVE = 'CHANGE_PAGE_FILTER_ACTIVE';
export const CHANGE_PAGE_ORDER_TYPE = 'CHANGE_PAGE_ORDER_TYPE';
export const PREPARE_FETCH_APROVAR = 'PREPARE_FETCH_APROVAR';
export const GOT_FETCH_APROVAR = 'GOT_FETCH_APROVAR';

export const CHANGE_PAGE_NO = 'CHANGE_PAGE_NO';
export const ERROR_FETCH_APROVAR = 'ERROR_FETCH_APROVAR';
export const CLOSE_MESSAGE_APROVAR = 'CLOSE_MESSAGE_APROVAR';


export const CHANGE_CONTACT_NAME = 'CHANGE_CONTACT_NAME';
export const CHANGE_CONTACT_CONTACT = 'CHANGE_CONTACT_CONTACT';
export const CHANGE_CONTACT_SUBJECT = 'CHANGE_CONTACT_SUBJECT';
export const CHANGE_CONTACT_MESSAGE = 'CHANGE_CONTACT_MESSAGE';

export const callChangePage = pageNo => ({
    type: CHANGE_PAGE_NO,
    pageNo
});

export const callChangeOrder = order => ({
    type: CHANGE_PAGE_ORDER,
    order
});

export const callChangePageFilter = filter => ({
    type: CHANGE_PAGE_FILTER,
    filter
});

export const callChangePageFilterActive = filter => ({
    type: CHANGE_PAGE_FILTER_ACTIVE,
    filter
});

export const callChangeOrderType = orderType => ({
    type: CHANGE_PAGE_ORDER_TYPE,
    orderType
});

export const closeMessageAprovar = () => ({
    type: CLOSE_MESSAGE_APROVAR
});


export const callFetchAprovar = (user, pass) => ({
    type: PREPARE_FETCH_APROVAR,
    loginUserName: user,
    loginPassword: pass
});


export const callFetchLogin = (user, pass) => ({
    type: PREPARE_FETCH_LOGIN,
    loginUserName: user,
    loginPassword: pass
});

export const gotFetchLogin = (user, pass, json) => ({
    type: GOT_FETCH_LOGIN,
    loginUserName: user,
    loginPassword: pass,
    json
});

export const gotFetchAprovar = (user, pass, json) => ({
    type: GOT_FETCH_APROVAR,
    loginUserName: user,
    loginPassword: pass,
    result: json.p_MENSAGEM
});

export const errorFetchAprovar = (user, pass, message) => ({
    type: ERROR_FETCH_APROVAR,
    loginUserName: user,
    loginPassword: pass,
    result: message
});

export const errorFetchLogin = (user, pass, error) => ({
    type: ERROR_FETCH_LOGIN,
    loginUserName: user,
    loginPassword: pass,
    error
});


export const callFetchSolicitacaoList = (user, pass) => ({
    type: PREPARE_FETCH_SOLICITACAO,
    loginUserName: user,
    loginPassword: pass
});

export const gotFetchSolicitacaoList = (user, pass, json) => ({
    type: GOT_FETCH_SOLICITACAO,
    loginUserName: user,
    loginPassword: pass,
    solicitacaoList: json
});


export const errorFetchSolicitacaoList = (user, pass, error) => ({
    type: ERROR_FETCH_SOLICITACAO,
    loginUserName: user,
    loginPassword: pass,
    error
});

export const resetFetchSolicitacaoList = (user, pass) => ({
    type: RESET_FETCH_SOLICITACAO,
    loginUserName: user,
    loginPassword: pass
});


export const changeLogin = login => ({
    type: CHANGE_LOGIN,
    loginUserName: login
});


export const doLogout = () => ({
    type: DO_LOGOUT
});

export const changePass = pass => ({
    type: CHANGE_PASS,
    loginPassword: pass
});


export const changeContactName = name => ({
    type: CHANGE_CONTACT_NAME,
    name
});

export const changeContactContact = contact => ({
    type: CHANGE_CONTACT_CONTACT,
    contact
});

export const changeContactSubject = subject => ({
    type: CHANGE_CONTACT_SUBJECT,
    subject
});

export const changeContactMessage = message => ({
    type: CHANGE_CONTACT_MESSAGE,
    message
});
