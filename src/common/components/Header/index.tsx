import React from "react"
import { Container } from "./styles"
import DrawerNavigator from "../DrawerNavigator"


export const Header = () => {
    return (
        <Container>
            <h1>HEADER</h1>
            <DrawerNavigator />
        </Container>
    )
}