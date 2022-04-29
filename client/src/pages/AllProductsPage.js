import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Icons from '../components/Icons'
import Loading from '../components/Loading'
import Product from '../components/Product'
import CarouselElement from '../components/Carousel'
import PromotionCard from '../components/PromotionCard'
import PromotionCard2 from '../components/PromotionCard2'
//Actions
import { fetchProducts } from '../actions/productActions'

const AllProductsPage = (props) => {
  const dispatch = useDispatch()
  const keyword = props.match.params.keyword

  const allProducts = useSelector((state) => state.allProducts)
  const { loading, products, success, error } = allProducts

  const newProductManager = useSelector((state) => state.newProductManager)
  const { created } = newProductManager

  const deleteProduct = useSelector((state) => state.deleteProductManager)
  const { deleted } = deleteProduct

  const rateProduct = useSelector((state) => state.rateProduct)
  const { rated } = rateProduct

  useEffect(() => {
    dispatch(fetchProducts(keyword))
  }, [dispatch, keyword, rated])

  return (
    <>
      <Container className=' pt-2' fluid>
        <Row>
          <Col>
            <PromotionCard />
          </Col>
          <Col>
            <PromotionCard2 />
          </Col>
        </Row>
        {loading ? (
          <Loading />
        ) : success ? (
          <Row className='center pt-2'>
            {products.map((product) => (
              <Col lg={4} sm={12} xl={3} md={6} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          error
        )}
      </Container>
    </>
  )
}

export default AllProductsPage
