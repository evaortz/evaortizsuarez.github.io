import './underlined-text.css'
import React, {useState, useEffect, useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSvgAnimation } from './svg-animation';

export function UnderlinedText ({text, href}) {
    const textRef = useRef(null);
    const [width, setWidth] = useState(0);
    const { pathRefs, handleMouseEnter, handleMouseLeave } = useSvgAnimation({autoPlay: false});

    useEffect(() => {
        const updateWidth = () => {
            if (textRef.current) {
                setWidth(textRef.current.offsetWidth);
            }
        };
        updateWidth();
        const observer = new ResizeObserver(updateWidth);
        if (textRef.current) {
            observer.observe(textRef.current);
        }
        return () => observer.disconnect();
    },[text]);

    return (
        <a href={`#${href}`} className='underlined-text' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <span ref={textRef}>
                {text}
            </span>
            <svg className="underlined-svg" xmlns="http://www.w3.org/2000/svg" width="1000" height="13" fill="none" viewBox="0 0 77 13" preserveAspectRatio="none" style={{ width: `${width}px`, transform : `translate(-${width}px, 1.2em)`}}>
            <path ref={(el) => (pathRefs.current[0] = el)} stroke="#D73F3F" strokeLinecap="round" d="M69 4C47.398 4 26.55 1 5 1M69 5.15c-8.252 0-16.905-.37-25.111.052C29.526 5.94 15.553 7 1 7"/>
            <path ref={(el) => (pathRefs.current[1] = el)} stroke="#D73F3F" strokeLinecap="round" d="M73 7C48.705 7 25.288 2 1 2M6 7c10.45.174 20.878.667 31.333.714 3.746.017 8.694-.623 12.334.318C58.483 10.309 66.552 12 76 12" />
            </svg>
        </a>
    )
}