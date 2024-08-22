import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { Preload, Image as ImageImpl } from '@react-three/drei';

import * as THREE from 'three';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Autoplay } from 'swiper';


function Image(props: any) {
	const ref = useRef<THREE.Group>();
	const group = useRef<THREE.Group>();

	return (
		// @ts-ignore
		<group ref={group}>
			<ImageImpl ref={ref} {...props} />
		</group>
	);
}

function Page({ m = 0.4, urls, ...props }: any) {
	const { width } = useThree((state) => state.viewport);
	const w = width < 10 ? 1.5 / 3 : 1 / 3;

	return (
		<group {...props}>
			<Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
			<Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
			<Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
		</group>
	);
}

function Pages() {
	const { width } = useThree((state) => state.viewport);

	return (
		<>
			<Page position={[width * 0, 0, 0]} urls={['/img/fiber/img7.jpg', '/img/fiber/img8.jpg', '/img/fiber/img1.jpg']} />
			<Page position={[width * 1, 0, 0]} urls={['/img/fiber/img4.jpg', '/img/fiber/img5.jpg', '/img/fiber/img6.jpg']} />
			<Page position={[width * 2, 0, 0]} urls={['/img/fiber/img2.jpg', '/img/fiber/img3.jpg', '/img/fiber/img4.jpg']} />
			<Page position={[width * 3, 0, 0]} urls={['/img/fiber/img7.jpg', '/img/fiber/img8.jpg', '/img/fiber/img1.jpg']} />
			<Page position={[width * 4, 0, 0]} urls={['/img/fiber/img4.jpg', '/img/fiber/img5.jpg', '/img/fiber/img6.jpg']} />
		</>
	);
}

export default function FiberContainer() {
	return (
		<div className="threeJSContainer" style={{ marginTop: '100px', width: '100%', height: '512px' }}>
		
             <Swiper
        className="fz-9-banner-slider owl-carousel"
        loop={true}
        autoplay={true}
        modules={[Autoplay]}
      >
        <SwiperSlide
          className="fz-9-banner-slide pt-30 pb-120 bg-default"
          style={{
            backgroundImage: "url(assets/images/fz-9-banner-bg.png)",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-3 col-4">
                <div className="fz-9-banner-left-img">
                  <img src="/img/banner/card-img-1.png" alt="banner" />
				  <span>chocalate coated cake</span>
				  <p>$64</p>
                </div>
              </div>
              <div className="col-md-6 col-12 order-3 order-md-2">
                <div className="fz-9-banner-content">
                  <h4 className="fz-9-banner-subtitle">
                    Flat <span>20%</span> Off
                  </h4>
                  <h1 className="fz-9-banner-title">
				  A Symphony of Flavors in Every Bite.
                  </h1>
                  <Link className="fz-9-def-btn fz-9-def-btn-pink" href="/shop">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-4 order-2 order-md-3">
                <div className="fz-9-banner-right-img">
                  <img src="/img/banner/card-img-2.jpg" alt="banner" />
				  <span>chocalate coated cake</span>
				  <p>$64</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="fz-9-banner-slide pt-30 pb-120 bg-default"
          style={{
            backgroundImage: "url(assets/images/fz-9-banner-bg.png)",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-3 col-4">
                <div className="fz-9-banner-right-img">
                  <img src="/img/banner/card-img-3.jpg" alt="banner" />
				  <span>chocalate coated cake</span>
				  <p>$64</p>
                </div>
              </div>
              <div className="col-md-6 col-12 order-3 order-md-2">
                <div className="fz-9-banner-content">
                  <h4 className="fz-9-banner-subtitle">
                    Flat <span>20%</span> Off
                  </h4>
                  <h1 className="fz-9-banner-title">
				  Elevate Your Cake Cravings.
                  </h1>
                  <Link className="fz-9-def-btn fz-9-def-btn-pink" href="/shop">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-4 order-2 order-md-3">
                <div className="fz-9-banner-left-img">
                  <img src="/img/banner/card-img-4.jpg" alt="banner" />
				  <span>chocalate coated cake</span>
				  <p>$64</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

		<SwiperSlide
          className="fz-9-banner-slide pt-30 pb-120 bg-default"
          style={{
           // backgroundImage: "url(/img/banner/fz-9-brand3.png)",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-3 col-4">
                <div className="fz-9-banner-right-img">
                  <img src="/img/banner/card-img-5.jpg" alt="banner" />
				  <span>chocalate coated cake</span>
				  <p>$64</p>
                </div>
              </div>
              <div className="col-md-6 col-12 order-3 order-md-2">
                <div className="fz-9-banner-content">
                  <h4 className="fz-9-banner-subtitle">
                    Flat <span>20%</span> Off
                  </h4>
                  <h1 className="fz-9-banner-title">
				  Cakes to Delight, Moments to Treasure
                  </h1>
                  <Link className="fz-9-def-btn fz-9-def-btn-pink" href="/property/detail">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-4 order-2 order-md-3">
                <div className="fz-9-banner-left-img">
                  <img src="/img/banner/card-img-6.jpg" alt="banner" />
				  <span>chocalate coated cake</span>
				  <p>$64</p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>



		</div>

	);
}
