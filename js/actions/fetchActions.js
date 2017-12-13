import fetch from 'isomorphic-fetch';
import Axios from 'axios';
import {
    callFetchLogin,
    gotFetchLogin,
    errorFetchLogin,
    doLogout,
    callFetchSolicitacaoList,
    callFetchAprovar,
    gotFetchSolicitacaoList,
    errorFetchSolicitacaoList,
    gotFetchAprovar,
    errorFetchAprovar
} from './mainActions';
import { saveLocalStorageLogin, saveLocalStorageLogout } from './saveActions';
import { redirectConsulta } from './redirectActions';


const webServer = 'https://ws/invalido/';
const loginUrl = `${webServer}login`;
const listUrl = `${webServer}sc/list`;
const messageUrl = `${webServer}sc/mensagem`;
const approveUrl = `${webServer}sc/aprovar`;
const mockUrl = 'http://www.mocky.io/v2/59c3d8801100007f0399cccb';


export const fetchLogout = () => (
    function returnFetchLogout(dispatch) {
        return saveLocalStorageLogout()
            .then(() => {
                dispatch(doLogout());
            });
    });

export const fetchLogin = (user, pass) => (

    function returnFetchLogin(dispatch) {
        // Colocar em Loading.
        dispatch(callFetchLogin(user, pass));

        // preparar detalhes

        const postObj =
            {
                name: user.toUpperCase(),
                pass: pass.toUpperCase()
            };

        const token = `${postObj.name}-${postObj.pass}`;
        const postBody = JSON.stringify(postObj);

        const header = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            token,
            Accept: 'application/json',
            'Content-Length': postBody.length.toString()
        });


        const myInit = {
            method: 'POST',
            headers: header,
            body: postBody
        };


        return new Promise(

            (resolve, reject) => {
                saveLocalStorageLogin(user, pass).then(() => {
                    dispatch(gotFetchLogin(user, pass, postObj));
                });
                resolve();
            });

        // Retornar promise
        /* return fetch(loginUrl, myInit)
            .then((response) => {
                if (response.status === 401) {
                    // 401 returned from server
                    console.log('Erro na request : 401');
                    throw new Error('Login inválido ');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 403) {
                    // 401 returned from server
                    console.log('Erro na request : 403');
                    throw new Error('Login inválido ');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 415) {
                    // 401 returned from server
                    console.log('Erro na request : 415');
                    throw new Error('Login inválido');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 400) {
                    // 401 returned from server
                    console.log('Erro na request : 400');
                    throw new Error('Login inválido');
                }
                return response;
            })
            .then((response) => {
                if (response.ok) {
                    // isso é uma promisse
                    return response.text();
                }
                throw new Error('Login inválido  - desconhecido');
            })
            // Repetindo isso pode dar diversos dispatchs a partir de um fetch
            .then((json) => {
                // console.log('O texto recebido foi');
                // console.log(json);
                const obj = JSON.parse(json);

                if (obj.name.toUpperCase() === user.toUpperCase()) {
                    saveLocalStorageLogin(user, pass).then(() => {
                        dispatch(gotFetchLogin(user, pass, obj));
                    });
                } else {
                    throw new Error('Login inválido');
                }
            })
            .catch((error) => {

                let mensagem = error.message;
                if (mensagem !== 'Login inválido') {
                    // mensagem = 'Erro de Conexão';
                    mensagem = 'Login inválido';
                }
                dispatch(errorFetchLogin(user, pass, mensagem));
                console.log(`There has been a problem with your fetch operation: ${error.message}`);
            }); */
    });


export const fetchSolicitacaoList = (user, pass) => (
    function localreturnFetchSolicitacaoList(dispatch) {
        dispatch(callFetchSolicitacaoList(user, pass));

        const postObj =
            {
                name: user.toUpperCase(),
                pass: pass.toUpperCase()
            };

        const token = `${postObj.name}-${postObj.pass}`;
        const postBody = JSON.stringify(postObj);

        const header = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            token,
            Accept: 'application/json',
            'Content-Length': postBody.length.toString()
        });


        const myInit = {
            method: 'POST',
            headers: header,
            body: postBody
        };

        // listUrl

        const axiosOptions = {
            method: 'POST',
            url: mockUrl,
            data: postBody,
            headers: header,
            json: true
        };

        return Axios(axiosOptions)
            .then((response) => {
                console.log(response);
                // const obj = JSON.parse(json);
                dispatch(gotFetchSolicitacaoList(user, pass, response.data));
                return response;
            })
            .catch((error) => {
                console.log(error);
                dispatch(errorFetchSolicitacaoList(user, pass, error.message));
            });
        /* return fetch(mockUrl, myInit)
            .then((response) => {
                if (response.status === 401) {
                    // 401 returned from server
                    throw new Error('Login inválido');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 403) {
                    // 401 returned from server
                    console.log('Erro na request : 403');
                    throw new Error('Login inválido ');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 415) {
                    // 401 returned from server
                    throw new Error('Login inválido');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 400) {
                    // 401 returned from server
                    throw new Error('Login inválido');
                }
                return response;
            })
            .then((response) => {
                if (response.ok) {
                    // isso é uma promisse
                    return response.text();
                }
                throw new Error('Login inválido');
            })
            // Repetindo isso pode dar diversos dispatchs a partir de um fetch
            .then((json) => {
                // console.log('O texto recebido foi');
                // console.log(json);
                const obj = JSON.parse(json);
                dispatch(gotFetchSolicitacaoList(user, pass, obj));
            })
         .catch((error) => {

                console.log(`There has been a problem with your fetch operation: ${error.message}`);
            }); */

        /* return returnFetchSolicitacaoList(user, pass)
           .then((solicitacaoList) => {
               dispatch(gotFetchSolicitacaoList(user, pass, solicitacaoList));
           })
           .catch((error) => {
               dispatch(errorFetchSolicitacaoList(user, pass, error.message));
               console.log(`There has been a problem with your fetch operation: ${error.message}`);
           }); */
    });

export const fetchApproveSolicitacao = (router, user, pass, approvalObj) => (
    function localreturnFetchSolicitacaoList(dispatch) {
        dispatch(callFetchAprovar(user, pass));

        /*

         private int P_COD_EMPR ;
         private int P_COD_FILI ;
         private int P_COD_SOCO  ;
         private int  P_SEQ ;
         private String P_AF_AUTO  ;
         private String P_MENSAGEM ;

         */

        const postObj =
            {
                name: user.toUpperCase(),
                pass: pass.toUpperCase()
            };

        const token = `${postObj.name}-${postObj.pass}`;
        const postBody = JSON.stringify(approvalObj);

        const header = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            token,
            Accept: 'application/json',
            'Content-Length': postBody.length.toString()
        });


        const myInit = {
            method: 'POST',
            headers: header,
            body: postBody
        };

        console.log(postBody);
        console.log(header);

        console.log('vai enviar aprovacao ');

        return fetch(approveUrl, myInit)
            .then((response) => {
                if (response.status === 401) {
                    // 401 returned from server
                    throw new Error('Erro ao Aprovar');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 415) {
                    // 401 returned from server
                    throw new Error('Erro ao Aprovar');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 403) {
                    // 401 returned from server
                    console.log('Erro na request : 403');
                    throw new Error('Erro ao Aprovar');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 400) {
                    // 401 returned from server
                    throw new Error('Erro ao Aprovar');
                }
                return response;
            })
            .then((response) => {
                if (response.ok) {
                    // isso é uma promisse
                    return response.text();
                }
                throw new Error('Erro ao Aprovar');
            })
            // Repetindo isso pode dar diversos dispatchs a partir de um fetch
            .then((json) => {
                // console.log('O texto recebido foi');
                // console.log(json);
                const obj = JSON.parse(json);
                dispatch(gotFetchAprovar(user, pass, obj));
                console.log('recebeu - aprovação');
                console.log(json);
                redirectConsulta(router, '', dispatch);
            })
            .catch((error) => {
                dispatch(errorFetchAprovar(user, pass, error.message));
                console.log(`There has been a problem with your fetch operation: ${error.message}`);
            });

        /* return returnFetchSolicitacaoList(user, pass)
         .then((solicitacaoList) => {
         dispatch(gotFetchSolicitacaoList(user, pass, solicitacaoList));
         })
         .catch((error) => {
         dispatch(errorFetchSolicitacaoList(user, pass, error.message));
         console.log(`There has been a problem with your fetch operation: ${error.message}`);
         }); */
    });


export const fetchMessage = (contactName, contactContact, contactSubject, contactMessage) => (
    function returnFetchMessage() {
        // dispatch(callFetchAprovar(user, pass));

        /*

         private int P_COD_EMPR ;
         private int P_COD_FILI ;
         private int P_COD_SOCO  ;
         private int  P_SEQ ;
         private String P_AF_AUTO  ;
         private String P_MENSAGEM ;

         */

        const postObj =
            {
                nome: contactName.toUpperCase(),
                contato: contactContact.toUpperCase(),
                assunto: contactSubject.toUpperCase(),
                Mensagem: contactMessage.toUpperCase()
            };

        // const token = `${postObj.name}-${postObj.pass}`;
        const postBody = JSON.stringify(postObj);

        const header = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            // token,
            Accept: 'application/json',
            'Content-Length': postBody.length.toString()
        });


        const myInit = {
            method: 'POST',
            headers: header,
            body: postBody
        };

        console.log(postBody);
        console.log(header);

        console.log('vai enviar mensagem ');

        return fetch(messageUrl, myInit)
            .then((response) => {
                if (response.status === 401) {
                    // 401 returned from server
                    throw new Error('Erro ao Enviar');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 415) {
                    // 401 returned from server
                    throw new Error('Erro ao Enviar');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 403) {
                    // 401 returned from server
                    console.log('Erro na request : 403');
                    throw new Error('Erro ao Enviar');
                }
                return response;
            })
            .then((response) => {
                if (response.status === 400) {
                    // 401 returned from server
                    throw new Error('Erro ao Enviar');
                }
                return response;
            })
            .then((response) => {
                if (response.ok) {
                    // isso é uma promisse
                    return response.text();
                }
                throw new Error('Erro ao Enviar');
            })
            // Repetindo isso pode dar diversos dispatchs a partir de um fetch
            .then((json) => {
                // console.log('O texto recebido foi');
                // console.log(json);
                // const obj = JSON.parse(json);
                // dispatch(gotFetchAprovar(user, pass, obj));
                console.log('recebeu - mensagem');
                console.log(json);
                // redirectConsulta(router, '');
            })
            .catch((error) => {
                // dispatch(errorFetchAprovar(user, pass, error.message));
                console.log(`There has been a problem with your fetch operation: ${error.message}`);
            });

        /* return returnFetchSolicitacaoList(user, pass)
         .then((solicitacaoList) => {
         dispatch(gotFetchSolicitacaoList(user, pass, solicitacaoList));
         })
         .catch((error) => {
         dispatch(errorFetchSolicitacaoList(user, pass, error.message));
         console.log(`There has been a problem with your fetch operation: ${error.message}`);
         }); */
    });
