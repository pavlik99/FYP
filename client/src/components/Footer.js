import React from 'react'
import {
  CDBFooter,
  CDBFooterLink,
  CDBBox,
  CDBBtn,
  CDBModalFooter,
  CDBCloseIcon,
} from 'cdbreact'

export const Footer = () => {
  return (
    <CDBModalFooter className='shadow'>
      <CDBBox
        display='flex'
        flex='column'
        className='mx-auto py-5'
        style={{ width: '90%' }}
      >
        <CDBBox display='flex' justifyContent='between' className='flex-wrap'>
          <CDBBox>
            <a href='/' className='d-flex align-items-center p-0 text-dark'>
              <img alt='logo' src='logo' width='30px' />
              <span className='ml-3 h5 font-weight-bold'>Devwares</span>
            </a>
            <p className='my-3' style={{ width: '250px' }}>
              We are creating High Quality Resources and tools to Aid developers
              during the developement of their projects
            </p>
            <CDBBox display='flex' className='mt-4'>
              <CDBBtn flat color='dark'>
                <CDBCloseIcon />
              </CDBBtn>
              <CDBBtn flat color='dark' className='mx-3'>
                <CDBCloseIcon />
              </CDBBtn>
              <CDBBtn flat color='dark' className='p-2'>
                <CDBCloseIcon />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className='h5 mb-4' style={{ fontWeight: '600' }}>
              Devwares
            </p>
            <CDBBox
              flex='column'
              style={{ cursor: 'pointer', padding: '0' }}
            ></CDBBox>
          </CDBBox>
          <CDBBox>
            <p className='h5 mb-4' style={{ fontWeight: '600' }}>
              Help
            </p>
            <CDBBox
              flex='column'
              style={{ cursor: 'pointer', padding: '0' }}
            ></CDBBox>
          </CDBBox>
          <CDBBox>
            <p className='h5 mb-4' style={{ fontWeight: '600' }}>
              Products
            </p>
            <CDBBox
              flex='column'
              style={{ cursor: 'pointer', padding: '0' }}
            ></CDBBox>
          </CDBBox>
        </CDBBox>
        <small className='text-center mt-5'>
          &copy; Devwares, 2020. All rights reserved.
        </small>
      </CDBBox>
    </CDBModalFooter>
  )
}

export default Footer
