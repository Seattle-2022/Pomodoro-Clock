import React from 'react'
import moment from 'moment';
import { BreakSessionContainer, BreakSessionLabel, BreakSessionTime, PlusMinusButton, PlusMinusButtonContainer } from '../ui/BreakSessionUi';

const Session = ({
    sessionLength, 
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
}) => {
    const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes()
    
    return (
    <BreakSessionContainer>
    <BreakSessionLabel id = "session-label">Session</BreakSessionLabel>
    <BreakSessionTime id = "session-length">{sessionLengthInMinutes}</BreakSessionTime>

    <PlusMinusButtonContainer>
    <PlusMinusButton id ="session-decrement" onClick={decrementSessionLengthByOneMinute}>-</PlusMinusButton>
    <PlusMinusButton id = 'session-increment' onClick={incrementSessionLengthByOneMinute}>+</PlusMinusButton>
    </PlusMinusButtonContainer>
    
    </BreakSessionContainer>
    );
};

export default Session