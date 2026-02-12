export interface Member {
  id: string;
  name: string;
  avatar: string;
}

export interface VoteMatrix {
  [giverId: string]: {
    [receiverId: string]: number;
  };
}

export interface WeekResult {
  week: string;
  scores: { [memberId: string]: number };
  driver: string;
  isTie: boolean;
  tiedMembers?: string[];
  date: string;
}

export interface StorageData {
  members: Member[];
  history: WeekResult[];
}
