import GatheringList from "@components/common/GatheringList";
import { Gathering } from "@customTypes/gathering";

interface FavoriteGatheringListProps {
  gatherings: Gathering[];
}

export default function FavoriteGatheringList({
  gatherings,
}: FavoriteGatheringListProps) {
  if (gatherings.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-1 flex-col items-center justify-center">
        <p className="text-lg font-semibold">💔 찜한 모임이 없습니다.</p>
        <p className="text-sm text-gray-500">모임을 찾아 찜해보세요!</p>
      </div>
    );
  }

  return (
    <section>
      <GatheringList gatherings={gatherings} />
    </section>
  );
}
