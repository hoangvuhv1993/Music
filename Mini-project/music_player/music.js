//Define a variables

let audio, playbtn, title, poster, artists, mutebtn, seekslider, volumeslider, seeking=false,
seekto, curtimetext, durtimetext, playlist_status, dir, playlist, ext, agent, playlist_artist, repeat, randomSong;

//Initialization of Array of Music, Title, Poster Image, Artists

dir = "../Music/";
playlist = ["Cartoon-On-_-On", "Elektronomia", "Johnning", "Fearless"];
title = ["Cartoon-On & On", "Elektronomia", "Janji-Heroes Tonight", "Lost Sky-Fearless"];

artists = ["(feat. Daniel Levi) [NCS Release]", "Elektronomia-Sky High [NCS Release]",
"(feat. Johnning) [NCS Release]", "LFZ - [NCS Release]", "(feat. Chris Linton) [NCS Release]"];

poster = ["../Images/ncs1.jpeg", "../Images/ncs2.jpg", "../Images/ncs4.jpg", "../Images/ncs5.jpg"]

//Used to run on every browser

ext = ".mp3";
agent = navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
    ext = ".ogg";
}

//Set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
console.log(playlist_artist);
playlist_index = 0;

//Audio Object
audio = new Audio();
audio.src = dir + playlist[0] + ext;       //music/musicname.mp3
audio.loop = false;

//First Song Title and Artist
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];

//Add Event Handling
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown", function(event){seeking = true; seek(event); });
seekslider.addEventListener("mousemove", function(event){ seek(event); });
seekslider.addEventListener("mouseup", function(){ seeking = false; });
volumeslider.addEventListener("mousemove", setvolume);
audio.addEventListener("timeupdate", function(){ seektimeupdate(); });
audio.addEventListener("ended", function(){ switchTrack(); });
repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

//Function
function fetchMusicDetails(){
    //poster Image, Pause/Play Image
    $("#playpausebtn img").attr("src", "../Images/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src", poster[playlist_index]);

    //Title and Artist
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];

    //Audio
    audio.src = dir + playlist[playlist_index] + ext;
    audio.play();
}

function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src", "../Images/pause-red.png");
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src","../Images/play-red.png");
    }
}

function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length - 1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}
function prevSong(){
    playlist_index--;
    if(playlist_index < 0){
        playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
}
function mute(){
    if(audio.muted){
        audio.muted = false;
        $("#mutebtn img").attr("src", "../Images/speaker.png");
    }else{
        audio.muted = true;
        $("#mutebtn img").attr("src", "../Images/mute.png");
    }
}

// THANH TUA NHANH BAI HAT.

function seek(event){
    if(audio.duration == 0){
        null
    }else{
        if(seeking){
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

//CHINH TO NHO LOA. 

function setvolume(){
    audio.volume = volumeslider.value / 100;
}

//THOI GIAN CHAY CUA BAI HAT

function seektimeupdate(){
    if(audio.duration){
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;

        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);

        if(cursecs < 10){cursecs = "0" + cursecs}
        if(dursecs < 10){dursecs = "0" + dursecs}
        if(curmins < 10){curmins = "0" + curmins}
        if(dursecs < 10){dursecs = "0" + dursecs}

        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":" + dursecs;
    }else{
        curtimetext.innerHTML = "00" + ":" + "00";
        durtimetext.innerHTML = "00" + ":" + "00";
    }
}

function switchTrack(){
    if(playlist_index ==(playlist.length - 1)){
        playlist_index = 0;
    }else{
        playlist_index ++;
    }
    fetchMusicDetails();
}
    
//LUON HAT 1 BAi.
function loop(){
    if(audio.loop){
        audio.loop = false;
        $("#repeat img").attr("src", "../Images/rep.png");
    }else{
        audio.loop = true;
        $("#repeat img").attr("src", "../Images/rep1.png");
    }
}

//CHUYEN BAI HAT RANDOM
function getRandomNumber(min,max){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
}
function random(){
    let randomIndex = getRandomNumber(0, playlist.length - 1);
    playlist_index = randomIndex;
    fetchMusicDetails();
}