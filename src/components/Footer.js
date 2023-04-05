import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";

const Footer = () => {
        


    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'',
        prixProduit:'',
        enstock:false,
        avecpublicite:false,
        description:''
    }        

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours:action,produitEncours,displayFooter} = paramGlobal;

    //action : addProduct, modifyProduct
    const [product,setProduct] = useState({...emptyProduit,...produitEncours});
    //const [action,setAction] = useState(actionEncours);
    

    function handleChange(e){
        const target = e.target;        

        if(target.name === "urlPhoto"){
            //----- Récupération de l'objet à prévisualiser,Selection du premier fichier e.target.files[0], vue que multiple={false} dans <input> -------            
            //setUrlPicture(URL.createObjectURL(e.target.files[0])); 
            const urlObj = URL.createObjectURL(e.target.files[0]);

            //---- sauvegarde un nom du fichier ------            
            setProduct({...product,[target.name]:urlObj});
                        
        }else{            
            setProduct({...product,[target.name]:target.value});
        }
    }
    

    useEffect(() => {        

        setProduct({...emptyProduit,...produitEncours});

    }, [paramGlobal]); //------ Raffraichir si paramGlobal change ----------


    return ( 
    <>
        {displayFooter && paramGlobal.modeEnCours === "admin" &&
        <div className="rigth_container_footer">                                 
            <form action="">
                <div className="rigth_container_footer_form">
                    <div className="rigth_container_footer_top">
                        <div className="rigth_container_footer_top_image_menu"> 
                            {product.urlPhoto && <div className="cadrePhoto"><img src={product.urlPhoto} alt="" /></div>}                                                       
                        </div>
                        <div className="rigth_container_footer_top_champ">
                            <div className="footer_input rigth_container_footer_top_champ_libelle">
                                <span className="material-symbols-outlined">storage</span>
                                <input onChange={(e)=>{handleChange(e)}} type="text" name="libelleProduit" value={product.libelleProduit}  placeholder="Produit (ex: Super Burger)"/>
                            </div> 
                            <div className="footer_input rigth_container_footer_top_champ_lien">                                                                                                
                                <label htmlFor="urlPhoto">                                                                        
                                    <span className="material-symbols-outlined">photo_camera</span>
                                    <input onChange={(e)=>{handleChange(e)}} type="file" accept="image/*" multiple={false} id="urlPhoto" className="urlPhoto" name="urlPhoto" hidden/>                                    
                                </label>
                                <input onChange={(e)=>{handleChange(e)}} type="text" name="lienUrl" value={product.urlPhoto} placeholder="Lien URL (ex: http://photo.png)" disabled/>
                            </div> 
                            <div className="rigth_container_footer_top_champ_properties">
                                <div className="footer_input rigth_container_footer_top_champ_properties_prix">
                                    <span className="material-symbols-outlined">euro_symbol</span>
                                    <input onChange={(e)=>{handleChange(e)}} type="text" name="prixProduit" value={product.prixProduit} placeholder="Prix"/>
                                </div>
                                <div className="footer_input rigth_container_footer_top_champ_properties_EnStock">
                                    <span className="material-symbols-outlined">home_storage</span>                                     
                                    <select onChange={(e)=>{handleChange(e)}} name="enstock" value={product.enstock}>
                                        <option value={true}>En stock</option>
                                        <option value={false}>Stock épuisé</option>
                                    </select>                                  
                                </div>
                                <div className="footer_input rigth_container_footer_top_champ_properties_pub">
                                    <span className="material-symbols-outlined">campaign</span>                                    
                                    <select onChange={(e)=>{handleChange(e)}} name="avecpublicite" value={product.avecpublicite}>
                                        <option value={false}>Sans pub</option>
                                        <option value={true}>Avec pub</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="rigth_container_footer_top_description">
                            <textarea onChange={(e)=>{handleChange(e)}} name="description" value={product.description} id="description" cols="30" rows="6" placeholder="Description du produit"></textarea>
                        </div>
                    </div>
                    <div className="rigth_container_footer_bottom"> 
                        {action==="modifyProduct" && <div className="rigth_container_footer_bottom_message">Cliquer sur un produit pour le modifier</div>}
                        <input type="submit" className="btn_validation" value={(action==="addProduct")? "Ajouter un nouveau produit":"Enregistrer les modifications"} />
                    </div>
                </div>
            </form>
        </div>
        }
    </>
     );
}
 
export default Footer;