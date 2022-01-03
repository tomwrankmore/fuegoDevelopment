import gsap from "gsap";

const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      x: 0,
      ease: 'power4.inOut'
    })
  }

  export default handleHoverExit;