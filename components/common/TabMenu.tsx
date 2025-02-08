import TabItem from "@components/common/TabItem";

export default function TapMenu() {
  return (
    <div className="flex flex-row items-start gap-3">
      <TabItem hasIcon title="구름링" />
      <TabItem hasIcon title="나무링" />
    </div>
  );
}
