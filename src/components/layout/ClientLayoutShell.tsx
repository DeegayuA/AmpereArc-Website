"use client";

import { useModal } from "@/components/providers/ModalProvider";
import { RecommendationModal } from "@/components/home/RecommendationModal";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const { isRecommendationOpen, setRecommendationOpen } = useModal();

  return (
    <>
      <LoadingScreen />
      {children}
      <RecommendationModal 
        isOpen={isRecommendationOpen} 
        onClose={() => setRecommendationOpen(false)} 
      />
    </>
  );
}
