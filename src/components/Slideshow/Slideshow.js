import Single from '../Single/Single';
import Slider from 'react-slick/lib/slider';
import styles from '../Videos/Videos.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slideshow({ title = 'All Videos', videos = [], innerRef }) {
  var settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };
  return (
    <div className={styles.allVideosWrapper}>
      <div className={styles.allVideosHeader}>
        <h6>{title}</h6>
      </div>

      <Slider {...settings} className={styles.allVideosCont} ref={innerRef}>
        {videos && videos.map((video) => <Single key={video.id} video={video} isSlide={true} />)}
      </Slider>
    </div>
  );
}
