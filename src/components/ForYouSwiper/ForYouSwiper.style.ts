import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-bottom: 0.4rem;
`;
export const Container = styled.div`
  width: 100%;
  max-width: 1206px;
  height: auto;
  margin: 0 auto;
`;
export const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.div`
  width: 100%;
  h1 {
    margin: 0;
    padding: 0;
    padding-top: 15px;
    text-align: center;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    font-size: 1.7rem;
    margin-bottom: 0.8rem;
    line-height: 1.2;
    color: #000;
  }
`;
export const SlideItem = styled.div`
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  height: max-content;
`;
export const SlideLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 0;
  margin: 0 0 10px;
  text-decoration: none;
  cursor: pointer;
  color: #000;
  overflow: hidden;
`;
interface SlideImgProps {
  imageSource?: string;
}
export const SlideImg = styled.div<SlideImgProps>`
  background-image: url('${({ imageSource }) => imageSource}');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  height: auto;
  width: 100%;
  padding-bottom: 150%;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
`;
export const SlideDecs = styled.a`
  width: 100%;
  cursor: pointer;
  padding: 16px 8px 0px;
`;
export const SlideName = styled.div`
  width: 100%;
  text-align: left;
  p {
    padding: 0;

    margin: 0;
    font-size: unset;
    color: unset;
    font-weight: unset;
    text-transform: uppercase;
    display: block;
    word-break: break-word;
    height: auto;
    overflow: hidden;
  }
`;
export const SlidePrice = styled.div`
  display: flex;
  line-height: 2;
  min-height: 28px;
  white-space: nowrap;
  span {
    color: unset;
    font-weight: 500;
  }
`;
export const SwiperWrapper = styled.div`
  padding-top: 15px;

  padding-bottom: 3.8rem;
`;
