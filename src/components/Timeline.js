import React, {useState, useEffect} from 'react'
import { useHistory, useParams} from 'react-router-dom'

import Container from '@material-ui/core/Container';

const Timeline = () => {
    const [data, setData] = useState([])
    const history = useHistory()

    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/timeline/${id}`)
        .then(res => res.json())
        .then(data =>{
            console.log(typeof(data));
            setData(data)
        } ) 
        
    }, [])

    const eventHandler = () => {
        history.push('/addEvent')
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <button onClick={eventHandler}>Add Event</button>
            <h3>{data.timelineTitle}</h3>
            <p>by:{data.creator}</p>
            {/* <img src={data.timelineImageUrl} alt=''></img> */}

            {data.event && data.event.map(item => (
                <>
                    <h2>{item.event}</h2>
                    <iframe src={item.imageUrl}></iframe>
                </>
            ))}
        </Container>
        
    )
}

export default Timeline
