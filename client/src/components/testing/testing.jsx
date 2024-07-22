import { useEffect, useState } from "react"
import { ifetchWrapper } from '/fetchWrapper.js';

export function Testing(){

    const [projects, setProjects] = useState([])

    useEffect(()=>{
        const fetchProjects = async () =>{
            try{
                const response = await ifetchWrapper.fetchMethod({
                    enpoint: 'projects'
                })
                const data = await response.json()
                setProjects(data.projects)
            }catch(error){
                console.error('Error fetching data:', error);
            }
        }
    }, [])


    return (
        <section>

        </section>
    )
}