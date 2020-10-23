import 'typeface-roboto-material'

import React from 'react'
import ReactDOM from 'react-dom'

import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'

import { ConnectedRouter } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './components/Theme.js'
import { createStoreInstance } from './store/store.js'

import Template from './components/MainTemplateComponent.jsx'
import LoggedTemplate from './components/LoggedTemplate.jsx'
import EmptyLoading from './components/startup/EmptyLoading.jsx'
import Login from './components/startup/Login.jsx'
import Home from './components/main/Home.jsx'
import Components from './components/main/Components.jsx'
import Database from './components/main/Database.jsx'

const history = createHashHistory()

const storeInstance = createStoreInstance(history)

ReactDOM.render(
	<Provider store={storeInstance}>
		<ConnectedRouter history={history}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Template>
					<Switch>
						<Route exact path='/' component={EmptyLoading} />
						<Route exact path='/login' component={Login} />
						<Route
							path='/user'
							render={() => (
								<LoggedTemplate>
									<Switch>
										<Route path='/user/home' component={Home} />
										<Route path='/user/components' component={Components} />
										<Route path='/user/database' component={Database} />
									</Switch>
								</LoggedTemplate>
							)}
						/>
					</Switch>
				</Template>
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
)
