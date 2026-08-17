import Image from "next/image";
import Link from "next/link";

/**
 * "Assessed by Dr. Bangalee" — the treatment photo with a doctor byline
 * beneath it, mirroring the layout on the sister site.
 *
 * The page already said "Medically reviewed by Dr. Rajeev Bangalee, MBBch"
 * in the hero as plain text. A face carries that credential far further than
 * a line of grey type: this is a doctor-led clinic and the whole proposition
 * rests on it being one.
 */
export function DoctorAssessedCard({
  treatmentImage,
  treatmentImageAlt,
  treatmentTitle,
}: {
  treatmentImage: string | null;
  treatmentImageAlt: string;
  treatmentTitle: string;
}) {
  return (
    <div className="border border-[#E2E2E6] bg-white">
      {treatmentImage && (
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#E2E2E6]">
          <Image
            src={treatmentImage}
            alt={treatmentImageAlt}
            fill
            unoptimized={treatmentImage.startsWith("http")}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 380px"
          />
        </div>
      )}

      <div className="flex items-center gap-4 p-5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#E2E2E6]">
          <Image
            src="/images/dr-rajeev-bangalee-director-of-star-aesthetic-medical-centre-durban-250.webp"
            alt="Dr. Rajeev Bangalee, Director of Star Aesthetic Centre, Durban North"
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1A1A1F]">
            Assessed by{" "}
            <Link href="/dr-rajeev-bangalee" className="text-[#939EBA] hover:underline">
              Dr. Rajeev Bangalee
            </Link>
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-[#636374]">
            MBBch · {treatmentTitle} is planned and performed by the doctor, with home-care
            products he selects himself.
          </p>
        </div>
      </div>
    </div>
  );
}
