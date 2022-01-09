import Welcome from './Welcome'
import Skills from './Skills'
import About from './About'
import Projects from './Projects'
import Other from './Other'

import './style.css';

export default function Home() {
    document.title = 'Maseshi'
    
    return (
        <div data-bs-spy="scroll" data-bs-target="#scroll-spy" data-bs-offset="0" className="scroll-spy-contents" tabIndex="0">
            <Welcome />
            <About />
            <Skills />
            <Projects />
            <Other />
        </div>
    )
}
