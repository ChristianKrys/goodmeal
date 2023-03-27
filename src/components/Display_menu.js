import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";


const Display_menu = () => {

    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:'',
        enstock:false,
        avecpublicite:false,
        description:''
    }         
    
    //action : addProduct, modifyProduct
    const globalStore = {        
        actionEncours:'',
        produitEncours:{...emptyProduit},
        displayFooter:false
    }

    //action : addProduct, modifyProduct
    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    //const {actionEncours,produitEncours,displayFooter} = paramGlobal;
    
    const valClass = "btn_rigth_container_display_menu";
    const valClass_selected = "btn_rigth_container_display_menu_selected";
    const [derouler,setDerouler] = useState(valClass);
    const [ajouter,setAjouter] = useState(valClass);
    const [modifier,setModifier] = useState(valClass);

    function handleClick(e){
        const targetId = e.target.id;        
        if(targetId.search("derouler") >= 0){
            setDerouler(valClass);
            setAjouter(valClass);
            setModifier(valClass);
            
            setParamGlobal({...paramGlobal,actionEncours:'',displayFooter:false});
        }        
        if(targetId.search("ajouter") >= 0){            
            setDerouler(valClass);
            setAjouter(valClass_selected);
            setModifier(valClass);

            setParamGlobal({actionEncours:'addProduct',displayFooter:true,produitEncours:emptyProduit});
            
        }
        if(targetId.search("modifier") >= 0){
            setDerouler(valClass);
            setAjouter(valClass);
            setModifier(valClass_selected);

            setParamGlobal({...paramGlobal,actionEncours:'modifyProduct',displayFooter:true});
        }        
    }

    useEffect(() => {
        
    }, []);

    return ( 
        <div className="rigth_container_display_menu">                     
            <div id="derouler1" className={derouler+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>                    
                <span id="derouler2" className="material-symbols-outlined">expand_more</span>
            </div>
            <div id="ajouter1" className={ajouter+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>
                <span id="ajouter2" className="material-symbols-outlined">add</span>
                <span id="ajouter3">Ajouter un produit</span>
            </div>
            <div id="modifier1" className={modifier+" btn_rigth_container_display_menu"} onClick={(e)=>{handleClick(e)}}>
                <span id="modifier2" className="material-symbols-outlined">Edit</span>
                <span id="modifier3">Modifier un produit</span>
            </div>
        </div>
     );
}
 
export default Display_menu;