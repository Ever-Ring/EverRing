import CardContainer from "@features/landing/components/CardContainer";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export default function FeatureCard({
  feature,
}: {
  feature: FeatureCardProps;
}) {
  return (
    <CardContainer>
      <div className="flex flex-col items-center gap-[1.875rem] self-stretch">
        <feature.icon className="lg:size-20" />
        <div className="flex flex-col items-center gap-6 self-stretch">
          <span className="text-2xl font-semibold">{feature.title}</span>
          <p className="text-base font-normal">{feature.description}</p>
        </div>
      </div>
      <div className="mt-[0.38rem] text-base font-semibold text-[#009379]">
        See More
      </div>
    </CardContainer>
  );
}
