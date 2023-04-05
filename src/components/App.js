import Display from "./Display";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalContext from "../contexts/GlobalContext";
import { useState } from "react";
import Article from "./Article";
import Bande from "./Bande";
import AffichePanier from "./AffichePanier";

const App = ()=>{
    

    const emptyProduit1 = {
        urlPhoto:'images/burger.jpg',
        libelleProduit:'Tomate',
        prixProduit:100,
        enstock:true,
        avecpublicite:true,
        description:'La tomate brune',
        codeProduit:'coco'
    } 

    const emptyProduit2 = {
        urlPhoto:'images/frite.jpg',
        libelleProduit:'NEW YORK FRITS',
        prixProduit:50,
        enstock:true,
        avecpublicite:false,
        description:'Les frites de New York',
        codeProduit:'papa'
    } 

    const emptyProduit3 = {
        urlPhoto:'images/produit2.jpg',
        libelleProduit:'COCKTAIL',
        prixProduit:160,
        enstock:false,
        avecpublicite:false,
        description:'Les frites de New York',
        codeProduit:'hgjjgf'
    } 

    const emptyProduit4 = {
        urlPhoto:'images/produit4.jpg',
        libelleProduit:'Ndjomba Secret',
        prixProduit:1500,
        enstock:true,
        avecpublicite:false,
        description:'La tomate brune',
        codeProduit:'commco'
    } 

    const emptyProduit5 = {
        urlPhoto:'images/produit6.jpg',
        libelleProduit:'Basket',
        prixProduit:50,
        enstock:true,
        avecpublicite:false,
        description:'Les frites de New York',
        codeProduit:'fhhf'
    } 

    const emptyProduit6 = {
        urlPhoto:'images/clou.png',
        libelleProduit:'COCKTAIL',
        prixProduit:160,
        enstock:false,
        avecpublicite:false,
        description:'Les frites de New York',
        codeProduit:'hggf'
    } 

    const initlisteProduit = [emptyProduit1,emptyProduit2,emptyProduit3,emptyProduit4,emptyProduit5,emptyProduit6]

    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:0,
        enstock:false,
        avecpublicite:false,
        description:'',
        codeProduit:''
    } 
    const article = {
        quantiteArticle : 2,
        produit : {...emptyProduit},
        montantTotalParArticle : (quantiteArticle,prixProduit)=>{return quantiteArticle*prixProduit}
    }

    const commande = {
        tableArticle : [],
        idClient : 0,
        statutCommande : '',
        dateCommande : null,
        heureCommande : null,
        montantTotalParCommande : (tableArticle)=>{
                let montant = 0;
                tableArticle.forEach(element => {
                    montant += element.montantTotalParArticle(element.quantiteArticle,element.produit.prixProduit);                    
                 });                           
                return montant;        
        },
    }

    const utilisateur = {
        nomUtilisateur : '',
        prenomUtilisateur : 'Christian',
        telephoneUtilisateur : '',
        emailUtilisateur : '',
        addresseUtilisateur : '',
        statutUtilisateur : '',  
        typeCompteUtilisateur : 'administrateur'      
    }

    //statutCommande : livree, nonlivree
    //action : addProduct, modifyProduct
    //typeCompteUtilisateur : visiteur,abonne, administrateur
    //modeEnCours : admin, client

    const globalStore = {
        actionEncours:'',
        devise:'F.cfa',
        displayFooter:false, 
        produitEncours:{...emptyProduit},               
        commandeEnCours : {...commande},
        utilisateurEnCours : {...utilisateur},
        listeProduit : [...initlisteProduit],
        modeEnCours: 'client',
        authentificationEnCours: false
    }

    const [paramGlobal,setParamGlobal] = useState(globalStore);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,modeEnCours,authentificationEnCours} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};
    
    

    return(  
        <GlobalContext.Provider value={{paramGlobal,setParamGlobal}}>
            <div className="app">            
                <Navbar/>            
                <div className="container">
                    {tableArticle.length > 0 &&<div className="lef_container">                        
                        <Bande position={'top'}/>  
                        <AffichePanier/>                                                                  
                        <Bande position={''}/> 
                    </div>}
                    <div className="rigth_container">
                        <Display/>
                        {!authentificationEnCours && <Footer actionEncours="modifyProduct" produitEncours='' />}
                    </div>
                    {!authentificationEnCours && <Bande position={'bottom'}/>}
                </div>                
            </div>
        </GlobalContext.Provider>      
    )
}

export default App;