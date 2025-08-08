import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main className="flex flex-col">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
