import { useState } from 'react'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Services from './components/Services'
import SelectedWork from './components/SelectedWork'
import Skills from './components/Skills'
import Media from './components/Media'
import Contact from './components/Contact'

export default function Home() {
  const [started, setStarted] = useState(false)

  return (
    <div>
      <Preloader onDone={() => setStarted(true)} />
      <Nav />
      <Hero started={started} />
      <About />
      <Experience />
      <Services />
      <SelectedWork />
      <Skills />
      <Media />
      <Contact />
    </div>
  )
}
