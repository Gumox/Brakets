import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import image from "../../../../public/icons/OK_image.png"
const ProductModify = ({
    infos=[],
    brands=[],
    user,
    item,
    cancel=()=>{},
}) =>{
    const router = useRouter();
    console.log(item)
    const [brandId,setBrandId] =useState(item.brand_id)
    const brandName = useState(item.brand_name)

    const [productBarcode,setProductBarcode] =useState(item.barcode)
    const [tagPrice,setTagPrice] =useState(item.tag_price)
    const [orgPrice,setOrgPrice] =useState(item.org_price)

    const [color,setColor] =useState(item.color)
    const [degree,setDegree] =useState(item.degree)
    const [size,setSize] =useState(item.size)

    const [productName,setProductName] =useState(item.name)
    

    const [useURL,setUseURL] =useState(true)
    const [imgURL,setImgURL] =useState(item.image)

    const [imgBase64, setImgBase64] = useState(); // 파일 base64
    const [imgFile, setImgFile] = useState("/icons/imageSelect.png");	//파일	

    
    let disabledLineColor = COLOR.BLACK

    if(!useURL){
        disabledLineColor = `rgb(250,250,250)`
    }
    
    const emptySpace =(str)=>{
        console.log("s ",str)
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
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files)
            setImgBase64(event.target.files[0]);
          let reader = new FileReader();
          reader.onload = (e) => {
            setImgFile(e.target.result);
            console.log(e.target.result)
          };
          reader.readAsDataURL(event.target.files[0]);
        }else{
            setImgFile("/icons/image.png");
        }
      }



    const modifyProduct = async() =>{
        const formData = new FormData();
        formData.append('companyName', infos[0].headquarter_name)
        formData.append('brandName',item.brand_name)
        formData.append('productId',item.product_id)
        
        formData.append('barcode', productBarcode)
        formData.append('tag_price', tagPrice)
        formData.append('org_price', orgPrice)
        formData.append('color', color)
        formData.append('degree', degree)
        formData.append('size', size)
        formData.append('productName', emptySpace(productName))
        formData.append('useURL', useURL)
        formData.append('imageUrl', imgURL)
        formData.append('imgfiles',imgBase64)
        
        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/product/updateProduct`,formData)
              .then(({ data }) => data.body), 
            ])
        alert("제품 정보가 수정되었습니다.")
        window.location.reload();
        console.log(formData)
    }
  
    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <h2>상품 정보 변경</h2>
                
                <PrView>
                    <div>
                    <PrView>
                        <NameBox>
                            상품 바코드
                        </NameBox>

                        <InputBoxTr style={{borderLeft: `2px solid ${COLOR.LIGHT_GRAY}`,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={productBarcode ||""} style={{flex:1,maxWidth:"205px"}} onChange={(e)=>{setProductBarcode(e.target.value)}}></InputLine>
                        </InputBoxTr>

                        <NameBox>
                            브랜드
                        </NameBox>

                        <InputBoxTr style={{width:"295px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,fontWeight:"bold",fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            {item.brand_name}
                        </InputBoxTr>
                    </PrView>

                    <PrView >
                        <NameBox>
                            상품 명
                        </NameBox>

                        <LongInputBox style={{maxWidth:"650px"}}>
                            <InputLine value={productName ||""} style={{flex:1,borderLeft:`2px solid ${COLOR.LIGHT_GRAY}`,maxWidth:"645px"}} onChange={(e)=>{setProductName(e.target.value)}}></InputLine>
                        </LongInputBox>
                    </PrView>

                    <PrView>
                        <NameBox>
                            희망 소비자가
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,width:"210px"}}>
                            <InputLine value={tagPrice || ""} style={{flex:1,maxWidth:"205px"}} onChange={(e)=>{setTagPrice(e.target.value)}}></InputLine>
                        </InputBox>

                        <NameBox>
                            원가
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,width:"295px"}}>
                            <InputLine value={orgPrice || ""} style={{flex:1,maxWidth:"290px"}} onChange={(e)=>{setOrgPrice(e.target.value)}}></InputLine>
                        </InputBox>
                    </PrView>
                    </div>

                    <div style={{flex:1,height:"180px",display:"flex",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <ProductImage src={item.image}/>
                    </div>
                </PrView>

                <PrView>
                    <NameBox >
                        시즌
                    </NameBox>

                    <InputBoxTr style={{borderLeft: `2px solid ${COLOR.LIGHT_GRAY}`,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,alignItems:"center"}}>
                        {item.season_name}
                    </InputBoxTr>

                    <NameBox >
                        카테고리
                    </NameBox>

                    <InputBoxTr style={{width:"150px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,alignItems:"center",borderLeft: `3px solid ${COLOR.LIGHT_GRAY}`}} >
                        {item.category_name}
                    </InputBoxTr>
                    <NameBox >
                        스타일 NO.
                    </NameBox>

                    <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,alignItems:"center"}}>
                        {item.style_code}
                    </InputBoxTr>
                </PrView>

                <PrView>
                    <NameBox >
                        Color
                    </NameBox>

                    <InputBoxTr style={{borderLeft: `2px solid ${COLOR.LIGHT_GRAY}`,borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                        <InputLine value={color ||""} style={{flex:1,width:"210px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setColor(e.target.value)}}></InputLine>
                        
                    </InputBoxTr>

                    <NameBox >
                        차수
                    </NameBox>

                    <InputBoxTr style={{width:"150px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderLeft: `3px solid ${COLOR.LIGHT_GRAY}`}} >
                        <InputLine value={degree ||""} style={{flex:1,width:"150px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setDegree(e.target.value)}}></InputLine>
                        
                    </InputBoxTr>
                    <NameBox >
                        Size
                    </NameBox>

                    <InputBoxTr style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                        <InputLine value={size ||""} style={{flex:1,width:"200px",fontSize:14,textAlign:"center"}} onChange={(e)=>{setSize(e.target.value)}}></InputLine>
                        
                    </InputBoxTr>
                </PrView>

               
                <PrView >
                    <NameBox style={{height:240}}>
                        <TwoNameBox>
                            <ColView>
                                상품 이미지
                            </ColView>
                            <ColView>
                                변경
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{height:240,borderTop:0,flexDirection:"column",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        
                        <PrView style={{flex:1,alignItems:"center" ,height:"80px"}}>
                            <CheckBox checked={useURL} style={{marginLeft:20}} type="checkbox" onChange={()=>{setUseURL(!useURL)}}/>
                            <div style={{fontSize:13,marginLeft:"20px",display:"flex",alignItems:"center"}}>{"URL 직접 입력"}</div>
                            <input disabled={!useURL} value={imgURL ||""} style={{flex:1,height:"20px",marginLeft:20,marginRight:20,border:0,borderBottom:`2px solid ${disabledLineColor}`}} onChange={(e)=>{setImgURL(e.target.value)}}/>
                        </PrView>
                        
                        <PrView style={{flex:2,alignItems:"center" ,height:"160px",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>

                            <div style={{display:"flex",alignItems:"center", width :120,height:"160px"}}>
                                <label htmlFor="image_file">
                                    <ImageButton src={imgFile} onClick={(e)=>{onImageChange(e)}}/>
                                </label>
                                <ImageInput disabled={useURL} type="file" accept="image/png, image/jpeg" id="image_file"   multiple="multiple" onChange={(e)=>{onImageChange(e)}}/>
                                
                            </div>
                            <div style={{display:"flex",flexDirection:"column",height:"160px",padding:"20px"}}>
                                <PrView >
                                    <CheckBox checked={!useURL} type="checkbox"  onChange={()=>{setUseURL(!useURL)}}/>
                                    <div style={{fontSize:14,marginLeft:"20px",display:"flex",alignItems:"center"}}>{"이미지 파일 올리기 - 권장이미지 : 500px * 500px / 5M 이하 / gif, png, jpg "}</div>
                                </PrView>
                            </div>
                            
                        </PrView>
                    </LongInputBox>
                </PrView>
                
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{modifyProduct()}}>
                            변경
                        </RegistButton>

                        <RegistButton style={{backgroundColor:COLOR.RED}} onClick={()=>{cancel()}}>
                            취소
                        </RegistButton>
                    </CenterView>
                
            </InsideWrapper>
        </Wrapper>
    );
};


const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    display:flex;
    min-width:750px;
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
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
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
    display:flex;
    flex-direction:column;

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
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    color:${COLOR.DARK_INDIGO};
    font-size: 18px;
    display:flex;
    width:210px;
    font-size:20px;
    font-weight:bold;
    justify-content:center;
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

`;

const ImageInput = styled.input`
    visibility:hidden;
`
const ImageButton = styled.img`
    width:100px;
    height:100px;
    background-color:${COLOR.WHITE};
    padding:10px;
    object-fit: contain;
    margin-left: 25px;
`
const ProductImage = styled.img`
    background-color:${COLOR.WHITE};
    padding:10px;
    flex:1;
    object-fit: contain;
`
const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`



export default ProductModify