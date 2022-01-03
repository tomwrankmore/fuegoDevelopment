import gsap from "gsap";

const handleCityHover = (city, cityBackground) => {
    gsap.set(cityBackground, {
      duration: 0,
      background: `url(${city}) center center`
    })
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 1,
      ease: 'power3.inOut'
    })
    gsap.from(cityBackground, {
      duration: 0.4,
      skewY: 2,
      transformOrigin: 'right top'
    })
  }

export default handleCityHover;
