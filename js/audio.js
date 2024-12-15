export const audio = (() => {

    let music = null;
    let audio = null;
    let isPlay = false;

    const init = () => {
        music = document.getElementById('button-music');

        audio = new Audio(music.getAttribute('data-url'));
        audio.currentTime = 0;
        audio.autoplay = false;
        audio.muted = false;
        audio.loop = true;
        audio.volume = 1;
        audio.controls = false;

        music.addEventListener('online', play);
        music.addEventListener('offline', pause);
        music.addEventListener('click', () => isPlay ? pause() : play());
    };

    const play = async () => {
        music.disabled = true;
        try {
            await audio.play();
            isPlay = true;
            music.innerHTML = '<i class="fa-solid fa-circle-pause spin-button"></i>';
        } catch (err) {
            isPlay = false;
            alert(err);
        }
        music.disabled = false;
    };

    const pause = () => {
        isPlay = false;
        audio.pause();
        music.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    };

    const showButton = () => {
        music.style.display = 'block';
    };

    return {
        init,
        play,
        pause,
        showButton,
    };
})();