import { React, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Dropdown from 'react-native-input-select';
import uuid from 'react-native-uuid';
import { IProfile } from '../classes/profile.class';

const arrowDropDownSvg = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z"  />
</svg>
`;

const { width } = Dimensions.get('window');

const CustomDropdown = ({ placeholder, options, selectedValue, onValueChange, disabled }) => {
    return (
        <Dropdown
            placeholder={placeholder}
            options={options}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            disabled={disabled}
            dropdownStyle={{
                width: width - 32,
                minHeight: 56,
                backgroundColor: !selectedValue || disabled ? '#141218' : '#381E72',
                borderWidth: 1,
                borderColor: disabled ? 'rgba(202, 196, 208, 0.38) ' : '#FFF',
                borderRadius: 4,
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16,
                paddingRight: 48,
            }}
            placeholderStyle={{
                color: disabled ? 'rgba(202, 196, 208, 0.38) ' : '#CAC4D0',
                fontSize: 16,
            }}
            selectedItemStyle={{
                color: disabled ? 'rgba(202, 196, 208, 0.38) ' : '#FFF',
                fontSize: 16,
            }}
            dropdownIconStyle={{ top: 16, right: 16 }}
            dropdownIcon={<SvgXml xml={arrowDropDownSvg} width="24" height="24" fill={disabled ? 'rgba(202, 196, 208, 0.38) ' : 'white'} />}
            checkboxComponentStyles={{
                checkboxStyle: {
                    backgroundColor: '#381E72',
                    borderRadius: 30,
                    padding: 6,
                    borderColor: 'transparent',
                },
                checkboxLabelStyle: {
                    color: '#FFF',
                    fontSize: 16,
                    paddingLeft: 8,
                },
            }}
            modalOptionsContainerStyle={{
                padding: 10,
                paddingBottom: 20,
                backgroundColor: '#49454F',
            }}
        />
    );
};

const UniversityOptions = [
    { label: 'Прикарпатський Національний Університет імені Василя Стефаника', value: 'Прикарпатський' },
    { label: 'Прикарпатський Національний Університет імені Василя Стефаника', value: 'Прикарпатський2' },
    { label: 'Прикарпатський Національний Університет імені Василя Стефаника', value: 'Прикарпатський3' },
];

const FacultyOptions = [
    { label: 'Фізико-технічний', value: 'Фізико-технічний' },
    { label: 'Математики та інформатики', value: 'Математики та інформатики' },
    { label: 'Економічний', value: 'Економічний' },
    { label: 'Фізико-технічний', value: 'Фізико-технічний2' },
    { label: 'Математики та інформатики', value: 'Математики та інформатики2' },
    { label: 'Економічний', value: 'Економічний2' },
    { label: 'Фізико-технічний', value: 'Фізико-технічний3' },
    { label: 'Математики та інформатики', value: 'Математики та інформатики3' },
    { label: 'Економічний', value: 'Економічний3' },
];

const YearOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
];

const GroupOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
];

export default function ProfileForm({ setIsFormFilled, setProfileData }) {
    const [university, setUniversity] = useState();
    const [faculty, setFaculty] = useState();
    const [year, setYear] = useState();
    const [group, setGroup] = useState();

    useEffect(() => {
        setIsFormFilled(false);

        if (university && faculty && year && group) {
            setIsFormFilled(true);
            const profile = new IProfile({
                id: uuid.v4(),
                university: university,
                faculty: faculty,
                year: year,
                group: group,
            });
            setProfileData(profile);
        }
    }, [university, faculty, year, group]);

    return (
        <View style={styles.pickersWrapper}>
            <CustomDropdown
                placeholder="Університет"
                options={UniversityOptions}
                selectedValue={university}
                onValueChange={(value) => setUniversity(value)}
                disabled={false}
            />

            <CustomDropdown
                placeholder="Факультет"
                options={FacultyOptions}
                selectedValue={faculty}
                onValueChange={(value) => setFaculty(value)}
                disabled={!university}
            />

            <CustomDropdown
                placeholder="Курс"
                options={YearOptions}
                selectedValue={year}
                onValueChange={(value) => setYear(value)}
                disabled={!faculty || !university}
            />

            <CustomDropdown
                placeholder="Група"
                options={GroupOptions}
                selectedValue={group}
                onValueChange={(value) => setGroup(value)}
                disabled={!faculty || !university || !year}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pickersWrapper: {
        marginBottom: 16,
    },
});
