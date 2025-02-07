import TapItem from "@components/common/TapItem";

export default function TapList() {
  return (
    <div className="flex flex-row items-start gap-3">
      <TapItem hasIcon title="구름링" />
      <TapItem hasIcon title="나무링" />
      <TapItem title="나무fldfld링" />
    </div>
  );
}
