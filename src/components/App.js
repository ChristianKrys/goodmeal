import Display from "./Display";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalContext from "../contexts/GlobalContext";
import { useState } from "react";
import Article from "./Article";
import Bande from "./Bande";

const App = ()=>{
    
    const emptyProduit = {
        urlPhoto:'images/burger.jpg',
        libelleProduit:'Tomate',
        prixProduit:200,
        enstock:true,
        avecpublicite:true,
        description:'La tomate brune',
        codeProduit:'coco'
    } 
    const article = {
        quantiteArticle : 5,
        produit : {...emptyProduit}
    }
    const commande = {
        tableArticle : [article],
        idClient : 0,
        statutCommande : '',
        dateCommande : null,
        heureCommande : null
    }

    const utilisateur = {
        nomUtilisateur : '',
        prenomUtilisateur : '',
        telephoneUtilisateur : '',
        emailUtilisateur : '',
        addresseUtilisateur : '',
        statutUtilisateur : ''
    }

    //statutCommande : livree, nonlivree
    //action : addProduct, modifyProduct
    //statutUtilisateur : client, personnel, administrateur

    const globalStore = {
        actionEncours:'',
        devise:'£',
        displayFooter:false, 
        produitEncours:{...emptyProduit},               
        commandeEnCours : {...commande},
        utilisateurEnCours : {...utilisateur}
    }

    const [paramGlobal,setParamGlobal] = useState(globalStore);
    
    

    return(  
        <GlobalContext.Provider value={{paramGlobal,setParamGlobal}}>
            <div className="app">            
                <Navbar/>            
                <div className="container">
                    <div className="lef_container">                        
                        <Bande position={'top'}/>                        
                        <div className="lef_container_middle">
                            <Article newArticle={article}/>
                            <Article/>
                            <Article/>
                            <Article/>
                            <Article/>
                            <Article/>
                            <Article/>
                            <Article/>
                            <div className="lef_container_Btn_valider_commande">Valider la commande</div>
                        </div>                                             
                        <Bande position={''}/> 
                    </div>
                    <div className="rigth_container">
                        <Display/>
                        <Footer actionEncours="modifyProduct" produitEncours='' />
                    </div>
                    <Bande position={'bottom'}/>
                </div>                
            </div>
        </GlobalContext.Provider>      
    )
}

export default App;