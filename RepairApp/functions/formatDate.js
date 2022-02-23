
export const formatDate = (inputDate) => {
    var month = '' + (inputDate.getMonth() + 1),
        day = '' + inputDate.getDate(),
        year = inputDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const value = [year, month, day].join('-');
    return value
}
