import React from 'react';
import { View } from 'react-native';

const DropDown = ({
    buttonStyle,
    rowTextStyle,
    selectedRowStyle,
    defaultButton,
    buttonTextStyle,
    dropDownStyle,
    data,
    onSelected, 
    buttonSelectedAfter,
    rowTextForSelection
}) => {
    return (
        <View>
            <SelectDropdown
                        buttonStyle={buttonStyle}
                        rowTextStyle={rowTextStyle}
                        selectedRowStyle={selectedRowStyle}
                        defaultButtonText={defaultButton}
                        buttonTextStyle={buttonTextStyle}
                        dropdownStyle={dropDownStyle}
                        data={data}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={25}
                                color="black"
                            />
                        }}
                        onSelect={onSelected}
                        buttonTextAfterSelection={buttonSelectedAfter}
                        rowTextForSelection={rowTextForSelection}
                    />
            
        </View>
    )
};

export default DropDown;