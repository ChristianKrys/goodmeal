import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

const IdentificationForm = () => {

    const {paramGlobal,setParamGlobal} = useContext(GlobalContext);
    const {actionEncours,devise,displayFooter,produitEncours,commandeEnCours,utilisateurEnCours,listeProduit,modeEnCours,authentificationEnCours} = paramGlobal;
    //const {tableArticle,idClient,statutCommande,dateCommande,heureCommande} = {...commandeEnCours};

    const handleFermer = ()=>{setParamGlobal({...paramGlobal,authentificationEnCours:false})}
    const handleSubmit = ()=>{setParamGlobal({...paramGlobal,authentificationEnCours:false})}
    return ( 
        <>
            <form action="" className="formId" onSubmit={handleSubmit}>
                <fieldset className="formId_fieldset">                    
                    <legend>IDENTIFICATION</legend>
                    <div className="formId_data">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" id="login" className="formId_login"/>
                        <label htmlFor="login">Mot de passe</label>
                        <input type="password" name="pwd" id="pwd" className="formId_pwd"/>
                        <div className="formId_frame_Btn">
                            <input type="submit" value="Connecter" className="formId_Btn_Submit"/>
                            <button type="text" className="formId_Btn_Fermer" onClick={handleFermer}>Fermer</button>
                        </div>
                        <small className="formId_small">Mot de passe oublié</small>
                    </div>
                </fieldset>
            </form>
        </>
     );
}


 
export default IdentificationForm;