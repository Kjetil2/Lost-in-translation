import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave } from "../../utils/storage"
import { STORAGE_KEY_USER } from "../../const/storageKeys"
import { translationClearHistory } from "../../api/translation"

const ProfileActions = ({}) => {

    const {user, setUser} = useUser()

    const handleLogoutClick = () => {
        if (window.confirm ('Are you sure?')){
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }

    const handleClearHostoryClick = async () =>{
        if (!window.confirm('Are you sure?\n This can not be undone!')){
            return
        }

        const [clearError] = await translationClearHistory(user.id)

        if(clearError !== null){
            return
        }

        const updatedUser = {
                ...user,
                translations: []
        }

        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)
    }

    return (
        <div className="centralizer">
        <ul >
            {/* <li><Link to="/translation">Translation</Link></li> */}
            <li><button onClick={handleClearHostoryClick}>Clear history</button></li>
            <li><button onClick= {handleLogoutClick}>Logout</button></li>
        </ul>
        </div>

    )
}
export default ProfileActions