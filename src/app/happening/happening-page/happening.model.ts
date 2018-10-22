export interface Happening {
  name: string;
  description: string;
  participantList: IParticipantView[];
}

export interface IParticipantView {
  name: string;
}
export const INIT_FORM_NEW_PARTICIPANT: IParticipantView[] = [];

export const INIT_FORM_HAPPENING: Happening = {
  name: '',
  description: '',
  participantList: INIT_FORM_NEW_PARTICIPANT,
};
