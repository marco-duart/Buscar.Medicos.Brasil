import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <nav>
            <div>Logo</div>
            <div>
                <div><Link to="/home">Dashboard</Link></div>
                <div><Link to="/home/users">Usuarios Cadastrados</Link></div>
                <div><Link to="/home/plans">Planos</Link></div>
                <div><Link to="/home/specialties">Especialidades</Link></div>
                <div><Link to="/home/notifications">Notificações</Link></div>
                <div><Link to="/home/faq">FAQ</Link></div>
            </div>
        </nav>
    )
}

export default Sidebar