import PageHeader from '../components/PageHeader';
import TeamSection from '../components/TeamSection';
import CTASection from '../components/CTASection';
import useDocumentTitle from '../lib/useDocumentTitle';

export default function Team() {
  useDocumentTitle('Team — Horizon Properties');

  return (
    <>
      <PageHeader
        label="Team"
        title="The people behind Horizon"
        intro="A small, senior team with backgrounds in architecture, investment and private client sales."
        image="photo-1512918728675-ed5a9ecdebfd"
      />
      <TeamSection showHeading={false} />
      <CTASection />
    </>
  );
}
