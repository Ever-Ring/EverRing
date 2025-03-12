import Image from "next/image";
import { motion } from "framer-motion";

export default function SequenceAnimation({ images }: { images: string[] }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-3 md:gap-4 lg:gap-6">
      {images.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: index * 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          <Image
            src={image}
            alt={`Mypage image ${index + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 768px) 80px, (max-width: 1024px) 90px, 110px"
            className="h-auto w-[95px] object-contain drop-shadow-2xl md:w-[170px]"
            priority
            style={{
              zIndex: images.length - index,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
