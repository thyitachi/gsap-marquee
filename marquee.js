// Initialize the Marquee functionality
const init = () => {
  // Find the marquee element by its wb-data attribute
  const marquee = document.querySelector('[wb-data="marquee"]');
  if (!marquee) {
    return;
  }

  // Get the duration from the marquee element's attribute or set default to 5
  const duration = parseInt(marquee.getAttribute("duration"), 10) || 5;
  
  // Get the first child content of the marquee (the items to scroll)
  const marqueeContent = marquee.firstChild;
  if (!marqueeContent) {
    return;
  }

  // Clone the marquee content to allow continuous scrolling
  const marqueeContentClone = marqueeContent.cloneNode(true);
  marquee.append(marqueeContentClone);

  let tween;

  // Function to start or restart the marquee animation
  const playMarquee = () => {
    let progress = tween ? tween.progress() : 0;
    // Kill the previous animation if it exists
    tween && tween.progress(0).kill();
    
    // Get the width of the marquee content and calculate the distance to translate
    const width = parseInt(
      getComputedStyle(marqueeContent).getPropertyValue("width"),
      10
    );
    const gap = parseInt(
      getComputedStyle(marqueeContent).getPropertyValue("column-gap"),
      10
    );
    const distanceToTranslate = -1 * (gap + width);

    // Create a new GSAP animation for the marquee content to scroll horizontally
    tween = gsap.fromTo(
      marquee.children,
      { x: 0 },
      { x: distanceToTranslate, duration, ease: "none", repeat: -1 }
    );
    tween.progress(progress);
    console.log({ width });
  };

  // Start the marquee animation
  playMarquee();

  // Debounce function to handle resizing events and prevent performance issues
  function debounce(func) {
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, 500, event);
    };
  }

  // Attach the resize event listener to trigger the playMarquee function when the window is resized
  window.addEventListener("resize", debounce(playMarquee));
  
  // console.log({ marquee, marqueeContent });
};

// Wait for the document to fully load and then initialize the marquee
document.addEventListener("DOMContentLoaded", init);
