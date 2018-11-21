export interface Happening {
  name: string;
  organiserName: string;
  description: string;
  participantList: IParticipantView[];
}

export interface IParticipantView {
  name: string;
}

export const INIT_FORM_NEW_PARTICIPANT: IParticipantView[] = [];

export const INIT_FORM_HAPPENING: Happening = {
  name: '',
  organiserName: '',
  description: '',
  participantList: INIT_FORM_NEW_PARTICIPANT,
};

export interface CreatedHappening {
  name: string;
  description: string;
  participantList: ParticipantUniqueLinkData[];
}

export interface ParticipantUniqueLinkData {
  name: string;
  uniqueLink: string;
}


export interface ParticipantUniqueLinkDataView {
  name: string;
  uniqueLink: string;
  copied: boolean;
}

export const PARTICIPANT_UNIQUE_LINK_DATA: ParticipantUniqueLinkData[] = [
  {
    name: 'Kline',
    uniqueLink: 'ca71ad35-e5e8-8156-e633-9405a3357f7b'
  }, {
    name: 'Le',
    uniqueLink: 'ca71ad35-e5e8-8156-e633-9405a3357f7b'
  }, {
    name: 'Barlow',
    uniqueLink: 'ca71ad35-e5e8-8156-e633-9405a3357f7b'
  }, {
    name: 'Sheila libero purus',
    uniqueLink: 'ca71ad35-e5e8-8156-e633-9405a3357f7b'
  },
];
