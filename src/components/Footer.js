import styled from "styled-components";

const Footer = () =>{

    return (
        <StyledFoot>
            <Content>
                <Text>   Online_Shop </Text>
                {/*<Text> support@onlineshop.com </Text>*/}
            </Content>
        </StyledFoot>
    )
}

export default Footer

const StyledFoot = styled.div`
  max-width: 100%;
  min-width: 700px;
  height: 100px;
  display: flex;
  //margin-top: 5rem;
  justify-content: center;
  align-items: center;
  position: sticky;
  background-color: rgba(6, 29, 79, 0.91);
  box-shadow: rgba(2, 15, 40, 0.91) 0px 1px 29px 0;

  overflow-y: auto;
`
const Content = styled.div`
  color: white;
`;
const Text = styled.p`
    font-size: 25px;
    font-family: "Adobe Ming Std L";
    `