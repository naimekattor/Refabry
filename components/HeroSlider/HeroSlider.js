import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function HeroSlider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={"/img2.jpg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img3.jpg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img4.jpg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img5.jpeg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img6.webp"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img7.jpg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img8.jpg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img9.jpg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/img5.jpeg"}
            alt="banner"
            width={600}
            height={400}
            className=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
