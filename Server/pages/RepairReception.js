import React,{useState, useCallback} from "react";
import RepairHeader from "../components/RepairHeader"
import styled from "styled-components";
import COLOR from "../constants/color";
import store from "../store/store";
import Select from "react-select"
import ip from "../constants/ip";
import axios from "axios";
import _ from "lodash"


function RepairReception({options,user}) {
    const option =options.companys
    const email = user.email
    const [selectedCompany,setSelectedCompany] = useState(null)
  
    let selectList = [];
    option.map((item)=>(selectList.push({name:item.headquarter_name,key:item.hq_id})))
    const  selectItems = _.uniqBy(selectList,"key")
    const handleSelect = (e) => {
        setSelectedCompany(e.target.value)
        console.log(selectedCompany)
    };
    const getTargetData = useCallback(async (receiptId) => {
      const { data } = await axios.get(ip+`/api/RepairDetailInfo?code=${receiptId}`);
    })
    return(
        <div>
            <RepairHeader/>
            <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
           <h3>접수</h3><hr/>
               <Container>회사 설정 :
                <select onChange={(e)=>handleSelect(e)}  style={{marginLeft:10,marginRight: 10}} >
                {selectItems.map((item) => (
                    <option value={item.key} key={item.key}>
                    {item.name}
                    </option>
                ))}
                </select>
               
                
            
            서비스 카드 번호 : 
                <input style={{marginLeft:15}}></input> <button 
                    style={{width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                    onClick={()=>{console.log("0000")}}
                    >확인</button>  
                 </Container> 
               <h6>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</h6>

           
            오늘의 접수 예정
            <br></br>
            </div>
            
            
            
            <style jsx>{
                `
                p {
                    padding : 0px 100px 0px 100px;
                }

                h6 {
                    color : red;
                }
                `
            }
            </style>
        </div>
    )
}


export const getServerSideProps = async (ctx) => {
  const {
    data: { isAuthorized, user },
  } = await axios.get(
    `${process.env.API_URL}/auth`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie || {},
          },
        }
      : {}
  );
  const {email :email} =user
  console.log("email???? ??? ??? "+email)
  const [companys] = await Promise.all([
    axios.get(ip+`/api/auth/repair?email=${email}`)
    .then(({ data }) => data.data)
  ]) 
  console.log(companys)
  return {
    props: {
      user,
      options:{
        companys : companys 
      }
    }
      
  };
};

export default  repairReception;



const SearchButton = styled.div`
    margin:5px;
    background-color: transparent;
    height: 30px;
    width:40px;
    padding: 2px 5px;
    text-align: center;
    border: 2px solid ${COLOR.BLACK};
    color: ${COLOR.BLACK};
    border-radius: 10px;
    cursor: pointer;
    margin-right: 15%;

  &: hover {
    background-color: ${COLOR.MENU_SELECTED};
  }
`;
const Container = styled.div`
    display:flex; 
    height: 40px;
    align-items: flex-start;
`