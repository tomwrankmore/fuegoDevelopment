import gsap from "gsap";

const fadeInUp = (node) => {
    gsap.from(node, {
      y: -60,
      duration: 1,
      delay: .25,
      opacity: 0,
      ease: 'back'
    })
  }

export default fadeInUp;