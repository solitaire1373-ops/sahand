import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';
import CTASection from '../components/CTASection';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function Services() {
  useDocumentTitle('Services — Horizon Properties');

  return (
    <>
      <PageHeader
        label="Services"
        title="Quiet expertise, from valuation to keys"
        intro="Six disciplines, one senior advisor. We keep our mandate small so every property receives the attention it deserves."
        image="photo-1616486338812-3dadae4b4ace"
      />
      <ServicesSection />
      <CTASection />
    </>
  );
}
