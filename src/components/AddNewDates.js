import React, { useContext, useState } from 'react';
import { NewDatesAdding } from '../resources/API';
import SearchContext from '../../store/SearchContext';

const AddNewDates = () => {
    const { datesforBooking, setDatesforBooking } = useContext(SearchContext);
    const [date, setDate] = useState(new Date())


    // const AddNewdatesforServices = () => {
    //     const newDates = { service_ID: , bookDate: , serviceStutes: true }
    //     NewDatesAdding(newDates).then(res => {
    //         const Dates = datesforBooking || [];
    //         Dates.push(newDates)
    //         setDatesforBooking([...Dates])
    //     })
    // }

    let firstyear = (12 - (date.getMonth() + 1)) + 1
    let secondyear = 12
    let thirdyear = 24 - (firstyear + secondyear)
    let allyear = firstyear + secondyear + thirdyear
    let currentMonth = date.getMonth() + 1
    let curYear = date.getFullYear()
    let day = date.getDate()
    let currentMonthdays = 0



    for (var i = 0; i < allyear; i++) {
        if (firstyear > 0) {
            if (day != 1 && (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12)) {
                currentMonthdays = 31 - day
                for (var d = 0; d <= currentMonthdays; d++) {
                    console.log(day, "/", currentMonth, "/", curYear);

                    day = day + 1
                }
                day = 1
                currentMonth = currentMonth + 1
                firstyear = firstyear - 1
            }
            if (day == 1 && (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12)) {
                for (var d = 0; d < 31; d++) {
                    console.log(day, "/", currentMonth, "/", curYear);
                    day = day + 1
                }
                day = 1
                currentMonth = currentMonth + 1
                firstyear = firstyear - 1
            }

            if (day != 1 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) {
                currentMonthdays = 30 - day
                for (var d = 0; d < currentMonthdays; d++) {


                }
                day = 1
                currentMonth = currentMonth + 1
                firstyear = firstyear - 1
            }
            if (day == 1 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) {
                for (var d = 0; d < 30; d++) {
                    console.log(day, "/", currentMonth, "/", curYear);
                    day = day + 1
                }
                day = 1
                currentMonth = currentMonth + 1
                firstyear = firstyear - 1
            }

            if (day != 1 && (currentMonth == 2)) {
                currentMonthdays = 28 - day
                for (var d = 0; d < currentMonthdays; d++) {

                }
                day = 1
                currentMonth = currentMonth + 1
                firstyear = firstyear - 1
            }
            if (day == 1 && (currentMonth == 2)) {
                for (var d = 0; d < 28; d++) {

                }
                day = 1
                currentMonth = currentMonth + 1
                firstyear = firstyear - 1
            }
        }

        if (firstyear == 0) {
            if (currentMonth == 13) {
                currentMonth = 1
            }
            if (secondyear >= 1) {
                if (day == 1 && (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12)) {
                    for (var d = 0; d < 31; d++) {
                        console.log(day, "/", currentMonth, "/", curYear + 1);
                        day = day + 1
                    }
                    day = 1
                    currentMonth = currentMonth + 1
                    secondyear = secondyear - 1
                }
                if (day == 1 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) {
                    for (var d = 0; d < 30; d++) {
                        console.log(day, "/", currentMonth, "/", curYear + 1);
                        day = day + 1
                    }
                    day = 1
                    currentMonth = currentMonth + 1
                    secondyear = secondyear - 1
                }
                if (day == 1 && currentMonth == 2) {
                    for (var d = 0; d < 28; d++) {
                        console.log(day, "/", currentMonth, "/", curYear + 1);
                        day = day + 1
                    }
                    day = 1
                    currentMonth = currentMonth + 1
                    secondyear = secondyear - 1
                }
            }
        }
    }
    // if (secondyear == 0) {

    //     if (currentMonth == 13) {
    //         currentMonth = 0
    //     }
    //     if (thirdyear >= 1) {
    //         if (day == 1 && (currentMonth == 1 || currentMonth == 3 || currentMonth == 5 || currentMonth == 7 || currentMonth == 8 || currentMonth == 10 || currentMonth == 12)) {
    //             for (var d = 0; d < 31; d++) {
    //                 console.log(day, "/", currentMonth, "/", curYear + 2);
    //                 day = day + 1
    //             }
    //             day = 1
    //             currentMonth = currentMonth + 1
    //             thirdyear = thirdyear - 1
    //         }
    //         if (day == 1 && (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11)) {
    //             for (var d = 0; d < 30; d++) {
    //                 console.log(day, "/", currentMonth, "/", curYear + 2);
    //                 day = day + 1
    //             }
    //             day = 1
    //             currentMonth = currentMonth + 1
    //             thirdyear = thirdyear - 1
    //         }
    //         if (day == 1 && currentMonth == 2) {
    //             for (var d = 0; d < 28; d++) {
    //                 console.log(day, "/", currentMonth, "/", curYear + 2);
    //                 day = day + 1
    //             }
    //             day = 1
    //             currentMonth = currentMonth + 1
    //             thirdyear = thirdyear - 1
    //         }
    //     }
    // }
}




export default AddNewDates;
