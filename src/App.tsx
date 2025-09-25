import About from "./components/About"
import Feature from "./components/Feature"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Story from "./components/Story"

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Story />
    </main>
  )
}

export default App