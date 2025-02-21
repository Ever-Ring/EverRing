import GatheringItem from "@components/common/GatheringItem";

export interface Gathering {
  teamId: number;
  id: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number | null;
  canceledAt: string | null;
}

export interface GatheringListProps {
  gatherings: Gathering[];
}

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
