import { useContext, useEffect, useState } from "react"
import GlobalContext from "../contexts/GlobalContext"

const Article = ({newArticle}) => {

    //------ Prend en entrée un article du panier, l'affiche et modifie l'état du panier dans paramGlobal ----
/*     const globalStore = {
        actionEncours:'',
        devise:'£';
        displayFooter:false, 
        produitEncours:{...emptyProduit},               
        commandeEnCours : {...commande},
        utilisateurEnCours : {...utilisateur}
    } */
    const emptyProduit = {
        urlPhoto:'images/frite.jpg',
        libelleProduit:'NEW YORK FRITS',
        prixProduit:3.10,
        enstock:true,
        avecpublicite:true,
        description:'Les frites de New York',
        codeProduit:''
    } 
    const article = {
        quantiteArticle : 0,
        produit : {...emptyProduit}
    }
    const commande = {
        tableArticle : [],
        idClient : 0,
        statutCommande : '',
        dateCommande : null,
        heureCommande : null
    }

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours} = paramGlobal;
    const [articleEnCours,setAaticleEnCours] = useState({...article,...newArticle});

    const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    const [quantiteArticleEnCours,setQuantiteArticleEnCours] = useState({quantie:0,index:-1});
    
    function handleQuantiteArticleEnCours(type){
        
        let quantie = quantiteArticleEnCours.quantie
        let index = quantiteArticleEnCours.index

        //------ type=1 augmenter sinon diminuer ----------
        if(type===1) 
        {
            quantie += 1;
            setQuantiteArticleEnCours({quantie:quantie,index:index});             
        }else{
            quantie -= 1;
            if(quantiteArticleEnCours.quantie > 0){setQuantiteArticleEnCours({quantie:quantie,index:index});}
        }
        if(index > -1){            
            tableArticle[index].quantiteArticle = quantie;
            let updateCommande = {...commande};
            updateCommande = {...commandeEnCours,tableArticle:tableArticle}
        }
    }
    
    useEffect(() => {
        
        let articleEnEntree = article;
        articleEnEntree = {...articleEnEntree,...newArticle}; 
              
        if(articleEnEntree.produit.codeProduit === ''){return}
        
        setAaticleEnCours({...articleEnEntree});        

        let quantiteArticle = 0;
        let indexArticle = -1;
        tableArticle.forEach(element => {
            if(element.produit.codeProduit === articleEnEntree.produit.codeProduit){
                //------ verification de la présence de articleEnEntree dans commandeEnCours
                quantiteArticle += element.quantiteArticle;
                indexArticle += 1;
            }
        });
        if(indexArticle > -1){
            //----- articleEnEntree est dejà présent dans commandeEnCours --------
            quantiteArticle += 1;
            setQuantiteArticleEnCours({quantie:quantiteArticle,index:indexArticle});
        } else{
            setQuantiteArticleEnCours({quantie:1,index:-1});
        }      
        
    }, [paramGlobal]);

    return ( 
        ((articleEnCours.produit.codeProduit!=='') && (quantiteArticleEnCours.quantie > 0) &&
        <div className="article">
            <div className="article_image"><img src={articleEnCours.produit.urlPhoto} alt="" /></div>
            <div className="article_middle">
                <div className="article_middle_libelle">{articleEnCours.produit.libelleProduit}</div>
                <div className="article_middle_price">{articleEnCours.produit.prixProduit+" "+devise}</div>
            </div>
            <div className="article_left">
                <span onClick={()=>{handleQuantiteArticleEnCours(1)}} className="material-symbols-outlined article_left_upload">upload</span>
                <div className="article_quantity">{"x "+quantiteArticleEnCours.quantie}</div>
                <span onClick={()=>{handleQuantiteArticleEnCours(0)}} className="material-symbols-outlined article_left_download">download</span>
            </div>                        
        </div>
        )
     );
}
 
export default Article;