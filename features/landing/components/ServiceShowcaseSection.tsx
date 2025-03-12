import { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import MarqueeAnimation from "@features/landing/components/MarqueeAnimation";
import { serviceShowcaseData } from "@features/landing/constants/serviceShowcaseData";
import OverlapAnimation from "@features/landing/components/OverlapAnimation";
import SequenceAnimation from "@features/landing/components/SequenceAnimation";
import useServiceShowcase from "@features/landing/hooks/useServiceShowcase";
import { ShowcaseSlide } from "@features/landing/types/showcase";

function ShowcaseImage({ slide }: { slide: ShowcaseSlide }) {
  switch (slide.type) {
    case "marquee":
      return (
        <MarqueeAnimation
          leftImages={slide.leftImages}
          rightImages={slide.rightImages}
        />
      );
    case "overlap":
      return <OverlapAnimation images={slide.images} />;
    case "sequence":
      return <SequenceAnimation images={slide.images} />;
    default:
      return null;
  }
}

export default function ServiceShowcaseSection() {
  const {
    currentSlide,
    setRefs,
    inView,
    handleSlideChange,
    handleScroll,
    handleWheel,
    preventScroll,
  } = useServiceShowcase();

  const bgColorClass = serviceShowcaseData[currentSlide].bgColor;

  const isActiveSlide = useCallback(
    (index: number) => (currentSlide === index ? "bg-gray-800" : "bg-gray-300"),
    [currentSlide],
  );

  useEffect(() => {
    handleScroll();
  }, [inView, handleScroll]);

  useEffect(() => {
    if (inView) {
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [inView, handleWheel, preventScroll]);

  return (
    <section className="sticky top-[56px]">
      <div
        ref={setRefs}
        // min-h-[calc(100vh-56px)]
        className="min-h-screen w-full overflow-hidden bg-gray-50 md:top-[60px]"
      >
        <div className="absolute inset-0 flex flex-col items-center lg:flex-row lg:items-center">
          <div
            className={`flex h-[56%] w-full items-center justify-center overflow-hidden ${bgColorClass} lg:h-full lg:w-[56%]`}
          >
            <motion.div
              key={currentSlide}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              <ShowcaseImage slide={serviceShowcaseData[currentSlide]} />
            </motion.div>
          </div>

          <div className="flex h-[60%] w-full flex-col items-center justify-center px-16 py-10 lg:h-full lg:w-[40%] lg:items-start lg:px-10">
            <motion.div
              key={currentSlide}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.1,
              }}
              className="flex flex-col items-center lg:items-start"
            >
              <h2 className="whitespace-pre-line text-center font-bold text-black lg:text-start lg:text-4xl">
                {serviceShowcaseData[currentSlide].title}
              </h2>
              <p className="mt-5 whitespace-pre-line text-center text-base text-gray-800 lg:text-start">
                {serviceShowcaseData[currentSlide].description}
              </p>
            </motion.div>

            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3 lg:right-8">
              {serviceShowcaseData.map((slide, index) => (
                <motion.button
                  type="button"
                  key={slide.id}
                  onClick={() => handleSlideChange(index)}
                  className={`size-2 rounded-full transition-colors ${isActiveSlide(index)}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`슬라이드 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
