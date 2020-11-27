import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import {Route, Switch} from 'react-router-dom'
import Scroll from './components/shared/Scroll'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddEvent from './components/AddEvent'
import EditTimeline from './components/EditTimeline'
import EditEvent from './components/EditEvent'
import Signup from './components/Signup'
import Login from './components/Login'
import AddTimeline from './components/AddTimeline'
import TimelineDetail from './components/TimelineDetail'
import ImportData from './components/ImportData'
import NotFoundPage from './components/NotFoundPage'

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
  }
});

function App() {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Scroll showBelow={300} />
        <NavBar />
        <Switch>
          
          <Route path='/signup'>
            <Signup />
          </Route>
          
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/import/:id'>
            <div style={{ margin: '60px auto' }}>
              <ImportData />
            </div>
          </Route>

          <Route
            exact path='/editTimeline/:id'
            render={props => <EditTimeline {...props} />}
          />

          <Route
            exact path='/editEvent/:id'
            render={props => <EditEvent {...props} />}
          />

          <Route exact path='/'>
            <div style={{ margin: '60px auto' }}>
              <Home />
            </div>
          </Route>

          <Route
            exact path='/timeline/:id/addEvent'>
            <AddEvent />
          </Route>

          <Route exact path='/timeline/:id'>
            <div style={{ marginTop: '60px' }}>
              <TimelineDetail />
            </div>
          </Route>

          <Route exact path='/timeline/:id'>
            <div style={{ marginTop: '60px' }}>
              <TimelineDetail />
            </div>
          </Route>


          <Route exact path='/addTimeline'>
            <div style={{ margin: '60px auto' }}>
              <AddTimeline />
            </div>
          </Route>

          {/* <Box mt={8} mb={4}>
          <Footer />
        </Box> */}

          <Route path='*'>
            <NotFoundPage style={{ marginTop: '360px' }}/>
          </Route>

        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
