const player = document.getElementById("player");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("mtitle");
const cover = document.getElementById("cover");
const song = [...document.querySelectorAll(".song")];
const song_title = [...document.querySelectorAll(".song-name")];

//song titles
const songs = ['Горький вкус','Habibi [Albanian Remix]','Ты мой кайф','Hypnotize','Imanbek - Goodbye','Touch The Sky','Вите Надо Выйти'];

//index of songs

let songIndex = 0;

//srartup
loadSong(songs[songIndex]);

//Song Detail
function loadSong(song){
    mtitle.innerText = song;
    audio.src = `music/${song}.mp3`;
    mcover.src = `images/${song}.jpg`;
}

//func for Event
function playSong() {
    player.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
  }

  function pauseSong() {
    player.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  
    audio.pause();
  }

  function prevSong() {
      songIndex--;

      if(songIndex < 0){
          songIndex = songs.length - 1;

      }

      loadSong(songs[songIndex])
      playSong();
  }

  function nextSong(){
      songIndex++;

      if(songIndex > songs.length -1){
          songIndex = 0;

      }
      loadSong(songs[songIndex]);
      playSong();
  }

  function updateProgress(e){
      const {duration, currentTime} = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;


  }

  function setProgress(e){
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;

      audio.currentTime = (clickX /width) * duration;




  }

//Evnt Listener

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
  
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

song.forEach((item, i) => {
      item.addEventListener("click", () => {
          loadSong(songs[i]);
          playSong();
      })
  })

function changevolume(amount) {
    
    audio.volume = amount;
}

prevBtn.addEventListener('click' , prevSong);
nextBtn.addEventListener('click' , nextSong);
audio.addEventListener('timeupdate' , updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener("click", setProgress );
