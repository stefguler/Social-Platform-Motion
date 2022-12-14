import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation'
import Menudropdown from './Dropdowns/MenuDropdown/MenuDropdown'
import NotificationDropdown from './Dropdowns/NotificationDropdown';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationCounter } from '../../redux/slices/Notifications';


const HeaderContainer = styled.header`
    background: white;
    display: flex;
    height: 80px;
    width: 100%;
    justify-content: space-between;
    font-family: 'Luckiest Guy', cursive;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 40px rgba(0, 0, 0, 0.15);

    span {
        font-size: 22px;
        margin-right: 6rem;
        cursor: pointer;
    }

`
const HeaderLeftContainer = styled.div`
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    i {
        font-size: 20px;
        color: lightgray;
    }

`
const HeaderRightContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 3rem;
    gap: 2rem;
`
const NotificationContainer = styled.div`
    position: relative;
    margin-right: 3rem;
`
const NotificationCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 8px;
    color: white;
    background: linear-gradient(45deg, #C468FF, #6E91F6 );
    border-radius: 50%;
    position: absolute;
    border: 2.5px white solid;
    left: 1.3rem;
    bottom: 0.8rem;
`;
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
 
    button {
        border: none;
    }

    img {
        border-radius: 50%;
        margin-right: 0;
        cursor: pointer;
    }

    i {
        font-size: 20px;
        color: black;
    }
`
export default function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [request, setRequests] = useState([])
    const notificationCounter = useSelector(state => state.notifications.notificationCounter)
    const currentUser = useSelector(state => state.auth.currentUser)
    const token = useSelector(state => state.auth.accessToken)

    useEffect(() => {
        if (token === undefined) navigate('/')
        updateNotifications();
    }, [token]); //requests inside dependency

    const updateNotifications = () => {

        const url = "https://motion.propulsion-home.ch/backend/api/social/friends/requests/"
        const config = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
        }

        fetch(url, config)
            .then(response => response.json())
            .then(data => setRequests(data.results))
        
        getNotificationLength();
    
        }

    const getNotificationLength = () => {
        const pendingNotificationCount = request.filter((request) => {
            return request.status === "P"
        })
        if (notificationCounter !== pendingNotificationCount.length) dispatch(setNotificationCounter(pendingNotificationCount.length))
        return pendingNotificationCount.length
    }



    return (
        <>
            <HeaderContainer>
                <HeaderLeftContainer>
                    <img src='Logo@3x.png' width='26' height='26' ></img>
                    <span onClick={() => navigate('/')}> Motion</span>
                    <Navigation>
                    </Navigation>

                </HeaderLeftContainer>

                <HeaderRightContainer>

                    <NotificationContainer>
                        <NotificationCircle>{getNotificationLength()}</NotificationCircle>
                        <NotificationDropdown apidata={request} />
                    </NotificationContainer>

                    <ProfileContainer>
                        <img src={(currentUser.avatar === null) ? 'maleAvatar.jpg' : currentUser.avatar}  width="47.5" height='42.5' onClick={() => navigate('/profile')}></img>
                        <Menudropdown />
                    </ProfileContainer>
                </HeaderRightContainer>
            </HeaderContainer>
        </>
    )

}