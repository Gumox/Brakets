import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import List from "./List";


const SeasonList = ({user,infos,season,staffs}) => {
    
    console.log(season)
    const [actionView,setActionView] = useState(null)
    
    return(
        <Wrapper>
          {!actionView &&
            <div>
              
            
              <h2 style={{marginLeft:20}}>시즌 목록</h2>
                  <InputTableBox>
                  <PrView>
                      
                      <HeaderCell>
                          브랜드 이름
                      </HeaderCell>

                      <HeaderCell>
                          시즌 이름
                      </HeaderCell>

                      <HeaderCell>
                          시즌 코드
                      </HeaderCell>

                      <HeaderCell>
                          시즌 시작일
                      </HeaderCell>
                      
                      <HeaderCell>
                          시즌 종료일
                      </HeaderCell>

                      {/*<HeaderCell style={{color: COLOR.RED}}>
                          
                      </HeaderCell>*/}
                  </PrView>
              </InputTableBox>
            </div>
            }
                <List season={season}/>
            {
              actionView && actionView
            }
        </Wrapper>
    );
};


const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const SearchStaffBar = styled.div`
    width:540px;
    height:50px;
    margin-bottom:30px;
    display: flex;
    flex-direction : row;
`
const SearchStaffBarHeader = styled.div`
    flex:0.4;
    display:flex;
    font-size:15px;
    font-weight: bold;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 0px 0px 10px;
    justify-content:center;
    align-items:center;
    
`
const SearchStaffBarButton = styled.div`
    flex:0.15;
    background-color :${COLOR.MENU_MAIN};
    border-radius: 0px 10px 10px 0px;
    display: flex;
    justify-content:center;
    align-items:center;
    
`
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:12px;
    justify-content:center;
    align-items:center;
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:1;
    padding:5px;
    /*border:2px solid ${COLOR.BLACK};
    border-left : 0px solid ${COLOR.BLACK};*/
`;

const InputTableBox  = styled.div`
    min-width:750px;
    margin-top:20px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 10px 0% 0%;
`;

const SearchImage =styled.img`
  width:25px;
  height: 25px;
  cursor: pointer;
`;

export default SeasonList