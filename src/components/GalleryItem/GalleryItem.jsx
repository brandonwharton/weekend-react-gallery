import './GalleryItem.css'
import { useState } from 'react';
import axios from 'axios';

function GalleryItem({ getGalleryList, image }) {
    // create a state for tracking whether a picture has been clicked
    const [isClicked, setIsClicked] = useState(false)
    // create a state for tracking total number of likes, on page load
    // set likes total for each image with supplied server data
    const [likesTotal, setLikesTotal] = useState(image.likes);


    // toggles isClicked to change state when run
    const toggleIsClicked = () => {
        // when clicked, each element switches to the opposite isClicked state
        setIsClicked(!isClicked);
    }

    // click handler for like button, makes PUT request to adjust likes on server before re-rendering
    const handleLikeClick = () => {
        console.log('clicked');
        // PUT request to server to increase likes value on server
        axios.put(`/gallery/like/${image.id}`)
            .then(response => {
                // increase likesTotal state by one to keep it up-to-date with server
                // data as app user is clicking like buttons
                setLikesTotal(likesTotal + 1);
            })
            .catch(err => {
                alert('Problem with like request, please try again');
                console.log(err);
            });
    }


    return (
        <div>
            {/* Use a ternary, if image has been clicked, isClicked becomes true */}
            {/* and a clickable div with the image's description renders*/}
            { isClicked ? (
                <div onClick={() => toggleIsClicked()}>
                    <p>{image.description}</p>
                </div>
            ) : (
                // isClicked is false by default, so images display normally on load
                <img src={image.path} alt={image.title} width="200"
                    onClick={() => toggleIsClicked()}></img>
            )}
            {/* Display number of likes using state data which keeps it current*/}
            {/* with button clicks and with app reloads */}
            <h4>Number of likes: {likesTotal}</h4>
            <button onClick={() => handleLikeClick()}>Like</button>
        </div>
    )
}

export default GalleryItem;