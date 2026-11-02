import Providers from "@/components/Providers";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Journey from "@/components/Journey";
import { Booking, Experience, Footer, Location, Marquee } from "@/components/Sections";

export default function Home() {
  return (
    <Providers>
      <Header />
      <main id="contenido">
        <Journey />
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
