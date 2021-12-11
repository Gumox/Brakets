import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyContent = "flex-start" }) => justifyContent};
  align-items: ${({ alignItems = "center" }) => alignItems};
`;

export const Field = styled.div`
  height: ${({ height = "30px" }) => height};
  display: flex;
  align-items: center;
  margin-right: ${({ marginRight = "20px" }) => marginRight};

  > * {
    margin-right: 5px;
  }
`;

export const Section = styled.div`
  margin-right: ${({ marginRight = "40px" }) => marginRight};

  & {
    align-self: stretch;
  }

  &: last-child {
    margin-right: 0px;
  }
`;

export const SectionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
