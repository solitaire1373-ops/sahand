import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FeaturedSection from '../components/FeaturedSection';
import ServicesSection from '../components/ServicesSection';
import WhySection from '../components/WhySection';
import TeamSection from '../components/TeamSection';
import CTASection from '../components/CTASection';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Horizon Properties — Exceptional Homes & Investments');

  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedSection />
      <ServicesSection />
      <WhySection />
      <TeamSection />
      <CTASection />
    </>
  );
}
