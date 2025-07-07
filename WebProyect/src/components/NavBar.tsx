import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function NavBar(){
	const location = useLocation()
	const isMenuPage = location.pathname === '/menu'
	const navigate = useNavigate()
	const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }


    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				{isMenuPage ? (
                    <button onClick={handleLogout} className="navbar-brand btn btn-link">
                        Log Out
                    </button>
                ) : (
                    <NavLink to="/" className="navbar-brand">
                        Home
                    </NavLink>
                )}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					</ul>
				</div>
			</div>
		</nav>
    )
}