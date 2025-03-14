import CardContainer from "@features/landing/components/CardContainer";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FeatureCardProps {
  title: string;
  href: string;
  description: string;
  imageSrc: string;
}
export default function FeatureCard({
  feature,
}: {
  feature: FeatureCardProps;
}) {
  const router = useRouter();
  return (
    <CardContainer>
      <div className="flex flex-col items-center gap-[1.875rem] self-stretch">
        <Image
          src={feature.imageSrc}
          alt={feature.title}
          width={80}
          height={80}
        />
        <div className="flex flex-col items-center gap-6 self-stretch">
          <span className="text-2xl font-semibold">{feature.title}</span>
          <p className="text-base font-normal">{feature.description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => router.push(`/${feature.href}`)}
        className="mt-[0.38rem] text-base font-semibold text-[#009379]"
      >
        See More
      </button>
    </CardContainer>
  );
}
