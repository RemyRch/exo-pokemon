import { useEffect, useState } from "react";
import { FaAnglesLeft, FaPlay, FaPause, FaAnglesRight } from "react-icons/fa6";

export const MediaPlayer = () => {

    const [player, setPlayer] = useState(document.querySelector(".media-player-audio"))

    const [audios, setAudios] = useState([
        "Anville Town.mp3",
        "Cianwood City.mp3",
        "Générique.mp3",
        "Nacrene City.mp3",
    ])

    const [audio, setAudio] = useState()

    const [name, setName] = useState("Music name");
    const [time, setTime] = useState(0);
    const [volume, setVolume] = useState(10);
    const [play, setPlay] = useState(false);

    const handlePrevious = () => {

        let index = audios.indexOf(audio);
        if(index === 0) return;
        setAudio(audios[index - 1]);

    }

    const handleNext = () => {
        
        let index = audios.indexOf(audio);
        if(index === audios.length - 1) return;
        setAudio(audios[index + 1]);

    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    useEffect(() => {
        setAudio(audios[0]);
    }, [audios])

    useEffect(() => {

        if(!player) return

        player.src = `/audios/${audio}`;
        
        if(play) player.play();  

        setName(audio.capitalizeFirst());

    }, [audio])

    useEffect(() => {
        if(!player) return setPlayer(document.querySelector(".media-player-audio"));

        player.onloadedmetadata = () => {
            document.querySelector(".media-player-progress").max = player.duration;
            player.volume = volume / 100;
            setTime(player.currentTime);
        }   

    }, [player])

    useEffect(() => {
        if(!player) return
        play ? player.play() : player.pause();

        if(play) setInterval(() => {
            setTime(player.currentTime)
        }, 500);; 

    }, [play])

    useEffect(() => {
        if(!player) return
        player.volume = volume / 100;
    }, [volume])

    useEffect(() => {
        if(!player) return
        if(time === player.duration) handleNext();
    }, [time])

    return (
        <section className="media-player">
            <header>
                <span>{name}</span>
                <input type="range" min="0" value={volume} onChange={({ target: { value } }) => { setVolume(value) }} className="media-player-volume" />
            </header>
            <main>
                <audio className="media-player-audio">
                    <source src={`/audios/${audio}`} type="audio/mp3" />
                </audio>
                <div className="media-player-time">
                    <input type="range" min="0" value={time} onChange={({ target: { value } }) => { player.currentTime = value }} className="media-player-progress" />
                    <span>{formatTime(time)}</span>
                </div>
                <div className="media-player-controls">
                    <FaAnglesLeft onClick={handlePrevious} />
                    {play ? (
                        <FaPause onClick={() => { setPlay(false) }} />
                    ) : (
                        <FaPlay onClick={() => { setPlay(true) }} />
                    )}
                    <FaAnglesRight onClick={handleNext} />
                </div>
            </main>
        </section>
    )

}