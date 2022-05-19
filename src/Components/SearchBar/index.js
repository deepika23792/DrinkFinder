import { React, useEffect, useState, useRef } from "react";
import { InputGroup, FormControl, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'
import './style.css'

const SearchBar = ({ sendData, setNFound, setResetState }) => {

    const [item, SetItem] = useState("");
    const [warning, SetWarning] = useState("");
    const [saveSearch, SetSaveSearch] = useState([]);
    const [showSearchHistory, SetShowSearchHistory] = useState(false)
    const isFirstRender = useRef(true)

    useEffect(() => {
        const localstoragesearchData = JSON.parse(localStorage.getItem('searchHistory')) || []
        if (isFirstRender.current) {
            isFirstRender.current = false
            SetSaveSearch(localstoragesearchData)
            return;
        }
    })

    useEffect(() => {

        saveSearch.length != 0 && localStorage.setItem('searchHistory', JSON.stringify(saveSearch.slice(-5).reverse()))
    }, [saveSearch])

    window.addEventListener('click', function (e) {
        if (!document.getElementById('searchBar').contains(e.target)) {
            SetShowSearchHistory(false)
        }
    })

    async function searchDrink(item) {
        SetItem(item)
        SetShowSearchHistory(false)
        setResetState(true)
        if (item.length != 0) {
            ((saveSearch.indexOf(item) === -1) || saveSearch.length === 0) && SetSaveSearch((saveSearch) => ([...saveSearch, item]).slice(-5))

            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${item}`);
            const json = await response.json();
            sendData(json.drinks)
        } else {
            SetWarning("Please Enter a drink Name")
            setTimeout(() => {
                SetWarning("")
            }, 2000)
        }
    }


    return (
        <>
            <Container className="mt-2">
                <Row className="justify-content-md-center" id="searchBar"><Col sm={4}>
                    <InputGroup className="p-2">
                        <FormControl
                            placeholder="Search your drinks here.."
                            aria-label="serahc-drink"
                            aria-describedby="basic-addon2"
                            value={item}
                            onChange={(e) => {
                                SetItem(e.target.value)
                            }}
                            onFocus={() => {
                                SetShowSearchHistory(true)
                                setNFound(false)
                            }}
                            onBlur={() => setNFound(true)}
                        />
                        <Button variant="outline-secondary" id="searchDrink" onClick={() => searchDrink(item)}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
                </Row>
                {warning.length != 0 && <Row className="justify-content-md-center"><Col>{warning}</Col></Row>}
                {<Row className="justify-content-md-center position"><Col className="setPosition">
                    <div className="searchHistoryBoxContainer">
                        {
                            showSearchHistory &&
                            saveSearch.map((item, key) => {
                                return (
                                    <div key={key} className="searchHistoryBox" onClick={() => { searchDrink(item) }} style={{ cursor: "pointer" }}>{item}</div>
                                )
                            })
                        }
                    </div>
                </Col></Row>}
            </Container>
        </>
    )
}
export default SearchBar;