"use client";

import gsap from 'gsap'

export function toggleDarkLightModeAnimation(ref: React.MutableRefObject<HTMLElement | null>, mode: string) {
    if (!ref.current) return

    gsap.to(ref.current, {
      backgroundColor: mode === "dark" ? "#000" : "#fff",
      color: mode === "dark" ? "#fff" : "#000",
      duration: 0.2,
      transition: "all 0.2s ease"
    })
}


export function animatePreLoader(progress:number, containerRef: React.MutableRefObject<HTMLElement | null>){

  if (progress < 100 || !containerRef.current) return 

  containerRef.current.classList.add('fadeOut')
}

export function animateInput(container: React.MutableRefObject<HTMLDivElement | null>, searchOpen: boolean) {
  if (searchOpen) {
    gsap.to(container.current, {
      width: 150,
      display: "flex",
      duration: .9,
      ease: "power2.Out",
    });
  }
  else {
    gsap.to(container.current, {
      width: 0,
      display: "none",
      duration: .5,
      ease: "power2.Out"
    })
  }
}

export function animateSlider(sliderRef: React.MutableRefObject<HTMLDivElement | null>) {
  let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".slide");

      const tl = gsap.timeline({
          ease: "none",
          scrollTrigger: {
              trigger: sliderRef.current,
              pin: true,
              pinSpacing: true,
              scrub: 1,
              end: "+=3000",
          }
      });

      tl.to(sections, {
          xPercent: -100 * (sections.length - 1),
      });

  }, sliderRef);

  return ctx
}