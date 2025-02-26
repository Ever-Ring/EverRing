import { render, screen } from "@testing-library/react";
import StateChip from "./StateChip";

describe("StateChip Component Test", () => {
  test("should render '이용 예정' text by default", () => {
    render(<StateChip />);
    expect(screen.getByText("이용 예정").textContent).toBe("이용 예정");
  });

  test("should render '이용 예정' text when isCompleted is false", () => {
    render(<StateChip isCompleted={false} />);
    expect(screen.getByText("이용 예정").textContent).toBe("이용 예정");
  });

  test("should render '이용 완료' text when isCompleted is true", () => {
    render(<StateChip isCompleted={true} />);
    expect(screen.getByText("이용 완료").textContent).toBe("이용 완료");
  });

  test("should render '개설 대기' text when isPending is true", () => {
    render(<StateChip isCompleted={false} isPending={true} />);
    expect(screen.getByText("개설 대기").textContent).toBe("개설 대기");
  });

  test("should render '개설 확정' text when isPending is false", () => {
    render(<StateChip isCompleted={false} isPending={false} />);
    expect(screen.getByText("개설 확정").textContent).toBe("개설 확정");
  });
});
