export interface MemberUniqueLinkData {
  name: string;
  uniqueLink: string;
}

export interface IMemberView {
  id: string;
  name: string;
}

export interface IHappeningView {
  id: string;
  name: string;
  description: string;
  isPublish: boolean;
}

export interface IParticipationHappening {
  member: IMemberView;
  happening: IHappeningView;
}
