import axios from 'axios';

import { PnuFaculty } from '../shared/universities/faculty/pnu.faculty';
import { UniEndpoints } from '../shared/universities/uni-endpoints.enum';
import { IGroup } from '../shared/interfaces/group.interface';
import { AvailableUni } from '../shared/universities/available-uni.enum';
import { IFaculty } from '../shared/interfaces/faculty.interface';

/**
 * @function getFacultyList | Отримати список факультетів Університету.
 * @param { AvailableUni } uni - Enum AvailableUni
 */
export function getFacultyList(uni: AvailableUni): IFaculty[] {
    const faculties: IFaculty[] = [];

    switch (uni) {
        case AvailableUni.PNU:
            Object.keys(PnuFaculty).forEach((key: string) => {
                faculties.push({
                    value: key,
                    label: PnuFaculty[key],
                });
            });
            break;
    }

    return faculties;
}

/**
 * @function getGroupList | Отримати список груп.
 * @param { UniEndpoints } uni Endpoint API Розкладу Університету
 * @param { Number } facultyId ID Потрібного факультету
 * @param { Number } year Рік, за яким шукати групу
 */
export async function getGroupList(uni: UniEndpoints, facultyId: number, year: number) {
    const fullURL = `https://${uni}/2023-2024-1/data/groups-list.js`;

    try {
        const response = await axios.get(fullURL);
        let data = response.data.replace('const PNUgroups=', '');
        data = data.replace(/,(\w+):/g, ',"$1":');
        data = data.replace(/{(\w+):/g, '{"$1":');

        const groups = JSON.parse(data);

        return groups.filter((group: IGroup) => {
            const groupNumbers = group.l.match(/\d+/);
            const groupFirstChar = groupNumbers ? groupNumbers[0] : 0;

            return group.f === facultyId && year == groupFirstChar[0];
        });
    } catch (error) {
        console.error('Error fetching group list:', error);
        return [];
    }
}

/**
 * @function getGroupSchedule | Отримати розклад групи.
 * @param { AvailableUni } url Endpoint API Розкладу Університету
 * @param { Number } groupId ID Потрібної групи
 * @param { Number } year Рік, за яким робиться запит
 * @param { Number } facultyId ID Потрібного факультету
 */
export async function getGroupSchedule(url: UniEndpoints, facultyId: string, groupId: string) {
    const formatedGroupId = String(groupId).padStart(6, '0');

    const fullURL = `https://${url}/2023-2024-2/static/groups/${facultyId}/${formatedGroupId}/index.js`;

    try {
        const response = await axios.get(fullURL);
        let data = response.data;
        data = data.replace('const PNUschedule=', '');
        data = data.replace(/,(\w+):/g, ',"$1":');
        data = data.replace(/{(\w+):/g, '{"$1":');

        return JSON.parse(data);
    } catch (error) {
        console.error('Error fetching group schedule:', error);
        return [];
    }
}
