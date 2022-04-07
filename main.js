
let fruits = ["url('imgs/michael-viidLFW-ENM-unsplash.jpg')", 
              "url('imgs/jeremy-thomas-kFy1Aip0eEo-unsplash.jpg')",
              "url('imgs/nasa-rTZW4f02zY8-unsplash.jpg')",
              "url('imgs/michal-balog-gBxkIljWLc8-unsplash.jpg')"];
  



gsap.utils.toArray("section").forEach((section, i) => {
    section.bg = section.querySelector(".bg"); 
    

    // Give the backgrounds some random images
    section.bg.style.backgroundImage = fruits[i];
    
   

    // Do the parallax effect on each section
  if (i) {
    section.bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;

    gsap.to(section.bg, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        scrub: true
      }
    });
  } 
  
  // the first image should be positioned against the top. Use px on the animating part to work with GSAP. 
  else {
    section.bg.style.backgroundPosition = "50% 0px"; 

    gsap.to(section.bg, {
      backgroundPosition: `50% ${innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: "bottom top",
        scrub: true
      }
    });
  }
});
  

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}