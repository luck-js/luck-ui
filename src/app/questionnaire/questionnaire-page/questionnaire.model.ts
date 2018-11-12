export interface Questionnaire {
  name: string;
  email: string;
  telephone: string;
}

export enum QuestionnaireId {
  name = 2005620554,
  email = 1045781291,
  telephone = 1166974658,
}

export interface QuestionnaireData {
  2005620554: string;
  1045781291: string;
  1166974658: string;
}

export const INIT_FORM_QUESTIONNAIRE = {
  name: '',
  email: '',
  telephone: '',
};
