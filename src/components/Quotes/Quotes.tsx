import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const Quotes = () => {
  return (
    <div className="max-w-3xl mx-auto border-4 my-5 p-5 rounded-lg">
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper p-5 lg:p-0"
      >
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center">
            To plant a garden is to believe in tomorrow.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center">
            Gardening adds years to your life and life to your years.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center text-center">
            Gardening is the art that uses flowers and plants as paint, and the
            soil and sky as canvas.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center">
            In every gardener, there is a child who believes in the seed's
            magic.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center">
            A garden is a friend you can visit any time.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center">
            The love of gardening is a seed once sown that never dies.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center text-center">
            Gardens are not made by singing 'Oh, how beautiful!' and sitting in
            the shade.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center">
            In every gardener, there is a child who believes in the seed's
            magic.
          </q>
        </SwiperSlide>
        <SwiperSlide>
          <q className="text-xl font-bold flex items-center justify-center text-center">
            The glory of gardening: hands in the dirt, head in the sun, heart
            with nature.
          </q>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Quotes;
