import axios from 'axios';
import {ScheduleItem} from "./schedule-item.enum";
import { FacultyData } from './faculty-data';

export async function getGroupList(url, facultyId, year) {
    const fullURL = `${url}${year}/data/groups-list.js`;
    try {
        const response = await axios.get(fullURL);
        let data = response.data;

        data = data.replace("const PNUgroups=", '');
        data = data.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');

        const groups = JSON.parse(data);

        const filteredGroups = groups.filter((group) => {
            if (group.f === facultyId) return true;
            return false;
        });

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
  const fullURL = `https://${url}/${year}/static/groups/${facultyId}/${groupId}/index.js`;

   try {
      const response = await axios.get(fullURL);
      let data = response.data;
      data = data.replace("const PNUschedule=", '');
      data = data.replace(/(\w+):/g, '"$1":');
      data = data.replace(/"(\d{2})":"(\d{2})"":""(\d{2})"/g, '"$1:$2:$3"');
      data = data.replace(/"ls":"(.[^"]+)"/g, '"ls":$1');
      data = data.replace(/"le":"(.[^"]+)"/g, '"le":$1');

      const scheduleItems = JSON.parse(data);
      const formattedScheduleItems = scheduleItems.map(item => new ScheduleItem(item));
      return formattedScheduleItems;

  } catch (error) {
      console.error('Error fetching group schedule:', error);
      return [];
  }
}

