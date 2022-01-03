import gsap from "gsap";

const staggerText = (linksArray) => {
    gsap.from(linksArray, {
      duration: .8,
      y: -100,
      delay: .2,
      ease: 'back',
      skewY: -30,
      skewX: -30,
      transformOrigin:"50% 50%",
      stagger: {
        amount: 0.2
      }
    })
  }

export default staggerText;