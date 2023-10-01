import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <nav>
            <div>Logo</div>
            <div>
                <div><Link to="/">Dashboard</Link></div>
                <div><Link to="/users">Usuarios Cadastrados</Link></div>
                <div><Link to="/plans">Planos</Link></div>
                <div><Link to="/payments">Pagamentos</Link></div>
                <div><Link to="/specialties">Especialidades</Link></div>
                <div><Link to="/notifications">Notificações</Link></div>
                <div><Link to="/faq">FAQ</Link></div>
            </div>
        </nav>
    )
}

export default Sidebar