import React from "react"
import {
    ResultContainer,
    ResultImage,
    SongContainer,
    TitleText,
    ArtistText,
} from "./styles/TrackSearchResults.styles"

const TrackSearchResult = ({ track, chooseTrack }) => {
    function handlePlay() {
        chooseTrack(track)
    }
//this will render all songs searched from the dashboard component, this will take track and choosetrack.
//track will provide details such as title and artist name, choosetrack is a callback that helps dashboard know what song to play.

    return (
        <ResultContainer onClick={handlePlay}>
            <ResultImage src={track.albumUrl} />
            <SongContainer>
                <TitleText>{track.title}</TitleText>
                <ArtistText>{track.artist}</ArtistText>
            </SongContainer>
        </ResultContainer>
    )
}

export default TrackSearchResult