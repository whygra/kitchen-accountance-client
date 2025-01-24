import { useEffect, useState } from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import BrowseCreateProjectBtn from './shared/BrowseCreateProjectBtn'

function Home() {
  useEffect(()=>{document.title='KitchenAccountance - главная'},[])
  return (
    <div className='h-100 m-0 p-0 d-flex flex-column justify-content-between align-items-center'>
    <div className='position-relative w-100 m-0 p-0 py-5 d-flex flex-column justify-content-between align-items-center'>
      <h1 className='app-title'>KitchenAccountance</h1>

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
      <div className='p-4'>
        <BrowseCreateProjectBtn/>

      </div>
    </div>
      <div className='w-100 border-top pt-4 mt-5 text-center bottom-0'>
        <h6>kitchen-accountance@yandex.ru</h6>
      </div>
    </div>
  )
}

export default Home
