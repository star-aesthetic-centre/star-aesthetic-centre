"use client";

import {
  IntroductionNikiTourButton,
  IntroductionTourProgress,
  IntroductionTourScrollSync,
} from "@/components/introduction/IntroductionNikiTour";

export function IntroductionPageClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroductionTourScrollSync />
      <IntroductionTourProgress />
      {children}
    </>
  );
}

export { IntroductionNikiTourButton };
