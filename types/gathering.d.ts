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
  limit?: number;
  offset?: number;
  location?: string | null;
  date?: string | null;
  sortBy?: string | null;
  type?: string | null;
  sortOrder?: "asc" | "desc";
  createdBy?: number;
}
