import React, { useState } from 'react';
import Link from 'next/link';
import { Carousel, CarouselItem, CarouselIndicators, CarouselCaption } from 'reactstrap';

const items = [
  {
    src: '/images/fresh-food.png',
    altText: 'Fresh Food, Every Day',
    caption: 'Fresh Food, Every Day',
    link: '/category/1f33d252'
  },
  {
    src: '/images/kitchen-home.png',
    altText: 'Kitchen Essentials for Your Home',
    caption: 'Kitchen Essentials for Your Home',
    link: '/category/af452ca5'
  }
];

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides = items.map((item) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <img src={item.src} alt={item.altText} style={{ minWidth: '100%', width: '100%' }} />
        <CarouselCaption
          captionHeader={
            <div className="container">
              <h3 className="inner-text text-left">{item.caption}</h3>
            </div>
          }
          captionText={
            <div className="container">
              <div className="text-left">
                <Link href={item.link}>
                  <a className="btn btn-success">Shop Now</a>
                </Link>
              </div>
            </div>
          }
        ></CarouselCaption>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
    </Carousel>
  );
};

export default HomeCarousel;
