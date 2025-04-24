import './sample-card.css'
import { useState, useEffect, useRef } from 'react'

export const SampleCard = ({title, subtitle, description, media =["./assets/logo_rayones.png"], tags = []}) => {

  const [selectedMedia, setSelectedMedia] = useState(media[0]);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const isVideo = (src) => /\.(mp4|webm|ogg)$/i.test(src);
  const isGif = (src) => /\.gif$/i.test(src);

  const changeMedia = () => {
    const currentIndex = media.indexOf(selectedMedia);
    const nextIndex = (currentIndex + 1) % media.length;
    setSelectedMedia(media[nextIndex]);
  };


  useEffect(() => {
    clearTimeout(timeoutRef.current);
    
    if (isVideo(selectedMedia)) {
      const video = videoRef.current;
      if (video) {
        video.onended = () => changeMedia();
      }
    } else {
      const duration = isGif(selectedMedia) ? 6000 : 3000;
      timeoutRef.current = setTimeout(() => {
        changeMedia();
      }, duration);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [selectedMedia]); 

  return (
    <div className="sample-card">
      <div className="card-media">
        <div className="card-main-media">
          <div className="media-wrapper">
            {isVideo(selectedMedia) ? (
              <video ref={videoRef} width="500" controls autoPlay muted>
                <source src={selectedMedia} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
            ) : (
              <img src={selectedMedia} alt={title}/>
            )}
          </div>
        </div>
        <div className="card-thumbnails">
          {media.map((item, index) => (
            <div key={index} className="thumbnail" onClick={() =>
              setSelectedMedia(item)}>
                {isVideo(item) ? (
                  <video width="60">
                    <source src={item} type="video/mp4" />
                  </video>
                ): (
                  <img src={item} alt={`Miniatura ${index}`} width="60" loading="lazy" />
                )}
              </div>
          ))}
        </div>
        </div>
        <div className='card-text'>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <p>{description}</p>
            <div className="tags-container">
              {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
              ))}
            </div>
        </div>
    </div>
  )
}

