import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
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

const HomePage = (props) => {
  const dispatch = useDispatch()
  const keyword = props.match.params.keyword

  const allProducts = useSelector((state) => state.allProducts)
  const { loading, products, success, error } = allProducts

  useEffect(() => {
    dispatch(fetchProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <Container className=' pt-2' fluid>
        <CarouselElement />
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

        <Icons />
        <Row className='py-3'>
          <Col>
            <Link to={'/recipes'}>
              <img
                src='/images/news2.jpg'
                height={350}
                width={600}
                className='homeImage'
                alt=''
              />
            </Link>
          </Col>
          <Col>
            <Link to={'/link/recipes'}>
              <img
                src='/images/recipes.jpg'
                height={350}
                width={600}
                className=' homeImage'
                alt=''
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
