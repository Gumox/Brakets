import React from "react";
import styled from "styled-components";

import Content from "../Content";
import Info from "./info";
import List from "./list";

const Reception = ({ data }) => {
  return (
    <Content>
      <Info data={data} />
      <List />
    </Content>
  );
};

export default Reception;
