import { handleError } from './utility.service';

import { INote } from '../shared/interfaces/notes.interface';
import { getActiveProfile, updateProfileById } from './local-storage.service';

export async function getAllSubjects(): Promise<INote[]> {
    try {
        const activeProfile = await getActiveProfile();
        const { notes, schedule, id } = activeProfile;

        if (notes.length < 1) {
            const allSubjects = Array.from(new Set(schedule.map((item) => item.l))).sort(customSort);

            const profileNotes = createProfileNotes(allSubjects);
            activeProfile.notes = profileNotes;
            await updateProfileById(id, activeProfile, true);

            return activeProfile.notes;
        } else {
            return notes;
        }
    } catch (error) {
        handleError(error);
        throw error;
    }
}

function customSort(a: string, b: string): number {
    if (a.includes('Письм.Екз.') && !b.includes('Письм.Екз.')) {
        return 1;
    } else if (!a.includes('Письм.Екз.') && b.includes('Письм.Екз.')) {
        return -1;
    }
    return a.localeCompare(b);
}

function createProfileNotes(allSubjects: string[]): INote[] {
    return allSubjects.map((subject) => ({ subject, notes: [] }));
}

export async function getAllNotes(activeProfile: object, allSubjects: string[]): Promise<boolean> {
    try {
        let profileNotes = activeProfile.notes;

        // Якщо у профілю немає записів, створюємо їх
        if (profileNotes.length < 1) {
            profileNotes = allSubjects.map((subject: string) => {
                return {
                    subject,
                    notes: [],
                };
            });
            activeProfile.notes = profileNotes;

            updateProfileById(activeProfile.id, activeProfile, true);

            return activeProfile.notes;
        } else {
            return activeProfile.notes;
        }
    } catch (error) {
        handleError(error);
        throw error;
    }
}

// export async function addNote(subject: string, noteData: INote ): Promise<boolean> {
//     try {
//         const notes = await getAllNotes();

//         await AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));

//         return true;
//     } catch (error) {
//         handleError(error);
//         return false;
//     }
// }
