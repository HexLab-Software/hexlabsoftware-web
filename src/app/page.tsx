import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { BookingLoader } from "@/components/booking-loader";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <Skills />
        <Projects />
        <BookingLoader />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
