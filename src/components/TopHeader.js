import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Redirect } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../asset/Avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getMessages, deleteMessages } from "../state/actions/verifications";
import { BellFilled } from "@ant-design/icons";

function TopHeader({ setShow, show }) {
  let route = useRouteMatch();

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.verifications);
  const [open, setOpen] = useState(true);
  const [font, setFont] = useState("");
  const user = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    if (["/request","/transcript","/education","/institutions"].includes(route.url) && !user?.id ) {
      window.location.href = "/login";
      return <Redirect to="/login" />;
    }
  }, [user]);

  const handleMenuIcon = () => {
    setShow(!show);
  };

  useEffect(() => {
   dispatch(getMessages());
  }, [dispatch]);

  const handleFontChange = (font) => {
    setFont(font);
  };

  function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + " h ago";
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + " days ago";
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + " month ago";
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + " years ago";
  }
}

   function timeDifferenceForDate(date) {
    const now = new Date().getTime();
    const updated = new Date(date).getTime();
    return timeDifference(now, updated);
  }

  return (
    <HeadContainer className="top-header">
      <div>
        <>
          {" "}
          {route && route.url === "/education" ? (
            <h5>education verification</h5>
          ) : route && route.url === "/transcript" ? (
            <h5>transcript verification</h5>
          ) :  route && route.url === "/institutions" ? (
            <h5>Institutions</h5>
          ) : (
            <h5>overview</h5>
          )}
        </>
      </div>
      <div className="right-con">
        <div className="nots">
          <BellFilled
            style={{
              fontSize: "1.5em",
              color: "#2C3E50",
              width: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(!open)}
          />
          {!open && messages.length > 0 ? (
            <div className="messages">
             <p className="new-msg">{messages.length} New {messages.length > 1 ? 'Notifications' : 'Notification'}</p>
              {messages.map((message) => (
                <div key={message.id} className="message">
                
                  <h5>{message.subject}</h5>
                  <p>{message.message}</p>
                  
                  <p style={{fontWeight:"bold"}}>Request Id: {message.id}</p>
                  <div style={{display:'flex'}}>
                  <span style={{fontSize:'13px'}}>{timeDifferenceForDate(message?.dateTime)}</span>
                  <button
                    onClick={() => {
                      dispatch(deleteMessages(message.id));
                      handleFontChange(message.id);
                    }}
                    className={font === message.id ? "read" : ""}
                  >
                    mark as read
                  </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {messages.length > 0 && <div className="red-circle"></div>}
        </div>
        <div className="user-avatar">
          <img src={Avatar} alt="Avatar" />
          <div className="user-info">
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
      {!show ? (
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icon"
          onClick={handleMenuIcon}
        />
      ) : (
        <FontAwesomeIcon
          icon={faTimes}
          className="menu-icon"
          onClick={handleMenuIcon}
        />
      )}
    </HeadContainer>
  );
}

export default TopHeader;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 60px 10px 40px;
  border-bottom: 1px solid #eaeaea;
  opacity: 1;
  height: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    padding: 10px 40px 10px 40px;
  }
  .menu-icon {
    display: none;
    @media (max-width: 500px) {
      display: block;
      /* padding-right: 3px; */
      color: #171725;
      font-size: 28px;
    }
  }

  h5 {
    font-family: MontserratLight;
    letter-spacing: 0.12px;
    color: #707070;
    font-weight: 500;
    opacity: 1;
    font-size: 14px;
    text-transform: capitalize;

    @media (max-width: 400px) {
      margin-left: 0rem;
    }
    @media (max-width: 500px) {
      margin-left: 0rem;
    }
  }

  .right-con {
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
  .bell {
    width: 0.8em !important;
    height: 0.8em !important;
  }

  .nots {
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
    display: inline-block;
    .anticon.anticon-bell {
      outline: none !important;
    }
    .red-circle {
      position: absolute;
      top: 0px;
      right: 0px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #f42753;
      border: 2.2px solid #fff;
    }
    .messages {
      
      position: absolute;
      right: 30%;
      background: #ffffff;
      max-height: 500px;
      overflow-y: scroll;
      /* padding: 0.5rem 1rem; */
      color: #707070;
      width: 300px;
      text-align: left;
      border-radius: 5px;
      box-shadow: 0px 0px 10px #00000029;
        .new-msg{
          margin:10px !important;
          font-family:segoebold;
          font-size:14px
        }
      p{
        text-align:center
      }
      @media (max-width: 400px) {
        left: 10%;
        width: 250px;
      }
      @media (max-width: 500px) {
        width: 250px;
        left: 10%;
      }
      .message {
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        padding-bottom: 1.2rem;
        border-top:1px solid #Bfc2c7;
        padding:10px 25px;
        /* margin-top:10px !important; */
        h5{
          margin:0 !important;
          font-weight:bold;
          font-family:segoebold !important;
        }
        p{
          margin-top:5px !important;
          text-align:left;
          width:100%;
          font-size:14px;
          color:#707070;
          font-weight:400;
          line-height:22px
        }
        button {
          float: right;
          background: transparent;
          border: none;
          color: #0092e0;
          text-transform: capitalize;
          cursor: pointer;
          outline: none;
          margin-left:10px;
          &.read {
            font-weight: bolder;
          }
        }

        p {
          letter-spacing: 0.32px;
          opacity: 1;
          font-weight: normal;
        }
      }
    }
  }

  .profile-icon {
    margin-left: 20px;
    margin-right: 20px;
  }

  .user-avatar {
    display: flex;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #e2e2ea;
      opacity: 1;
    }
  }

  .user-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p {
      &:nth-child(1) {
        letter-spacing: 0.24px;
        color: #44444f;
        opacity: 0.85;
        font-weight: 500;
        font-size: 12px;
        margin: 0;
      }

      &:nth-child(2) {
        letter-spacing: 0.21px;
        color: #503faa;
        opacity: 0.95;
        font-weight: 500;
        font-size: 10px;
        margin: 0;
      }
    }
  }
`;
