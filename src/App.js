import React, {useRef, useEffect} from 'react'
import NavBar from './components/NavBar'
import Timeline from './components/Timeline'
import {Route} from 'react-router-dom'
import Scroll from '../src/components/Scroll'
import gsap from 'gsap'
import {Link} from 'react-router-dom';
import {ScrollTrigger} from 'gsap/ScrollTrigger'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ProgressBar } from 'scrolling-based-progressbar';
import AddEvent from './components/AddEvent'
import EditEvent from './components/EditEvent'

gsap.registerPlugin(ScrollTrigger)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#BC002D',
    },
  },
  text: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#fff',
    },
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/nonoumasy/">
        Nonoumasy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  const revealRefs = useRef([])
  revealRefs.current =[]

  useEffect(() => {
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(el, {
        autoAlpha: 0
      }, {
        duration: 1,
        autoAlpha: 1,
        ease: 'expo',
        scrollTrigger: {
          id: `section-${index + 1}`,
          trigger: el,
          start: 'top center+=80',
          toggleActions: 'play none none reverse',
          scrub: 1,
          // markers: true
        }
      })
    })
  }, [])

  const addToRefs = el => {
    if(el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  } 

  return (
    <>
      <ThemeProvider theme={theme}>
        <Scroll showBelow={300} />
        <NavBar />
        <Route exact path='/add'>
          <AddEvent />
        </Route>
        <Route 
          exact path='/update/:id' 
          render={props => <EditEvent {...props} />}
        />
        <ProgressBar height="1px" color="#BC002D" />
        <Route exact path='/'>
          <div style={{ marginTop: 100, marginLeft: -220 }}>
            <Timeline addToRefs={addToRefs} />
          </div>
        </Route>
        <Box mb={4} mt={8}>
          <Copyright />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
