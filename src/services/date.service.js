import axios from 'axios';
import {ScheduleItem} from "./schedule-item.enum";
import { FacultyData } from './faculty-data';
export async function getGroupList(url, facultyId, year) {
    const fullURL = `${url}${year}/data/groups-list.js`;
    console.log(fullURL);
    try {
        const response = await axios.get(fullURL);
        let data = response.data;

        data = data.replace("const PNUgroups=", '');
        data = data.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');

        const groups = JSON.parse(data);
        console.log('All Groups:', groups);

        const filteredGroups = groups.map(group => {
            if (group.f === facultyId) return AvailableGroups.create(group);
        });
     //   console.log('Filtered Group List:', filteredGroups);

       return filteredGroups;
    } catch (error) {
        console.error('Error fetching group list:', error);
        return [];
    }
}

export function getFacultyList() {
    const faculties = Object.keys(FacultyData).map(key => ({
        key: key,
        name: FacultyData[key]
    }));
    return faculties;
}

export async function getGroupSchedule(url, groupId, year, facultyId) {
    const fullURL = `${url}${year}/static/groups/${facultyId}/${groupId}/index.js`;
    console.log(fullURL);
    // try {
    //     const response = await axios.get(fullURL);
    //     let data = response.data;
    //     data = data.replace("const PNUschedule=", '');
    //
    //     // Заміна одинарних лапок на подвійні лапки для ключів та значень
    //     data = data.replace(/(\w+)\s*:/g, '"$1":');
    //     data = data.replace(/'([^']+)'/g, '"$1"');
    
    //     const scheduleItems = JSON.parse(data);
    //
    //    // console.log('Group Schedule:', scheduleItems);
    //     return scheduleItems;
    // } catch (error) {
    //     console.error('Error fetching group schedule:', error);
    //     return [];
    // }
}



