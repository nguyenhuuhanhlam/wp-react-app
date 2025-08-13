import { useParams } from 'react-router-dom'

const NewsDetailsPage = () => {

	const { id } = useParams()

	return (
		<div>Details: {id}</div>
	)
}

export default NewsDetailsPage