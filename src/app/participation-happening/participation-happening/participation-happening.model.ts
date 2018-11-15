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

export interface IMatchedParticipationData {
  me: IMemberView;
  matchedMember: IMemberView;
}

export interface IParticipationHappening {
  member: IMemberView;
  happening: IHappeningView;
}

export const MATCHED_PARTICIPATION_DATA: IMatchedParticipationData = {
  me: {
    id: '',
    name: ''
  },
  matchedMember: {
    id: '',
    name: ''
  }
};

export const PARTICIPATION_HAPPENING_MOCK: IParticipationHappening = {
  happening: {
    id: '',
    name: '',
    description: '',
    isPublish: false,
  },
  member: {
    id: '',
    name: ''
  }
};
