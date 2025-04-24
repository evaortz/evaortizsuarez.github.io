import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useSvgAnimation = ({autoPlay = false}) => {
    const pathRefs = useRef([]);
    const timeline = useRef(null);

    useEffect(() => {
        if (pathRefs.current.length > 0) {
            const delayAnimation = () => {
            timeline.current = gsap.timeline({ paused: !autoPlay });

            pathRefs.current.forEach((path) => {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0});

                timeline.current.to(path, {
                    strokeDashoffset: 0,
                    duration: 0.04,
                    ease: "power2.out",
                    opacity: 1,
                });
            });
            if (autoPlay) {
                timeline.current.play();
            }
        };
            if ('requestIdleCallback' in window) {
                requestIdleCallback(delayAnimation);
            } else {
                setTimeout(delayAnimation, 200); 
            }
        }
    }, [autoPlay]);

    const handleMouseEnter = () => {
        if (timeline.current) {
            requestAnimationFrame(() => {
                timeline.current.play();
            });
        }
    };
    const handleMouseLeave = () => {
        if (timeline.current) timeline.current.reverse();
    };

    const handleAnimationRestart = () => {
        if (timeline.current) timeline.current.restart();
    };

    return { pathRefs, handleMouseEnter, handleMouseLeave, handleAnimationRestart };
};
