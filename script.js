let alarmTime;
let alarmTimeout;
let currentAudio = null;

const audioFiles = [
    'Audio2.mp3',
    'Audio3.mp3',
    'Audio4.mp3',
    'Audio1.mp3',
    'Audio5.mp3',
    'Audio6.mp3',
    'Audio7.mp3',
    'Audio8.mp3',
    'Audio9.mp3',
];

const alarmContainer = document.querySelector('.container'); 

flatpickr("#alarmTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    time_24hr: false
});

document.getElementById('setAlarm').addEventListener('click', () => {
    const timeInput = document.getElementById('alarmTime').value;
    if (timeInput) {
        alarmTime = timeInput;
        document.getElementById('message').innerText = `Alarm set for ${alarmTime}`;
        setAlarm();

        
        document.getElementById('setAlarm').style.display = 'none';
        document.getElementById('stopAlarm').style.display = 'none';
        document.getElementById('resetAlarm').style.display = 'none';
    } else {
        alert('Please select a time for the alarm.');
    }
});

document.getElementById('stopAlarm').addEventListener('click', () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        document.getElementById('message').innerText = 'Alarm stopped.';
        
        
        document.getElementById('resetAlarm').style.display = 'inline-block';
        document.getElementById('stopAlarm').style.display = 'none';
    }
});

document.getElementById('resetAlarm').addEventListener('click', () => {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    document.getElementById('alarmTime').value = ''; 
    document.getElementById('message').innerText = 'Alarm reset.';

   
    document.getElementById('setAlarm').style.display = 'inline-block';
    document.getElementById('stopAlarm').style.display = 'none';
    document.getElementById('resetAlarm').style.display = 'none';


    removeAlarmImages();
});

function setAlarm() {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }

    const now = new Date();
    let [hours, minutes] = alarmTime.split(':');
    const period = alarmTime.slice(-2); 

    hours = parseInt(hours);
    minutes = parseInt(minutes.slice(0, -3)); 

    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

   
    if (alarmDate <= now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const timeToAlarm = alarmDate.getTime() - now.getTime();
    alarmTimeout = setTimeout(playRandomAudio, timeToAlarm);
}

function playRandomAudio() {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    currentAudio = new Audio(audioFiles[randomIndex]);
    currentAudio.play();
    document.getElementById('message').innerText = 'Alarm ringing!';
    
    
    document.getElementById('stopAlarm').style.display = 'inline-block';
    document.getElementById('setAlarm').style.display = 'none';

    
    document.getElementById('resetAlarm').style.display = 'none';

    
    addAlarmImages();
}

function addAlarmImages() {
    const leftImage = document.createElement('img');
    leftImage.src = 'ar.png'; 
    leftImage.classList.add('alarm-image', 'left');

    const rightImage = document.createElement('img');
    rightImage.src = 'ar.png'; 
    rightImage.classList.add('alarm-image', 'right');

    alarmContainer.appendChild(leftImage);
    alarmContainer.appendChild(rightImage);
}

function removeAlarmImages() {
    const leftImage = document.querySelector('.alarm-image.left');
    const rightImage = document.querySelector('.alarm-image.right');
    if (leftImage) leftImage.remove();
    if (rightImage) rightImage.remove();
}
