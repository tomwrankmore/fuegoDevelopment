import React, { createContext, useState, useEffect } from 'react'
import sanityClient from '../Client'
export const ContentContext = createContext()

const ContentContextProvider = props => {
	const [category, setCategory] = useState([])
	const [videoArray, setVideoArray] = useState([])
	const [ogArray, setOgArray] = useState([])
	const [allArray, setAllArray] = useState([])
	const [isFiltered, setIsFiltered] = useState(false)
	const [clientCat, setClientCat] = useState(false)
	const [clientArray, setClientArray] = useState([])
	const videoQuery = `*[_type == "video"][!(_id in path('drafts.**'))] | order(date desc){
		_id, clientWork, title, thumbnail, client[]->{clientName, _id, logo}, categories[]->{category, _id}}
		`
	const catQuery = `*[_type == "categories"] | order(date desc){
            category
        }
        `
	useEffect(() => {
		const catArray = []

		sanityClient.fetch(catQuery).then(cat => {
			cat.forEach(cat => {
				catArray.push(cat)
			})
			setCategory(catArray)
		})
		return
	}, [catQuery])
	// console.log('allArray: ', allArray)
	useEffect(() => {
		// console.log('fetching content')
		sanityClient.fetch(videoQuery).then(video => {
			const videoArray = []
			const allArray = []
			const clientArray = []
			video.forEach(video => {
				allArray.push(video)
				if (videoArray.length <= 0) {
					videoArray.push(video)
					if (video.clientWork) {
						clientArray.push(video)
					}
				} else if (video.clientWork && video.client !== undefined) {
					if (videoArray.filter(e => e.clientWork && e.client !== undefined)) {
						if (
							videoArray.filter(
								e => e.clientWork && e.client[0]._id === video.client[0]._id
							).length > 0
						) {
							//  videoArray.splice(videoArray.filter(e => e.client[0].clientName === video.client[0].clientName), 1, video)
						} else {
							videoArray.push(video)
							clientArray.push(video)
						}
					}
				} else {
					videoArray.push(video)
				}
			})

			setClientArray(clientArray)
			setAllArray(allArray)
			setOgArray(videoArray)
			setVideoArray(videoArray)
		})
		return
	}, [videoQuery])

	let filteredVideos = []

	function filter(cat) {
		if (cat.toLowerCase() === 'all') {
			setVideoArray(ogArray)
			setIsFiltered(false)
			setClientCat(false)
			return
		}
		if (cat.toLowerCase() === 'clients') {
			setVideoArray(clientArray)
			setClientCat(true)
			setIsFiltered(true)
			return
		}
		filteredVideos = allArray.filter(v => {
			if (v.categories !== undefined) {
				return v.categories.every(c => cat === c.category)
			}
			return null
		})

		if (filteredVideos.length > 0) {
			setIsFiltered(true)
			setClientCat(false)
			setVideoArray(filteredVideos)
		} else {
			setIsFiltered(false)
			setClientCat(false)
			setVideoArray(ogArray)
		}
	}

	return (
		<ContentContext.Provider
			value={{ category, videoArray, allArray, isFiltered, filter, clientCat }}
		>
			{props.children}
		</ContentContext.Provider>
	)
}

export default ContentContextProvider
