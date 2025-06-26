# ⏳ Tic-Toc Timer: Advanced Countdown Application

---

## Project Overview

The **Tic-Toc Timer** is a sophisticated web-based countdown application built using HTML, CSS, and JavaScript. Its core functionality allows users to set specific future dates and times, initiating a live, real-time countdown to those moments. Beyond a basic timer, this project emphasizes a rich user experience, incorporating dynamic UI updates, persistent storage for multiple timers, visual progress indicators, and interactive notifications.

This project showcases a comprehensive understanding of front-end web development, integrating complex JavaScript logic with modern CSS styling and semantic HTML structure.

## ✨ Features

* **Set Custom Timers:** Users can easily input a specific future date and time using a native `datetime-local` input.
* **Real-time Countdown:** Displays remaining time in days, hours, minutes, and seconds, updating every 100 milliseconds for smooth progression.
* **Multiple Concurrent Timers:** Supports setting and managing several countdowns simultaneously on the same page.
* **Persistent Storage:** All active countdowns are saved to the browser's Local Storage, ensuring they persist even if the user closes and reopens the browser.
* **Visual Progress Indicator:** Each countdown features an animated circular "pie spinner" that visually drains as time elapses, providing an intuitive glance at the progress.
* **Alarm Notifications:**
    * **Browser Notifications:** Upon completion, a native browser notification is sent (requires user permission).
    * **Audio Alerts:** Plays a distinct sound (`done.mp3`) when a timer reaches zero.
* **User Feedback & Validation:**
    * Prevents setting countdowns to past dates, providing a clear error message and a warning sound (`warning.mp3`).
    * "Toast" messages pop up to confirm actions like timer deletion or completion.
* **Dynamic Management:** Each countdown can be individually deleted from the interface at any time.
* **Thematic Design:** A clean, dark, moon-themed interface with subtle background animations enhances the aesthetic appeal.

## 🚀 How to Run

To get this project up and running on your local machine:

1.  **Clone or Download:**
    * If you have Git, clone the repository:
        ```bash
        git clone <repository-url>
        cd countdown-timer-project
        ```
    * Alternatively, download the project ZIP file and extract its contents.

2.  **File Structure:** Ensure your project directory has the following structure:

    ```
    countdown-timer-project/
    ├── index.html
    ├── style.css
    ├── script.js
    ├── done.mp3           (Alarm sound for completion)
    ├── warning.mp3        (Sound for input errors)
    └── favicon.svg        (Website icon)
    ```
    * ***Note:*** The audio files (`done.mp3`, `warning.mp3`) and `favicon.svg` are essential for the full functionality and visual experience. Please ensure these are present in the root directory.

3.  **Open in Browser:**
    * Simply open the `index.html` file in your preferred modern web browser (e.g., Chrome, Firefox, Edge, Safari).

The application will load, retrieve any previously saved countdowns, and be ready for you to create new ones!

## 🛠️ Technologies Used

* **HTML5:** Structuring the content and user interface.
* **CSS3:** Styling the application for a modern and responsive look, including animations and visual effects.
* **JavaScript (ES6+):** Implementing all dynamic logic, date calculations, DOM manipulation, `setInterval`, Local Storage, and browser Notifications API.

## 📈 Project Difficulty

This project is rated as **Hard**.

The "Hard" difficulty stems from several interconnected challenges:

* **Real-time Synchronization:** Maintaining accurate second-by-second countdowns for potentially multiple timers concurrently.
* **Complex Date & Time Logic:** Handling time zone differences, precise calculations for days, hours, minutes, and seconds, and validation of user-input dates.
* **Dynamic DOM Manipulation:** Creating, updating, and removing individual timer components on the fly in response to user actions and timer completion.
* **State Management & Persistence:** Effectively using `localStorage` to save and load multiple timer states, ensuring data integrity across sessions.
* **Asynchronous Operations:** Managing `setInterval` for each timer instance and cleaning them up correctly (`clearInterval`) upon deletion or completion to prevent memory leaks.
* **Enhanced User Experience:** Integrating browser notifications, custom audio alerts, and the animated pie spinner adds significant layers of complexity beyond a basic timer.
* **Error Handling:** Robust validation for user input dates, providing clear visual and auditory feedback for invalid attempts.

## 💡 Future Enhancements

* **Customizable Alarm Sounds:** Allow users to upload or select different audio files for alarms.
* **Timer Categories/Labels:** Enable users to assign a name or category to each countdown.
* **Pause/Resume Functionality:** Add buttons to temporarily pause and resume individual timers.
* **Visual Customization:** Provide options for users to change themes, colors, or fonts.
* **Progress Bar:** Implement a linear progress bar alongside the pie spinner for an alternative visual.
* **Mobile Optimizations:** Further refine the touch experience and layout for very small screens.
* **Desktop Notifications (Persistent):** Explore service workers to provide more persistent notifications even when the browser tab is closed.

## 📝 Grading Criteria (For Educational Context)

This project would typically be assessed based on:

* **Correct Functionality (40%):** Does the timer accurately count down? Are multiple timers handled correctly? Do alarms and notifications trigger as expected? Is persistence handled correctly?
* **User Interface & Experience (30%):** Is the timer visually appealing and intuitive to use? Are error messages clear? Are the animations and visual cues effective?
* **Code Quality (20%):** Is the HTML semantic? Is the CSS well-organized and maintainable? Is the JavaScript clear, modular, well-commented, and free of obvious bugs?
* **Optional Enhancements (10%):** Successful implementation and quality of additional features like multiple timers, sounds, notifications, and advanced visual elements.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).