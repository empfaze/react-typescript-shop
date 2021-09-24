export interface ValueState {
  value: string;
  isTouched: boolean;
}

export interface MainFormAction {
  type: string;
  value?: string;
}

export interface SendToAuth {
  email: string;
  password: string;
}
