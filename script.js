let enableNotification = document.getElementById("unmute") 
let currentAudio = null

Notification.requestPermission().then((result) => {
    if (result == "default" || result == "denied") {
        enableNotification.style.display = 'block';
    }
    else {
        enableNotification.style.display = 'none';
    }
});

function handleMute() {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications.");
        return;
    }
    Notification.requestPermission().then((permission) => {
        // set the button to shown or hidden, depending on what the user answers
        enableNotification.style.display = permission === "granted" ? "none" : "block";
    });
}



let playing = false;

const dateInput = document.getElementById("date");
const now = new Date();

const defaultDateTime = now.toISOString().slice(0, 16);
dateInput.value = defaultDateTime;
function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function addNewCounter(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the value from the input field
    let dateValue = document.getElementById("date").value;


    let showMsg = document.getElementById("show");
    showMsg.innerText = ''
    showMsg.style.opacity = 0

    // Create a new Date object from the input value
    let inputDate = new Date(dateValue);
    // Calculate current date and difference
    let currentDate = new Date();
    let difference = inputDate - currentDate;

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {

        playWarning();
        showMsg.innerText = "Please enter a valid date.";
        return;
    }

    if (difference < 0) {

        playWarning();
        showMsg.innerText = "We can't go back to past";
        setTimeout(() => {
            showMsg.style.opacity = 1
        }, 200)
        return;
    }


    let [datePart, timePart] = dateValue.split('T');
    let [year, month, day] = datePart.split('-');
    let [hours, minutes] = timePart.split(':');

    let formattedDate = `${String(day)}/${String(month)}/${String(year).slice(-2)}`;

    // +hour is equivalent to Number(hour)
    let ampm = +hours >= 12 ? 'PM' : 'AM';
    hours = (+hours % 12) || 12;
    let formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    let alarm = `${formattedDate}, ${formattedTime}`;

    let countdownId = Date.now();
    let countdownData = {
        id: countdownId,
        inputDate: dateValue,
        goal: difference,
        alarm: alarm
    };

    saveCountdownToLocalStorage(countdownData);
    if (document.getElementById('timer-status').innerText === 'No timer here') {

        document.getElementById('timer-status').innerText = ''
    }

    createCountdownDisplay(countdownData);
}

function saveCountdownToLocalStorage(countdownData) {
    if (localStorage.getItem("stateArray")) {
        let stateArray = JSON.parse(localStorage.getItem("stateArray"));
        stateArray.push(countdownData);
        localStorage.setItem("stateArray", JSON.stringify(stateArray));
    } else {
        localStorage.setItem("stateArray", JSON.stringify([countdownData]));
    }
}

function deleteCoundownDisplay(countDownId, updateUi ,intervalId) {
    clearInterval(intervalId);
    const data = JSON.parse(localStorage.getItem("stateArray"));
    const deletedCountdown = data.filter((data) => data.id === countDownId);
    let msg = `${deletedCountdown[0].alarm} alarm deleted`
    let newStateArray = data.filter((data) => data.id !== countDownId);
    localStorage.setItem("stateArray", JSON.stringify(newStateArray));

    // Directly remove the countdown display from the UI
    const countdownDisplay = document.querySelector(`.countdown-display[data-id="${countDownId}"]`);

    if (countdownDisplay) {
        if (updateUi) {
            countdownDisplay.remove();
            addToast(msg) 
        }
    }
    // Update the timer status if there are no countdowns left
    if (newStateArray.length === 0) {
        document.getElementById('timer-status').innerText = 'No timer here';
    }
}

function addToast(msg){
    
    let mainSection = document.getElementById('main-section');
    let toast = document.createElement('div');
    console.log(msg,mainSection);
    toast.className = 'toast'
    toast.innerHTML = msg
    mainSection.appendChild(toast)
    setTimeout(()=>{
        toast.remove()
    },2850)
}

function createCountdownDisplay(currentCountdown) {

    let inputDate = new Date(currentCountdown.inputDate);

    // Create a new countdown display with noise
    let countdownDisplay = document.createElement("div");
    countdownDisplay.setAttribute("data-id", currentCountdown.id);
    let noise = document.createElement("div");
    let alarm = document.createElement("span");

    countdownDisplay.className = "countdown-display entry";
    noise.className = 'noise';
    alarm.className = "alarm";

    countdownDisplay.appendChild(noise);

    alarm.innerText = currentCountdown.alarm;
    noise.appendChild(alarm);

    let successMsg = document.createElement("div");
    // creating pie spinner markup
    let wrapper = document.createElement("div");
    let spinner = document.createElement("div");
    let filler = document.createElement("div");
    let mask = document.createElement("div");

    successMsg.className = "success-msg";
    wrapper.className = "wrapper"
    spinner.className = "pie spinner"
    filler.className = "pie filler"
    mask.className = "mask"

    wrapper.appendChild(spinner)
    wrapper.appendChild(filler)
    wrapper.appendChild(mask)

    // creating delete display button 
    const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M6 18V6h12v12z"/></svg>`

    let deleteDisplayButton = document.createElement("button")
    deleteDisplayButton.innerHTML = deleteIcon;
    deleteDisplayButton.className = 'delete-display-btn'

    successMsg.appendChild(wrapper);
    successMsg.appendChild(deleteDisplayButton);

    let timeUnits = ["day", "hour", "minute", "second"];
    timeUnits.forEach((unit) => {
        let unitDisplay = document.createElement("div");
        let span = document.createElement("span");
        let h4 = document.createElement("h4");
        // adding class names 
        unitDisplay.className = 'unit-display';
        span.innerText = "00";
        span.className = unit
        h4.innerText = unit.charAt(0).toUpperCase() + unit.slice(1);
        unitDisplay.appendChild(span);
        unitDisplay.appendChild(h4);

        noise.appendChild(unitDisplay)
        noise.appendChild(successMsg);
    });

    // append new countdown to the container
    document
        .getElementById("countdown-container")
        .appendChild(countdownDisplay);

    // Calculate the difference in milliseconds
    let currentDate = new Date();
    let goal = currentCountdown.goal;


    const intervalId = setInterval(() => {
        let currentDate = new Date();
        let difference = inputDate - currentDate;
        let percentage = parseFloat((difference / goal) * 100);

        // Update the spinner rotation based on the percentage
        const rotation = - (percentage / 100) * 360;
        let maskStyle = window.getComputedStyle(mask)
        if (rotation > -180 && parseInt(maskStyle.opacity) === 1) {
            // remove the mask
            mask.style.opacity = 0
            // add the filler
            filler.style.opacity = 1
        }

        spinner.style.transform = `rotate(${rotation}deg)`;

        if (difference > 0) {
            let days = Math.floor(difference / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Update the countdown display
            countdownDisplay.querySelector(".day").innerText = formatTimeUnit(days);
            countdownDisplay.querySelector(".hour").innerText =
                formatTimeUnit(hours);
            countdownDisplay.querySelector(".minute").innerText =
                formatTimeUnit(minutes);
            countdownDisplay.querySelector(".second").innerText =
                formatTimeUnit(seconds);
        } else {
            console.log("called");
            deleteCoundownDisplay(currentCountdown.id, false, intervalId);
            successMsg.innerText = "🎉";
            let msg = `${currentCountdown.alarm} alarm`;
            addToast(msg)
            sendNotification(msg,true);

        }
    }, 100);

    deleteDisplayButton.addEventListener('click', () => deleteCoundownDisplay(currentCountdown.id, true, intervalId));

}

function sendNotification(msg, play) {
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        alert("This browser does not support notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        createNotification(msg, play);

    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                createNotification(msg, play);
            }
        });
    }
}
function createNotification(msg, play) {
    const notification = new Notification(msg);
    if (play) {
        playAudio();
    }
}

function playAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio('done.mp3');
    currentAudio.play().catch((error) => {
        console.error("Error playing audio:", error);

    });

}



function playWarning() {
    var audio = new Audio('warning.mp3');
    audio.volume = 0.1
    audio.play().catch((error) => {
        console.error("Error playing audio:", error);
    });;

}
function loadCountdownsFromLocalStorage(animation) {
    let data = JSON.parse(localStorage.getItem("stateArray")) || [];
    const timerStatus = document.getElementById('timer-status')

    if (data.length !== 0) {
        timerStatus.innerText = ''
        data.forEach((countdownData, index) => {
            setTimeout(() => {
                createCountdownDisplay(countdownData);
            }, index * 200)
        });
    }
    else {
        timerStatus.innerText = 'No timer here'
    }
}

// Call the function to load countdowns when the page loads
window.onload = () => {
    loadCountdownsFromLocalStorage(true);
};