import './sticky-navbar.css'
import { UnderlinedText } from './underlined-text'

export function StickyNavBar () {
    return(
        <nav className='navbar'>
            <img src="./assets/logo_rayones.webp" alt='logo' width="30" className="logo"></img>
            <ul>
                <li><UnderlinedText text="INICIO" href="" /></li>
                <li>/</li>
                <li><UnderlinedText text="PROYECTOS" href="proyectos" /></li>
                <li>/</li>
                <li><UnderlinedText text="SOBRE MÍ" href="about" /></li>
            </ul>
        </nav>
    )
}