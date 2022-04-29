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
import UserOrdersPage from './pages/UserOrdersPage'
import ManagerProductsPage from './pages/ManagerProductsPage'
import ProductUpdateManagerPage from './pages/ProductUpdateManagerPage'
import OrdersManagerPage from './pages/OrdersManagerPage'
import RecipePage from './pages/RecipePage'
import OneRecipePage from './pages/OneRecipePage'
import UserRecipe from './pages/UserRecipe'
import UserOrders from './pages/UserOrders'
import UpdateRecipePage from './pages/UpdateRecipePage'
import LinkArticlePage from './pages/LinkArticlePage'
import LinkRecipePage from './pages/LinkRecipePage'
import LinkNewsPage from './pages/LinkNewsPage'
import AllProductsPage from './pages/AllProductsPage'
import VeganPage from './pages/VeganProducts'
import OrganicPage from './pages/OrganicProducts'

import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import 'slick-carousel/slick/slick.css'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='py-2'>
          <Container>
            <Route path='/' component={HomePage} exact />
            <Route path='/search/:keyword' component={HomePage} />
            <Route path='/profile' component={AccountPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/signin' component={SigninPage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/basket/:id?' component={BasketPage} />
            <Route path='/checkout' component={OrderPage} />
            <Route path='/order' component={CompleteOrderPage} />
            <Route path='/orders/:id' component={UserOrdersPage} />
            <Route path='/manager/orders' component={OrdersManagerPage} />
            <Route path='/manager/products' component={ManagerProductsPage} />
            <Route path='/recipes' component={RecipePage} />
            <Route path='/profiles/myrecipes' component={UserRecipe} />
            <Route path='/recipe/:id' component={OneRecipePage} />
            <Route path='/profiles/orders' component={UserOrders} />
            <Route
              path='/manager/product/:id/update'
              component={ProductUpdateManagerPage}
            />
            <Route path='/update/:id' component={UpdateRecipePage} />
            <Route path='/link/articles' component={LinkArticlePage} />
            <Route path='/link/recipes' component={LinkRecipePage} />
            <Route path='/link/news' component={LinkNewsPage} />
            <Route path='/allproducts' component={AllProductsPage} />
            <Route path='/veganproducts' component={VeganPage} />
            <Route path='/organicproducts' component={OrganicPage} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
