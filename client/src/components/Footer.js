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
        className='mx-auto py-2'
        style={{ width: '85%' }}
      >
        <CDBBox display='flex' justifyContent='between' className='flex-wrap'>
          <CDBBox>
            <p className='my-3 footerFont' style={{ width: '250px' }}>
              “The only way to keep your health is to eat what you don’t want,
              drink what you don’t like, and do what you’d rather not.” – Mark
              Twain
            </p>
          </CDBBox>
          <CDBBox>
            <p className='h5 mb-3' style={{ fontWeight: '600' }}>
              Explore
            </p>
            <div className='py-1'>Home</div>
            <div className='py-1'>About</div>
            <div className='py-1'>Careers</div>
          </CDBBox>
          <CDBBox>
            <p className='h5 mb-4' style={{ fontWeight: '600' }}>
              Help
            </p>

            <div className='py-1'>Products</div>
            <div className='py-1'>Orders</div>
            <div className='py-1'>Track Delivery</div>
          </CDBBox>
          <CDBBox>
            <p className='h5 mb-4' style={{ fontWeight: '600' }}>
              Legal
            </p>
            <div className='py-1'>Terms</div>
            <div className='py-1'>Privacy</div>
            <div className='py-1'>Information</div>
          </CDBBox>
        </CDBBox>
        <small className='text-center mt-4 '>
          &copy; Healthy Living, 2022. All rights reserved.
        </small>
      </CDBBox>
    </CDBModalFooter>
  )
}

export default Footer
