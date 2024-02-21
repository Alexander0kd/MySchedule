import axios from 'axios';
import { ISchedule } from './../shared/classes/schedule.class';
import { PnuFaculty } from '../shared/enums/pnu-faculty.enum';

/**
 * @function getGroupList | Отримати список груп.
 * @param { AvailableUni } url Endpoint API Розкладу Університету
 * @param { Number } facultyId ID Потрібного факультету
 * @param { Number } year Рік, за яким робиться запит
 */
export async function getGroupList(url, facultyId, year) {
    const fullURL = `${url}${year}/data/groups-list.js`;

    try {
        const response = await axios.get(fullURL);
        const data = response.data.replace('const PNUgroups=', '');
        const groups = JSON.parse(data);

        return groups.filter((group) => group.f === facultyId);
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
export async function getGroupSchedule(url, groupId, year, facultyId) {
    const fullURL = `https://${url}/${year}/static/groups/${facultyId}/${groupId}/index.js`;

    try {
        const response = await axios.get(fullURL);
        let data = response.data;
        data = data.replace('const PNUschedule=', '');
        data = data.replace(/,(\w+):/g, ',"$1":');
        data = data.replace(/{(\w+):/g, '{"$1":');

        const scheduleItems = JSON.parse(data);
        const formattedScheduleItems = scheduleItems.map((item) => new ISchedule(item));
        return formattedScheduleItems;
    } catch (error) {
        console.error('Error fetching group schedule:', error);
        return [];
    }
}

/**
 * @function getFacultyList | Отримати список факультетів ПНУ.
 * @deprecated TODO: Переписати функцію під всі факультети
 */
export function getFacultyList() {
    const faculties = Object.keys(PnuFaculty).map((key) => ({
        key: key,
        name: PnuFaculty[key],
    }));
    return faculties;
}
