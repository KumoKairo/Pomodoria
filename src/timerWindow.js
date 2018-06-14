var timerElement = document.querySelector('#timer');
var statusElement = document.querySelector('#status');
var workedPomodoros = 0;

// Idle
// Working
// Break
var status = 'Idle';

const secondsToWork = 1500;
var secondsLeft = secondsToWork;
const secondsToBreak = 300;

timerElement.innerHTML = beautifySeconds(secondsLeft);

var timerButton = document.querySelector('#timerButton');
timerButton.addEventListener('click', () => {
    switch (status) {
        case 'Idle':
            status = 'Working';
            break;
        case 'Working':
        case 'Brake':
            status = 'Idle';
    }
    visualizeStatus();
});

visualizeStatus();

function visualizeStatus() {
    statusElement.innerHTML = status;
    if (status == 'Working' || status == 'Brake') {
        timerButton.innerHTML = 'Stop';
    } else {
        timerButton.innerHTML = 'Start';
    }
    timerElement.innerHTML = beautifySeconds(secondsLeft);
}

var timer = setInterval(() => {
    if (status == 'Break' || status == 'Working') {
        secondsLeft -= 1;
        timerElement.innerHTML = beautifySeconds(secondsLeft);

        if (secondsLeft <= 0) {
            changeState();
        }
    }
}, 1000);

function changeState() {
    switch (status) {
        // We were working, break or stop completely
        case 'Working':
            workedPomodoros += 1;
            if (workedPomodoros >= 4) {
                status = 'Idle';
                secondsLeft = secondsToWork;
                workedPomodoros = 0;
            } else {
                status = 'Break';
                secondsLeft = secondsToBreak;
            }
            break;
        // We were breaking, work
        case 'Break':
            status = 'Working';
            secondsLeft = secondsToWork;
            break;
    }

    visualizeStatus();
}

function beautifySeconds(seconds) {
    return new Date(secondsLeft * 1000).toISOString().substr(14, 5);
}