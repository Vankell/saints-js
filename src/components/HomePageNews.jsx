import React from 'react';
import news_banner from '../assets/newsbanner.png';
import news_car_image from '../assets/placeholdernews.png';

function HomePageNews() {
  return (
    <div className='container'>
      <div className='row d-flex gap-1'>
        <div className='col-md-4 col-xs-12'>
          <img src={news_banner} className='w-100 rounded img-fluid ' />
        </div>
        <div className='col-md-7 col-xs-12'>
          <img src={news_car_image} className='w-100 rounded img-fluid' />
        </div>
      </div>
      <div className='container'>
        <div className='row d-flex justify-content-between'>
          <div className='card col-12 col-md-3'>
            <img className='card-img-top' src='...' alt='ADD AN IMAGE!!' />
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>Alan, please modify the cards</p>
              <div className='d-flex justify-content-center'>
                <a href='#' className='btn btn-success' style={{ borderRadius: 0 }}>
                  Add to cart!
                </a>
              </div>
            </div>
          </div>
          <div className='card col-12 col-md-3'>
            <img className='card-img-top' src='...' alt='ADD AN IMAGE!!' />
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>Alan, please modify the cards</p>
              <div className='d-flex justify-content-center'>
                <a href='#' className='btn btn-success' style={{ borderRadius: 0 }}>
                  Add to cart!
                </a>
              </div>
            </div>
          </div>
          <div className='card col-12 col-md-3'>
            <img className='card-img-top' src='...' alt='ADD AN IMAGE!!' />
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>Alan, please modify the cards</p>
              <div className='d-flex justify-content-center'>
                <a href='#' className='btn btn-success' style={{ borderRadius: 0 }}>
                  Add to cart!
                </a>
              </div>
            </div>
          </div>
          <div className='card col-12 col-md-3'>
            <img className='card-img-top' src='...' alt='ADD AN IMAGE!!' />
            <div className='card-body'>
              <h5 className='card-title'>Card title</h5>
              <p className='card-text'>Alan, please modify the cards</p>
              <div className='d-flex justify-content-center'>
                <a href='#' className='btn btn-success' style={{ borderRadius: 0 }}>
                  Add to cart!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageNews;
