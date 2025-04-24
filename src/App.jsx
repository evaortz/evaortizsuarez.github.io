import { useState, useRef, useEffect } from 'react'
import React from "react";
import styled from "styled-components";
import './App.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {HorizontalScroll} from "./horizontal-scroll";
import { Intro } from "./Intro"
import { StickyNavBar } from './sticky-navbar';
import {useHorizontalToVerticalScroll} from "./horizontal-to-vertical-scroll";
import {SampleCard} from "./sample-card";
import { cardData } from '../public/assets/card-data';
import { AboutSection } from './About';
import { FooterSection } from './footer-section';
import { UnderlinedText } from './underlined-text';

gsap.registerPlugin(ScrollTrigger);

export const BumperSection = ({children}) => {
  return (
    <section className='bumper-section'>
      {children}
    </section>
  )
}

export const HorizontalSection = ({children, id}) => {
  const sectionRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  useHorizontalToVerticalScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top; 
      const sectionBottom = rect.bottom; 

      if (sectionTop < windowHeight - 800 && sectionBottom > 500) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  return (
    <section id={id} className="horizontal-section" ref={sectionRef}>
      {children}
      {showNav && (
        <div className="nav-proyects">
          <UnderlinedText href="about" text={"continuar a sobre mí"} />
        </div>
      )}
    </section>
  );
};

export const CardsContainer = ({children, previewRef}) => {

  return (
    <div className="cards-container">
      <div className='cards-container-main'>
        {children}
      </div>
    </div>
  )
}

export const SampleCards = React.memo(() => {
  return (
  <>
    {cardData
      .map((card, i) => (<SampleCard key={`sampleCard-${i}`}{...card} />))}
  </>
  );
});


export function App() {

  const [showNav, setShowNav] = useState(false);

  const handleScrollChange = (offset) => {
    const absOffset = Math.abs(offset);
    const middle = window.innerWidth; // puedes ajustar esto según el contenido
    if (absOffset > middle / 3 && absOffset < middle * 1.5) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  return (
    <>
      <header>
        <StickyNavBar />
        <Intro />
      </header>
      <main>
        <HorizontalSection id="proyectos">
          <HorizontalScroll onScrollChange={handleScrollChange}>
            <CardsContainer>
              <SampleCards/>
            </CardsContainer>
          </HorizontalScroll>
        </HorizontalSection>
        <AboutSection />
      </main>
      <footer>
        <FooterSection />
      </footer>
    </>
  )
}

