import React from 'react';

const Intro = React.memo(() => {
  return (
    <section className="introSection">
      <video
        src="/assets/video/intro.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Introductory video for FlavourFleet"
        onError={(e) => console.error('Video failed to load:', e)}
      >
        Your browser does not support this video. Please try a modern browser.
      </video>
    </section>
  );
});

export default Intro;