import React, { useEffect, useState } from "react";
import SearchBar from '../SearchBar'
import SearchList from "../SearchList";
import SelectedItem from "../SelectedItem";
import FilterDrink from "../FilterDrinks";
import SortDrinks from "../SortDrinks";
import './style.css'
import { Col, Row } from "react-bootstrap";

const Home = () => {
    const [getData, SetGetData] = useState();
    const [randomDrink, SetRandomDrink] = useState()
    const [resetState, setResetState] = useState(false)
    const [nFound, setNFound] = useState(false)
    const [customizedData, setCustomizedData] = useState()
    useEffect(() => {
        randomDrinkAPI()
    }, [])
    async function randomDrinkAPI() {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        const json = await response.json();
        SetRandomDrink(json.drinks)
    }

    return (
        <div className="homeContainer">
            <div className="logo">
                <img src="/drinksImg/logo.png" alt="logo" />
            </div>
            <SearchBar sendData={SetGetData} setNFound={setNFound} setResetState={setResetState} />
            {(!(getData === null) && !(getData === undefined)) ? <><Row className="filterDrinkConatiner">
                <Col sm={4}><FilterDrink resetState={resetState} drinkList={getData} setResetState={setResetState} setCustomizedData={setCustomizedData} /></Col>
                <Col sm={2}><SortDrinks resetState={resetState} drinkList={getData} setResetState={setResetState} setCustomizedData={setCustomizedData} /></Col>
            </Row>
                <SearchList drinkList={customizedData && !resetState ? customizedData : getData} /></>
                : getData === null ? nFound ?
                    "Not Found" : "" : ""
            }
            <div className="randomDrinkContainer"> <SelectedItem selectedDrinkData={randomDrink} /></div>
        </div >
    )
}

export default Home;