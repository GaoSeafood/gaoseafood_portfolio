import Hero from "./components/hero/Hero";
import Who from "./components/who/Who";
import Portfolio from "./components/portfolio/Portfolio";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <>
      <Hero />
      <Who />
      <Portfolio />
      <section className="footer-reveal">
        <Footer />
      </section>
    </>
  );
}
