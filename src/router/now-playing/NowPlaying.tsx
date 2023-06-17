import { useQuery } from "@tanstack/react-query";
import React,{useState} from "react";
import { IAPIResponse, getNowPlaying, makeImagePath } from "../../api";
import { Variants,motion } from "framer-motion";
import { Card, CardContainer } from "../popular/Popular";
import Modal from "../../components/Modal";
import { useLocation } from "react-router-dom";

const NowPlaying = () => {
  const { isLoading, data, status } = useQuery<IAPIResponse>(
    ["nowplay"],
    getNowPlaying
  );
  const [selectedId,setSelectedId]=useState(-1)
  const location=useLocation()
  
  const containerVariants:Variants={
    initial:{scale:0.5,opacity:0},
    animate:{ scale:1,opacity:1,
      transition: {
        when:"beforeChildren",
        type: "spring",
        duration: 0.5,
        bounce: 0.5,
        delayChildren: 0.5,
        staggerChildren: 0.2,
      }},
    exit:{},
    
  }
  const cardVariants:Variants={
    initial:{y:20,opacity:0},
    animate:(custom)=>({ y:0,opacity:1,transition:{delay:0.1*custom,duration:0.5}}),
    
  
  }
  
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
   <CardContainer variants={containerVariants} initial="initial" animate="animate" >
  {isLoading?null:<>{data?.results.map((result, idx) => (
        
        <Card onClick={()=>setSelectedId(result.id)} key={"coming"+result.id}  layoutId={`selected${location.pathname+result.id}`}  variants={cardVariants} initial="initial" animate="animate" custom={idx}>
          <div className="poster">
            <motion.img  src={makeImagePath(result.poster_path)} alt="poster"  whileHover={{y:-20}}  />
          </div>
          <div className="title">
            <h3>{result.title}</h3>
          </div>
        </Card>
      
      ))}</>}
  
      
        </CardContainer>
        {selectedId>=0?
        <Modal setSelectedId={setSelectedId} selectdId={selectedId}/>
        
        :null}
   </div>
  );
};

export default NowPlaying;
