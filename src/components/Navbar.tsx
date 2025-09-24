import { useEffect, useRef, useState } from "react"
import Button from "./Button"
import { TiLocationArrow } from "react-icons/ti"
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = [
    {
        name: "Nexus",
        x: 0
    },
    {
        name: "Vault",
        x: 95
    }, 
    {
        name: "Prologue",
        x: 200
    }, 
    {
        name: "About",
        x: 308
    }, 
    {
        name: "Contact",
        x: 410
    }];

const Navbar = () => {
    const navRef = useRef<HTMLDivElement | null>(null)
    const navHoverRef = useRef<(HTMLAnchorElement | null)[]>([])
    const indicatorRef = useRef<HTMLDivElement | null>(null)
    const [lastScrollY, setLastScrollY] = useState<number>(0)
    const [isNavVisible, setIsNavVisible] = useState<boolean>(true)

    const {y: currentScrollY} = useWindowScroll()

    useEffect(() => {
        if(currentScrollY === 0){
            setIsNavVisible(true)
            navRef.current?.classList.remove('floating-nav')
        }else if(currentScrollY > lastScrollY){
            setIsNavVisible(false)
            navRef.current?.classList.add('floating-nav')
        }else if(currentScrollY < lastScrollY){
            setIsNavVisible(true)
            navRef.current?.classList.add('floating-nav')
        }

        setLastScrollY(currentScrollY)
        
    }, [currentScrollY])

    useEffect(() => {
        gsap.to(navRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3
        })
    }, [isNavVisible])

     const handleMouseEnter = (x: number, idx: number) => {
        if (indicatorRef.current) {
            indicatorRef.current.style.opacity = "1";
            indicatorRef.current.style.transform = `translateX(${x}px)`;
        }

        navHoverRef.current.forEach((nav, index) => {
            if (nav) {
            nav.style.color = index === idx ? "black" : "white";
            }
        });
    };

        const handleAnchorMouseLeave = () => {
            navHoverRef.current.forEach((nav) => {
                if (nav) {
                nav.style.color = "white";
                }
            });
        };


    const handleMouseLeave = () => {
        if (indicatorRef.current) {
        indicatorRef.current.style.opacity = "0";
        }
    };


  return (
    <div ref={navRef} className="fixed inset-x-0 top-4 h-16 z-50 border-none duration-700 transition-all sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    <img src="/img/logo.png" alt="logo" className="w-10" />

                    <Button 
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow />}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                    />
                </div>

                <div className="flex h-full items-center">
                    <div className="hidden md:flex items-center gap-15 relative px-7 nav-container"
                        onMouseLeave={handleMouseLeave}
                    >
                    {navItems.map((item, index) => (
                        <a
                        key={index}
                        href={`#${item.name.toLowerCase()}`}
                        ref={(ref) => {navHoverRef.current[index] = ref}}
                        className="nav-hover-btn"
                        data-x={item.x}
                        onMouseEnter={() => handleMouseEnter(item.x, index)}
                        >
                        {item.name}
                        </a>
                    ))}

                    <div onMouseLeave={handleAnchorMouseLeave} ref={indicatorRef}  className="indicator"></div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar