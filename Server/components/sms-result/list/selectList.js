import React from "react";
import styled from "styled-components";

const SelectList = ({data})=>{
    let lists=[];
    if(data[0]){
        data.map((item,i)=>{
            
            lists[i]=(
                <LaView>
                    <ItemView>
                        {item.No}
                    </ItemView>
                    <ItemView>
                        {item.mid}
                    </ItemView>
                    <ItemView>
                        {item.send_date}
                    </ItemView>
                    <ItemView>
                        {item.name}
                    </ItemView>
                    <ItemView>
                        {item.calling_number}
                    </ItemView>
                    <ItemView style={{width:250}}>
                        {item.msg}
                    </ItemView>
                    <ItemView>
                        {item.send_number}
                    </ItemView>
                    <ItemView>
                        {item.staff_code}
                    </ItemView>
                    <ItemView>
                        {item.sms_result_message}
                    </ItemView>
                </LaView>
            )
        })
    }

    return(
        <div>
            
            <Wrapper>
                <LaView >
                    <ItemView>
                        No.
                    </ItemView>
                    <ItemView>
                        MSGKEY
                    </ItemView>
                    <ItemView>
                    전송시각
                    </ItemView>
                    <ItemView>
                    수신자
                    </ItemView>
                    <ItemView>
                    수신번호
                    </ItemView>
                    <ItemView  style={{width:250}}>
                    내용
                    </ItemView>
                    <ItemView>
                    발신번호
                    </ItemView>
                    <ItemView>
                    발신자
                    </ItemView>
                    <ItemView>
                    TCS내용
                    </ItemView>
                </LaView>

                {
                    lists
                    /*data??
                    data.map((item)=>(
                        
                        <LaView>
                            <ItemView>
                                {item.No}
                            </ItemView>
                        </LaView>
                    )) */
                }
            </Wrapper>
        </div>
    )

}

    // No   , megkey ,전송시각  , 수신자, 수신번호   , 내용, 발신번호       ,발신자    , TCS내용
    // index, mid    ,send_date ,  name , send_number, msg,  calling_number,staff_code,sms_result
export default SelectList

const Wrapper = styled.nav`
    width: 100%;
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 40px;
  width :105px;
  display: flex;  
  flex-direction: row ;
  align-items: center;
  justify-content:center;
  `;
  const LaView = styled.div`
  display: flex;  
  align-items:center;
  flex-direction: coloum ;
`;