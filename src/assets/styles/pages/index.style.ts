import styled from 'styled-components';

export const SlideItemHero = styled.div``;
export const HomePageBannerWrapper = styled.section`
  @media (max-width: 991.98px) {
    margin-bottom: 10px;
  }
`;
export const HomePageBannerDiv = styled.section`
  max-width: 1206px !important;
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 0;
  width: 100%;

  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    margin-bottom: 4.8rem;
  }
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
`;
export const HomePageBannerFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const HomePageBannerContainer = styled.div`
  padding-top: 69.25%;
  position: relative;
  display: block;
  width: 100%;

  overflow: hidden;
  @media (max-width: 575.98px) {
    padding-top: 269.25%;
  }
`;
export const HomePageBannerItem = styled.div`
  @media (max-width: 575.98px) {
    height: 25%;
    width: 100%;
    left: 0;
    :first-of-type {
      top: 25% !important;
      height: 25% !important;
      width: 100% !important;
      left: 0 !important;
    }
    :nth-of-type(2) {
      height: 25% !important;
      width: 100% !important;
      left: 0 !important;
      top: 0 !important;
    }
    :nth-of-type(3) {
      height: 50% !important;
      top: 50% !important;
      width: 100% !important;
      left: 0 !important;
    }
  }
  :first-of-type {
    left: 0;
    width: 50%;
    height: 50%;
    bottom: 0;
  }
  :nth-of-type(2) {
    left: 0;
    top: 0;
    width: 50%;
    height: 50%;
  }
  :nth-of-type(3) {
    left: 50%;
    width: 50%;
    height: 100%;
    top: 0;
  }
  @media (max-width: 991.98px) {
    border: 8px solid #fff;
  }
  position: absolute;
  overflow: hidden;
  border: 10px solid #fff;
  a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
    right: 0;
    background: #f0f0f0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    transition: all 0.3s ease-out;
    :hover {
      transform: scale(1.05);
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;

export const FirstCategorySection = styled.section`
  display: grid;

  grid-template: repeat(5, 1fr) / 1fr;
  @media (min-width: 767.98px) {
    grid-template: 0.5fr repeat(2, 1fr) / 1fr 1fr;
  }
  gap: 3rem 20px;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    margin-bottom: 4.8rem;
  }
  max-width: 1206px !important;
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
  a {
    @media (min-width: 767.98px) {
      :nth-of-type(1) {
        grid-row: 1 / 2;
        grid-column: 1 / 3;
      }
      :nth-of-type(2) {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
      }
      :nth-of-type(3) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
      }
      :nth-of-type(4) {
        grid-row: 3 / 4;
        grid-column: 2 / 3;
      }
      :nth-of-type(5) {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
      }
    }
    display: flex;
    cursor: pointer;
    img {
      max-width: 100%;
      height: auto;
      display: inline;
    }
  }
`;
export const BannerSection = styled.section`
  padding-bottom: 4.8rem;
`;
export const BannerWrapper = styled.div`
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  width: 100%;

  margin-right: auto;
  margin-left: auto;
`;
export const BannerWrapperSmall = styled(BannerWrapper)`
  max-width: 1170px;
`;
interface BannerItemProps {
  isReserve?: boolean;
}
export const BannerItem = styled.div<BannerItemProps>`
  @media (max-width: 767.98px) {
    flex-direction: column;
  }
  flex-direction: ${(props) => (props.isReserve ? 'row-reverse' : '')};
  display: flex;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #727272;
  padding-bottom: 0;
  margin-bottom: 0;
  border: 0;
`;
export const BannerPhoto = styled.div`
  @media (max-width: 767.98px) {
    width: 100%;
  }
  width: 50%;
  margin-bottom: 10px;
  a {
    cursor: pointer;
    img {
      margin-right: -15%;
      max-width: 100%;
      max-width: 100%;
      height: auto;
      @media (max-width: 767.98px) {
        margin-right: 0;
        margin-left: 0;
        max-width: 100%;
      }
    }
  }
`;
export const BannerContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-left: 20px;
  @media (max-width: 767.98px) {
    width: 100%;
  }
`;
export const BannerText = styled.div`
  padding-bottom: 4.8rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  width: 100%;
  display: block;
  h3 {
    @media (max-width: 767.98px) {
      font-size: 16px;
    }
    @media (min-width: 767.98px) and (max-width: 1199.98px) {
      font-size: 18px;
    }
    font-weight: 600;
  }
  p {
    text-align: justify;
    color: #000;
  }
`;
export const BannerButton = styled.a`
  background-color: #86c042;
  border: 2px solid #86c042;
  color: #fff;
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
    border 0.15s ease-in-out;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.8rem 4.8rem;
  font-size: 1.4rem;
  line-height: 1.5;
  border-radius: 0;
  :hover {
    background-color: #79ae3a;
    border-color: #79ae3a;
    color: #fff;
  }
`;
export const CategorySection = styled.section`
  display: grid;
  grid-template: repeat(4, 1fr) / 1fr 1fr;
  @media (min-width: 767.98px) {
    grid-template: 1fr 1fr / repeat(4, 1fr) !important;
  }
  gap: 6.4rem 16px;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 1206px !important;
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }

  a {
    @media (min-width: 767.98px) {
      :nth-of-type(1) {
        grid-row: 1 / 2 !important;
        grid-column: 1 / 2 !important;
      }
      :nth-of-type(2) {
        grid-row: 1 / 2 !important;
        grid-column: 2 / 3 !important;
      }
      :nth-of-type(3) {
        grid-row: 1 / 2 !important;
        grid-column: 3 / 4 !important;
      }
      :nth-of-type(4) {
        grid-row: 1 / 2 !important;
        grid-column: 4 / 5 !important;
      }
      :nth-of-type(5) {
        grid-row: 2 / 3 !important;
        grid-column: 4 / 5 !important;
      }
      :nth-of-type(6) {
        grid-row: 2 / 3 !important;
        grid-column: 3 / 4 !important;
      }
      :nth-of-type(7) {
        grid-row: 2 / 3 !important;
        grid-column: 2 / 3 !important;
      }
      :nth-of-type(8) {
        grid-row: 2 / 3 !important;
        grid-column: 1 / 2 !important;
      }
    }
    :nth-of-type(1) {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    :nth-of-type(2) {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }
    :nth-of-type(3) {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
    :nth-of-type(4) {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    :nth-of-type(5) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
    :nth-of-type(6) {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
    }
    :nth-of-type(7) {
      grid-row: 4 / 5;
      grid-column: 1 / 2;
    }
    :nth-of-type(8) {
      grid-row: 4 / 5;
      grid-column: 2 / 3;
    }
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
    aspect-ratio: 1/1;

    div {
      background-size: cover !important;
      transition: all 0.3s ease-out;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      :hover {
        transform: scale(1.05);
      }
      img {
        width: 100%;
      }
    }
  }
`;
