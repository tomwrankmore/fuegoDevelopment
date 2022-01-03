import gsap from "gsap";

const handleCityReturn = (cityBackground) => {
    gsap.to(cityBackground, {
      duration: 0.4,
      opacity: 0
    })
  }

export default handleCityReturn;