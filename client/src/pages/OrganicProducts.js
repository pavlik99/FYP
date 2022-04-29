import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Loading from '../components/Loading'
import Product from '../components/Product'
import PromotionCard from '../components/PromotionCard'
import PromotionCard2 from '../components/PromotionCard2'
//Actions
import { fetchProducts } from '../actions/productActions'

const OrganicPage = (props) => {
  const dispatch = useDispatch()
  const keyword = props.match.params.keyword

  const allProducts = useSelector((state) => state.allProducts)
  const newProductManager = useSelector((state) => state.newProductManager)
  const rateProduct = useSelector((state) => state.rateProduct)
  const deleteProduct = useSelector((state) => state.deleteProductManager)

  const { loading, products, success, error } = allProducts
  const { created } = newProductManager
  const { deleted } = deleteProduct
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
              <>
                {product.isOrganic && (
                  <>
                    <Col lg={4} sm={12} xl={3} md={4} key={product._id}>
                      {' '}
                      <Product product={product} />{' '}
                    </Col>{' '}
                  </>
                )}
              </>
            ))}
          </Row>
        ) : (
          error
        )}
      </Container>
    </>
  )
}

export default OrganicPage
