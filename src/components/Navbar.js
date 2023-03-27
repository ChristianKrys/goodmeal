const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className="navbar_logo">
                <div className="navbar_logo_titre">CRAZEE</div>
                <div><img className="navbar_logo_image" src="images/burger.jpg" alt="" /></div>
                <div className="navbar_logo_titre">BURGER</div>
            </div>
            <div className="navbar_login">
                <div className="navbar_login_btn_admin">
                    <div className="navbar_login_btn_admin_texte">Désactiver le mode ADMIN</div>
                    <div className="navbar_login_btn_admin_image"></div>
                </div>
                <div className="navbar_login_connexion">
                    <div className="navbar_login_connexion_identifiant">
                        <div className="navbar_login_connexion_identifiant_salutation">
                            <span className="navbar_login_connexion_identifiant_salutation_message">Hey, </span>
                            <span className="navbar_login_connexion_identifiant_salutation_prenom">Christian</span>
                        </div>
                        <div className="navbar_login_connexion_identifiant_btn_SeConnecter">Se Déconnecter</div>
                    </div>
                    <div className="navbar_login_connexion_avatar">                        
                        <img src="images/logo_profil.png" alt="" />
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Navbar;