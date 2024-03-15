import dayjs from 'dayjs';
export function getMonth(month = dayjs().month()){ //takes input in 0-11 format
    month = Math.floor(month); //ensure month is an integer because we are using rand (0-1) for reset button
    const year = dayjs().year(); //current year
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day(); //first day of the month (0 for Sunday - 6 for Saturday)

    //each page of calendar has 5 rows of 7 days, some of which days are from previous and next month
    let currentMonthCount = 0 - firstDayOfMonth; //number of days from previous month
    const daysMatrix = new Array(5).fill([]).map(() =>{
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        }); //5x7 matrix of days (2D array)
    });
    return daysMatrix;
}