import * as React from 'react';
import styled from 'styled-components';

import { navData } from '../data';

const NavWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  @media (max-width: 992px) {
    display: none;
  }
`;
const NavListLink = styled.a`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  padding-bottom: 0;
  padding-top: 15px;
  text-transform: uppercase;
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 600;
  line-height: 10px;
  color: #000;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  padding-right: 0;
  transition: color 0.25s;

  span {
    font-size: 14px;
  }
`;
const NavList = styled.ul`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  flex-wrap: nowrap;
  z-index: 10;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
  list-style: none;
`;
const NavListItem = styled.li`
  @media (min-width: 1200px) {
    padding: 0 2.4rem;
  }

  padding: 0 1.6rem;
  &:hover ${NavListLink} {
    color: #86c042;
  }
`;

const SubMenu = styled.div`
  position: fixed;
  background: #fff;
  left: 0;
  display: block;
  right: 0;
  opacity: 0;
  visibility: hidden;
  width: 100%;
  height: auto;
  padding: 2.4rem 1.6rem;
  transform: translateY(-100%);
  text-transform: uppercase;
  transition: opacity 0.25s, visibility 0.25s;
  transition-delay: 0.325s;
  z-index: 1;
  top: 0;
  ${NavList} li:hover & {
    margin-top: -1px;
    opacity: 1;
    top: 132px;
    visibility: visible;
    transform: translateY(0);
    transition-delay: 0.325s;
    border-bottom: 1px solid #fafafa;
    box-shadow: 0 5px 5px rgb(0 0 0 / 5%);
  }
`;
const SubMenuContainer = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
  transition-delay: 0.325s;
  padding: 0 1.6rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;

  @media (min-width: 992px) {
    max-width: 1199px;
  }
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  ${NavList} li:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
interface SubMenuProps {
  navWidth: number;
}
const SubMenuColumn = styled.div<SubMenuProps>`
  padding-left: 0;
  padding-right: 4.8rem;
  width: ${(props) => `${100 / props.navWidth}%`};

  ul {
    list-style: none;
    line-height: 1.5;
  }
`;
const SubMenuItem = styled.div`
  overflow-x: hidden;
  margin-top: 10px;
  :first-of-type {
    margin-top: 0px;
  }
  ul {
    padding-left: 0;
  }
`;

const SubMenuLink = styled.a`
  margin-top: 0;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  border-bottom: 0;
  transition: color 0.25s;
  &:hover {
    color: #86c042;
  }
`;
interface SubMenuTitleProps {
  isRed?: boolean;
}
const SubMenuTitle = styled(SubMenuLink)<SubMenuTitleProps>`
  font-weight: 700;
  color: ${(props) => (props.isRed ? 'red !important' : '')};
`;
const NavBar = () => (
  <NavWrapper>
    <nav>
      <NavList>
        {navData.map((item, i) => (
          <NavListItem key={i}>
            <NavListLink style={item.isRed ? { color: 'red' } : {}}>
              <span>{item.title}</span>
            </NavListLink>
            {item.navlinks !== undefined && (
              <SubMenu>
                <SubMenuContainer>
                  {item.navlinks?.map((subItem, subIndex) => (
                    <SubMenuColumn
                      navWidth={item.navlinks?.length || 0}
                      key={subIndex}
                    >
                      {subItem.map((sectionItem, sectionIndex) => (
                        <SubMenuItem key={sectionIndex}>
                          <SubMenuTitle isRed={sectionItem.isRed}>
                            {sectionItem.sectionTitle}
                          </SubMenuTitle>
                          <ul>
                            {sectionItem.links?.map((link, linkInedex) => (
                              <li key={linkInedex}>
                                <SubMenuLink>{link}</SubMenuLink>
                              </li>
                            ))}
                          </ul>
                        </SubMenuItem>
                      ))}
                    </SubMenuColumn>
                  ))}
                </SubMenuContainer>
              </SubMenu>
            )}
          </NavListItem>
        ))}
      </NavList>
    </nav>
  </NavWrapper>
);

export default NavBar;
