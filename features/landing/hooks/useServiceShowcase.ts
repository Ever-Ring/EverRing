import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { serviceShowcaseData } from "@features/landing/constants/serviceShowcaseData";

export default function useServiceShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isScrollingRef = useRef(false);
  const hasScrolledRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const setRefs = (node: HTMLDivElement) => {
    if (node) {
      carouselRef.current = node;
      ref(node);
    }
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleScroll = () => {
    if (inView && !hasScrolledRef.current && carouselRef.current) {
      hasScrolledRef.current = true;
      carouselRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (!inView) {
      hasScrolledRef.current = false;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    if (!inView || isScrollingRef.current) return;

    if (
      (currentSlide === 0 && e.deltaY < 0) ||
      (currentSlide === serviceShowcaseData.length - 1 && e.deltaY > 0)
    ) {
      return;
    }

    e.preventDefault();

    if (Math.abs(e.deltaY) < 50) return;

    isScrollingRef.current = true;

    if (e.deltaY > 0) {
      if (currentSlide < serviceShowcaseData.length - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    } else if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  const preventScroll = (e: WheelEvent) => {
    if (
      (currentSlide === 0 && e.deltaY < 0) ||
      (currentSlide === serviceShowcaseData.length - 1 && e.deltaY > 0)
    ) {
      return;
    }

    if (inView) {
      e.preventDefault();
    }
  };

  return {
    currentSlide,
    setRefs,
    inView,
    handleSlideChange,
    handleScroll,
    handleWheel,
    preventScroll,
  };
}
