import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Dropdown from 'react-native-input-select';

const CustomDropdown = ({ placeholder, options, selectedValue, onValueChange, disabled }) => {
    return (
        <Dropdown
            placeholder={placeholder}
            options={options}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            disabled={disabled}

            // TODO: Оформити інпути
            checkboxComponentStyles={{
                checkboxStyle: {
                    borderRadius: 30,
                }
            }}

            // ! Документація:
            // * https://github.com/azeezat/react-native-select
        />
    );
}

const UniversityOptions = [
    { label: 'Прикарпатський', value: 'Прикарпатський' },
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


export default function ProfileForm() {
    const [university, setUniversity] = React.useState();
    const [faculty, setFaculty] = React.useState();
    const [year, setYear] = React.useState();
    const [group, setGroup] = React.useState();
    
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
                disabled={!faculty}
            />

            <CustomDropdown
                placeholder="Група"
                options={GroupOptions}
                selectedValue={group}
                onValueChange={(value) => setGroup(value)}
                disabled={!year}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pickersWrapper: {
        gap: 16,
        marginBottom: 24,
    },
});