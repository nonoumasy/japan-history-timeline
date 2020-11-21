import React, {useState, useEffect} from 'react'
import { useHistory, useParams} from 'react-router-dom'

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
        <div>
            <button onClick={eventHandler}>Add Event</button>
            <h2>{data.timelineTitle}</h2>
            <h3>by:{data.creator}</h3>
            <img src={data.timelineImageUrl} alt=''></img>

            {data.event && data.event.map(item => (
                <>
                    <h2>{item.event}</h2>
                    <iframe src={item.imageUrl}></iframe>
                </>
            ))}

        </div>
        
    )
}

export default Timeline
