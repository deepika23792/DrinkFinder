import { React, useEffect, useRef, useState } from "react";
import { InputGroup, FormControl, DropdownButton, Dropdown } from "react-bootstrap"
import "./style.css"

const FilterDrink = ({ drinkList, setCustomizedData, resetState, setResetState }) => {
    const [filterDrinkType, SetfilterDrink] = useState("Select")
    const valueofInput = useRef();
    const allDrinksList = drinkList;
    useEffect(() => {
        valueofInput.current.value = ""
        SetfilterDrink("Select")
        setResetState(false)
    }, [resetState])
    const filterDrinkBy = (type) => {

        if (type === "Category" || type === "Ingredient") {

            SetfilterDrink(type === "Category" ? "Category" : type === "Ingredient" ? "Ingredient" : "Select")
            const updatedDrinkList = allDrinksList && allDrinksList.filter((item, key) => {
                if (type === "Category") {
                    return ((item.strCategory).toLowerCase()).includes(valueofInput.current.value)
                } else if (type === "Ingredient") {
                    for (var i = 1; i <= 15; i++) {
                        if (!((item["strIngredient" + i]) === null) && ((item["strIngredient" + i]).toLowerCase()).includes(valueofInput.current.value)) {
                            return ((item["strIngredient" + i]).toLowerCase()).includes(valueofInput.current.value)
                        }
                    }
                }

            })
            setCustomizedData(updatedDrinkList)
        }

    }
    return (
        <>
            <InputGroup className="mb-3 editfilter">


                <DropdownButton
                    variant="outline-secondary"
                    title={`Filter By : ${filterDrinkType}`}
                    id="input-group-dropdown-2"
                    align="end"
                >
                    <Dropdown.Item id="Category" onClick={(e) => filterDrinkBy(e.target.id)} className="type">Category</Dropdown.Item>
                    <Dropdown.Item id="Ingredient" onClick={(e) => filterDrinkBy(e.target.id)} className="type">Ingredient</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-label="Text input with dropdown button" onBlur={() => { valueofInput.current.value && filterDrinkType && filterDrinkType.length != 0 && filterDrinkBy(filterDrinkType) }} ref={valueofInput} className="alterInputWidth" />
            </InputGroup>
        </>
    )
}

export default FilterDrink;