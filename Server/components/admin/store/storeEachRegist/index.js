import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import _ from "lodash";
import { useRouter } from "next/router";
import axios from "axios";
import remakeCallNumber from "../../../../functions/remakeCallNumber";
import PostCode from "./PostCode";
import SearchFocus from "./SearchFocus";
import checkDuplicate from "./checkDuplicate";
import getNextStoreCode from "./getNextStoreCode";
import { checkAccount,checkPhone,checkEmail } from "../checkDuplicateManagerInfo";

const StoreEachRegist = ({infos,brands,user,stores}) =>{
    const router = useRouter();

    const [brandId,setBrandId]=useState(brands[0].brand_id)
    const [parseToBrand,setParseToBrand]=useState(brands[0].brand_id)
    
    const [storeCode,setStoreCode]=useState(false)
    const [storeCategory,setStoreCategory]=useState(1)
    const [mailBagUseable,setMailBagable]=useState(1)
    
    
    const [duplicateCheck,setDuplicateCheck]=useState(true)
    const [duplicateCheckText,setDuplicateCheckText]=useState("입력")
    const [duplicateCheckTextColor,setDuplicateCheckTextColor]=useState(COLOR.TEXT_MAIN)
    const [duplicateAlertColor,setDuplicateAlertColor]=useState(COLOR.BLACK)
    const [storeName,setStoreName]=useState(null)
    const [storeContact,setStoreContact]=useState(null)
    
    
    const [postCodeOn,setPostCodeOn]=useState(false)
    const [address,setAddress]=useState(null)
    const [detailAddress,setDetailAddress]=useState("")

    const [isNewManager,setIsNewManager]= useState(true)
    
    const [managerName,setManagerName]=useState(null)
    const [managerAccount,setManagerAccount]=useState(null)
    const [managerPhone,setManagerPhone]=useState(null)
    const [managerEmail,setManagerEmail]=useState(null)
    const [managerId,setManagerId]=useState(null)

    const managerList = _.uniqBy(stores,"staff_id")

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

    const selectManagerHandler =(value)=>{
        let item = _.find(managerList,{staff_phone:value})
        setManagerName(item.staff_name)
        setManagerAccount(item.staff_account)
        setManagerPhone(remakeCallNumber(value))
        setManagerEmail(item.staff_email)
        setManagerId(item.staff_id)
    }

    const isNewManagerHandler =(value)=>{
        setIsNewManager(value)

        if(value){
            
            setManagerName(null)
            setManagerAccount(null)
            setManagerPhone(null)
            setManagerEmail(null)
            setManagerId(null)

        }else{
            selectManagerHandler(managerList[0].staff_phone)
        }
    }
    const registStore = async()=>{
        
        if(!duplicateCheck&&address&&storeContact&&managerAccount&&managerPhone&&managerName){
            const data ={
                storeName :storeName,
                storeCode :storeCode,
                brandId : brandId,
                store_category :storeCategory,
                useMailbag :mailBagUseable,
                contact : storeContact,
                address : address +" "+detailAddress,
                
                managerAccount :emptySpace(managerAccount || ""),
                managerEmail :emptySpace(managerEmail || ""),
                managerName : emptySpace(managerName || ""),
                managerPhone,
                managerCode : "A",
                managerId
            }
            
            let isAccount = false
            let isPhone = false
            let isEmail = false 
            if(isNewManager){
                isAccount = await checkAccount(managerAccount)
                isPhone = await checkPhone(managerPhone) 
                isEmail = await checkEmail(managerEmail) 
            
            }
            

            if(!isAccount && !isPhone && !isEmail){
                const [result] = await Promise.all([
                    axios
                    .post(`${process.env.API_URL}/store/regist`,data)
                    .then(({ data }) => data.body), 
                    ])
                
                alert("신규 매장이 등록 되었습니다.")
                router.push("/admin/storeControl")

            }else if(isAccount){
                alert("신규 매니저 계정 중복")
            }else if(isPhone){
                alert("신규 매니저 연락처 중복")
            }else if(isEmail){
                alert("신규 매니저 이메일 중복")
            }
            
        }else if(duplicateCheck){
            alert("사용 불가능한 매장명 입니다")
        }else if(!address){
            alert("매장 주소를 입력해 주세요")
        }else if(!storeContact){
            alert("매장 연락처를 입력해 주세요")
        }else if(!managerAccount){
            alert("매니저 카카오 계정을 입력해 주세요")
        }else if(!managerPhone){
            alert("매니저 연락처를 입력해 주세요")
        }else if(!managerName){
            alert("매니저 이름을 입력해 주세요")
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
            insertedValue = String(insertedValue).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim,'') 
            alert("특수문자는 입력하실수 없습니다.");
       
            
            //insertedValue.substring( 0 , insertedValue.length - 1 ); 
       
        }

        if(insertedValue.length>0){
            const check = checkDuplicate(parseToBrand,insertedValue)
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

    useEffect(()=>{
        let searchList =[]
        managerList.map((item)=>{
            let listPush = item
            listPush["search_text"] = `${item.staff_name}  (${remakeCallNumber(item.staff_phone)})`;
            searchList.push(listPush)
        })
        setManagerSearchList(searchList)
    },[])

    useEffect(()=>{
        getCode(brandId)
    },[brandId])


    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <div>
                    <h2 style={{marginLeft:"10px"}}>매장 개별 등록</h2>
                    
                    <PrView style={{borderRadius:"10px 10px 0 0"}}>
                        
                        <NameBox  style={{borderRadius:"10px 0 0 0"}}>
                            브랜드 선택
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <select value={brandId} style={{flex:1,border:0,paddingLeft:50 ,fontSize:15}} 
                                    onChange={(e)=>{
                                        setBrandId(e.target.value)
                                        }}>
                                {
                                    brands.map((item,index)=>(
                                        <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                    ))
                                }
                            </select>
                        </InputBox>

                        <NameBox>
                            매장 코드
                        </NameBox>

                        <InputBox style={{borderRadius:"0 10px 0 0",fontSize:15,fontWeight:"bold",justifyContent:"center",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            {storeCode}
                        </InputBox>
                    </PrView>
                    <PrView>
                        
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            매장명
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,alignItems:"center"}}>
                            <div style={{width:"100px",textAlign:"center",color:duplicateCheckTextColor}}>{duplicateCheckText}</div>
                            <InputLine style={{fontSize:15,paddingLeft:0,textAlign:"center",color:duplicateAlertColor,borderBottom:"2px solid #666666",flex:1,marginRight:20}} placeholder="매장명" value={storeName || ""} onChange={(e)=>{storeNameHandler(e.target.value)}}/>
                        </InputBox>

                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            매장 구분
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <SearchSelect value={storeCategory} style={{flex:1,border:0,paddingLeft:150,fontSize:15}} onChange={(e)=>{ storeCategory(e.target.value) }}>
                                <option value={1}>정상</option>
                                <option value={2}>상설</option>
                            </SearchSelect>
                        </InputBox>
                    </PrView>
                    <PrView>
                        
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            매장 연락처
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine style={{fontSize:15,textAlign:"center",flex:1}} placeholder="매장 연락처 ex) xx-xxxx-xxxx" value={storeContact || ""} onChange={(e)=>{setStoreContact(e.target.value)}}/>
                        </InputBox>

                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            행낭사용여부
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <SearchSelect value={mailBagUseable} style={{flex:1,border:0,paddingLeft:140,fontSize:15}} onChange={(e)=>{ setMailBagable(e.target.value) }}>
                                <option value={1}>사용 함</option>
                                <option value={0}>사용 안함</option>
                            </SearchSelect>
                        </InputBox>
                    </PrView>
                    <PrView style={{height:"120px"}}>
                        
                        <NameBox style={{height:"120px",borderRadius:"0 0 0 10px",borderTop:`2px solid rgb(244,244,244)`}}>
                            {/*<div style={{color:COLOR.RED,marginRight:5}}>*</div>*/} 
                            <div>매장 주소</div>
                        </NameBox>

                        <LongInputBox style={{borderRadius:"0 0 10px 0",border:`2px solid ${COLOR.LIGHT_GRAY}`,borderLeft:0,height:"120px",flexDirection:"column"}}>
                            
                            <InColViewV2 style={{flex:1}}>
                                <input value={address || ""} placeholder={"주소"} readOnly style={{flex:1 ,padding:"8px"}} onClick={()=>{setPostCodeOn(true)}}/>
                            </InColViewV2>
                            <InColViewV2 style={{flex:1}}>
                                <input  value={detailAddress || ""} placeholder={"상세 주소"}  disabled={address.length === 0}  style={{flex:1 ,padding:"8px"}} onChange={(e)=>{setDetailAddress(e.target.value)}}/>
                            </InColViewV2>
                            
                        </LongInputBox>

                    </PrView>
                
                </div>
                <div style={{marginTop:20}}>
                    <PrView>
                        <CenterView style={{margin:10}}>

                            <CheckBox type="checkbox" checked={isNewManager} onChange ={()=>{isNewManagerHandler(!isNewManager)}}/>
                            <div>신규 매니저 등록</div>

                        </CenterView>
                        <CenterView style={{margin:15}}>
                            <CheckBox type="checkbox" checked={!isNewManager} onChange ={()=>{isNewManagerHandler(!isNewManager)}}/>
                            <div>기존 매니저</div>

                        </CenterView>
                    </PrView>
                </div>
                <div style={{position:"relative"}}>
                    
                    <PrView style={{borderRadius:"10px 10px 0 0"}}>
                        
                        <NameBox style={{borderRadius:"10px 0 0 0"}}>
                            <ColView>
                                <InColView>
                                <RedDiv>*</RedDiv> 매장 매니저 
                                </InColView>
                                {  isNewManager && <InColView> 이름 </InColView>}
                                { !isNewManager && <InColView> 정보 </InColView>}
                            </ColView>
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            { isNewManager && <InputLine style={{fontSize:15,textAlign:"center",flex:1}} placeholder="ex) 홍길동" value={managerName || ""} onChange={(e)=>{setManagerName(e.target.value)}}/>}

                            { !isNewManager && 
                                <SearchFocus managerList={managerSearchList} handler={selectManagerHandler} focusSeter={focusHandler}/>
                            }
                            
                        </InputBox>

                        <NameBox>
                            <ColView>
                                <InColView>
                                <RedDiv>*</RedDiv> 매니저 
                                </InColView>
                                <InColView> kakao 계정 </InColView>
                            </ColView>
                        </NameBox>

                        <InputBox style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine disabled={!isNewManager} style={{borderRadius:"0 10px 0 0",fontSize:15,textAlign:"center",flex:1}} placeholder="ex) example@kakao.com" value={managerAccount || ""} onChange={(e)=>{setManagerAccount(e.target.value)}}/>
                        </InputBox>
                    </PrView>

                    <PrView style={{borderRadius:"0 0 10px 10px"}}>
                        
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`,borderRadius:"0 0 0 10px"}}>
                            <ColView>
                                <InColView>
                                <RedDiv>*</RedDiv> 매니저 연락처
                                </InColView>
                                <InColView>( 전화 번호 ) </InColView>    
                            </ColView>
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine disabled={!isNewManager} style={{fontSize:15,textAlign:"center",flex:1}} placeholder="ex) 000-0000-0000" value={managerPhone || ""} onChange={(e)=>{setManagerPhone(e.target.value)}}/>
                            
                        </InputBox>

                        <NameBox  style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            <ColView>
                                <InColView> 매니저 </InColView>
                                <InColView> E-mail </InColView>    
                            </ColView>
                        </NameBox>

                        <InputBox style={{borderRadius:"0 0 10px 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine disabled={!isNewManager} style={{borderRadius:"0 0 10px 0",fontSize:15,textAlign:"center",flex:1}} placeholder="ex) example@kakao.com" value={managerEmail || ""} onChange={(e)=>{setManagerEmail(e.target.value)}}/>
                        </InputBox>
                    </PrView>

                    {
                        isFocus && focusingView
                    }
                
                </div>
                
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{registStore()}}>
                            등록
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
    font-size:15px;
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

const RedDiv =styled.div`
    margin: 2px;
    color: ${COLOR.RED};
` 
const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 15px;
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
    font-size: 15px;
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
    font-size:15px;

`;
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;

const SearchSelect = styled.select`
  border :0;
  margin:2px;
  flex:1;
  min-width:175px;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
    }
`;
const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`



export default StoreEachRegist