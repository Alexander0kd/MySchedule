import { getUniqueSchedule, handleError } from '../utils/utility.service';
import { INote, INoteData } from '../interfaces/notes.interface';
import { getActiveProfile, updateProfileData } from './profile.service';

/**
 * Removes empty notes from the given array.
 * @param notes Array of notes to filter
 * @returns Filtered array of notes
 */
function clearEmptyNotes(notes: INote[]): INote[] {
    return notes.filter((item) => item.data.length !== 0);
}

/**
 * Retrieves all subjects along with their notes.
 * @returns Promise resolving to an array of notes
 */
export async function getAllSubjects(): Promise<INote[]> {
    try {
        const activeProfile = await getActiveProfile();
        const { notes, schedule } = activeProfile;

        const uniqueItems = getUniqueSchedule(schedule);
        uniqueItems.push('Власні нотатки');

        uniqueItems.forEach((item) => {
            if (!notes.some((note) => note.subject === item) && !item.includes('Письм.Екз.')) {
                notes.push({
                    subject: item,
                    data: [],
                });
            }
        });

        return notes.sort((a, b) => {
            if (a.subject.includes('Власні нотатки') && !b.subject.includes('Власні нотатки')) {
                return -1;
            }

            if (!a.subject.includes('Власні нотатки') && b.subject.includes('Власні нотатки')) {
                return 1;
            }

            return a.subject.localeCompare(b.subject);
        });
    } catch (error) {
        handleError(error, `Виникла помилка під час отримання списку нотаток!`);
        return []; // Return empty array in case of error
    }
}

/**
 * Adds a new note to the specified note group.
 * @param noteGroup Note group to which the note is to be added
 * @param noteData Data of the note to be added
 */
export async function addNote(noteGroup: INote, noteData: INoteData) {
    const activeProfile = await getActiveProfile();

    let foundNoteIndex = activeProfile.notes.findIndex((note) => note.subject === noteGroup.subject);
    if (foundNoteIndex === -1) {
        activeProfile.notes.push(noteGroup);
        foundNoteIndex = activeProfile.notes.length - 1;
    }

    activeProfile.notes[foundNoteIndex].data.push(noteData);

    activeProfile.notes = clearEmptyNotes(activeProfile.notes);
    updateProfileData(activeProfile.id, activeProfile);
}

/**
 * Deletes a note by its ID from the specified note group.
 * @param noteGroup Note group from which the note is to be deleted
 * @param noteId ID of the note to be deleted
 */
export async function deleteNoteById(noteGroup: INote, noteId: number) {
    const activeProfile = await getActiveProfile();

    const index = activeProfile.notes.findIndex((note) => note.subject === noteGroup.subject);
    if (index === -1) {
        handleError(null, `Виникла помилка під час видалення нотатки: Предмет не знайдений!`);
        return;
    }

    if (!activeProfile.notes[index].data[noteId]) {
        handleError(null, `Виникла помилка під час видалення нотатки: Нотатка не знайдена!`);
        return;
    }

    activeProfile.notes[index].data.splice(noteId, 1);

    activeProfile.notes = clearEmptyNotes(activeProfile.notes);
    updateProfileData(activeProfile.id, activeProfile);
}

/**
 * Updates notes for a specific subject.
 * @param editedNote Updated note object
 */
export async function updateNotesBySubject(editedNote: INote) {
    const activeProfile = await getActiveProfile();

    const index = activeProfile.notes.findIndex((note) => note.subject === editedNote.subject);
    if (index === -1) {
        handleError(null, `Виникла помилка під час видалення нотатки: Предмет не знайдений!`);
        return;
    }

    activeProfile.notes[index].data = editedNote.data;

    activeProfile.notes = clearEmptyNotes(activeProfile.notes);
    updateProfileData(activeProfile.id, activeProfile);
}
