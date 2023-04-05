import { useContext, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import Article from "./Article";

const AffichePanier = () => {
    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    useEffect(() => {
        
    }, []);
    return (         
        <div className="lef_container_middle">                            
            {tableArticle.map((article)=>{
                return <Article key={article.produit.codeProduit} newArticle={article}/>                                
            })} 
            {<div className="lef_container_Btn_valider_commande">Valider la commande</div>}
        </div> 
     );
}
 
export default AffichePanier;