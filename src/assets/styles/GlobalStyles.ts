import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 300;
    font-family: Oswald,Fira Sans Extra Condensed,sans-serif;
    letter-spacing: normal;
    color: #727272;
    line-height: 1.75;
    overflow-x: hidden;
    @media (max-width: 767.98px){
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
}
 ::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
}
 ::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 6px;
}
}
.point-wrapper{color: #fff}
.leaflet-popup-content{
  color: #727272;
  .font-weight-bold{font-weight: 500}
  h6{font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    font-family: Oswald,Fira Sans Extra Condensed,sans-serif;
    line-height: 1.2;
    color: #000;}
    p{margin: 0}
    strong{    font: 600 12px Roboto, Arial, sans-serif;
    text-decoration: none;}
    .mb-0{
      margin-bottom: 0!important;
    }
    .mt-2{
      margin-top: 0.8rem!important;
    }
    .mt-3{
      margin-top: 1.6rem!important;
    }
    .btn{
      background-color: #86c042;
    border: 2px solid #86c042;
    color: #fff;
    padding: 0.8rem 4.8rem;
    font-size: 1.2rem;
    line-height: 1.5;
    border-radius: 0;
    display: inline-block;
    font-family: Oswald,Fira Sans Extra Condensed,sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    :hover{    background-color: #79ae3a;
    border-color: #79ae3a;
    color: #fff;
  cursor: pointer}
    transition: color .15s ease-in-out,background .15s ease-in-out,border .15s ease-in-out;
    }
}
a{
  cursor: pointer;
}
  }
  img, svg {
    vertical-align: middle;
}
  h1,h2,h3,h4,h5,h6 {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    margin-bottom: 0.8rem;
    font-family: Oswald,Fira Sans Extra Condensed,sans-serif;
    line-height: 1.2;
    color: #000;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }
  h5, h5 {
    font-size: 1.8rem;
    @media (max-width: 767.98px)
 {
    font-size: 14.4px;
}
}

  .swiper-slide {
    display: flex;
    justify-content: center;
}
strong{
  font-weight: 500;
}
  p{
    margin-top: 0;
    margin-bottom: 1.6rem;
  }
  footer h4 {
    font-weight: 500;
    font-size: 20px;
    text-transform: uppercase;
}
.hero-Swiper{
  img{width: 100%;}
.swiper-button-next, .swiper-button-prev {
  border-radius: 0;
  
    background-color: hsla(0,0%,100%,.6);
    color: #000;

    width: 14px;
    height: 14px;
    padding: 16px 9px!important;
}
.swiper-slide{
  width: auto;
  flex-shrink: 0;
  display: block;
  height: 100%;
  max-height: 100%;
}
.swiper-wrapper{
  max-height: 100%;
  height: 100%;
  display: flex;
}
.swiper-button-next{
right: 0;
::after{
  font-size:initial
}
}
.swiper-button-prev{
left: 0;
::after{
  font-size:initial
}
}
.swiper-pagination{
position:initial
}
.swiper-pagination-bullet{
  margin-top: 12px;   
    background-color: rgb(134, 192, 66);
}}
.product-Swiper{
.swiper-button-next, .swiper-button-prev {
  border-radius: 0;
  
    background-color: hsla(0,0%,100%,.6);
    color: #000;

    width: 14px;
    height: 14px;
    padding: 16px 9px!important;
}
.swiper-button-next{
right: 0;
::after{
  font-size:initial
}
}
.swiper-button-prev{
left: 0;
::after{
  font-size:initial
}
}
.swiper-pagination-bullet{
  opacity: 1;
    background-color: #000;
    margin-right: 12px !important;
    padding: 5px;
    :last-of-type{
      margin-right: 0 !important;
    }
}
.swiper-pagination-bullet-active{
   
    background-color: rgb(134, 192, 66);
}}
.star-svg{
  margin-right: 6px;
 
}
.RatingProduct{
  .empty-icons{
    display: none
  }
}
hr {
    border-top: 1px solid #e0e0e0;
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
   
}
h1 {
    font-size: 3.2rem;
}

.thumbs-Swiper {
  .swiper-wrapper {
    flex-direction: column;
  }
  .swiper-slide{
    width: 100% !important;
    margin-bottom: 1.6rem;
    transition: border-bottom .6s ease-in-out;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    img{
      width: 100%;
    }
    
  }
  .swiper-slide-thumb-active{
      border-bottom: 2px solid #86c042;
    }
   
}
.ReactModal__Content{
  @media (min-width: 576px)
{
    min-height: calc(100% - 3.5rem);
    max-width: 600px;
    margin: 1.75rem auto;
}

    display: flex;
    align-items: center;
    min-height: calc(100% - 1rem);

    position: relative;
    width: auto;
    margin: 0.5rem;
    pointer-events: none;

}
.visible{
    button{opacity:1}
    header{opacity: 1}
  }
  .Toastify__toast-container{
    width: 70vw
  }
  .marker-cluster-small {
	background-color: rgba(181, 226, 140, 0.6);
	}
.marker-cluster-small div {
	background-color: rgba(110, 204, 57, 0.6);
	}

.marker-cluster-medium {
	background-color: rgba(241, 211, 87, 0.6);
	}
.marker-cluster-medium div {
	background-color: rgba(240, 194, 12, 0.6);
	}

.marker-cluster-large {
	background-color: rgba(253, 156, 115, 0.6);
	}
.marker-cluster-large div {
	background-color: rgba(241, 128, 23, 0.6);
	}

	/* IE 6-8 fallback colors */
.leaflet-oldie .marker-cluster-small {
	background-color: rgb(181, 226, 140);
	}
.leaflet-oldie .marker-cluster-small div {
	background-color: rgb(110, 204, 57);
	}

.leaflet-oldie .marker-cluster-medium {
	background-color: rgb(241, 211, 87);
	}
.leaflet-oldie .marker-cluster-medium div {
	background-color: rgb(240, 194, 12);
	}

.leaflet-oldie .marker-cluster-large {
	background-color: rgb(253, 156, 115);
	}
.leaflet-oldie .marker-cluster-large div {
	background-color: rgb(241, 128, 23);
}

.marker-cluster {
	background-clip: padding-box;
	border-radius: 20px;
	}
.marker-cluster div {
	width: 30px;
	height: 30px;
	margin-left: 5px;
	margin-top: 5px;

	text-align: center;
	border-radius: 15px;
	font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
	}
.marker-cluster span {
	line-height: 30px;
	}
`;
