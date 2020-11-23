import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import {Route} from 'react-router-dom'
import Scroll from './components/shared/Scroll'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddEvent from './components/AddEvent'
import EditTimeline from './components/EditTimeline'
import EditEvent from './components/EditEvent'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Login from './components/Login'
import AddTimeline from './components/AddTimeline'
import TimelineDetail from './components/TimelineDetail'

import Box from '@material-ui/core/Box';
import ImportData from './components/ImportData'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#333',
    },
  },
  text: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#BC002D',
    },
  }
});

function App() {
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Scroll showBelow={300} />
        <NavBar/>

        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/import'>
          <div style={{ margin: '80px auto' }}>
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
          <div style={{ margin: '80px auto'}}>
            <Home />
          </div>
        </Route>

        <Route 
          exact path='/timeline/:id/addEvent'>
          <AddEvent />
        </Route>

        <Route exact path='/timeline/:id'>
          <div style={{ margin: '80px auto'}}>
            <TimelineDetail />
          </div>
        </Route>


        <Route exact path='/addTimeline'>
          <div style={{ margin: '80px auto' }}>
            <AddTimeline />
          </div>
        </Route>

        <Box mt={8} mb={4}>
          <Footer />
        </Box>
        

      </ThemeProvider>
    </>
  );
}

export default App;
