import Providers from "@/components/Providers";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Booking, Experience, Footer, Location, Marquee } from "@/components/Sections";

export default function Home() {
  return (
    <Providers>
      <Header />
      <main id="contenido">
        <Hero />
        <Experience />
        <Marquee />
        <Facilities />
        <Gallery />
        <Location />
        <Booking />
      </main>
      <Footer />
    </Providers>
  );
}
