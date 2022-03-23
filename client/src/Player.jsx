import React, {useState, useEffect } from "react" ;
//useState and useEffect are both hooks, hooks are special functions which let you hook into react features. No need to create a class with hooks.
//useState will declare a state var. Same capabilities as this.state. Also prevents variables from disappearing, preserved by react.
//useState returns a pair of values: current state and a function to update it.
//useEffect lets you "effect" your component after rendering, it will remember the function/effect and call it later after DOM updates. Runs after every render.
//
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false)
//useEffect sets state value play to true if track URI is present, automatically plays song we select.
    useEffect(() => {
        setPlay(true)
    }, [trackUri]);

    if(!accessToken) return null
    return(
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => !state.isPlaying && setPlay(false)}
          play={play}
          uris={trackUri ? trackUri : []}
          styles={{
              activeColor: "#fff",
              bgColor: "#333",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
              height: "55px",
          }}
          />
    );
};

export default Player;