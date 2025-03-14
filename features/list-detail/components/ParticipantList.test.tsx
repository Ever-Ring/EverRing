import { render, screen, fireEvent } from "@testing-library/react";
import ParticipantList from "@features/list-detail/components/ParticipantList";
import { Participant } from "@customTypes/gathering";

const sampleParticipants: Participant[] = [
  {
    teamId: 1,
    userId: 1,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 1,
      email: "user1@example.com",
      name: "User 1",
      companyName: "Company 1",
      image: "image1.png",
    },
  },
  {
    teamId: 1,
    userId: 2,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 2,
      email: "user2@example.com",
      name: "User 2",
      companyName: "Company 2",
      image: "image2.png",
    },
  },
  {
    teamId: 1,
    userId: 3,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 3,
      email: "user3@example.com",
      name: "User 3",
      companyName: "Company 3",
      image: "image3.png",
    },
  },
  {
    teamId: 1,
    userId: 4,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 4,
      email: "user4@example.com",
      name: "User 4",
      companyName: "Company 4",
      image: "image4.png",
    },
  },
  {
    teamId: 1,
    userId: 5,
    gatheringId: 123,
    joinedAt: "2025-03-14T10:00:00Z",
    User: {
      id: 5,
      email: "user5@example.com",
      name: "User 5",
      companyName: "Company 5",
      image: "image5.png",
    },
  },
];

describe("ParticipantList Component", () => {
  it("should render participants correctly", () => {
    render(<ParticipantList participants={sampleParticipants} />);

    expect(
      screen.getByText(`${sampleParticipants.length}명`),
    ).toBeInTheDocument();

    sampleParticipants.slice(0, 4).forEach((participant) => {
      expect(
        screen.getByLabelText(`Participant ${participant.User.name}`),
      ).toBeInTheDocument();
    });

    const hiddenCountElement = screen.getByText("+1");
    expect(hiddenCountElement).toBeInTheDocument();
  });

  it("should display the hover dropdown with hidden participants when hovered over the +X icon", () => {
    render(<ParticipantList participants={sampleParticipants} />);

    const hiddenCountElement = screen.getByText("+1").parentElement!;

    fireEvent.mouseEnter(hiddenCountElement);

    expect(screen.getByText("User 5")).toBeInTheDocument();

    fireEvent.mouseLeave(hiddenCountElement);

    expect(screen.queryByText("User 5")).not.toBeInTheDocument();
  });

  it("should display only the first 4 participants' images and show +X when there are more than 4 participants", () => {
    render(<ParticipantList participants={sampleParticipants} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(4);

    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("should not display any hidden participants dropdown when there are 4 or fewer participants", () => {
    const fewParticipants = [
      {
        teamId: 1,
        userId: 1,
        gatheringId: 123,
        joinedAt: "2025-03-14T10:00:00Z",
        User: {
          id: 1,
          email: "user1@example.com",
          name: "User 1",
          companyName: "Company 1",
          image: "image1.png",
        },
      },
      {
        teamId: 1,
        userId: 2,
        gatheringId: 123,
        joinedAt: "2025-03-14T10:00:00Z",
        User: {
          id: 2,
          email: "user2@example.com",
          name: "User 2",
          companyName: "Company 2",
          image: "image2.png",
        },
      },
      {
        teamId: 1,
        userId: 3,
        gatheringId: 123,
        joinedAt: "2025-03-14T10:00:00Z",
        User: {
          id: 3,
          email: "user3@example.com",
          name: "User 3",
          companyName: "Company 3",
          image: "image3.png",
        },
      },
      {
        teamId: 1,
        userId: 4,
        gatheringId: 123,
        joinedAt: "2025-03-14T10:00:00Z",
        User: {
          id: 4,
          email: "user4@example.com",
          name: "User 4",
          companyName: "Company 4",
          image: "image4.png",
        },
      },
    ];

    render(<ParticipantList participants={fewParticipants} />);

    expect(screen.queryByText("+1")).not.toBeInTheDocument();
  });
});
