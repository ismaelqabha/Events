import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import moment from 'moment';

const CalculetRemaingTime = (props) => {
    console.log("targetDate", props.targetDate);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    function calculateTimeRemaining() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    return (
        <Text>
            {timeRemaining.days} days, {timeRemaining.hours} hours, {timeRemaining.minutes} minutes, {timeRemaining.seconds} seconds
        </Text>
    );
};



export default CalculetRemaingTime

const styles = StyleSheet.create({})