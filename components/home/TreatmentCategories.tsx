import TreatmentCardGrid from "@/components/treatments/TreatmentCardGrid";
import { getTreatmentCards } from "@/lib/queries/treatment-cards";

export default async function TreatmentCategories() {
  const cards = await getTreatmentCards();

  return (
    <section className="bg-[#F7F7F8] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TreatmentCardGrid cards={cards} headingLevel="h2" />
      </div>
    </section>
  );
}
