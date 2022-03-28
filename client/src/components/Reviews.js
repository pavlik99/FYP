import React from 'react'


//<i className={value >= 4 ? 'fa-solid fa-heart' : value >= 3.5 ? 'fa-solid fa-heart-pulse'  : 'fa-regular fa-heart'}></i>
const Reviews = ({value, text}) => {
  return (
    <div className='reviews'>
        <span>
        <img alt="reviews" className='px-1' src={value >=1 ? '/images/full-star.png': value >=0.5 ? '/images/half-star.png': '/images/empty-star.png'} />
        </span>
        <span>
        <img alt="reviews" className='px-1'  src={value >=2 ? '/images/full-star.png': value >=1.5 ? '/images/half-star.png': '/images/empty-star.png' } />
        </span>
        <span>
        <img alt="reviews" className='px-1' src={value >=3 ? '/images/full-star.png': value >=2.5 ? '/images/half-star.png': '/images/empty-star.png' } />
        </span>
        <span>
        <img alt="reviews" className='px-1' src={value >=4 ? '/images/full-star.png': value >=3.5 ? '/images/half-star.png': '/images/empty-star.png' } />
        </span>
        <span>
        <img alt="reviews" className='px-1' src={value >=5 ? '/images/full-star.png': value >=4.5 ? '/images/half-star.png': '/images/empty-star.png' } />
        </span> 
        <span>{text && text }</span>
    </div>
  )
}

export default Reviews