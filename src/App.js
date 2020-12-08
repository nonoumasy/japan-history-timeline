import React from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import { AuthProvider } from './components/AuthContext'
// import PrivateRoute from './components/PrivateRoute'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home'
import Login from './components/Login'
import AddEvent from './components/AddEvent'
import EditStory from './components/EditStory'
import EditEvent from './components/EditEvent'
import AddStory from './components/AddStory'
import Story from './components/Story'
import ImportData from './components/ImportData'
import NotFoundPage from './components/NotFoundPage'
import Profile from './components/Profile';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Footer from './components/Footer';

import { Box } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#333',
    },
    default: {
      main: '#ffffff',
    },
  },
  text: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: 'red',
    },
  },
});

function App() {
  
  return (
    <>
      {/* <AuthProvider> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <NavBar />
            <Switch>

            <Route path='/login'>
              <Login />
            </Route>

            <Route exact path='/AddStory'>
              <div style={{ margin: '60px auto' }}>
                <AddStory />
              </div>
            </Route>

            <Route
              exact path='/editStory/:id'
              render={props => <EditStory {...props} />}
            />

            <Route
              exact path='/story/:id/addEvent'>
              <AddEvent />
            </Route>

            <Route
              exact path='/editEvent/:id'
              render={props => <EditEvent {...props} />}
            />

            <Route exact path='/'>
              <div style={{ marginTop: '90px' }}>
                <Home />
              </div>
            </Route>

            <Route exact path='/story/:id'>
              <div style={{ marginTop: '60px' }}>
                <Story />
              </div>
            </Route>

            <Route exact path='/profile'>
              <div style={{ margin: '60px auto' }}>
                <Profile />
              </div>
            </Route>

            <Route exact path='/terms'>
              <div style={{ margin: '100px auto' }}>
                <Terms />
              </div>
            </Route>

            <Route exact path='/privacy'>
              <div style={{ margin: '100px auto' }}>
                <Privacy />
              </div>
            </Route>

            <Route path='*'>
              <NotFoundPage style={{ marginTop: '360px' }} />
            </Route>

            {/* <Box mt={8} mb={4}>
              <Footer />
            </Box> */}

            </Switch>
          </Router>

        </ThemeProvider>
    {/* </AuthProvider> */}
    </>
  );
}

export default App;
