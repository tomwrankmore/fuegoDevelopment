import React, { createContext, useState, useEffect } from 'react'
import sanityClient from '../Client'
export const DirectorsContext = createContext()

const DirectorsContextProvider = props => {
	const [directorData, setdirectorData] = useState([])
	useEffect(() => {
		const directorQuery = `
		*[_type == "directors"] {
            clientName,
			slug,
        }
       `
		sanityClient.fetch(directorQuery).then(directors => {
			const directorContentArray = []
			directors.forEach(item => {
				directorContentArray.push(item)
			})
			setdirectorData(directorContentArray)
		})
		return
	}, [])
	return (
		<DirectorsContext.Provider value={{ directorData }}>
			{props.children}
		</DirectorsContext.Provider>
	)
}

export default DirectorsContextProvider