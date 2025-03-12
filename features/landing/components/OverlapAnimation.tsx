import Image from "next/image";
import { motion } from "framer-motion";

export default function OverlapAnimation({ images }: { images: string[] }) {
  return (
    <div className="relative flex h-full w-full items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Image
          src={images[0]}
          alt="Main image"
          width={0}
          height={0}
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 468px"
          className="h-auto w-[270px] object-contain drop-shadow-2xl md:w-[468px]"
          priority
        />
      </motion.div>

      <motion.div
        className="mg:-ml-12 -ml-8 mt-4 md:-ml-10 md:mt-6 lg:mt-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        <Image
          src={images[1]}
          alt="Overlapping image"
          width={0}
          height={0}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 90px, 110px"
          className="h-auto w-[70px] object-contain drop-shadow-2xl md:w-[110px]"
          priority
        />
      </motion.div>
    </div>
  );
}
