import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React, { KeyboardEvent, useEffect } from 'react'
import styled from 'styled-components'
import { IMovieDetail, getMovie, makeBgPath } from '../api'
import { useLocation, useParams } from 'react-router-dom'
import { formatNumber } from '../lib'


const ModalContainer=styled.div`
background-color: rgba(0,0,0,0.8);
width: 100%;
height: 100%;
position: fixed;
display: flex;
align-items: center;
justify-content: center;
top: 0;

`
const SelectedCard=styled(motion.div)`

width: 60vw;
height: 50vh;
max-width: 30rem;
max-height: 50rem;
background-color: transparent;
position: relative;
background-color: black;
z-index: 9;
overflow-y: auto;

& .content{
    box-sizing: border-box;
    height: 50%;
    display:flex;
flex-direction: column;
justify-content: space-between;
padding: 1rem;

}

&::-webkit-scrollbar{
    width: 0.5rem;
}
&::-webkit-scrollbar-thumb {
  background-color: #fff; /* 스크롤바 썸의 배경색 */
  border-radius: 025rem; /* 스크롤바 썸의 모서리 반경 */
}




&>.close{
  background-color: transparent;
  position: absolute;
  right: 1rem;
  top:1rem
  
  

}
&>.close>button{
  cursor: pointer;
  z-index: 20;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  color:white
  

}
border-radius: 0.5rem;


`


const ImagContainer=styled.div`
width: 100%;
height: 50%;
overflow: hidden;

mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%);


   &>img{
    width: 100%;
  height: auto;
  object-fit: cover; /* 추가된 부분 */

   
   }
`
const Title=styled.h2`
    font-size: 1.5rem;
    font-weight: 500;
  
`
const Desc=styled.p`
margin-top: 2rem;
font-size: 1rem;



    
`

const InfoContainer=styled.div`
    display: flex;
    padding-top: 1rem;
    border-top: 1px dashed #fff;
    flex-direction: column;
margin-top: 2rem;
    font-size: 0.8rem;
    
`


interface IPops{
    selectdId:number
    setSelectedId:React.Dispatch<React.SetStateAction<number>>
}


const Modal = ({selectdId,setSelectedId}:IPops) => {
    const {data}=useQuery<IMovieDetail>(["selected",selectdId],()=>getMovie(selectdId+""))
    const locattion=useLocation()




    useEffect(() => {
        const handleKeyPress = (event:globalThis.KeyboardEvent) => {
          if (event.key === "Escape") {
            setSelectedId(-1)         
         }
        };
    
        document.addEventListener("keydown",(e)=> handleKeyPress(e));
    
        return () => {
            document.removeEventListener("keydown", (e)=> {});
        };
      }, []);
  return (
    <ModalContainer onClick={(e)=>{ e.preventDefault();e.stopPropagation();setSelectedId(-1)}}>
    <SelectedCard layoutId={`selected${locattion.pathname+selectdId}`}  onClick={(e)=>{ e.preventDefault();e.stopPropagation()}}>
      <ImagContainer >

      <img src={data?makeBgPath(data?.backdrop_path):""} alt='backgroun_img'></img>
      </ImagContainer>
    
      <div className="close"  onClick={(e)=>setSelectedId(-1)}>
      <button  >x</button>
      </div>
      <div className='content'>
        <div>
        <Title>{`${data?.title} `}</Title>
        <Desc>{data?.overview}</Desc>
        </div>
      

        <InfoContainer>
<span>
{`Budget : $${data?.budget&& formatNumber(data.budget)}`}
</span>
<span>
{`Revenue : $${data?.revenue&&formatNumber(data.revenue)}`}
</span>
<span>
{`Runtime : ${data?.runtime} minutes`}
</span>
<span>
{`grade : ${data?.vote_average}`}
</span>
        </InfoContainer>
      </div>
      
    </SelectedCard>
    </ModalContainer>
  )
}

export default Modal