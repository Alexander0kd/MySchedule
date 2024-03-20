import { getUniqueSchedule, handleError } from './utility.service';
import { INote, INoteData } from '../shared/interfaces/notes.interface';
import { getActiveProfile, updateProfileById } from './local-storage.service';

function clearEmptyNotes(notes: INote[]): INote[] {
    return notes.filter((item) => item.data.length !== 0);
}

export async function getAllSubjects(): Promise<INote[]> {
    try {
        const activeProfile = await getActiveProfile();
        const { notes, schedule } = activeProfile;

        const uniqueItems = getUniqueSchedule(schedule);
        uniqueItems.push('Власні нотатки');
        
        uniqueItems.forEach((item) => {
            if (!notes.some((scheduleItem) => scheduleItem.subject === item) && !item.includes('Письм.Екз.')) {
                notes.push({
                    subject: item,
                    data: []
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
        handleError(error);
    }
}

export async function addNote(noteGroup: INote, noteData: INoteData) {
    const activeProfile = await getActiveProfile();
    
    let foundNoteIndex = activeProfile.notes.findIndex((item) => item.subject === noteGroup.subject);
    if (foundNoteIndex == -1) {
        activeProfile.notes.push(noteGroup);
        foundNoteIndex = activeProfile.notes.length - 1;
    }

    activeProfile.notes[foundNoteIndex].data.push(noteData);

    activeProfile.notes = clearEmptyNotes(activeProfile.notes);
    updateProfileById(activeProfile.id, activeProfile, true);
}

export async function deleteNoteById(noteGroup: INote, noteId: number) {
    const activeProfile = await getActiveProfile();
    
    const index = activeProfile.notes.findIndex((item) => item.subject === noteGroup.subject);
    if (index === -1) {
        handleError(new Error('Cant find subject'));
        return;
    }

    if (!activeProfile.notes[index].data[noteId]) {
        handleError(new Error('Cant find note'));
        return;
    }

    activeProfile.notes[index].data.splice(noteId, 1);

    activeProfile.notes = clearEmptyNotes(activeProfile.notes);
    updateProfileById(activeProfile.id, activeProfile, true);
}

export async function updateNotesBySubject(editedNote: INote) {
    const activeProfile = await getActiveProfile();

    const index = activeProfile.notes.findIndex((item) => item.subject === editedNote.subject);
    if (index === -1) {
        handleError(new Error('Cant find subject'));
        return;
    }

    activeProfile.notes[index].data = editedNote.data;

    activeProfile.notes = clearEmptyNotes(activeProfile.notes);
    updateProfileById(activeProfile.id, activeProfile, true);
}
