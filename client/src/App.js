import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SignupPage from './pages/signupPage'
import SigninPage from './pages/SigninPage'
import ProductPage from './pages/ProductPage'
import BasketPage from './pages/BasketPage'
import AccountPage from './pages/AccountPage'
import { Container } from 'react-bootstrap'

import { Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css' // Maybe delete later
import 'slick-carousel/slick/slick.css' //delete if no coursel
import 'slick-carousel/slick/slick-theme.css' // -.-.-.-.-

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='py-2'>
          <Container>
            <Route path='/' component={HomePage} exact />
            <Route path='/profile' component={AccountPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/signin' component={SigninPage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/basket/:id?' component={BasketPage} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
