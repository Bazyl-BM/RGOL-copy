import _ from 'lodash';
import type { FC } from 'react';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Container = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

export const Rate = styled.div`
  font-size: 110px;
  line-height: 1;
  font-weight: 700;
`;
export const OpinionContainer = styled(Container)`
  padding: 2.4rem;
`;
export const StarBars = styled.div`
  width: 100%;
`;
export const StarConteiner = styled.div`
  display: flex;
  margin-bottom: 0.4rem;
`;
export const Star = styled.span`
  width: 20%;
  text-align: left;
  display: inline-block;
  span {
    vertical-align: sub;
    display: inline-block;
    margin-right: 0.8rem;
  }
`;
export const ProgresBarConteiner = styled.span`
  width: 80%;
  padding-left: 0.8rem;
  display: inline-block;
`;
interface ProgresBarProps {
  ProgressWidth: number;
}
export const ProgresBar = styled.div<ProgresBarProps>`
  border-bottom: 1px solid #c4c4c4;
  margin-top: 13px;
  div {
    height: 3px;
    background: #86c042;
    width: ${({ ProgressWidth }) => `${ProgressWidth}%`};
  }
`;
export const OpinionList = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-left: 10px;
`;
export const OpinionItem = styled(Flex)`
  padding-bottom: 2.4rem;
  padding-top: 1.6rem;
`;
export const OpinionUserDetails = styled(Container)`
  margin-bottom: 1.6rem;
  span {
    :nth-child(3) {
      display: inline-block;
      margin: 0.4rem 0.3rem;
    }
  }
`;
export const UserName = styled.span`
  display: inline-flex;
  align-items: baseline;
  margin-left: 0.8rem;
  img {
    height: auto;
    width: 20px;
    display: inline-block;
    margin-right: 8px;
    border: 1px solid rgb(242, 242, 242);
  }
  strong {
    color: #000;
  }
`;
export const OpinionText = styled.span`
  flex-direction: column;
  display: flex;
`;
interface Props {
  opinions: {
    userName: string;
    Date: string;
    rating: number;
    comment: string;
  }[];
  average: number;
}

const OpinionsProduct: FC<Props> = ({ opinions, average }) => {
  const percentReviews = _.groupBy(opinions, (o) => {
    return o.rating;
  });

  return (
    <div>
      <Flex>
        <Container>
          <Flex>
            <OpinionContainer>
              <Rate>{average.toFixed(1)}</Rate>

              <Rating
                ratingValue={average * 20}
                readonly
                size={18.5}
                fillColor="#86c042"
              />
              <br />
              <small>
                <span>{opinions.length}</span> łącznie
              </small>
            </OpinionContainer>
            <OpinionContainer>
              <StarBars>
                <div>
                  <StarConteiner>
                    <Star>
                      <span>5</span>
                      <Rating
                        ratingValue={5 * 20}
                        readonly
                        iconsCount={1}
                        size={18.5}
                        fillColor="#86c042"
                        emptyStyle={{ color: 'transparent' }}
                      />
                    </Star>
                    <ProgresBarConteiner>
                      <ProgresBar
                        ProgressWidth={
                          percentReviews[5]?.length !== undefined
                            ? (percentReviews[5].length / opinions.length) * 100
                            : 0
                        }
                      >
                        <div />
                      </ProgresBar>
                    </ProgresBarConteiner>
                  </StarConteiner>
                </div>
                <div>
                  <StarConteiner>
                    <Star>
                      <span>4</span>
                      <Rating
                        ratingValue={5 * 20}
                        readonly
                        iconsCount={1}
                        size={18.5}
                        fillColor="#86c042"
                        emptyStyle={{ color: 'transparent' }}
                      />
                    </Star>
                    <ProgresBarConteiner>
                      <ProgresBar
                        ProgressWidth={
                          percentReviews[4]?.length !== undefined
                            ? (percentReviews[4].length / opinions.length) * 100
                            : 0
                        }
                      >
                        <div />
                      </ProgresBar>
                    </ProgresBarConteiner>
                  </StarConteiner>
                </div>
                <div>
                  <StarConteiner>
                    <Star>
                      <span>3</span>
                      <Rating
                        ratingValue={5 * 20}
                        readonly
                        iconsCount={1}
                        size={18.5}
                        fillColor="#86c042"
                        emptyStyle={{ color: 'transparent' }}
                      />
                    </Star>
                    <ProgresBarConteiner>
                      <ProgresBar
                        ProgressWidth={
                          percentReviews[3]?.length !== undefined
                            ? (percentReviews[3].length / opinions.length) * 100
                            : 0
                        }
                      >
                        <div />
                      </ProgresBar>
                    </ProgresBarConteiner>
                  </StarConteiner>
                </div>
                <div>
                  <StarConteiner>
                    <Star>
                      <span>2</span>
                      <Rating
                        ratingValue={5 * 20}
                        readonly
                        iconsCount={1}
                        size={18.5}
                        fillColor="#86c042"
                        emptyStyle={{ color: 'transparent' }}
                      />
                    </Star>
                    <ProgresBarConteiner>
                      <ProgresBar
                        ProgressWidth={
                          percentReviews[2]?.length !== undefined
                            ? (percentReviews[2].length / opinions.length) * 100
                            : 0
                        }
                      >
                        <div />
                      </ProgresBar>
                    </ProgresBarConteiner>
                  </StarConteiner>
                </div>
                <div>
                  <StarConteiner>
                    <Star>
                      <span>1</span>
                      <Rating
                        ratingValue={5 * 20}
                        readonly
                        iconsCount={1}
                        size={18.5}
                        fillColor="#86c042"
                        emptyStyle={{ color: 'transparent' }}
                      />
                    </Star>
                    <ProgresBarConteiner>
                      <ProgresBar
                        ProgressWidth={
                          percentReviews[1]?.length !== undefined
                            ? (percentReviews[1].length / opinions.length) * 100
                            : 0
                        }
                      >
                        <div />
                      </ProgresBar>
                    </ProgresBarConteiner>
                  </StarConteiner>
                </div>
              </StarBars>
            </OpinionContainer>
          </Flex>
        </Container>
        <OpinionList>
          {opinions.map((opinion) => (
            <OpinionItem key={opinion.userName}>
              <OpinionUserDetails>
                <Rating
                  ratingValue={opinion.rating * 20}
                  readonly
                  size={18.5}
                  fillColor="#86c042"
                />
                <UserName>
                  <img src="https://www.r-gol.com/static/www/pngs/languages/flag_pl.png" />
                  <strong>{opinion.userName}</strong>
                </UserName>
                <span>|</span>
                <span>{opinion.Date}</span>
              </OpinionUserDetails>
              <OpinionText>{opinion.comment}</OpinionText>
            </OpinionItem>
          ))}
        </OpinionList>
      </Flex>
    </div>
  );
};
export default OpinionsProduct;
