import Hero from '@/components/home/Hero';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import DirectorMessage from '@/components/home/DirectorMessage';
import StatsSection from '@/components/home/StatsSection';
import NewsSection from '@/components/home/NewsSection';
import GalleryPreview from '@/components/home/GalleryPreview';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-24">
      <Hero />
      <FeaturedPrograms />
      <StatsSection />
      <DirectorMessage />
      <NewsSection />
      <GalleryPreview />
    </div>
  );
}