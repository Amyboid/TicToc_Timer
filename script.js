
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
    showMsg.innerText = "";
    // console.log(dateValue);

    // Create a new Date object from the input value
    let inputDate = new Date(dateValue);
    // Calculate current date and difference
    let currentDate = new Date();
    let difference = inputDate - currentDate;

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
        showMsg.innerText = "Please enter a valid date.";
        return;
    }

    if (difference < 0) {
        showMsg.innerText = "We can't go back to past";
        return;
    }

    let countdownId = Date.now();
    let countdownData = {
        id: countdownId,
        inputDate: dateValue,
        goal: difference,
    };

    saveCountdownToLocalStorage(countdownData);
    createCountdownDisplay(countdownData);
}

function saveCountdownToLocalStorage(countdownData) {
    if (localStorage.getItem("stateArray")) {
        let stateArray = JSON.parse(localStorage.getItem("stateArray")) || [];
        stateArray.push(countdownData);
        localStorage.setItem("stateArray", JSON.stringify(stateArray));
    } else {
        localStorage.setItem("stateArray", JSON.stringify([countdownData]));
    }
}
function createCountdownDisplay(countdownData) {
    let allData = JSON.parse(localStorage.getItem("stateArray")) || [];
    console.log(allData);

    let currentCountdown = allData.find(
        (data) => data.id === countdownData.id
    );
    console.log(currentCountdown.id);
    let inputDate = new Date(currentCountdown.inputDate);
    // Create a new countdown display
    let newCountDown = document.createElement("div");
    newCountDown.className = "countdown-display";

    let successMsg = document.createElement("div");
    // creating pie spinner markup
    let wrapper = document.createElement("div");
    let spinner = document.createElement("div");
    let filler = document.createElement("div");
    let mask = document.createElement("div");


    // let progressDiv = document.createElement("div");
    // let progressBar = document.createElement("div");
    // progressDiv.className = "progress-div";
    // progressBar.className = "progress-bar";
    successMsg.className = "success-msg";
    wrapper.className = "wrapper"
    spinner.className = "pie spinner"
    filler.className = "pie filler"
    mask.className = "mask"
 
    wrapper.appendChild(spinner)
    wrapper.appendChild(filler)
    wrapper.appendChild(mask)

    // progressDiv.appendChild(progressBar);
    // successMsg.appendChild(progressDiv);
    successMsg.appendChild(wrapper);

    // Create time units
    let timeUnits = ["day", "hour", "minute", "second"];
    timeUnits.forEach((unit) => {
        let div = document.createElement("div");
        let span = document.createElement("span");
        let h4 = document.createElement("h4");
        div.className = 'unit-display';
        span.className = unit;
        span.innerText = "00";
        h4.innerText = unit.charAt(0).toUpperCase() + unit.slice(1);
        div.appendChild(span);
        div.appendChild(h4);
        newCountDown.appendChild(div);
        newCountDown.appendChild(successMsg);
    });

    // append new countdown to the container
    document
        .getElementById("countdown-container")
        .appendChild(newCountDown);

    // Calculate the difference in milliseconds
    let currentDate = new Date();
    let goal = currentCountdown.goal;


    const intervalId = setInterval(() => {
        let currentDate = new Date();
        let difference = inputDate - currentDate;
        let percentage = parseFloat((difference / goal) * 100);

        // Update the progress bar width
        // progressBar.style.width = percentage + "%";

        // Update the spinner rotation based on the percentage
        const rotation = - (percentage / 100) * 360; 
        let maskStyle = window.getComputedStyle(mask)
        // console.log(maskStyle.opacity, typeof(maskStyle.opacity))
        if (rotation > -180 && parseInt(maskStyle.opacity) === 1) { 
            console.log(rotation); 
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
            newCountDown.querySelector(".day").innerText = formatTimeUnit(days);
            newCountDown.querySelector(".hour").innerText =
                formatTimeUnit(hours);
            newCountDown.querySelector(".minute").innerText =
                formatTimeUnit(minutes);
            newCountDown.querySelector(".second").innerText =
                formatTimeUnit(seconds);
        } else {
            clearInterval(intervalId);
            let newStateArray = allData.filter(
                (data) => data.id != countdownData.id
            );
            localStorage.setItem("stateArray", JSON.stringify(newStateArray));
            successMsg.innerText = "🎉";
        }
    }, 1000);


    // const intervalId = setInterval(() => {
    //     let currentDate = new Date();
    //     let difference = inputDate - currentDate;
    //     let percentage = parseFloat((difference / goal) * 100);
    //     // console.log(percentage);
    //     progressBar.style.width = percentage + "%";
    //     if (difference > 0) {
    //         let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    //         let hours = Math.floor(
    //             (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //         );
    //         let minutes = Math.floor(
    //             (difference % (1000 * 60 * 60)) / (1000 * 60)
    //         );
    //         let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    //         // Update the countdown display
    //         newCountDown.querySelector(".day").innerText = formatTimeUnit(days);
    //         newCountDown.querySelector(".hour").innerText =
    //             formatTimeUnit(hours);
    //         newCountDown.querySelector(".minute").innerText =
    //             formatTimeUnit(minutes);
    //         newCountDown.querySelector(".second").innerText =
    //             formatTimeUnit(seconds);
    //     } else {
    //         clearInterval(intervalId);
    //         let newStateArray = allData.filter(
    //             (data) => data.id != countdownData.id
    //         );
    //         localStorage.setItem("stateArray", JSON.stringify(newStateArray));
    //         successMsg.innerText = "Time's Up!";
    //     }
    // }, 1000);
}

function loadCountdownsFromLocalStorage() {
    let allData = JSON.parse(localStorage.getItem("stateArray")) || [];
    allData.forEach((countdownData) => {
        createCountdownDisplay(countdownData);
    });
    console.log(allData);
}

// Call the function to load countdowns when the page loads
window.onload = function () {
    loadCountdownsFromLocalStorage();
};