import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const Icons = () =>{
     return (

    <Container>
        <Row className='py-3 my-2'>
        <Col className='text-center'><img src='/images/salad.png' className='px-4 ml-3' alt="" /> </Col>
        <Col className='text-center'><img src='/images/checklist.png' className='px-4 ml-3' alt="" /></Col>
        <Col className='text-center' > <img src='/images/healthy-living.png' className='px-4 ml-3' alt=""/></Col>
    </Row>
    </Container>

     )
}
export default Icons