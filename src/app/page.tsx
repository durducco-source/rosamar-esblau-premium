import FilmStrip from "@/components/FilmStrip";
import Header from "@/components/Header";
import Hud from "@/components/Hud";
import Providers from "@/components/Providers";
import { Arrival, Calm, Finale, Footer, Light, Rest, Table, Water } from "@/components/Scenes";

// Un día en Es Blau: la web es un único recorrido cinematográfico de 8 escenas ligadas al scroll.
export default function Home() {
  return (
    <Providers>
      <Header />
      <main id="contenido">
        <Arrival />
        <Water />
        <Calm />
        <Rest />
        <Table />
        <Light />
        <FilmStrip />
        <Finale />
      </main>
      <Footer />
      <Hud />
    </Providers>
  );
}
