import {useEffect , useState} from 'react' ;
import axios from 'axios' ;


function Fetch_api (url) {

	const [data_fetch, setdata] = useState(null) ;
	const [loading ,setloading] = useState(false)  ;

	useEffect(() => {
		axios.get(url).then((datafetch) => {

			setdata(datafetch.data)
			setloading(true)
		})

	} ,[])

	return {data_fetch , loading}
}
export default Fetch_api ;