import React, { useEffect, useState } from "react";
import { InputGroup, Badge, FormControl, Button, Image, Container, Row, Col, ListGroup } from 'react-bootstrap'
import SelectedItem from '../SelectedItem'
import './style.css'

const SearchList = ({ drinkList = [] }) => {

    const [selectedDrinkData, SetSelectedDrinkData] = useState()

    useEffect(() => {
        (!(drinkList === null) && drinkList.length != 0) && document.querySelector("#categories").addEventListener("click", (e) => {
            e.stopPropagation()
            const selectedDrinkId = e.target.offsetParent.id
            const selectedDrinkData = drinkList.filter((item, key) => {
                return item.idDrink === selectedDrinkId
            })
            SetSelectedDrinkData(selectedDrinkData)
        })
        debugger
        if ((!(drinkList === null) && drinkList.length != 0) && document.querySelector("#categories").offsetHeight < 330) {
            document.querySelector("#categories").classList.remove("categories")
        }
    })
    return (
        <Row className=" detailsContainer"><Col sm={4}>
            Drinks Results:
            <div className="setList">
                <ListGroup id="categories" as="ol" numbered className="categories">
                    {
                        (!(drinkList === null) && drinkList.length != 0) ? (drinkList).map((item, key) => {
                            return (
                                <ListGroup.Item as="li" key={key} className="d-flex justify-content-between  align-items-start" id={item.idDrink} style={{ cursor: "pointer" }}>
                                    <Row key={key}> <Col sm={8}><div className="ms-2 me-auto">
                                        <div className="fw-bold d-flex leftAlign">{item.strDrink}</div>
                                        <div className="d-flex leftAlign">{item.strCategory}</div>
                                    </div></Col>
                                        <Col sm={4}>
                                            <div><Image responsive="true" thumbnail={true} fluid={true} src={item.strDrinkThumb} /></div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        }) :
                            <div>0 items</div>
                    }

                </ListGroup>
            </div>
        </Col>
            <Col sm={8}><div className="alignItem"><SelectedItem selectedDrinkData={selectedDrinkData} /></div></Col>
        </Row >
    )
}

export default SearchList;