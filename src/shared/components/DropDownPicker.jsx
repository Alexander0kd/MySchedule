import { Component } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Dimensions } from 'react-native';

class CustomDropDownPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: props.placeholder || '-----',
            open: props.open || false,
            value: props.value || null,
            items: props.items || [{ label: 'None', value: 'none' }],
            prevValue: '',

            isSearchable: props.isSearchable || false,
            // can use in future if we agree it

            pickerStyle: styles.input,
            textStyle: { color: '#CAC4D0' },
            dropDownContainerStyle: {
                backgroundColor: '#141218',
                zIndex: 9999,
                borderWidth: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderColor: '#FFF',
                borderTopColor: '#000000',
            },
        };

        this.setOpen = this.setOpen.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setItems = this.setItems.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    setOpen(open) {
        this.setState({
            open,
        });
    }

    setValue(callback) {
        this.setState((state) => ({
            value: callback(state.value),

            pickerStyle: [styles.input, { backgroundColor: '#4527A0' }],

            textStyle: { color: '#FFF' },
        }));
    }

    setItems(callback) {
        this.setState((state) => ({
            items: callback(state.items),
        }));
    }

    onOpen() {
        this.setState({
            pickerStyle: [styles.input, { backgroundColor: '#49454F', borderBottomColor: '#000000' }],

            textStyle: { color: '#FFF' },

            dropDownContainerStyle: {
                backgroundColor: '#49454F',
                zIndex: 9999,
                borderWidth: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderColor: '#FFF',
                borderTopColor: '#000000',
                color: '#FFF',
            },
        });
    }

    onClose() {
        if (!this.state.value) {
            this.setState({
                pickerStyle: styles.input,

                textStyle: { color: '#CAC4D0' },

                dropDownContainerStyle: {
                    backgroundColor: '#141218',
                    zIndex: 9999,
                    borderWidth: 1,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderColor: '#FFF',
                },
            });
        }
    }

    render() {
        const { open, value, items, placeholder, isSearchable, pickerStyle, textStyle, dropDownContainerStyle } = this.state;

        return (
            <DropDownPicker
                placeholder={placeholder}
                open={open}
                value={value}
                items={items}
                searchable={isSearchable}
                setOpen={this.setOpen}
                setValue={this.setValue}
                setItems={this.setItems}
                style={pickerStyle}
                dropDownContainerStyle={dropDownContainerStyle}
                textStyle={textStyle}
                listItemLabelStyle={{ color: '#FFF' }}
                selectedItemContainerStyle={{
                    backgroundColor: '#141218',
                }}
                arrowIconStyle={{
                    tintColor: '#FFF',
                }}
                onOpen={this.onOpen}
                onClose={this.onClose}
            />
        );
    }
}

const windowHeight = Dimensions.get('window').height;
const inputHeight = windowHeight < 800 ? 50 : 56;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        color: '#CAC4D0',
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 4,
        height: inputHeight,
        width: '100%',
    },
});

export default CustomDropDownPicker;
