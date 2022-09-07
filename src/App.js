import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
    const numberLists = [
        ['A', '2'],
        ['3', '4']
    ];
    const suits = [
        {
            icon: '♥',
            color: 'red'
        }
    ];
    const spacing = 20;
    const [cards, setCards] = useState([]);
    let cardRef = useRef([]);
    let positions = useRef([]);
    useEffect(() => {
        suits.forEach((suit, suit_idx) => {
            numberLists.forEach((numbers, list_idx) => {
                numbers.forEach((number, number_idx) => {
                const cardDetails = {
                    number, 
                    suit, 
                    suit_idx,
                    list_idx,
                    number_idx
                }
                    createCard(cardDetails);
                });	
            })
        })
        setCards(cardRef.current)
    }, [])

    const createCard = ({number, suit, suit_idx, list_idx, number_idx}) => {
        const TOP = suit_idx * 175 + spacing * suit_idx + list_idx * 175 + spacing * list_idx + 'px';
        const LEFT = 220 + number_idx * 120 + spacing * number_idx + 'px';
        positions.current.push([TOP, LEFT]);
        const len = cardRef.current.length;
        cardRef.current[len] = {}
        cardRef.current[len].class = false;
        cardRef.current[len].top = '50%';
        cardRef.current[len].left = '41%';
    }

    const handleClick = () => {
        cards.forEach((cardContainer, idx) => {
            setTimeout(() => {
                cardContainer.zIndex = 4 - idx;
                cardContainer.top = '50%';
                cardContainer.left = '41%';
                cardContainer.class2 = true;
                setCards([...cards.slice(0, idx), cardContainer, ...cards.slice(idx + 1)])
            }, idx * 20);
        });
        setTimeout(shuffleBack, 4*20+500);
    }

    const handleFlip = (item, idx) => {
        item.class = !item.class;
        setCards([...cards.slice(0, idx), item, ...cards.slice(idx + 1)])
    }

    const shuffleBack = () => {
        // reset card
        for (let i = 0; i < cards.length; i++) {
           cards[i].class = false;
           cards[i].class2 = false;
        }
    
        // shuffle the positions
        shufflePositions();
        cards.forEach((cardContainer, idx) => {
            setTimeout(() => {
                cardContainer.top = positions.current[idx][0];
                cardContainer.left = positions.current[idx][1];
                setCards([...cards.slice(0, idx), cardContainer, ...cards.slice(idx + 1)])
            }, idx * 20);
        });
    }
    
    const shufflePositions = () => {
        for (let i=0; i<1000; i++) {
            const rand1 = Math.floor(Math.random() * 10) % 4;
            const rand2 = Math.floor(Math.random() * 10) % 4;
            const temp = positions.current[rand1];
            positions.current[rand1] = positions.current[rand2];
            positions.current[rand2] = temp;
        }
    }

    return (
        <div className="App">
            <div className="page-wrap">
                <div className="buttonContainer">
                    <div className="center">
                        <button className="shuffleBtn" id="shuffle" onClick={handleClick}><span>Shuffler</span></button>
                    </div>
                </div>
                <div className="container" id="container">
                    {
                        cards ? cards.map((item, index) => (
                            <div key={index} className='card-container' style={{top: item.top, left: item.left, zIndex: item.zIndex}}>
                                <div className={"card " + (item.class ? 'clicked ' : '')  + (item.class2 ? 'spin' : '')} onClick={() => handleFlip(item, index)}>
                                    <figure className={"back " + `back-${index}`}></figure>
                                    <figure className="front"></figure>
                                </div>
                            </div>
                        )): null
                    }
                </div>
                </div>
        </div>
    );
}

export default App;
