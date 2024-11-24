import { useEffect, useState } from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'

function Home() {
  useEffect(()=>{document.title='KitchenAccountance - главная'},[])
  return (
    <div className='m-0 p-0 d-flex flex-column justify-content-start align-items-center'>
      <h1 className='app-title'>KitchenAccountance</h1>
      {/* <h3 className='app-desc'>
        электронный офис для профессиональной кухни
      </h3> */}
      <Carousel className='mt-4' style={{maxWidth:'calc(100vw - 2em)'}}>
        <CarouselItem>
          <Image className='carousel-image' src='/images/kitchen-1.jpg'/>
          <Carousel.Caption className='carousel-caption'>
          <h3 className='app-desc'>электронный офис для профессиональной кухни</h3>
          <p></p>
        </Carousel.Caption>
        </CarouselItem>
        <CarouselItem>
          <Image className='carousel-image' src='/images/kitchen-scales.jpg'/>
          <Carousel.Caption className='carousel-caption'>
          <h3 className='app-desc'>гибкая калькуляция себестоимости:</h3>
          <p>на основе данных позиций закупки</p>
        </Carousel.Caption>
        </CarouselItem>
        <CarouselItem>
          <Image className='carousel-image' src='/images/food-supplies-1.jpg'/>
          <Carousel.Caption className='carousel-caption'>
          <h3 className='app-desc'>удобная работа с прайс-листами:</h3>
          <p>сортировка и расширенный поиск, импорт из excel</p>
        </Carousel.Caption>
        </CarouselItem>
      </Carousel>
    </div>
  )
}

export default Home
