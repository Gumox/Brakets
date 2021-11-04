import React from "react";
import Link from "next/link";
import styled from "styled-components";

export default function Admin() {
  return (
    <>
      <h1>Brackets Server</h1>
      <ul>
        <li>
          <Link href="/admin" passHref>
            <CustomLink>Link to Admin</CustomLink>
          </Link>
        </li>
      </ul>
    </>
  );
}

const CustomLink = styled.a`
  font-size: 20px;
  text-decoration: underline;
`;
