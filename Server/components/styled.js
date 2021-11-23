import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
`
