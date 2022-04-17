import React from 'react'
import { useEffect } from 'react'
import { Button, Row, Col, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
// Componets
import ManagerProduct from '../components/ManagerProduct'
import Loading from '../components/Loading'
// Redux Actions
import { fetchProducts } from '../actions/productActions'
import { managerDeleteProduct } from '../actions/managerActions'
const ManagerProductsPage = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const allProducts = useSelector((state) => state.allProducts)
  const { loading, products, success, error } = allProducts

  const deleteProduct = useSelector((state) => state.deleteProductManager)
  const { deleted } = deleteProduct

  const authSignin = useSelector((state) => state.authSignin)
  const { accountData } = authSignin

  useEffect(() => {
    if (!accountData) {
      history.push('/signin')
    } else {
      if (accountData && accountData.isManager) {
        dispatch(fetchProducts)
      }
    }
  }, [dispatch, history, accountData, deleted])

  const deleteProductHandler = (id) => {
    dispatch(managerDeleteProduct(id))
  }
  const newProduct = () => {
    //dispatch(createProduct())
  }

  return (
    <>
      <Container className='pt-4' fluid>
        <Row className='align-items-center'>
          <Col>
            <Button
              className='my-3'
              onClick={newProduct}
              variant='outline-dark'
            >
              <i class='fa-regular fa-square-plus'></i> PRODUCT
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loading />
            ) : success ? (
              <Row>
                {products.map((product) => (
                  <Col lg={4} sm={12} xl={3} md={6} key={product._id}>
                    <ManagerProduct
                      item={product}
                      deleteProductHandler={deleteProductHandler}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              error
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ManagerProductsPage
