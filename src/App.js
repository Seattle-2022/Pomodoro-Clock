import React, { useEffect, useState, useRef} from 'react'; 

import Break from './components/Break';
import Session from './components/Session';
import TimeLeft from './components/TimeLeft'
import './App.css';

function App() {
  const audioElement = useRef(null)

  const [breakLength, setBreakLength] = useState(300)
    
    const decrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength - 60;
          if (newBreakLength > 0) {
            setBreakLength(newBreakLength)
          }
    };

    const incrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength + 60;

        if (newBreakLength <= 60*60) {
          setBreakLength(newBreakLength);
        }
    };

  
  const [sessionLength, setSessionLength] = useState(60*25)
    
  const decrementSessionLengthByOneMinute = () => {
      const newSessionLength = sessionLength - 60;
      if (newSessionLength > 0) {
          setSessionLength(newSessionLength);
      }
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;

    if (newSessionLength <= 60*60) {
      setSessionLength(newSessionLength);
    }
  };

  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId] = useState(null)


  const handleResetButtonClick = () => {
    audioElement.current.load()

    clearInterval(intervalId);

    setIntervalId(null);

    setCurrentSessionType('Session');

    setSessionLength(60*25);

    setBreakLength(300);

    setTimeLeft(60*25);
  };

  const isStarted = intervalId != null;

  const handleStartStopClick = () => {
        if (isStarted) {
            clearInterval(intervalId)
            setIntervalId(null);
        } else{
            const newIntervalId = setInterval (()=> {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if (newTimeLeft >= 0) {
                        return newTimeLeft;
                    }

                    audioElement.current.play();

                    if (currentSessionType === 'Session') {
                        setCurrentSessionType('Break')
                        return breakLength;
                    }
                    else if (currentSessionType === 'Break') {
                        setCurrentSessionType('Session')
                        return sessionLength;
                    }

                    return prevTimeLeft;
                });
            }, 1000);
        setIntervalId(newIntervalId);
        }
    };

    const [timeLeft, setTimeLeft ] = useState(sessionLength)

    useEffect(() => {
        setTimeLeft(sessionLength)
    }, [sessionLength]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Break 
      breakLength = {breakLength}
      decrementBreakLengthByOneMinute = {decrementBreakLengthByOneMinute}
      incrementBreakLengthByOneMinute = {incrementBreakLengthByOneMinute}/>
      
      <TimeLeft 
        timerLabel = {currentSessionType} 
        handleStartStopClick={handleStartStopClick}
        startStopButtonLabel={isStarted? 'Stop': 'Start'}
        timeLeft = {timeLeft}  
        />


      <Session 
      sessionLength = {sessionLength}
      decrementSessionLengthByOneMinute = {decrementSessionLengthByOneMinute}
      incrementSessionLengthByOneMinute = {incrementSessionLengthByOneMinute}/>

      <button id = 'reset' onClick={handleResetButtonClick}>Reset</button>
      <audio id = 'beep' ref = {audioElement}>
        <source src = "https://onlineclock.net/audio/options/default.mp3" type = "audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
