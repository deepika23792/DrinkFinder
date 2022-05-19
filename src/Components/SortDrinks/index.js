import { React, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap"

const SortDrinks = ({ drinkList, setCustomizedData, resetState, setResetState }) => {

    const [sort, SetSort] = useState("select")

    useEffect(() => {
        if (setResetState) {
            SetSort("Select")
        }
    }, [resetState])

    const compare = (key, order = 'asc') => {

        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === "string") ? a[key].toUpperCase() : new Date(a[key])
            const varB = (typeof b[key] === "string") ? b[key].toUpperCase() : new Date(b[key])

            let comparison = 0;

            if (varA > varB) {
                comparison = 1
            } else if (varA < varB) {
                comparison = -1
            }
            return (
                (order === "desc") ? (comparison * -1) : comparison
            )
        }

    }

    const SortBy = (type) => {
        SetSort(type === "name" ? "Name" : "Date")
        setResetState(false)
        var sortedList;
        if (type === "name") {
            sortedList = (drinkList.slice().sort(compare("strDrink")))
        } else {
            sortedList = drinkList.slice().sort(compare("dateModified", "desc"))
        }
        setCustomizedData(sortedList)
    }
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Sort By : {sort}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.Item id="name" onClick={(e) => SortBy(e.target.id)}>
                        Name
                    </Dropdown.Item>
                    <Dropdown.Item id="date" onClick={(e) => SortBy(e.target.id)} >Date</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default SortDrinks;