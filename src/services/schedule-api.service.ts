import axios from 'axios';

import { PnuFaculty } from '../shared/universities/faculty/pnu.faculty';
import { UniEndpoints } from '../shared/universities/uni-endpoints.enum';
import { IGroup } from '../shared/interfaces/group.interface';
import { AvailableUni } from '../shared/universities/available-uni.enum';
import { getYearRequest, handleError } from './utility.service';
import { ISchedule } from '../shared/interfaces/schedule.interface';
import { IDropdown } from '../shared/interfaces/dropdown.interface';

/**
 * Retrieves the list of faculties for the specified university.
 * @param uni The enum value representing the university.
 * @returns An array of faculty objects.
 */
export function getFacultyList(uni: AvailableUni): IDropdown[] {
    const faculties: IDropdown[] = [];

    switch (uni) {
        case AvailableUni.PNU:
            Object.entries(PnuFaculty).forEach(([value, label]) => {
                faculties.push({ value, label });
            });
            break;
    }

    return faculties;
}

/**
 * Retrieves the list of groups for the specified faculty and year.
 * @param uni The endpoint API for the university.
 * @param facultyId The ID of the faculty.
 * @param year The year for which the groups are needed.
 * @returns An array of group objects.
 */
export async function getGroupList(uni: UniEndpoints, facultyId: number, year: number): Promise<IGroup[]> {
    const fullURL = `https://${uni}/2023-2024-1/data/groups-list.js`;

    try {
        const response = await axios.get(fullURL);
        let data = response.data.replace(/^.*?=/, '');
        data = data.replace(/,(\w+):/g, ',"$1":');
        data = data.replace(/{(\w+):/g, '{"$1":');

        const groups = JSON.parse(data);

        return groups.filter((group: IGroup) => {
            const groupNumbers = group.l.match(/-(\d+)/);
            const groupFirstChar = groupNumbers ? groupNumbers[0].replaceAll('-', '') : 0;

            return group.f === facultyId && year == groupFirstChar[0];
        });
    } catch (error) {
        handleError(error);
        return [];
    }
}

/**
 * Retrieves the schedule for the specified group.
 * @param url The endpoint API for the university.
 * @param facultyId The ID of the faculty.
 * @param groupId The ID of the group.
 * @returns The schedule data for the group.
 */
export async function getGroupSchedule(url: UniEndpoints, facultyId: string, groupId: string): Promise<ISchedule[]> {
    const formatedGroupId = String(groupId).padStart(6, '0');

    const fullURL = `https://${url}/${getYearRequest()}/static/groups/${facultyId}/${formatedGroupId}/index.js`;

    try {
        const response = await axios.get(fullURL);
        let data = response.data.replace(/^.*?=/, '');
        data = data.replace(/,(\w+):/g, ',"$1":');
        data = data.replace(/{(\w+):/g, '{"$1":');

        return JSON.parse(data);
    } catch (error) {
        handleError(error);
        return [];
    }
}
