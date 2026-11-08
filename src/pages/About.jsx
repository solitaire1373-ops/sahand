import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import WhySection from '../components/WhySection';
import TeamSection from '../components/TeamSection';
import CTASection from '../components/CTASection';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function About() {
  useDocumentTitle('About us — Horizon Properties');

  return (
    <>
      <PageHeader
        label="About us"
        title="A practice built on architecture and trust"
        intro="Horizon Properties was founded to make buying and selling an exceptional home feel considered, private and straightforward."
        image="photo-1600210492486-724fe5c67fb0"
      />
      <AboutSection />
      <WhySection />
      <TeamSection />
      <CTASection />
    </>
  );
}
