import GatheringItem from "@components/common/GatheringItem";
import { GatheringListProps } from "@customTypes/gathering";

export default function GatheringList({ gatherings }: GatheringListProps) {
  return (
    <ol className="flex flex-col items-start gap-6 self-stretch">
      {gatherings.map(
        (gatheringItem) =>
          gatheringItem.canceledAt &&
          gatheringItem.createdBy !== null && (
            <GatheringItem key={gatheringItem.id} gathering={gatheringItem} />
          ),
      )}
    </ol>
  );
}
