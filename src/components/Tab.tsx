import React from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Ul = styled.ul`
  display: flex;
  width: 40%;
  justify-content: space-between;
`;
const Li = styled.li`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  & > a {
    color: inherit;
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Circle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #850b0b;
`;

const Tab = () => {
  const popularMatch = useMatch("/") !== null ? true : false;
  const csMatch = useMatch("/coming-soon") !== null ? true : false;
  const npMatch = useMatch("/now-playing") !== null ? true : false;

  return (
    <Container>
      <Ul>
        <Li>
          <Link to={"/"}>POPULAR</Link>
          {popularMatch ? (
            <motion.div layoutId="underling">
              <Circle />
            </motion.div>
          ) : null}
        </Li>
        <Li>
          <Link to={"/coming-soon"}>COMING SOON</Link>
          {csMatch ? (
            <motion.div layoutId="underling">
              <Circle />
            </motion.div>
          ) : null}
        </Li>
        <Li>
          <Link to={"/now-playing"}> NOW PLAYING</Link>
          {npMatch ? (
            <motion.div layoutId="underling">
              <Circle />
            </motion.div>
          ) : null}
        </Li>
      </Ul>
    </Container>
  );
};

export default Tab;
