import { push } from 'react-router-redux';


export const redirectConsulta = (router, filter, dispatch) => {
    const path = `/sc/consulta/${filter}`;
    // router.history.push(path);
    dispatch(push(path));
};

export const redirectDetalhes = (router, filter, dispatch) => {
    const path = `/sc/aprovar/${filter}`;
    // router.history.push(path);
    dispatch(push(path));
};


export const redirectLogin = (router, dispatch) => {
    const path = '/login';
    // router.history.push(path);
    dispatch(push(path));
};


export const redirectHome = (router, dispatch) => {
    const path = '/';
    // router.history.push(path);
    dispatch(push(path));
};


export const redirectContato = (router, dispatch) => {
    const path = '/contato';
    // router.history.push(path);
    dispatch(push(path));
};
