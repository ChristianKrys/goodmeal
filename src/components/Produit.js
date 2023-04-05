import { useContext, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";

const Produit = ({newProduit}) => {

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:0,
        enstock:false,
        avecpublicite:false,
        description:'',
        codeProduit:''
    }

    const [copyNewProduit,setCopyNewProduit] = useState({...emptyProduit,...newProduit});
    const [supprimerProduit,setSupprimerProduit] = useState(false);

    const handleClickAjouter = ()=>{

        const article = {
            quantiteArticle : 1,
            produit : {...copyNewProduit},
            montantTotalParArticle : (quantiteArticle,prixProduit)=>{return quantiteArticle*prixProduit}
        }

        let copyTableArticle = [...tableArticle];

        let quantiteArticle = 0;
        let indexArticle = -1;
        tableArticle.forEach((element,index) => {
            if(element.produit.codeProduit === copyNewProduit.codeProduit){
                //------ verification de la présence de articleEnEntree dans commandeEnCours
                quantiteArticle = element.quantiteArticle;
                //indexArticle += 1;
                indexArticle = index;                
            }
        });

        if(indexArticle > -1){
            //----- articleEnEntree est dejà présent dans commandeEnCours --------                      
            copyTableArticle[indexArticle].quantiteArticle = quantiteArticle + 1;             
        } else{
            //---- article non présent dans la commande, on l'insère dans la liste de commande ---------
            copyTableArticle.push(article);
        } ;
        
        const updateCommande = {...commandeEnCours,tableArticle:[...copyTableArticle]};
        setParamGlobal({...paramGlobal,commandeEnCours:{...updateCommande}})                  
    }


    const handleSupprimeProduit = ()=>{
        
        //let confirmSupp = confirm("Voulez-vous vraiment supprimer cet article de la boutique ?");
        //---- Suppression de l'élément dans la commande en cours ---------
        const newtableArticle = tableArticle.filter((element)=>element.produit.codeProduit !== copyNewProduit.codeProduit);
        const updateCommande = {...commandeEnCours,tableArticle:[...newtableArticle]};
        
        //---- Suppression de l'élément dans la liste des Produits en cours ---------        
        const newlisteProduit = listeProduit.filter((element)=>element.codeProduit !== copyNewProduit.codeProduit);
                    
        setParamGlobal({...paramGlobal,commandeEnCours:{...updateCommande},listeProduit:[...newlisteProduit]}) ;
        
        //---- Suppression de l'élément dans la base de données des Produits ---------
        
        
        //------ Raffraichir l'affichage ---------------
        setSupprimerProduit(true);
    
        //------ Abandon de suppression ----------------
        
    }    

    return ( !supprimerProduit &&
        <div className={copyNewProduit.enstock ?"produit":"produit assombrir"}>
            <div className="produit_top">
                <div className="produit_top_image"><img src={copyNewProduit.urlPhoto} alt="" /></div>
                {(paramGlobal.modeEnCours === "admin" ) && <div className="produit_top_Btn_Supprimer" onClick={handleSupprimeProduit}>X</div>}
                <div className="produit_top_bande_Nouveau"><img src={copyNewProduit.avecpublicite ? "images/new.png" : ""} alt="" /></div>
                <div className="produit_top_bande_Epuise"><img src={copyNewProduit.enstock ? "" : "images/epuise1.png"} alt="" /></div>
            </div>
            <div className="produit_libelle">{copyNewProduit.libelleProduit}</div>
            <div className="produit_bottom">
                <div className="produit_bottom_prix">{copyNewProduit.prixProduit+" "+devise}</div>
                <div className="produit_bottom_Btn_Ajouter" onClick={handleClickAjouter}>Ajouter</div>
            </div>
        </div>
     );
}
 
export default Produit;