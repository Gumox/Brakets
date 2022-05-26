import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import _ from "lodash";
import List from "./List";


const StaffList = ({user,infos,brands,staffs =[]}) => {

    
    const [searchStaff,setSearchStaff] = useState(getStaffList(staffs))
    
    const [actionView,setActionView] = useState(null)

    const [staffName,setStaffName] = useState("")

    const staffParse=(name)=>{
        if(name !==""){
            let filt = _.filter(staffs,function(obj){
              return obj.staff_name.indexOf(name) !== -1;
            })
            setSearchStaff(getStaffList(filt))
        }else{
            setSearchStaff(getStaffList(staffs))
        }

    }
    const nameKeyPress = useCallback((e)=>{
        if(e.key === "Enter"){
            staffParse(staffName)
        }
    },[staffName])
    
    return(
        <Wrapper>
          {!actionView &&
            <div>
              <SearchStaffBar>
                <SearchStaffBarHeader >
                    직원 이름
                </SearchStaffBarHeader>
                
                <input value={staffName} style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,flex:0.6 ,fontSize:"16px"}} 
                    onKeyPress={(e)=>{nameKeyPress(e)}} onChange={(e)=>{setStaffName(e.target.value)}}/>

                <SearchStaffBarButton onClick={()=>{staffParse(staffName)}}>
                    <SearchImage  src="/icons/search.png"/>
                </SearchStaffBarButton>
                </SearchStaffBar>
            
                    <h2 style={{marginLeft:20}}>직원 목록</h2>
                <InputTableBox>
                    <PrView>
                        
                        <HeaderCell>
                            직원
                        </HeaderCell>

                        <HeaderCell>
                            담당 브랜드
                        </HeaderCell>

                        <HeaderCell>
                            Kakao 계정
                        </HeaderCell>

                        

                        <HeaderCell>
                            직원 연락처
                        </HeaderCell>
                        <HeaderCell>
                            E-mail
                        </HeaderCell>
                        
                        <HeaderCell>
                            상태
                        </HeaderCell>
                        
                        <HeaderCell style={{color: COLOR.RED}}>
                            
                        </HeaderCell>
                    </PrView>
                    <List staffs={sortStaff(searchStaff)} setActionView={setActionView} user={user}/>
                  
              </InputTableBox>
            </div>
            }
            {
              actionView && actionView
            }
        </Wrapper>
    );
};

const sortStaff = (staffs) => {
    let sortByStore = _.sortBy(staffs,"store_name")
    let sortByStaff = _.sortBy(sortByStore,"staff_code")
    return(sortByStaff)
}

const getStaffList =(arr) =>{
    let result = []
    if(arr.length > 0){
        let keys = _.uniqBy(arr,"staff_id")
        
        keys.map((item)=>{
            let inArr = _.filter(arr,{ 'staff_id': item.staff_id})
            result.push(inArr)
        })
    }

    return(result)
}

const staffNameParser=(staffs,name)=>{
    if(name !==""){
        let filt = _.filter(staffs,function(obj){
          return obj.staff_name.indexOf(name) !== -1;
        })
        return(filt)
    }else{
        return(staffs)
    }

}

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    border-radius:10px;
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