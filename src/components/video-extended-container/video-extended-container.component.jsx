import React, { useState, useEffect } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import VideoExtended from '../video-extended/video-extended.component'
import Spinner from '../spinner/spinner.component'
import sanityClient from '../../Client'

const VideoContainer = () => {
	const [video, setVideo] = useState()
	let id = useParams()
	// params is pathname passed when you link to this page which is the title of the video.
	useEffect(() => {
		const videoQuery = `*[_type == "video" && title == "${id.videoId.trim()}"]{date, description,categories[]->{_id, category}, clientWork, title, vimeoLink, bts, client[]->{_id, clientName}}
      `

		sanityClient.fetch(videoQuery).then(sanityVideo => {
			if (sanityVideo.length <= 0) {
				setVideo('noVid')
			}
			setVideo(sanityVideo[0])
		})
		return function cleanUp() {
			setVideo()
		}
	}, [id])

	return !video ? <Spinner></Spinner> : <VideoExtended video={video} />
}

export default withRouter(VideoContainer)
