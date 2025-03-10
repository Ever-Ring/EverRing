// import DateFilter from "@components/common/DateFilter";
// import LocationFilter from "@components/common/LocationFilter";
// import SortFilter from "@components/common/SortFilter";

// interface FilterBarProps {
//   onLocationChange?: (selectedLocation: string) => void;
//   onDateChange?: (selectedDate: string | undefined) => void;
//   onSortChange?: (selectedSort: string) => void;
// }

// export default function FilterBar({
//   onLocationChange,
//   onDateChange,
//   onSortChange,
// }: FilterBarProps) {
//   return (
//     <div className="w-full border-t-2 border-gray-900 bg-white p-6">
//       <div className="flex items-start justify-between self-stretch">
//         <div className="flex items-start gap-2">
//           <LocationFilter onLocationChange={onLocationChange} />
//           <DateFilter onDateSelect={onDateChange} />
//         </div>
//         <SortFilter onSortChange={onSortChange} />
//       </div>
//       {/* // TODO 하단에 그라데이션 넣으면 좋을듯 */}
//     </div>
//   );
// }
