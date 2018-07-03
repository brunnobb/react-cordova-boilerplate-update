import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from 'store2';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import SolicitacaoList from './components/SolicitacaoList.jsx';
import Aprovar from './components/Aprovar.jsx';
import Template from './components/MainTemplateComponent.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Contato from './components/Contato.jsx';
import Teste from './components/Teste.jsx';
import configureStore from './store/configureStore';

injectTapEventPlugin();

let preloadedState = {};
let loggedUser;
let loggedUserPass;

if (typeof (Storage) !== 'undefined') {
    // Code for localStorage/sessionStorage.
    loggedUser = store('loggedUser') || '';
    loggedUserPass = store('loggedUserPass') || '';

    preloadedState = {
        loggedUser,
        loggedUserPass
    };
}


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const rMiddleware = routerMiddleware(history);

const storeInstance = configureStore(preloadedState, rMiddleware);

ReactDOM.render(
    (
        <Provider store={storeInstance}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/contato" component={Contato} />
                    <Route
                        path="/sc"
                        render={() => (
                            <Template>
                                <Switch>
                                    <Route exact path="/sc/consulta" component={SolicitacaoList} />
                                    <Route path="/sc/consulta/:filter" component={SolicitacaoList} />
                                    <Route path="/sc/aprovar/:filter" component={Aprovar} />
                                    <Route path="/sc/teste/" component={Teste} />
                                </Switch>
                            </Template>)}
                    />
                </Switch>
            </ConnectedRouter>
        </Provider>
    ),
    document.getElementById('app')
);
