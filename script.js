// Please implement exercise logic here

// ===== GLOBAL VARIABLES =====
let secondsCounter = 0;
let minutesCounter = 0;
let hoursCounter = 0;
let delayInMilliseconds = 1000;

let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let hours = document.getElementById('hours');

let lapSeconds = 0;
let lapMinutes = 0;
let lapHours = 0;

let timer;
let timerStatus;

let lapCount = 0;
let lapDetails = document.getElementById('lapDetails');
let lapData = [];

let canClick = true;


// ===== HELPER FUNCTIONS =====

// display timer as 2 digits if number is 0-9
const formatNum = (number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

const startTimer = () => {
  //console.log('secondsCounter: ', secondsCounter)

  if (canClick) {

    canClick = false;

    timer = setInterval( () => {

      console.log('before secondsCounter: ', secondsCounter);



      // when timer starts - for total time

      // second starts
      secondsCounter += 1

      // when seconds hit 60
      if (secondsCounter === 60) {
        
        // minutes increase by 1, seconds start from 0
        minutesCounter += 1;
        secondsCounter = 0;

        // when minutes hit 60, minutes start from 0
        if (minutesCounter === 60) {
          hoursCounter += 1;
          minutesCounter = 0;
        }
      }

      // when timer starts - for lap time

      lapSeconds += 1

      if (lapSeconds === 60) {
        lapMinutes += 1;
        lapSeconds = 0;

        if (lapMinutes === 60) {
          lapHours += 1;
          lapMinutes = 0;
        }

      }
      // at every second, print the status of seconds, minutes, hours

      console.log('after secondsCounter: ', secondsCounter);

      seconds.innerText = formatNum(secondsCounter);
      minutes.innerText = formatNum(minutesCounter);
      hours.innerText = formatNum(hoursCounter);  
    }, delayInMilliseconds);
  }
}

const stopTimer = () => {

  console.log('secondsCounter: ', secondsCounter);

  timerStatus = 'stop';
  canClick = true;
  clearInterval(timer);
  
}

const resetTimer = () => {


  console.log('secondsCounter: ', secondsCounter);

  clearInterval(timer);

  secondsCounter = 0;
  minutesCounter = 0;
  hoursCounter = 0;

  lapSeconds = 0;
  lapMinutes = 0;
  lapHours = 0;

  lapData = [];
  lapDetails.innerText = '';
  lapCount = 0;
  
  // if reset button is hit when timer is running, timer will auto start
  if (timerStatus === 'start') {
    canClick = true; 
    startTimer();
  }

  // if reset button is hit when timer is not running, timer will display 00:00:00
  if (timerStatus === 'stop') {
    
    seconds.innerText = formatNum(secondsCounter);
    minutes.innerText = formatNum(minutesCounter);
    hours.innerText = formatNum(hoursCounter);  

  }

}

const lapTimer = () => {

  lapDetails.innerText = "";

  lapCount += 1;

  console.log('lapHours: ', lapHours);
  console.log('lapMinutes: ', lapMinutes);
  console.log('lapSeconds: ', lapSeconds);

  let currentLapTime = `${formatNum(lapHours)} : ${formatNum(lapMinutes)} : ${formatNum(lapSeconds)}`;
  let currentTotalTime = `${formatNum(hoursCounter)} : ${formatNum(minutesCounter)} : ${formatNum(secondsCounter)}`;

  const currentLapDetails = {
    lapIndex: lapCount,
    lapNum: formatNum(lapCount),
    currLapTime: currentLapTime,
    currTotalTime: currentTotalTime
  }

  lapData.push(currentLapDetails);
  console.log(lapData);

  // to show only the latest 4 laps
  // if more than 4 laps, start from lapData length - 4
  // if up to 4 laps, display all

  if (lapData.length <= 4) {
    for (let i = 0; i < lapData.length; i += 1) {
      // create container for each set of data
      let lapContainer = document.createElement('p');
      lapContainer.classList.add('lapContainer');
      document.getElementById('lapDetails').appendChild(lapContainer);


      // create lap, lap time and total time containers
      let lap = document.createElement('span');
      let lapTime = document.createElement('span');
      let totalTime = document.createElement('span');

      lap.classList.add('lap');
      lapTime.classList.add('lapTime');
      totalTime.classList.add('totalTime');

      // capture lap information to display
      lap.innerText = lapData[i].lapNum;
      lapTime.innerText = lapData[i].currLapTime;
      totalTime.innerText = lapData[i].currTotalTime;

      // append containers
      lapContainer.appendChild(lap);
      lapContainer.appendChild(lapTime);
      lapContainer.appendChild(totalTime);

      console.log('lapCount: ', lapCount);
      console.log('currentLapTime: ', currentLapTime);
      console.log('currentTotalTime: ', currentTotalTime);

    }
  } else if (lapData.length > 4) {
      for (let i = lapData.length-4; i < lapData.length; i += 1) {
        // create container for each set of data
        let lapContainer = document.createElement('p');
        lapContainer.classList.add('lapContainer');
        document.getElementById('lapDetails').appendChild(lapContainer);


        // create lap, lap time and total time containers
        let lap = document.createElement('span');
        let lapTime = document.createElement('span');
        let totalTime = document.createElement('span');

        lap.classList.add('lap');
        lapTime.classList.add('lapTime');
        totalTime.classList.add('totalTime');

        // capture lap information to display
        lap.innerText = lapData[i].lapNum;
        lapTime.innerText = lapData[i].currLapTime;
        totalTime.innerText = lapData[i].currTotalTime;

        // append containers
        lapContainer.appendChild(lap);
        lapContainer.appendChild(lapTime);
        lapContainer.appendChild(totalTime);

        console.log('lapCount: ', lapCount);
        console.log('currentLapTime: ', currentLapTime);
        console.log('currentTotalTime: ', currentTotalTime);
      }
     }
  // to reset lap details;
  lapSeconds = 0;
  lapMinutes = 0;
  lapHours = 0;
  
}


// ===== INITIALISE TIMER =====

// add event listener for start button
const startButton = document.getElementById('startButton')
startButton.addEventListener('click', () => {
  timerStatus = 'start'
  startTimer();
})

// add event listener for stop button
const stopButton = document.getElementById('stopButton')
stopButton.addEventListener('click', () => {
  timerStatus = 'stop'
  stopTimer();
})

// add event listender for reset button
const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', () => {
  resetTimer();
})

// add event listener for lap button
const lapButton = document.getElementById('lapButton')
lapButton.addEventListener('click', () => {
  lapTimer();
})

