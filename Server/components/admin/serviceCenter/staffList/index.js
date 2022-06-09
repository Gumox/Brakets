import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import StaffsList from "./List";


const StaffList = ({user,infos,brands,staffs}) => {
    
    const [searchStaff,setSearchStaff] = useState(staffs)
    
    const [actionView,setActionView] = useState(null)

    const [staffName,setStaffName] = useState("")

    const staffParse=(name)=>{
        if(name !==""){
            let filt = _.filter(staffs,function(obj){
              return obj.staff_name.indexOf(name) !== -1;
            })
            setSearchStaff(filt)
        }else{
            setSearchStaff(staffs)
        }

    }
    
    return(
        <Wrapper>
          {!actionView &&
            <div>
              <SearchStaffBar>
                <SearchStaffBarHeader >
                    직원 이름
                </SearchStaffBarHeader>
                
                <input value={staffName} style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,flex:0.6 ,fontSize:"16px"}} onChange={(e)=>{setStaffName(e.target.value)}}/>

                <SearchStaffBarButton onClick={()=>{staffParse(staffName)}}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchStaffBarButton>
              </SearchStaffBar>
            
              <h2 style={{marginLeft:20}}>서비스 센터 직원 목록</h2>
                  <InputTableBox>
                  <PrView>
                      
                      <HeaderCell>
                        회사 이름
                      </HeaderCell>

                      <HeaderCell>
                        직원 코드
                      </HeaderCell>

                      <HeaderCell>
                        kakao 계정
                      </HeaderCell>

                      <HeaderCell>
                        이름
                      </HeaderCell>

                      <HeaderCell>
                        연락처
                      </HeaderCell>

                      <HeaderCell>
                        E-mail
                      </HeaderCell>
                      
                      <HeaderCell style={{flex:0.6}}>
                          상태
                      </HeaderCell>
                      
                      <HeaderCell style={{color: COLOR.CYAN_BLUE,flex:0.6}}>
                          정보 수정
                      </HeaderCell>
                      
                      <HeaderCell style={{color: COLOR.RED,flex:0.6}}>
                          직원 변경
                      </HeaderCell>
                  </PrView>
                  <StaffsList staffs={searchStaff} setActionView={setActionView} user={user}/>
              </InputTableBox>
            </div>
            }
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
    min-width:1080px;
    margin-top:20px;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    background-color:${COLOR.LIGHT_GRAY};
    border-radius: 10px 10px 0% 0%;
`;

const SearchImage =styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default StaffList