import { useState, useEffect } from 'react'
import { MeAPI } from '../../data/services/register'

type LoggedUser = {
    firstName: string
    email: string
}

const Header = () => {
    const [loggedUser, setLoggedUser] = useState<LoggedUser>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: IMeAPI | null = await MeAPI()
                if(response) {
                    const {firstName, email} = response
                    setLoggedUser({ firstName, email })
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <header>
            <div>${loggedUser?.firstName}</div>
            <div>${loggedUser?.email}</div>
        </header>
    )
}

export default Header