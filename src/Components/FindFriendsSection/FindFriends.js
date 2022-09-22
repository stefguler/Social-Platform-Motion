import { useState, useEffect } from "react"
import styled from 'styled-components';
import Header from "../HeaderSection";
import UserCard from "./UserCard";

const UserCardContainer = styled.div`
    display: grid;
    width: 50%;
    align-items: center;
    justify-content: center;
    grid-template-columns: minmax(auto, 23rem) 1fr 1fr;
    font-family: 'Luckiest Guy', cursive;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    gap: 1rem 1rem;
    padding: 1rem; 
    margin: 0 auto;
`


export function FindFriends() {

    const [users, setUsers] = useState([])
    const [defaultDescription, setDefaultDescription] = useState('Lorem ipsum dolor sit amet, vim ut quas volumus probatus, has tantas laudem iracundia et, ad per utamur ceteros apeirian')
    const currentUsers = []

    
    useEffect(() => {
        pushUser('Albert', 'Lawrence', 'Zürich', 'Switzerland', defaultDescription,
            ['Cooking', 'Travel', 'Reading', 'Swimming', 'Swimming'], 'maleAvatar.jpg')

        pushUser('Leticia', 'Suàrez', 'Rome', 'Italy', defaultDescription,
            ['Cooking', 'Travel', 'Reading'], 'femaleAvatar.jpg')

        pushUser('Patricia', 'Jindal', 'Munich', 'Germany', defaultDescription,
            ['Cooking', 'Travel', 'Reading', 'Swimming', 'Swimming'], 'femaleAvatar.jpg')

        pushUser('Frank', 'Baker', 'Los Angeles', 'USA', defaultDescription,
            ['Cooking', 'Travel', 'Reading', 'Swimming', 'Swimming'], 'maleAvatar.jpg')

        pushUser('Thomas', 'Castro', 'Barcelona', 'Spain', defaultDescription,
            ['Cooking', 'Travel', 'Reading', 'Swimming', 'Swimming'], 'maleAvatar.jpg')

        pushUser('Max', 'Martinez', 'Leon', 'France', defaultDescription,
            ['Cooking', 'Travel', 'Reading', 'Swimming', 'Swimming'], 'maleAvatar.jpg')

        console.log(users)

    }, [])

    let User = class {
        constructor(firstname, lastname, city, country, description, labels, avatar) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.city = city;
            this.country = country;
            this.description = description;
            this.labels = labels;
            this.avatar = avatar
        }

    }

    const pushUser = (firstname, lastname, city, country, description, labels, avatar) => {
        const newUser = new User(firstname, lastname, city, country, description, labels, avatar)
        currentUsers.push(newUser)
        setUsers(currentUsers)
    }

    return (
        <>
            <Header/>
            <UserCardContainer>
                {
                    users.map((user) => {
                        return <UserCard key={user} user={user}/>
                    })
                }
            </UserCardContainer>
         </>
    )
}