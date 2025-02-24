import ContainerInformation from "@features/list-detail/components/ContainerInformation";
import FloatingBar from "@features/list-detail/components/FloatingBar";

export default function ListDetailContent() {
  return (
    <div>
      <ContainerInformation
        maxCount={20}
        title=""
        location=""
        date=""
        time=""
      />
      <FloatingBar />
    </div>
  );
}
