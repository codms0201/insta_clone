import styled, { createGlobalStyle } from "styled-components";
import Menu from '../Components/Menu';


function MainPage() {
  

  return(
    <div>
      <GlobalStyle />
      <Container>
        <MenuWrapper>
          <Menu />
        </MenuWrapper>
      </Container>
      <Line1 />
      <Container2>
        <PostContainer>
          
        </PostContainer>
      </Container2>
    </div>
  );
}

export default MainPage;

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
`

const Container2 = styled.div`
  width: calc(100vw - 251px);
  margin-left: 251px;
  height: 100vh;
  background: #000;
`

const PostContainer=styled.div`
  width: 474px;
  height: auto;
`

const MenuWrapper = styled.div`
  position: fixed;
  width: calc(100% - 60px);
  height: 100vh;
  padding: 50px 30px;
  z-index: 10;
`

const Line1 = styled.div`
  width: 1px;
  height: 832px;
  flex-shrink: 0;
  position: fixed;
  left: 250px;
  background: #262626;
`