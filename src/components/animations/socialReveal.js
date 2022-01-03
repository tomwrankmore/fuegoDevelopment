import gsap from "gsap";

const socialReveal = (socials) => {
    let q = gsap.utils.selector(socials);

    gsap.from(q('a'), {
      duration: .8,
      ease: 'back',
      yPercent: 100,
      opacity: 0,
      delay: 0.45,
      stagger: {
        amount: .1
      }
    })
  }

export default socialReveal;