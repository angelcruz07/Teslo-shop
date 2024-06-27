'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

interface Props {
  images: string[]
  className?: string
  title: string
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : undefined
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'>
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={800}
              height={800}
              className='rounded-lg object-fill w-96'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'>
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={250}
              height={250}
              className='rounded-lg object-fill w-20'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
