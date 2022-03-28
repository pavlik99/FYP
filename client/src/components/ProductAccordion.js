import React from 'react'
import { Accordion } from 'react-bootstrap'
//import Product from '../../../server/models/productModel'

const ProductAccordion = ({product}) => {
  return (
    <>
    <Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Product Information</Accordion.Header>
    <Accordion.Body>
     {product.information}
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Ingredients</Accordion.Header>
    <Accordion.Body>
    {product.ingredients}
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>Nutrition</Accordion.Header>
    <Accordion.Body>
    {product.nutrition}
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header>Allergy Advice</Accordion.Header>
    <Accordion.Body>
    {product.allergens}
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
    
    </>
  )
}

export default ProductAccordion