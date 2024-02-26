import { useState } from 'react';

export default function CreateDefaultModel() {
    const [facultyId, updateFacultyId] = useState(null);
    const [year, updateYear] = useState(null);
    const [groupId, updateGroupId] = useState(null);

    const data = {
        facultyId,
        year,
        groupId,
    };

    function setFacultyId(id) {
        updateFacultyId(id);
        data.facultyId = id;
    }

    function setYear(newYear) {
        updateYear(newYear);
        data.year = newYear;
    }

    function setGroupId(id) {
        updateGroupId(id);
        data.groupId = id;
    }

    return {
        setFacultyId,
        setYear,
        setGroupId,
        facultyId,
        year,
        groupId,
        data,
    };
}
