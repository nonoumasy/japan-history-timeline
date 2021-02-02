import React from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import AddEvent from './components/AddEvent'
import EditStory from './components/EditStory'
import EditEvent from './components/EditEvent'
import AddStory from './components/AddStory'
import Story from './components/Story'
import NotFoundPage from './components/NotFoundPage'
import Profile from './components/Profile';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
        <ThemeProvider theme={theme}>
          <Router>
            <NavBar />
              <div style={{ marginTop: '60px' }}>
                <Switch>
                  <Route path='/login'>
                    <Login />
                  </Route>

                  <Route exact path='/'>
                      <Home />
                  </Route>

                  <Route exact path='/story/:id'>
                      <Story />
                  </Route>

                  <Route exact path='/addStory'>
                      <AddStory />
                  </Route>

                  <Route
                    exact path='/editStory/:id'
                    render={props => <EditStory {...props} />}
                  />

                  <Route
                    exact path='/story/:story_id/addEvent'>
                    <AddEvent />
                  </Route>

                  <Route
                    exact path='/story/:story_id/editEvent/:event_id'
                    render={props => <EditEvent {...props} />}
                  />

                  <Route exact path='/profile'>
                      <Profile />
                  </Route>

                  <Route exact path='/terms'>
                      <Terms />
                  </Route>

                  <Route exact path='/privacy'>
                      <Privacy />
                  </Route>

                  <Route path='*'>
                    <NotFoundPage style={{ marginTop: '360px' }} />
                  </Route>

                  {/* <Box mt={8} mb={4}>
                  <Footer />
                </Box> */}

                </Switch>
              </div>
            
          </Router>

        </ThemeProvider>
    {/* </AuthProvider> */}
    </>
  );
}

export default App;
