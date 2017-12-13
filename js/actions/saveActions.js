import store from 'store2';

export const saveLocalStorageLogin = (user, pass) => new Promise((resolve) => {
    store('loggedUser', (user || ''));
    store('loggedUserPass', (pass || ''));
    resolve();
});

export const saveLocalStorageLogout = () => new Promise((resolve) => {
    store('loggedUser', '');
    store('loggedUserPass', '');
    resolve();
});
