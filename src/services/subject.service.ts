import { ISubject } from "../shared/interfaces/subject.interface";

export const subjectService = {
    groupSubjects: [] as ISubject[],

    addSubject: ( value: string) => {
        try {
            subjectService.groupSubjects.push({
                l: value,
                v: true
            });
        } catch (error) {
            console.error(error);
        }
    },
};

export default subjectService;
