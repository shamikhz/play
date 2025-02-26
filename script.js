document.addEventListener("DOMContentLoaded", () => {
    const songs = [
        { title: "Shape Of You", artist: "Ed Sheeran", genre: "pop", src: "path/to/shape_of_you.mp3", albumArt: "path/to/shape_of_you.jpg" },
        { title: "All Of Me", artist: "Adele", genre: "rock", src: "path/to/all_of_me.mp3", albumArt: "path/to/all_of_me.jpg" },
        { title: "Somelike Like You", artist: "Adele", genre: "pop", src: "path/to/somelike_like_you.mp3", albumArt: "path/to/somelike_like_you.jpg" },
        { title: "Wonderwall", artist: "Oasis", genre: "classic", src: "path/to/wonderwall.mp3", albumArt: "path/to/wonderwall.jpg" },
        { title: "Sugar", artist: "Maroon", genre: "pop", src: "path/to/sugar.mp3", albumArt: "path/to/sugar.jpg" },
        { title: "Locked Away", artist: "R. City", genre: "rock", src: "path/to/locked_away.mp3", albumArt: "path/to/locked_away.jpg" }
    ];

    const genreFilter = document.getElementById('genreFilter');
    const songList = document.getElementById('songList');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const albumArt = document.getElementById('albumArt');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');

    let currentSongIndex = 0;

    function displaySongs(filteredSongs) {
        songList.innerHTML = ''; // Clear the current song list
        filteredSongs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            
            li.addEventListener('click', () => {
                playSong(index);
            });
    
            const div = document.createElement('div');
            div.style.backgroundColor = 'rgb(83, 83, 232)'; // Set background color
            div.appendChild(li); // Append the li to the div
    
            songList.appendChild(div); // Append the div to the songList
        });
    }
    
    function filterSongs() {
        const selectedGenre = genreFilter.value;
        const filteredSongs = selectedGenre === 'all' ? songs : songs.filter(song => song.genre === selectedGenre);
        displaySongs(filteredSongs);
    }

    genreFilter.addEventListener('change', filterSongs);
    
    function playSong(index) {
        const song = songs[index];
        currentSongIndex = index;
        audioSource.src = song.src;
        audioPlayer.load();
        albumArt.src = song.albumArt;
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        audioPlayer.play();
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = "Play";
        }
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    }

    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    // Initial display of all songs
    displaySongs(songs);

    document.getElementById('createPlaylist').addEventListener('click', () => {
        const playlistName = document.getElementById('playlistName').value;
        if (playlistName) {
            const li = document.createElement('li');
            li.textContent = playlistName;
            
            const div = document.createElement('div');
            div.style.backgroundColor = 'rgb(80, 80, 210)'; // Set background color
            div.appendChild(li); // Append the li to the div
    
            document.getElementById('allPlaylists').appendChild(div); // Append the div to the allPlaylists element
            
            document.getElementById('playlistName').value = ''; // Clear the input field
        }
    });

    // Dark Mode Toggle
    document.getElementById('darkModeToggle').addEventListener('change', (event) => {
        if (event.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check local storage to set the initial theme
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    }
});
