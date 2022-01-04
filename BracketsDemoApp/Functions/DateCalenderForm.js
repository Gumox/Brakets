import React from "react";

export function DateCalenderForm(inputDate) {
    const [date, setDate] = React.useState(inputDate);
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate)
    }
    return {
        date,
        showDatepicker,
        show,
        mode,
        onChange
    }
}