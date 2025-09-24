import { useRef, useState } from "react"
import Button from "./Button"
import { TiLocationArrow } from "react-icons/ti"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState<number>(1)
    const [fullVdsrc, setFullVdSrc] = useState<string>("videos/hero-1.mp4")
    const [hasClicked, setHasClicked] = useState<boolean>(false)

    const totalVideo = 4

    const nextVdRef = useRef<HTMLVideoElement | null>(null)

    const handleMinVideoClick = () => {
        setHasClicked(true)
        setCurrentIndex((prevIndex) => (prevIndex % totalVideo) + 1)
    }

    useGSAP(() => {
        if(hasClicked){
            gsap.set("#next-video", {visibility: "visible"})

            gsap.to("#next-video", {
                transformOrigin: 'center center',
                scale: 1,
                width: "100%",
                height: "100%",
                duration: .7,
                ease: "power1.out",
                onStart: () => void nextVdRef.current?.play(),
            })

            gsap.from("#current-video", {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.2,
                ease: "power1.Out",
                onComplete: handleFullVideoLoad
            })
        }
    }, {dependencies: [currentIndex], revertOnUpdate: true})

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: 'polygon(26% 0, 70% 0, 84% 90%, 5% 78%)',
            borderRadius: '0 0 20px 20px'
        })

        gsap.from("#video-frame", {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-framer',
                start: 'top top',
                end: '+=700',
                scrub: true
            }
        })
    })

    const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`

    const handleFullVideoLoad = () => {
        setFullVdSrc(getVideoSrc(currentIndex === totalVideo - 1 ? 1 : currentIndex))
    }

    const handleVideoLoad = () => {

    }
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg group" id="current-video">
                <div onClick={handleMinVideoClick} className="origin-center size-64 scale-0 opacity-0 transition-all duration-500 ease-in group-hover:opacity-100 group-hover:scale-75 rounded-lg">
                    <video
                        ref={nextVdRef}
                        src={getVideoSrc((currentIndex + 1) === 5 ? 1 : currentIndex + 1)}
                        loop
                        className="size-64 scale-125 origin-center object-cover object-center rounded-lg"
                        onLoadedData={handleVideoLoad}
                    />
                </div>
            </div>

            <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex === 0 ? 1 : currentIndex)}
                loop
                id="next-video"
                className="absolute-center invisible absolute z-20 size-56 scale-100 object-cover object-center"
            />

            <video
                src={fullVdsrc}
                loop
                autoPlay
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
                onLoadedData={handleVideoLoad}
            />

            
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">G<b>a</b>ming</h1>
            <div className="absolute left-0 top-0 z-40">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font hero-heading text-blue-100">redi<b>n</b>e</h1>
                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100 hover:text-black">Enter the MetaGame layer <br /> Unleash the play Economy</p>
                    <Button
                        id="watch-trailer"
                        title="watch Trailers"
                        leftIcon={<TiLocationArrow />} 
                        containerClass="bg-yellow-300 flex-center gap-1"
                    />
                </div>
            </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">G<b>a</b>ming</h1>
    </div>
  )
}

export default Hero