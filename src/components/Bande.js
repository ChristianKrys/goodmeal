import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";

const Bande = ({position}) => {
    

    const [bande,setBande] = useState(position);

    const top_band = (
        <div className="lef_container_top">
            <div className="lef_container_top_lib">TOTAL : </div>               
            <div className="lef_container_top_total">37,70 £</div>
            <span className="material-symbols-outlined">shopping_cart</span>            
        </div>);

    const bottom_band = (
        <div className="lef_container_bottom">
            <div className="lef_container_bottom_message">Bonnne réjouissance !!!</div>
            <div className="lef_container_bottom_design_by"><small>Designed by eencsoft</small></div>
        </div>
    )
 

    useEffect(() => {
        setBande(position);        
    }, []);

    return ( 
        <>
            {bande==='top' && top_band}
            {bande==='bottom' && bottom_band}         
        </>        
     );
}
 
export default Bande;