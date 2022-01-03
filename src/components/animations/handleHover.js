import gsap from "gsap";

const handleHover = e => {
    gsap.to(e.target, {
      duration: 0.3,
      // y: 1,
      x: 10,
      skewX: -10,
      ease: 'power4.inOut'
    })
}

export default handleHover;