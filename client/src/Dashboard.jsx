import React, { useState, useEffect } from "react"
import useAuth from "./hooks/useAuth"
import Player from "./Player"
import TrackSearchResults from "./TrackSearchResults"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import {
    DashBoardContainer,
    SearchInput,
    ResultsContainer,
    LyricsContainer,
    PlayerContainer,
} from "./styles/Dashboard.styles"

const spotifyApi = new SpotifyWebApi({
    clientid: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {
    //accessToken will be returned from useAuth hook with code as argument, used by spotify to fetch tracks
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("") //maintains value typed in
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
    }
//first hook triggers based on changes in playingtrack state, uses this states value to fetch lyrics
    useEffect(() => {
        if(!playingTrack) return
        (async () => {
            const {
                data: {lyrics}, 
            } = await axios.get(`${process.env.REACT_APP_BASE_URL}/lyrics`, {
                params: {
                    track: playingTrack.title,
                    artist: playingTrack.artist,
                },
            })
            setLyrics(lyrics)
        })()
    }, [playingTrack])
//second hook triggers with changes to accesstoken state ensures validity of accesstoken value 
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        //initialized from spotifywebapi, required to use respective functions to fetch songs.
    }, [accessToken])
//third hook triggers with changes to accesstoken in search state, if they are both truthy values
//it will trigger the async function for spotify api to search tracks, uses search state as an argument which will fetch all songs and artists matching the value,
//responds with an array of values.
    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false;
        (async () => {
            const { body } = await spotifyApi.searchTracks(search)
            if(cancel) return
            setSearchResults(
                body.tracks.items.map((track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if(image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    };
                })
            ))
        })();

        return () => (cancel = true)
    }, [search, accessToken])

    return (
        <DashBoardContainer>
            <SearchInput
              type="search"
              placeholder="Search Songs and Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
              <ResultsContainer>
                  {searchResults.map((track => (
                      <TrackSearchResults //displays values from searchresults state, also sets song to be played based on song clicked
                      track={track}
                      key={track.uri}
                      chooseTrack={chooseTrack}
                      />
                  )))}
                  {searchResults.length === 0 && (
                      <LyricsContainer>{lyrics}</LyricsContainer>
                  )}
              </ResultsContainer>
              <PlayerContainer>
                  <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
              </PlayerContainer>
        </DashBoardContainer>
    )

}

export default Dashboard