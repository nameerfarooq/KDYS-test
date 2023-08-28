import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import Modal from './DetailsModal'
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
    const getPokemons = async () => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=5`)
            .then((res) => {
                if (res.status === 200) {
                    setpokemons(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getPokemons()
    }, [])
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
                    <button className="previous">previos</button>
                    <button className="next">next</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage