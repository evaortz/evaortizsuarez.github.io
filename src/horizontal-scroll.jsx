import React, { useState, useEffect, useRef } from 'react'
import { forwardRef } from 'react'
import './horizontal-scroll.css'

const TallOuterContainer = ({children, dynamicHeight}) => {
    return (
        <div className="tall-outer-container" style={{ height: `${dynamicHeight}px` }}>
            {children}
        </div>
    );
};

const StickyInnerContainer = forwardRef(({children}, ref) => {
    return (
        <div className="sticky-inner-container" ref={ref}>
            {children}
        </div>
    );
});

const HorizontalTranslateContainer = forwardRef(({ children, translateX }, ref) => {
    return (
        <div className="horizontal-translate-container" ref={ref} style={{ transform: `translateX(${translateX}px)`}}>
            {children}
        </div>
    );
});

const calcDynamicHeight = (objectWidth) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return (objectWidth - vw + vh + 150);
}

const handleDynamicHeight = (ref, setDynamicHeight) => {
    const objectWidth = ref.current.scrollWidth;
    const dynamicHeight = calcDynamicHeight(objectWidth);
    setDynamicHeight(dynamicHeight);
}

const applyScrollListener = (ref, setTranslateX) => {
    window.addEventListener("scroll", () => {
        const offsetTop = -ref.current.offsetTop;
        setTranslateX(offsetTop);
    })
}

export function HorizontalScroll ({children, id, onScrollChange}) {

    const [dynamicHeight, setDynamicHeight] = useState(null);
    const [translateX, setTranslateX] = useState(0);
    
    const containerRef = useRef(null);
    const objectRef = useRef(null);

    const resizeHandler = () => {
        handleDynamicHeight(objectRef, setDynamicHeight);
    };
    
    
    useEffect (() => {
        handleDynamicHeight(objectRef, setDynamicHeight);
        console.log("📏 scrollWidth del contenido:", objectRef.current.scrollWidth);

        window.addEventListener("resize", resizeHandler);
        
        const onScroll = () => {
            const offsetTop = -containerRef.current.offsetTop;
            console.log("Scroll offset:", offsetTop); // Debug
            setTranslateX(offsetTop);
            onScrollChange?.(offsetTop); 
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <TallOuterContainer dynamicHeight={dynamicHeight}>
            <StickyInnerContainer ref={containerRef}>
                <HorizontalTranslateContainer ref={objectRef} translateX={translateX}>
                    {children}
                </HorizontalTranslateContainer>
            </StickyInnerContainer>
        </TallOuterContainer>
    )
}