type ShowcaseSlideBase = {
  id: number;
  title: string;
  description: string;
  bgColor: string;
};

type MarqueeSlide = ShowcaseSlideBase & {
  type: "marquee";
  leftImages: string[];
  rightImages: string[];
};

type OverlappingSlide = ShowcaseSlideBase & {
  type: "overlap";
  images: string[];
};

type SequentialSlide = ShowcaseSlideBase & {
  type: "sequence";
  images: string[];
};

export type ShowcaseSlide = MarqueeSlide | OverlappingSlide | SequentialSlide;
