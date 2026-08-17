import TreatmentGroupGrid from "@/components/treatments/TreatmentGroupGrid";

/**
 * Homepage "Explore treatments". Renders the same grouped grid as the
 * /treatments pillar page, so the two pages and the dropdown always agree.
 */
export default function TreatmentCategories() {
  return (
    <section className="bg-[#F7F7F8] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TreatmentGroupGrid headingLevel="h2" />
      </div>
    </section>
  );
}
