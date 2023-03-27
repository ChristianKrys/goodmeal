import Display from "./Display";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GlobalContext from "../contexts/GlobalContext";
import { useState } from "react";

const App = ()=>{
    
    const emptyProduit = {
        urlPhoto:'',
        libelleProduit:'Tomate',
        prixProduit:'200',
        enstock:true,
        avecpublicite:true,
        description:'La tomate brune'
    } 
    
    //action : addProduct, modifyProduct
    const globalStore = {
        actionEncours:'',
        produitEncours:{...emptyProduit},
        displayFooter:false
    }

    const [paramGlobal,setParamGlobal] = useState(globalStore);
    
    

    return(  
        <GlobalContext.Provider value={{paramGlobal,setParamGlobal}}>
            <div className="app">            
                <Navbar/>            
                <div className="container">
                    <div className="lef_container">
                        <div className="lef_container_top"></div>
                        <div className="lef_container_middle"></div>
                        <div className="lef_container_bottom"></div>
                    </div>
                    <div className="rigth_container">
                        <Display/>
                        <Footer actionEncours="modifyProduct" produitEncours='' />
                    </div>
                </div>
            </div>
        </GlobalContext.Provider>      
    )
}

export default App;