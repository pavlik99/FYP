import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import PromotionCard from '../components/PromotionCard'
import PromotionCard2 from '../components/PromotionCard2'
import Icons from '../components/Icons'
import { fetchProducts } from '../actions/productActions'
import Loading from '../components/Loading'

const HomePage = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.allProducts)
  const { loading, products, success, error } = allProducts

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <h1>Best-Selling Products</h1>
      {loading ? (
        <Loading />
      ) : success ? (
        <Row>
          {/* <Col lg={4} sm={12} xl={3} md={6} key={product._id}> */}
          {products.map((product) => (
            <Col lg={4} sm={12} xl={3} md={6} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        error
      )}

      <Icons />
      <Row>
        <Col>
          <PromotionCard />
        </Col>
        <Col>
          <PromotionCard2 />
        </Col>
      </Row>
    </>
  )
}

export default HomePage
