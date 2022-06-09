import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import { useRouter } from "next/router";
import axios from "axios";
import remakeCallNumber from "../../../../functions/remakeCallNumber";
import PostCode from "../storeEachRegist/PostCode";
import SearchFocus from "./SearchFocus";
import checkDuplicate from "../storeEachRegist/checkDuplicate";
import getNextStoreCode from "../storeEachRegist/getNextStoreCode";
import { checkAccount,checkPhone,checkEmail } from "../checkDuplicateManagerInfo";

import Popup from 'reactjs-popup';

const StoreModify = ({
    infos,
    brands,
    user,
    stores,
    item,
    cancel=()=>{}
}) =>{
    const router = useRouter();

    const brandId = item.brand_id
    const [parseToBrand,setParseToBrand]=useState(brands[0].brand_id)
    
    const [storeCode,setStoreCode]=useState(false)
    const [mailBagUseable,setMailBagable]=useState(item.use_mailbag)
    
    
    const [duplicateCheck,setDuplicateCheck]=useState(false)
    const [duplicateCheckText,setDuplicateCheckText]=useState("입력")
    const [duplicateCheckTextColor,setDuplicateCheckTextColor]=useState(COLOR.TEXT_MAIN)
    const [duplicateAlertColor,setDuplicateAlertColor]=useState(COLOR.BLACK)
    const [storeName,setStoreName]=useState(null)
    const [storeContact,setStoreContact]=useState(null)
    
    
    const [postCodeOn,setPostCodeOn]=useState(false)
    const [address,setAddress]=useState(null)
    const [addressChange,setAddressChange]=useState(false)


    const [detailAddress,setDetailAddress]=useState(null)

    const [registedManagerUse,setRegistedManagerUse]= useState(true)
    const [isNewManager,setIsNewManager]= useState(true)

    
    const [managerState,setManagerState]=useState(item.staff_state)
    
    const [managerName,setManagerName]=useState(null)
    const [managerAccount,setManagerAccount]=useState(null)
    const [managerPhone,setManagerPhone]=useState(null)
    const [managerEmail,setManagerEmail]=useState(null)
    const [managerId,setManagerId]=useState(item.staff_id)


    const [managerSearchList,setManagerSearchList] = useState([])


    const [isFocus,setIsFocus] = useState(false);
    const [focusingView,setFocusingView] = useState(false);

    const focusHandler =(view)=>{
        setFocusingView(view)
        if(view){
            setIsFocus(true)
        }else{
            setIsFocus(false)
        }
    }

    const getCode=(value)=>{
        
        const brandName = String((_.find(brands,{brand_id:Number(value)})).brand_name).replace(/ /g,"_")

        const parse = _.filter(stores,{brand_id:Number(value)})
        setParseToBrand(parse)
        if(getNextStoreCode(stores) !== "over staff"){
            setStoreCode(`S.${brandName}.${getNextStoreCode(parse)}`)
        }else{
            alert("직원 수가 허용치를 넘어 갔습니다 서비스 관리자에게 연락해 주시길 바랍니다")
        }
    }

    const selectManagerHandler =(value,tof)=>{
        
        if(tof){
            console.log("8520")
            console.log(value)
            let item = _.find(managerSearchList,{staff_phone:value})

            setManagerName(item.staff_name)
            setManagerAccount(item.staff_account)
            setManagerPhone(remakeCallNumber(value))
            setManagerEmail(item.staff_email)
            setManagerId(item.staff_id)
        }else{
            setManagerName(null)
            setManagerAccount(null)
            setManagerPhone(null)
            setManagerEmail(null)
            setManagerId(null)
        }
    }
    const managerChangeHandler = (value)=>{
        registedManagerUseHandler(value)
        if(!value){
            setManagerName(null)
            setManagerAccount(null)
            setManagerPhone(null)
            setManagerEmail(null)
            setManagerId(null)
        }else{
            setIsNewManager(false)
            setManagerName(item.staff_name)
            setManagerAccount(item.staff_account)
            setManagerPhone(item.staff_phone)
            setManagerEmail(item.staff_email)
            setManagerId(item.staff_id)
        }
    }

    const registedManagerUseHandler =(value)=>{

        setRegistedManagerUse(value)

        setManagerName(null)
        setManagerAccount(null)
        setManagerPhone(null)
        setManagerEmail(null)
        setManagerId(item.staff_id)

    }
    const modifyStore = async()=>{
        
        if(!duplicateCheck){

            const data ={

                storeId : item.store_id,
                storeName : storeName|| item.store_name,
                useMailbag : mailBagUseable || item.use_mailbag,
                contact : storeContact || item.contact,
                address : address || item.address,
                
                managerStoreId : item.staff_store_id,
        
                isManagerChange : !registedManagerUse,
                
                isNewManager : isNewManager,
                
                managerAccount : managerAccount ,

                managerEmail :managerEmail ,
                managerName :managerName ,
                managerPhone : managerPhone ,
        
                managerState : managerState,
        
                managerId :managerId || item.staff_id
            }

            if(isNewManager){
                console.log("??")
                const isAccount =await checkAccount(managerAccount)
                const isPhone = await checkPhone(managerPhone) 
                const isEmail = await checkEmail(managerEmail) 
                if(!isAccount && !isPhone && !isEmail){
                    const [result] = await Promise.all([
                        axios
                        .post(`${process.env.API_URL}/store/modify`,data)
                        .then(({ data }) => data.body), 
                        ])
                    
                        alert("매장 정보가 수정 되었습니다.")
                        window.location.reload()

                }else if(isAccount){
                    alert("신규 매니저 계정 중복")
                }else if(isPhone){
                    alert("신규 매니저 연락처 중복")
                }else if(isEmail){
                    alert("신규 매니저 이메일 중복")
                }
            }else{
                
                const [result] = await Promise.all([
                    axios
                    .post(`${process.env.API_URL}/store/modify`,data)
                    .then(({ data }) => data.body), 
                    ])
                
                    alert("매장 정보가 수정 되었습니다.")
                    window.location.reload()
                
            }
            

            
        }else{
            alert("사용 불가능한 매장명 입니다")
        }
    }
    const emptySpace =(str)=>{
        let name = ""
        for(let i =0; i<str.length;i++){
            if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
                name += "_"
            }else if(str[i] !== " " && str[i]){
                name += str[i]
            }
        }
        return(String(name).replace(/_/g," "))
        
    }
    const storeNameHandler = (value)=>{

        let regExp =  /^[a-zA-Zㄱ-힣0-9\s]*$/gi; 

        let insertedValue = value

        if( !regExp.test(insertedValue) ){

            alert("특수문자는 입력하실수 없습니다.");
       
            insertedValue = insertedValue.substring( 0 , insertedValue.length - 1 ); 
       
         }

        if(insertedValue.length>0){
            const check = checkDuplicate(parseToBrand,insertedValue,item.store_name)
            setStoreName(insertedValue)
            setDuplicateCheck(check)
            if(check){
                setDuplicateCheckText("사용불가")
                setStoreName(insertedValue)
                setDuplicateCheckTextColor(COLOR.RED)
                setDuplicateAlertColor(COLOR.RED)
            }else{
                setDuplicateCheckText("사용가능")
                setStoreName(insertedValue)
                setDuplicateCheckTextColor(COLOR.CYAN_BLUE)
                setDuplicateAlertColor(COLOR.BLACK)
            }
        }else{
            setDuplicateCheckText("입력")
            setDuplicateCheckTextColor(COLOR.TEXT_MAIN)
            setStoreName(insertedValue)
        }
    }
    
   /* useEffect(()=>{
        let searchList =[]
        managerList.map((item)=>{
            let listPush = item
            listPush["search_text"] = `${item.staff_name}  (${remakeCallNumber(item.staff_phone)})`;
            searchList.push(listPush)
        })
        setManagerSearchList(searchList)
    },[])*/

    useEffect(()=>{
        getCode(brandId)
    },[brandId])

    useEffect(()=>{
        const getManagerList = async()=>{
            const [result] = await Promise.all([
              axios
              .get(`${process.env.API_URL}/staff?level=${2}&staffCode=${"A"}`,)
              .then(({ data }) => data.data), 
              ])
    
              let searchList =[]
              
    
              result.map((item)=>{
                  console.log(item)
                  let listPush = item
                  listPush["search_text"] = `${item.staff_name}  (${remakeCallNumber(item.staff_phone)})`;
                  searchList.push(listPush)
              })
              
              const managerList = _.uniqBy(searchList,"search_text")
    
              setManagerSearchList(managerList)
          }
        getManagerList()
      },[])

    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <div>
                    <h2 style={{marginLeft:"10px"}}>매장 정보</h2>
                    
                    <PrView>
                        
                        <NameBox>
                            브랜드 선택
                        </NameBox>

                        <InputBox style={{fontSize:16,fontWeight:"bold",justifyContent:"center",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            {item.brand_name}
                        </InputBox>

                        <NameBox>
                            매장 코드
                        </NameBox>

                        <InputBox style={{fontSize:16,fontWeight:"bold",justifyContent:"center",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            {item.store_code}
                        </InputBox>
                    </PrView>
                    <PrView>
                        
                        <NameBox>
                            매장명
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,alignItems:"center"}}>
                            <div style={{width:"80px",display:"flex",justifyContent:"center",alignItems:"center",height:"40px",color:duplicateCheckTextColor}}>{duplicateCheckText}</div>
                            <InputLine style={{fontSize:"15px",paddingLeft:"10px",height:"40px",color:duplicateAlertColor,borderBottom:"2px solid #666666",flex:1,marginRight:20}} placeholder={item.store_name} value={storeName || ""} onChange={(e)=>{storeNameHandler(e.target.value)}}/>
                        </InputBox>

                        <NameBox>
                            매장 구분
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            {item.store_category === 1 && <InputLine disabled style={{backgroundColor:COLOR.WHITE,paddingLeft:0,fontSize:16,textAlign:"center",flex:1,color:COLOR.DARK_INDIGO,fontWeight:"bold"}}  value={"정상"} onChange={(e)=>{setManagerName(e.target.value)}}/>}
                            {item.store_category === 2 && <InputLine disabled style={{backgroundColor:COLOR.WHITE,paddingLeft:0,fontSize:16,textAlign:"center",flex:1,color:COLOR.DARK_INDIGO,fontWeight:"bold"}}  value={"상설"} onChange={(e)=>{setManagerName(e.target.value)}}/>}
                        </InputBox>
                    </PrView>
                    <PrView>
                        
                        <NameBox>
                            매장 연락처
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine style={{fontSize:15,textAlign:"center",flex:1}} placeholder={`현재)   ${item.contact}`} value={storeContact || ""} onChange={(e)=>{setStoreContact(e.target.value)}}/>
                        </InputBox>

                        <NameBox>
                            행낭사용여부
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <select value={mailBagUseable} style={{flex:1,border:0,paddingLeft:140,fontSize:16}} onChange={(e)=>{ setMailBagable(e.target.value) }}>
                                <option value={1}>사용 함</option>
                                <option value={0}>사용 안함</option>
                            </select>
                        </InputBox>
                    </PrView>
                    <PrView style={{height:"160px"}}>
                        
                        <NameBox style={{height:"160px"}}>
                            <div>매장 주소</div>
                        </NameBox>

                        <LongInputBox style={{border:`2px solid ${COLOR.LIGHT_GRAY}`,borderLeft:0,height:"160px",flexDirection:"column"}}>

                            <PrView style={{height:"40px"}}>

                                <CenterView style={{margin:"10px"}}>
                                    <CheckBox checked={!addressChange} type={"checkbox"} onChange={()=>{setAddressChange(false)}}/>
                                    <div style={{fontSize:"13px",marginLeft:"5px"}}>현재 주소 사용</div>
                                </CenterView>
                                <CenterView style={{margin:"15px"}}>
                                    <CheckBox checked={addressChange} type={"checkbox"} onChange={()=>{setAddressChange(true)}}/>
                                    <div style={{fontSize:"13px",marginLeft:"5px"}}>주소 변경</div>
                                </CenterView>

                            </PrView>
                            
                            { addressChange ?
                                <div style={{flex:1,display:"flex",flexDirection:"column"}}>
                                    <InColViewV2 style={{flex:1}}>
                                        <input value={address || ""} placeholder={"주소"} readOnly style={{flex:1 ,padding:"8px"}} onClick={()=>{setPostCodeOn(true)}}/>
                                    </InColViewV2>
                                    <InColViewV2 style={{flex:1}}>
                                        <input  value={detailAddress || ""} placeholder={"상세 주소"}  style={{flex:1 ,padding:"8px"}} onChange={(e)=>{setDetailAddress(e.target.value)}}/>
                                    </InColViewV2>
                                </div>
                                :
                                <div style={{flex:1,display:"flex",flexDirection:"column"}}>
                                    
                                    <div style={{flex:1,display:"flex",fontSize:"14px"}}>
                                        <textarea readOnly value={item.address} style={{flex:1,resize:"none" ,padding:"8px",border:0,backgroundColor:COLOR.WHITE}}/>
                                    </div>
                                </div>
                            }
                        </LongInputBox>

                    </PrView>
                
                </div>

                {<div style={{marginTop:20,display:"flex",justifyContent:"space-between"}}>
                    <h2 style={{marginLeft:"10px"}}>매니저 정보</h2>
                    <PrView style={{minWidth:0}}>
                        <CenterView style={{margin:10}}>

                            <CheckBox type="checkbox" checked={!registedManagerUse} onChange ={()=>{managerChangeHandler(!registedManagerUse)}}/>
                            <div style={{marginLeft:"10px",marginRight:"20px"}}>매니저 변경</div>

                        </CenterView>
                    </PrView>
                </div>}

                {registedManagerUse ?
                    <div style={{marginTop:5}}>
                        <PrView>
                            
                            <NameBox style={{backgroundColor:COLOR.MENU_MAIN}}>
                                <ColView>
                                    <InColView> 매장 매니저 </InColView>
                                </ColView>
                            </NameBox>
                            
                            <InputBox style={{borderLeft:`2px solid ${COLOR.MENU_MAIN}` ,fontSize:16,fontWeight:"bold",justifyContent:"center",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                {item.staff_name || ""} 
                            </InputBox>
                            
                            <NameBox style={{backgroundColor:COLOR.WHITE,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                
                            </NameBox>
                            <InputBox style={{borderLeft:0 , borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                
                            </InputBox>
                        </PrView>
                        <PrView>
                            
                            <NameBox>
                                <ColView>
                                    <InColView> 매니저 </InColView>
                                    <InColView> kakao 계정 </InColView>
                                </ColView>
                            </NameBox>
                            
                            <InputBox style={{fontSize:16,fontWeight:"bold",justifyContent:"center",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                {item.staff_account || ""}
                            </InputBox>

                            <NameBox>
                                <ColView>
                                    <InColView> 상태 </InColView>
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,justifyContent:"center"}}>
                                <PrView style={{minWidth:"150px"}}>

                                    <CenterView style={{margin:"10px"}}>
                                        <CheckBoxCyan checked={managerState} type={"checkbox"} onChange={()=>{setManagerState(true)}}/>
                                        <div style={{fontSize:"13px",marginLeft:"5px",color:COLOR.CYAN_BLUE}}>ON</div>
                                    </CenterView>
                                    <CenterView style={{margin:"15px"}}>
                                        <CheckBoxRed checked={!managerState} type={"checkbox"} onChange={()=>{setManagerState(false)}}/>
                                        <div style={{fontSize:"13px",marginLeft:"5px" ,color:COLOR.RED}}>OFF</div>
                                    </CenterView>

                                </PrView>
                            </InputBox>
                            
                        </PrView>

                        <PrView>
                            
                            <NameBox>
                                <ColView>
                                    <InColView> 매니저 연락처 </InColView>
                                    <InColView>( 전화 번호 ) </InColView>    
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine disabled={!registedManagerUse} style={{fontSize:15,textAlign:"center",flex:1}} placeholder={item.staff_phone} value={managerPhone || ""} onChange={(e)=>{setManagerPhone(e.target.value)}}/>
                                
                            </InputBox>

                            <NameBox>
                                <ColView>
                                    <InColView> 매니저 </InColView>
                                    <InColView> E-mail </InColView>    
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine disabled={!registedManagerUse} style={{fontSize:15,textAlign:"center",flex:1}} placeholder={item.staff_email} value={managerEmail || ""} onChange={(e)=>{setManagerEmail(e.target.value)}}/>
                            </InputBox>
                        </PrView>

                        
                    
                    </div>
                    :
                    <div style={{position:"relative"}}>
                    
                        <PrView>
                            
                            <NameBox>
                                <ColView>
                                    <InColView> 매장 매니저 </InColView>
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                
                                {
                                    <SearchFocus managerList={managerSearchList} name={managerName} setName={setManagerName} handler={selectManagerHandler} checkNewManager ={setIsNewManager}/>
                                }
                                
                                
                            </InputBox>

                            <NameBox>
                                <ColView>
                                    <InColView> 매니저 </InColView>
                                    <InColView> kakao 계정 </InColView>
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine  style={{fontSize:15,textAlign:"center",flex:1}} placeholder="ex) example@kakao.com" value={managerAccount || ""} onChange={(e)=>{setManagerAccount(e.target.value)}}/>
                            </InputBox>
                        </PrView>

                        <PrView>
                            
                            <NameBox>
                                <ColView>
                                    <InColView> 매니저 연락처 </InColView>
                                    <InColView>( 전화 번호 ) </InColView>    
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine  style={{fontSize:15,textAlign:"center",flex:1}} placeholder="ex) 000-0000-0000" value={managerPhone || ""} onChange={(e)=>{setManagerPhone(e.target.value)}}/>
                                
                            </InputBox>

                            <NameBox>
                                <ColView>
                                    <InColView> 매니저 </InColView>
                                    <InColView> E-mail </InColView>    
                                </ColView>
                            </NameBox>

                            <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                                <InputLine  style={{fontSize:15,textAlign:"center",flex:1}} placeholder="ex) example@kakao.com" value={managerEmail || ""} onChange={(e)=>{setManagerEmail(e.target.value)}}/>
                            </InputBox>
                        </PrView>
                        
                        {
                            isFocus && focusingView
                        }
                
                    </div>
                    
                }
                
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{modifyStore()}}>
                            수정
                        </RegistButton>

                        <RegistButton style={{backgroundColor:COLOR.RED}} onClick={()=>{cancel()}}>
                            취소
                        </RegistButton>
                    </CenterView>
                
            </InsideWrapper>

            
            {postCodeOn && <PostCode setAddress={setAddress} setPostCodeOn={setPostCodeOn}/>}
        </Wrapper>
    );
};


const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    display:flex;
    min-width:750px;
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColViewV2  = styled.div`
    display:flex;
    font-size:14px;
    padding:10px;
    align-items:center;
`;
const InColView  = styled.div`
    display:flex;
    font-size:14px;
    justify-content:center;
    align-items:center;
`;
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
const InsideWrapper  = styled.div`
    display:flex;
    width:1000px;
    justify-content:center;
    flex-direction: column;
`;
const PrView  = styled.div`
    min-width:540px;
    display:flex;
    flex-direction:row;
`;

const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;

const TwoNameBox  = styled.div`
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    border-left: 2px solid ${COLOR.LIGHT_GRAY};
    height : 60px;
    width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    color: ${COLOR.DARK_INDIGO};
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    font-size: 18px;
    display:flex;
    justify-content:center;
    width:210px;
`;
const LongInputBox  = styled.div`
    height : 60px;
    width:855px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-bottom:0;
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:18px;

`;
const InputLine  = styled.input`
    border 0px;
    padding-left:10px;
    font-size:20px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }

`;

const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`
const CheckBoxCyan= styled.input `
    appearance: none;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.CYAN_BLUE};
        border-radius: 10px;
    }
`;
const CheckBoxRed = styled.input `
    appearance: none;
    display: inline-block;
    width: 18px;
    height: 18px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.RED};
        border-radius: 10px;
    }

`


export default StoreModify