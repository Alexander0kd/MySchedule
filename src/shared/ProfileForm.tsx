import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Dropdown from 'react-native-input-select';
import uuid from 'react-native-uuid';
import { IProfile } from '../interfaces/profile.interface';
import { TFlatList } from 'react-native-input-select/lib/typescript/types/index.types';
import { AvailableUni } from '../environment/universities/available-uni.enum';
import { getFacultyList, getGroupList } from '../services/schedule-api.service';
import { UniEndpoints } from '../environment/universities/uni-endpoints.enum';
import { IGroup } from '../interfaces/group.interface';
import { IDropdown } from '../interfaces/dropdown.interface';

const CustomDropdown: FunctionComponent<{
    placeholder: string;
    options: TFlatList;
    selectedValue: string;
    onValueChange: (value: string) => void;
    disabled: boolean;
}> = (props) => {
    const arrowDropDownSvg = `
        <svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10H7Z"  />
        </svg>
    `;

    const { width } = Dimensions.get('window');

    return (
        <Dropdown
            placeholder={props.placeholder}
            options={props.options}
            selectedValue={props.selectedValue}
            onValueChange={props.onValueChange}
            disabled={props.disabled}
            dropdownStyle={{
                width: width - 32,
                minHeight: 56,
                backgroundColor: !props.selectedValue || props.disabled ? '#141218' : '#381E72',
                borderWidth: 1,
                borderColor: props.disabled ? 'rgba(202, 196, 208, 0.38) ' : '#FFF',
                borderRadius: 4,
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16,
                paddingRight: 48,
            }}
            placeholderStyle={{
                color: props.disabled ? 'rgba(202, 196, 208, 0.38) ' : '#CAC4D0',
                fontSize: 16,
            }}
            selectedItemStyle={{
                color: props.disabled ? 'rgba(202, 196, 208, 0.38) ' : '#FFF',
                fontSize: 16,
            }}
            dropdownIconStyle={{ top: 16, right: 16 }}
            dropdownIcon={<SvgXml xml={arrowDropDownSvg} width="24" height="24" fill={props.disabled ? 'rgba(202, 196, 208, 0.38) ' : 'white'} />}
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
            isSearchable
            searchControls={{
                textInputStyle: {
                    color: 'white',
                    fontWeight: '500',
                    minHeight: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    backgroundColor: 'rgba(202, 196, 208, 0.38)',
                    borderColor: 'rgb(202, 196, 208)',
                },
                textInputContainerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                textInputProps: {
                    placeholder: 'Пошук...',
                    placeholderTextColor: 'white',
                },
            }}
        />
    );
};

export const ProfileForm: FunctionComponent<{
    setIsFormFilled: (value: boolean) => void;
    setProfileData: (value: IProfile) => void;
    filledProfile?: IProfile;
}> = (props) => {
    const [university, setUniversity] = useState<AvailableUni>(null);
    const [faculty, setFaculty] = useState<string>(null);
    const [year, setYear] = useState<string>(null);
    const [group, setGroup] = useState<string>(null);

    const [universityList, setUniversityList] = useState<IDropdown[]>([]);
    const [facultyList, setFacultyList] = useState<IDropdown[]>([]);
    const [yearList, setYearList] = useState<IDropdown[]>([]);
    const [groupList, setGroupList] = useState<IDropdown[]>([]);

    useEffect(() => {
        if (props.filledProfile) {
            setUniversity(props.filledProfile.university);
            setFaculty(props.filledProfile.faculty);
            setYear(props.filledProfile.year.toString());
            setGroup(props.filledProfile.group);
        }
    }, []);

    useEffect(() => {
        // Erase Values
        props.setIsFormFilled(false);

        // Set University List
        const _universityList: IDropdown[] = [];
        Object.keys(AvailableUni).forEach((key: string) => {
            _universityList.push({
                value: key,
                label: AvailableUni[key],
            });
        });
        setUniversityList(_universityList);

        // Update Faculty List
        if (university) {
            const _facultyList = getFacultyList(AvailableUni[university]);
            setFacultyList(_facultyList);
        }

        // Set Year List
        if (university && faculty) {
            const _yearList: IDropdown[] = [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
            ];
            setYearList(_yearList);
        }

        // Update Group List
        if (university && faculty && year) {
            const updateGroupList = async () => {
                const _groupList: IDropdown[] = [];

                await getGroupList(UniEndpoints[university], Number(faculty), Number(year)).then((group: IGroup[]) => {
                    _groupList.slice(0, _groupList.length);

                    group.forEach((item: IGroup) => {
                        _groupList.push({
                            value: item.i,
                            label: item.l,
                        });
                    });
                });

                setGroupList(_groupList);
            };

            updateGroupList();
        }

        // If Form filled
        if (university && faculty && year && group) {
            props.setIsFormFilled(true);

            const selectedGroup = groupList.find((item: IDropdown) => item.value === group);

            const profile: IProfile = {
                id: uuid.v4().toString(),
                university: university,
                faculty: faculty,
                year: Number(year),
                group: group,
                groupName: selectedGroup ? selectedGroup.label : 'undefined',
                schedule: [],
                notes: [],
                settings: {
                    hidden: [],
                    notification: {
                        notifyChanges: false,
                        notifyBy: 0,
                        notificationList: [],
                    },
                },
                lastUpdate: new Date(),
            };

            props.setProfileData(profile);
        }
    }, [university, faculty, year, group]);

    return (
        <View style={{ marginBottom: 16 }}>
            <CustomDropdown
                placeholder="Університет"
                options={universityList as unknown as TFlatList}
                selectedValue={university}
                onValueChange={(value: AvailableUni) => {
                    setUniversity(value);
                    setFaculty('');
                    setYear('');
                    setGroup('');
                }}
                disabled={false}
            />

            <CustomDropdown
                placeholder="Факультет"
                options={facultyList as unknown as TFlatList}
                selectedValue={faculty}
                onValueChange={(value: string) => {
                    setFaculty(value);
                    setYear('');
                    setGroup('');
                }}
                disabled={!university}
            />

            <CustomDropdown
                placeholder="Курс"
                options={yearList as unknown as TFlatList}
                selectedValue={year}
                onValueChange={(value: string) => {
                    setYear(value);
                    setGroup('');
                }}
                disabled={!faculty || !university}
            />

            <CustomDropdown
                placeholder="Група"
                options={groupList as unknown as TFlatList}
                selectedValue={group}
                onValueChange={(value: string) => setGroup(value)}
                disabled={!faculty || !university || !year}
            />
        </View>
    );
};
