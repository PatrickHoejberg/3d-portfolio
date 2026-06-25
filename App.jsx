import ScrollAnimation from "./components/ScrollAnimation.jsx"
import Navbar from "./components/Navbar.jsx"
import Displaybox from "./components/Displaybox.jsx"
import Hero from "./sections/Hero.jsx"
const App = () => {
  console.log('[App] render')
  return (
    <main>
      <Hero />
      <ScrollAnimation />
    </main>

  )
}

export default App