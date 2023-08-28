import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import DetailsModal from './DetailsModal'
const LandingPage = () => {
    const [pokemons, setpokemons] = useState([])
    const [url, setUrl] = useState("")
    const [offset, setoffset] = useState(0)
    const [showDetails, setshowDetails] = useState(false)
    const handleModal = (value) => {
        if (value) {
            setshowDetails(true)
        }
        else if (!value) {
            setshowDetails(false)
        }
    }
    const [previous, setprevious] = useState(true)
    const [next, setnext] = useState(true)
    const getPokemons = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=5`)
        .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setpokemons(res.data)
                    if(res.data.previous !== null){
                        setprevious(false)
                    }
                    if(res.data.next !== null){
                        setnext(false)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getPokemons()
    }, [offset])
    return (
        <>
            <DetailsModal handleModal={handleModal} isShow={showDetails} url={url} />
            <div className='main-page'>
                <div className="title">Pokemons</div>
                <div className='inner-div'>
                    {pokemons?.results?.map((pokemon, Index) => (
                        <div onClick={() => {
                            setshowDetails(true)
                            setUrl(pokemon.url)
                        }} key={Index} className="pokemon">{pokemon.name}</div>
                    ))}

                </div>
                <div className="pagination">
                    <button disabled={previous} onClick={()=>setoffset(offset-5)} className="previous">previos</button>
                    <button disabled={next} onClick={()=>setoffset(offset+5)} className="next">next</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage