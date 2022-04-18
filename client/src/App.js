import React from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SignupPage from './pages/signupPage'
import SigninPage from './pages/SigninPage'
import ProductPage from './pages/ProductPage'
import BasketPage from './pages/BasketPage'
import AccountPage from './pages/AccountPage'
import OrderPage from './pages/OrderPage'
import CompleteOrderPage from './pages/CompleteOrderPage'
import UserOrdersPage2 from './pages/UserOrdersPage2'
import OrdersPage from './pages/OrdersPage'
import ManagerProductsPage from './pages/ManagerProductsPage'
import ProductUpdateManagerPage from './pages/ProductUpdateManagerPage'
import OrdersManagerPage from './pages/OrdersManagerPage'

import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'
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
            <Route path='/checkout' component={OrderPage} />
            <Route path='/order' component={CompleteOrderPage} />
            <Route path='/orders/:id' component={UserOrdersPage2} />
            <Route path='/allOrders' component={OrdersPage} />
            <Route path='/manager/orders' component={OrdersManagerPage} />
            <Route path='/manager/products' component={ManagerProductsPage} />
            <Route
              path='/manager/product/:id/update'
              component={ProductUpdateManagerPage}
            />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
