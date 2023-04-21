import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const items = [
    <div className="item" data-value="1"><img src="/img1.png" /></div>,
    <div className="item" data-value="2"><img src="/img2.png" /></div>,
    <div className="item" data-value="3"><img src="/img3.png" /></div>,
    <div className="item" data-value="4"><img src="/img4.png" /></div>,
    <div className="item" data-value="5"><img src="/img5.png" /></div>,
];

const thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
  const style = { width: 200, height: 200, margin: 10, cursor: 'pointer' };
    return items.map((item, i) => (
        <div className="thumb" onClick={() => (setThumbIndex(i), setThumbAnimation(true))} style={style}>
            {item}
        </div>
    ));
};

const btn ={
  display: "flex",
  alignItems: "center"
}
const flex ={
  display: "flex",
  textAlign: "cenrer",
  width: "70%",
}

const App = () => {
    const [mainIndex, setMainIndex] = useState(0);
    const [mainAnimation, setMainAnimation] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);
    const [thumbAnimation, setThumbAnimation] = useState(false);
    const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));

    const slideNext = () => {
        if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
            setThumbAnimation(true);
            setThumbIndex(thumbIndex + 1);
        }
    };

    const slidePrev = () => {
        if (!thumbAnimation && thumbIndex > 0) {
            setThumbAnimation(true);
            setThumbIndex(thumbIndex - 1);
        }
    };

    const syncMainBeforeChange = (e) => {
        setMainAnimation(true);
    };

    const syncMainAfterChange = (e) => {
        setMainAnimation(false);

        if (e.type === 'action') {
            setThumbIndex(e.item);
            setThumbAnimation(false);
        } else {
            setMainIndex(thumbIndex);
        }
    };

    const syncThumbs = (e) => {
        setThumbIndex(e.item);
        setThumbAnimation(false);

        if (!mainAnimation) {
            setMainIndex(e.item);
        }
    };

    return [
       <AliceCarousel
            activeIndex={mainIndex}
            animationType="fadeout"
            animationDuration={800}
            disableDotsControls
            disableButtonsControls
            items={items}
            mouseTracking={!thumbAnimation}
            onSlideChange={syncMainBeforeChange}
            onSlideChanged={syncMainAfterChange}
            touchTracking={!thumbAnimation}
       />,
       <div className="thumbs" style={flex}>
         <div className="btn-prev" style={btn} onClick={slidePrev}>&lang;</div>
           <AliceCarousel
                activeIndex={thumbIndex}
                autoWidth
                disableDotsControls
                disableButtonsControls
                items={thumbs}
                mouseTracking={false}
                onSlideChanged={syncThumbs}
                touchTracking={!mainAnimation}
           />
           <div className="btn-next" style={btn} onClick={slideNext}>&rang;</div>
           {/* <div class="alice-carousel__prev-btn">
            <div class="alice-carousel__prev-btn-wrapper">
              <p class="alice-carousel__prev-btn-item" onClick={slidePrev}>
                <span data-area="<"></span>
              </p>
            </div>
          </div>
          <div class="alice-carousel__next-btn">
            <div class="alice-carousel__next-btn-wrapper">
              <p class="alice-carousel__next-btn-item" onClick={slideNext}>
                <span data-area=">"></span>
              </p>
            </div>
          </div> */}
       </div>
    ]
};

export default App;