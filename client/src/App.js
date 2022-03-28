import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import BasketPage from './pages/BasketPage'
import { Container } from 'react-bootstrap'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css' // Maybe delete later
import 'slick-carousel/slick/slick.css' //delete if no coursel
import 'slick-carousel/slick/slick-theme.css' // -.-.-.-.-
import SigninPage from './pages/SigninPage'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='py-2'>
          <Container>
            <Route path='/' component={HomePage} exact />
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
