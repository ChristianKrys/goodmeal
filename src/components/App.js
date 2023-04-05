import Display from "./Display";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalContext from "../contexts/GlobalContext";
import { useEffect, useState } from "react";
import Article from "./Article";
import Bande from "./Bande";
import AffichePanier from "./AffichePanier";

const App = ()=>{
    
    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:0,
        enstock:false,
        avecpublicite:false,
        description:'',
        codeProduit:'',
        id:0
    } 
    const article = {
        quantiteArticle : 0,
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
        prenomUtilisateur : '',
        telephoneUtilisateur : '',
        emailUtilisateur : '',
        addresseUtilisateur : '',
        statutUtilisateur : '',  
        typeCompteUtilisateur : 'visiteur'      
    }

    //statutCommande : livree, nonlivree
    //action : addProduct, modifyProduct, listerCommande
    //typeCompteUtilisateur : visiteur,abonne, administrateur
    //modeEnCours : admin, client

    const globalStore = {
        actionEncours:'',
        devise:'F.cfa',
        displayFooter:false, 
        produitEncours:{...emptyProduit},               
        commandeEnCours : {...commande},
        utilisateurEnCours : {...utilisateur},
        listeProduit : [],
        listeUtilisateur : [],        
        listeCommande : [],
        modeEnCours: 'client',
        authentificationEnCours: false,
        urlServer : 'http://localhost:8001/'
    }

    const [paramGlobal,setParamGlobal] = useState(globalStore);
    const [isLoading,setisLoading] = useState(false);
    const [error,setError] = useState(false);
    const [dataBase,setDataBase] = useState({listeProduit:[],listeClient:[],listeEmployer:[],listeCommande:[]})

    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,modeEnCours,authentificationEnCours,urlServer} = paramGlobal;
    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};
    
    useEffect(() => {

        if(!urlServer) return
        
        let listeProduit = [];        
        let listeUtilisateur = [];
        let listeCommande = [];

        async function fetchData(table){
            
            if (!table) return;

            const url = urlServer+table;
            
            await fetch(url)
            .then((reponse)=>{
                setisLoading(false);
                if(!reponse.ok){
                    throw Error('Désolé, une erreur est survenue');
                }                
                return reponse.json();                
            })
            .then((data)=>{                                             
                if(table === "Produit") listeProduit = data;
                if(table === "Utilisateur") listeUtilisateur = data;                
                if(table === "Commande") listeCommande = data;                              
            })
            .catch((err)=>{
                console.log(err.message);
                setError(true);
            }) 

            setParamGlobal({...paramGlobal,
                listeProduit : listeProduit,
                listeUtilisateur : listeUtilisateur,
                listeCommande : listeCommande
            })                                 
        }

        //--Table : Produit, Client, Employer, Commande
        fetchData("Produit");
        fetchData("Utilisateur");
        fetchData("Commande");                              

    }, []);
    

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