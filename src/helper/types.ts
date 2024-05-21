import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export type InputChangeEventHandler =
  React.ChangeEventHandler<HTMLInputElement>;
export type TextareaChangeEventHandler =
  React.ChangeEventHandler<HTMLTextAreaElement>;
export type SelectChangeEventHandler =
  React.ChangeEventHandler<HTMLSelectElement>;

export interface InputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export type editor = typeof ClassicEditor;

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitHandler = React.FormEventHandler<HTMLFormElement>;
