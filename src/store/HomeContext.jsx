import React, { createContext, useState, useEffect } from 'react'
import sanityClient from '../Client'
export const HomeContext = createContext()

const HomeContextProvider = props => {
	const [homeData, setHome] = useState([])
	useEffect(() => {
		const homeQuery = `
		*[_type == "homePageContent"] | order(order asc){
            projectTitle,
            directorName,
			order,
			"vidURL": homePageVideoFile.asset->url,
			videoSize,
			"thumbnail": loadingThumbnail.asset->url,
			vimeoLink
        }
       `
		sanityClient.fetch(homeQuery).then(homeContent => {
			const HomeContentArray = []
			homeContent.forEach(item => {
				HomeContentArray.push(item)
			})
			setHome(HomeContentArray)
		})
		return
	}, [])
	return (
		<HomeContext.Provider value={{ homeData }}>
			{props.children}
		</HomeContext.Provider>
	)
}

export default HomeContextProvider
