const Produit = () => {
    return ( 
        <div className="produit">
            <div className="produit_top">
                <div className="produit_top_image"><img src="images/burger.jpg" alt="" /></div>
                <div className="produit_top_Btn_Supprimer">X</div>
                <div className="produit_top_bande_Nouveau"><img src="images/new.png" alt="" /></div>
                <div className="produit_top_bande_Epuise"><img src="images/epuise1.png" alt="" /></div>
            </div>
            <div className="produit_libelle">BONBONS BONUS</div>
            <div className="produit_bottom">
                <div className="produit_bottom_prix">5.45 £</div>
                <div className="produit_bottom_Btn_Ajouter">Ajouter</div>
            </div>
        </div>
     );
}
 
export default Produit;