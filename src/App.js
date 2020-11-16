import React, {useRef, useEffect} from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import {Route} from 'react-router-dom'
import Scroll from './components/shared/Scroll'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddEvent from './components/AddEvent'
import EditEvent from './components/EditEvent'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Login from './components/Login'

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
      main: '#BC002D',
    },
  }
});

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
          start: `top center+=100`,
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

        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>

        <Route 
          exact path='/update/:id' 
          render={props => <EditEvent {...props} />}
        />

        <Route exact path='/'>
          <div style={{ marginTop: 80, marginLeft: -200 }}>
            <Home addToRefs={addToRefs} />
          </div>
        </Route>

        <Footer mb={4} mt={8}/>

      </ThemeProvider>
    </>
  );
}

export default App;
