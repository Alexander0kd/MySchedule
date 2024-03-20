import { INote } from "../interfaces/notes.interface";

export type AvailableRoutes = {
    OnboardingPage: undefined;

    AppNavbar: undefined;

    NotesList: undefined;
    NotesEdit: { noteGroup: INote, noteId: number };
    NotesAdd: { noteGroup: INote };

    SettingsProfile: undefined;

    ProfileList: undefined;
    ProfileEdit: { profileId: string };
    ProfileAdd: undefined;

    SettingsNotification: undefined;
    SettingsShedule: undefined;

    FAQPage: undefined;
};
