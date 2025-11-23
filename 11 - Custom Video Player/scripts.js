// === Get Elements ===
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// === Build Functions ===
// Play and Pause
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
};

function updateButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
};

// Skip
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

// Range
function handleRangeUpdate() {
    video[this.name] = this.value;
};

// Progress
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function resetProgressOnLoad() {
    video.currentTime = 0;
    progressBar.style.flexBasis = '0%';
}

function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

// === Hook event listeners ===

// Play and Pause
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

// Skip
skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});

//Range
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Progress
let mousedown = false;
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Reset the progress bar on load
window.addEventListener('load', resetProgressOnLoad);