console.log("Welcome to Spotify")

// Initialize the variable 
let songIndex =0;
let audioElement =new Audio("songs/1.mp3")
let masterPlay =document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif=document.getElementById('gif');
let songItem=Array.from(document.getElementsByClassName("songItem"))

let songs=[
{songName: "Gyal You a Party Animal", filePath:"songs/1.mp3",coverPath: "covers/1.jpg"},
{songName: "Those Eyes", filePath:"songs/2.mp3",coverPath: "covers/2.jpg"},
{songName: "Under The Influence", filePath:"songs/3.mp3",coverPath: "covers/3.jpg"},
{songName: "Wake me up in Paris", filePath:"songs/4.mp3",coverPath: "covers/4.jpg"},
{songName: "Gasolina", filePath:"songs/5.mp3",coverPath: "covers/5.jpg"},
{songName: "The Nights", filePath:"songs/6.mp3",coverPath: "covers/6.jpg"},
{songName: "Seven", filePath:"songs/7.mp3",coverPath: "covers/7.jpg"},
{songName: "What If I Told You I Like You", filePath:"songs/8.mp3",coverPath: "covers/8.jpg"},
{songName: "Rise Up", filePath:"songs/9.mp3",coverPath: "covers/9.jpg"},
{songName: "Double Take", filePath:"songs/10.mp3",coverPath: "covers/10.jpg"},
{songName: "If We Have Each Other", filePath:"songs/11.mp3",coverPath: "covers/11.jpg"},
]
songItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    e=element.getElementsByClassName("songName")[0].innerHTML=songs[i].songName;

})
// Managing the Master song 
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        // Target the currently playing song item and update its icon
        const currentSongItem = songItem[songIndex];
        currentSongItem.querySelector(".songItemPlay").classList.remove('fa-play');
        currentSongItem.querySelector(".songItemPlay").classList.add('fa-pause');
        // Update other song items to show 'fa-play'
        songItem.forEach((element, i) => {
            if (i !== songIndex) {
                element.querySelector(".songItemPlay").classList.remove('fa-pause');
                element.querySelector(".songItemPlay").classList.add('fa-play');
            }
        });
       
    } 
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;

        // Update the currently playing song item to show 'fa-play'
        const currentSongItem = songItem[songIndex];
        currentSongItem.querySelector(".songItemPlay").classList.remove('fa-pause');
        currentSongItem.querySelector(".songItemPlay").classList.add('fa-play');

    }
});

// Listen to Events
// Updating the progress bar with the song's duration 
audioElement.addEventListener('timeupdate',()=>{
    //update Seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value =progress;
})
// Changing the song's duration by clicking on the progress bar 
function changeProgressBar(){
    audioElement.currentTime =(myProgressBar.value *audioElement.duration)/100;
}
myProgressBar.addEventListener('change',changeProgressBar)

// Managing the play and pause buttons on the song List 
const MakeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element,index)=>{
    element.addEventListener('click',(e)=>{
        const clickedSongIndex =parseInt(e.target.id);
        if (audioElement.paused|| audioElement.currentTime<=0){
            MakeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        audioElement.currentTime=0;
        gif.style.opacity =1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        // Delay the progress bar update to 0
        setTimeout(() => {
            myProgressBar.value = 0;
        }, 5); // Adjust the delay time if needed
    }
    else if (audioElement.played && audioElement.currentTime!=0 && clickedSongIndex==songIndex){
            MakeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-pause');
        e.target.classList.add('fa-play');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.pause();
        audioElement.currentTime=0;
        gif.style.opacity =0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");

        // Delay the progress bar update to 0
        setTimeout(() => {
            myProgressBar.value = 0;
        }, 5); // Adjust the delay time if needed
       
    }
    else{
        MakeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        audioElement.currentTime=0;
        gif.style.opacity =1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        // Delay the progress bar update to 0
        setTimeout(() => {
            myProgressBar.value = 0;
        }, 5); // Adjust the delay time if needed
    }
})
});

// //To play to next song on clicking next button
// document.getElementById('next').addEventListener('click',()=>{
    
//     if(songIndex>=10){
//         songIndex=0;
//     }
//     else{
//         songIndex+=1;
//     }
//     audioElement.src=`songs/${songIndex+1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     // audioElement.currentTime=0;
//     audioElement.play();
//     gif.style.opacity =1;
//     masterPlay.classList.remove("fa-circle-play");
//     masterPlay.classList.add("fa-circle-pause");
// })
// //To play to previous song on clicking previous button
// document.getElementById('previous').addEventListener('click',()=>{
//     audioElement.pause();
//     if(songIndex<=0){
//         songIndex=0;
//     }
//     else{
//         songIndex-=1;
//     }
//     audioElement.src=`songs/${songIndex+1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime=0;
//     audioElement.play();
//     gif.style.opacity =1;
//     masterPlay.classList.remove("fa-circle-play");
//     masterPlay.classList.add("fa-circle-pause");
// })
// })

//To play the next song automatically
audioElement.addEventListener('ended', ()=>{
    if(songIndex>=10){
        songIndex=0;
        const LastSongItem = songItem[10];
        LastSongItem.querySelector(".songItemPlay").classList.remove('fa-pause');
        LastSongItem.querySelector(".songItemPlay").classList.add('fa-play');
        const FirstSongItem = songItem[0];
        FirstSongItem.querySelector(".songItemPlay").classList.remove('fa-play');
        FirstSongItem.querySelector(".songItemPlay").classList.add('fa-pause');
    }
    else{
        songIndex++;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    // audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    const PreviousSongItem = songItem[songIndex-1];
    PreviousSongItem.querySelector(".songItemPlay").classList.remove('fa-pause');
    PreviousSongItem.querySelector(".songItemPlay").classList.add('fa-play');
    const currentSongItem = songItem[songIndex];
    currentSongItem.querySelector(".songItemPlay").classList.remove('fa-play');
    currentSongItem.querySelector(".songItemPlay").classList.add('fa-pause');

});

// ...

//To play to next song on clicking next button
document.getElementById('next').addEventListener('click', () => {
    playNextSong();
});

//To play to previous song on clicking previous button
document.getElementById('previous').addEventListener('click', () => {
    playPreviousSong();
});

// Function to play the next song
function playNextSong() {
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0; // Loop back to the first song if it's the last one
    }
    playSong(songIndex);
}

// Function to play the previous song
function playPreviousSong() {
    if (songIndex > 0) {
        songIndex--;
    } else {
        songIndex = songs.length - 1; // Go to the last song if it's the first one
    }
    playSong(songIndex);
}

// Function to play a specific song by index
function playSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    // Update the play/pause icons for the song items
    songItem.forEach((element, i) => {
        const playIcon = element.querySelector(".songItemPlay");
        if (i === index) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });
    
}



