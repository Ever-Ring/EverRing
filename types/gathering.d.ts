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

export interface GatheringItemProps {
  gathering: Gathering;
}

export interface GatheringListProps {
  gatherings: Gathering[];
}

export interface GatheringParams {
  id?: string;
  limit?: number;
  offset?: number;
  location?: string | null;
  date?: string | null;
  sortBy?: string | null;
  type?: string | null;
  sortOrder?: "asc" | "desc";
  createdBy?: number;
}

export interface CreateGatheringValues {
  location: string;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  image: string;
}

export interface Participant {
  teamId: number;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  user: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image: string;
  };
}
