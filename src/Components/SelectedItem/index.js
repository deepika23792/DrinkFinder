import { React, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import drinksImages from "./data";
import ImageModal from "../ImageModal"
import CarouselImg from "../CarouselImg";

const SelectedItem = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const data = props && props.selectedDrinkData && props.selectedDrinkData[0]
    var ingredients = "";
    var inst = "";

    if (data) {
        for (var i = 1; i <= 15; i++) {
            ingredients += (data && (data["strIngredient" + i] != null) && (data["strIngredient" + i] + ", ")) || ""
        }
        ingredients = ingredients.slice(0, -2)
        if (ingredients.length > 60) {
            ingredients = ingredients.slice(0, 60) + "..."
        }
        inst = data.strInstructions
        if (inst.length > 75) {
            inst = inst.slice(0, 60) + "..."
        }
    }

    const showModal = () => {
        setModalShow(!modalShow)
    }

    return (
        <Container fluid="md">
            {modalShow && <ImageModal name={data.strDrink} show={modalShow} onHide={() => setModalShow(false)} images={drinksImages} />}
            {data ?
                <Row>
                    <Col sm={7}>
                        <Row><h2>{data.strDrink}</h2></Row>
                        <Row>
                            <ListGroup >
                                <ListGroup.Item className="d-flex justify-content-between  align-items-start">
                                    {data.strAlcoholic}
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between  align-items-start">
                                    {data.strGlass}
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between  align-items-start instructions">
                                    <Row><Col>Instructions</Col></Row>
                                    <Row><Col> {inst}</Col></Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between  align-items-start">
                                    <Row><Col>Ingredients</Col></Row>
                                    <Row><Col> {ingredients}</Col></Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between  align-items-start">
                                    {data.dateModified}
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Col>
                    <Col className='alignCarousel' onClick={() => setModalShow(true)}>
                        <CarouselImg drinksImages={drinksImages} />

                    </Col>
                </Row>
                : "You have not select an item. Please select an item from Drink List"}
        </Container >
    )
}

export default SelectedItem