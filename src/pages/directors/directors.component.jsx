import React, { useContext } from 'react'
import styled from 'styled-components'
import VideoImage from '../../components/video-image/video-image.component'
import { ContentContext } from '../../store/ContentContext'

const Directors = () => {
	const { category, videoArray, isFiltered, filter, clientCat, allArray } =
		useContext(ContentContext)

	return (
        <ul>
            <li><h1>DIRECTORS</h1></li>
            <li><h1>DIRECTORS</h1></li>
            <li><h1>DIRECTORS</h1></li>
            <li><h1>DIRECTORS</h1></li>
            <li><h1>DIRECTORS</h1></li>
            <li><h1>DIRECTORS</h1></li>
        </ul>
    )
}

export default Directors