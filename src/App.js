import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const images = [
  { src: '/img1.png' },
  { src: '/img2.png' },
  { src: '/img3.png' },
  { src: '/img4.png' },
  { src: '/img5.png' },
];

const style ={
  display: "block",
  margin: "auto",
}

const App = () => {
  return (
    <AliceCarousel autoPlay autoPlayInterval={3000}>
      {images.map((item, index) => (
        <img src={item.src} key={index} alt={`Image ${index}`} style={style}/>
      ))}
    </AliceCarousel>
  );
};


export default App;
