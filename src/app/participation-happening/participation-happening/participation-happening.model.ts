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
