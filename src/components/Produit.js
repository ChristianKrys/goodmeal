const Produit = () => {
    return ( 
        <div className="produit">
            <div className="produit_top">
                <div className="produit_top_image"><img src="" alt="" /></div>
                <div className="produit_top_Btn_Supprimer"></div>
                <div className="produit_top_bande_Nouveau"></div>
                <div className="produit_top_bande_Epuise"></div>
            </div>
            <div className="produit_libelle">BONBONS</div>
            <div className="produit_bottom">
                <div className="produit_bottom_prix">5.45£</div>
                <div className="produit_bottom_Btn_Ajouter">Ajouter</div>
            </div>
        </div>
     );
}
 
export default Produit;