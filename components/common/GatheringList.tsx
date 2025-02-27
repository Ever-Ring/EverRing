import GatheringItem from "@components/common/GatheringItem";
import { Gathering, GatheringListProps } from "@customTypes/gathering";

export default function GatheringList({ gatherings }: GatheringListProps) {
  if (!Array.isArray(gatherings) || gatherings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>아직 모임이 없어요.</p>
        <p>지금 바로 모임을 만들어보세요</p>
      </div>
    );
  }

  const filteredGatherings: Gathering[] = gatherings.filter(
    (gatheringItem) => gatheringItem.canceledAt === null,
  );

  if (filteredGatherings.length === 0) {
    return null;
  }

  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {filteredGatherings.map((gatheringItem) => (
        <GatheringItem key={gatheringItem.id} gathering={gatheringItem} />
      ))}
    </ol>
  );
}
