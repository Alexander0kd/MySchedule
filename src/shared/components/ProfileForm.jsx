import { View } from 'react-native';
import { StyleSheet } from 'react-native';

import CustomDropDownPicker from '../../shared/components/DropDownPicker';

const ProfileForm = () => {
    return (
        <View style={styles.pickersWrapper}>
            <CustomDropDownPicker
                open={false}
                value={'Університет'}
                placeholder={'Університет'}
                items={[{ label: 'Прикарпатський', value: 'Прикарпатський' }]}
            />

            <CustomDropDownPicker
                open={false}
                value={'Факультет'}
                placeholder={'Факультет'}
                items={[
                    { label: 'Фізико-технічний', value: 'Фізико-технічний' },
                    {
                        label: 'Математики та інформатики',
                        value: 'Математики та інформатики',
                    },
                    { label: 'Економічний', value: 'Економічний' },
                    {
                        label: 'Інститут пілсядипломної освіти та довузівської підготовки',
                        value: 'Інститут пілсядипломної освіти та довузівської підготовки',
                    },
                    {
                        label: 'Коломийський навчально-науковий інститут',
                        value: 'Коломийський навчально-науковий інститут',
                    },
                    {
                        label: 'Навчально-науковий інститут мистецтв',
                        value: 'Навчально-науковий інститут мистецтв',
                    },
                    {
                        label: 'Навчально-науковий Юридичний інститут',
                        value: 'Навчально-науковий Юридичний інститут',
                    },
                ]}
            />
            <CustomDropDownPicker
                open={false}
                value={'Курс'}
                placeholder={'Курс'}
                items={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                ]}
            />
            <CustomDropDownPicker
                open={false}
                value={'Група'}
                placeholder={'Група'}
                items={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                ]}
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

export default ProfileForm;
