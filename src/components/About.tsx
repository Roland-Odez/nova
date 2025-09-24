import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#mask-clip",
        start: "top +=100",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to("#clip", {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Nova
        </p>

        <AnimatedTitle 
            title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
            containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Nova unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div className="h-dvh mask-clip-path w-screen relative" id="mask-clip">
        <div className="mask-clip-path-about about-image rounded-lg" id="clip">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;