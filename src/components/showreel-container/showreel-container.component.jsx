import React, { useEffect, useState } from 'react'
import sanityClient from '../../Client'
import Player from '../player/player.component'
import styled from 'styled-components'

const PlayCont = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: auto;
`

const ShowreelCont = () => {
	const [showreel, setShowreel] = useState('')
	useEffect(() => {
		const showQuery = `*[_type == "showreel"] `
		sanityClient.fetch(showQuery).then(showreel => {
			showreel.forEach(showreel => {
				setShowreel(showreel)
			})
		})
	}, [])

	console.log('showreel showreel: ', showreel)

	return (
		<PlayCont style={{ marginBottom: '50px' }}>
			<Player video={showreel} />
		</PlayCont>
	)
}

export default ShowreelCont
