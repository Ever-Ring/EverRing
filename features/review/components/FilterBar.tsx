import DateFilter from "@components/common/DateFilter";
import LocationFilter from "@components/common/LocationFilter";
import SortFilter from "@components/common/SortFilter";

// TODO: 임시로 모양만 잡음
export default function FilterBar() {
  return (
    <div className="w-full border-t-2 border-gray-900 bg-white p-6">
      <div className="flex items-start justify-between self-stretch">
        <div className="flex items-start gap-2">
          <LocationFilter />
          <DateFilter />
        </div>
        <SortFilter variant="review" />
      </div>
      {/* TODO 하단에 그라데이션 넣으면 좋을듯 */}
    </div>
  );
}
