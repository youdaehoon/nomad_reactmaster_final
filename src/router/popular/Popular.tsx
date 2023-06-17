import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BASE_URL, getPopular, makeBgPath, makeImagePath } from "../../api";
import styled from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Modal from "../../components/Modal";
import { useLocation } from "react-router-dom";

interface Data {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const Card = styled(motion.div)`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  & > .poster > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & > .poster {
    width: 10rem;
    height: 15rem;

    border-radius: 1rem;
    overflow: hidden;
  }
  & > .title {
    width: 5rem;

    font-size: 0.5rem;
    & > h3 {
      white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
      overflow: hidden; /* 넘치는 부분을 숨김 */
      text-overflow: ellipsis; /* 생략 부호 "..." 추가 */
    }
  }
`;

export const CardContainer = styled(motion.div)`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  gap: 1rem;

`;


const Popular = () => {
  const { isLoading, data, status } = useQuery<{ results: Data[] }>(
    ["popular"],
    getPopular
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
        
        <Card onClick={()=>setSelectedId(result.id)} key={result.id}  layoutId={`selected${location.pathname+result.id}`}  variants={cardVariants} initial="initial" animate="animate" custom={idx}>
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

export default Popular;
