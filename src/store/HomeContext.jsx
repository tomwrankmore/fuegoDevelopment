import React, { createContext, useState, useEffect } from 'react'
import sanityClient from '../Client'
export const HomeContext = createContext()

const HomeContextProvider = props => {
	const [home, setHome] = useState('')
	useEffect(() => {
		const homeQuery = `*[_type == "video" && homeVideo]{
        clientWork, title, thumbnail, client[]->{clientName}}
       `
		sanityClient.fetch(homeQuery).then(home => {
			const HomeArray = []
			home.forEach(home => {
				HomeArray.push(home)
			})
			setHome(HomeArray)
		})
		
		return
	}, [home])
	return (
		<HomeContext.Provider value={{ home }}>
			{props.children}
		</HomeContext.Provider>
	)
}

export default HomeContextProvider
