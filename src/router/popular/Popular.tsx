import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BASE_URL, getPopular, makeImagePath } from "../../api";
import styled from "styled-components";

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

const Card = styled.div`
  display: flex;
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

const CardContainer = styled.div`
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

  return (
    <CardContainer>
      {data?.results.map((result, idx) => (
        <Card key={result.id}>
          <div className="poster">
            <img src={makeImagePath(result.backdrop_path)} alt="poster" />
          </div>
          <div className="title">
            <h3>{result.title}</h3>
          </div>
        </Card>
      ))}
    </CardContainer>
  );
};

export default Popular;
