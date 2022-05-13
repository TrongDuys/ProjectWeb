import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { activeUser } from "../../../Redux/Action/authAction";
import { Link } from 'react-router-dom';

function Active(props) {

    const dispatch = useDispatch();
    const {id} = useParams();
    console.log(id);
    useEffect(() => {
        dispatch(activeUser(id))
    },[dispatch, id])
  return (
    <div>
      <div
        className="preheader"
        style={{
          display: "none",
          maxWidth: 0,
          maxHeight: 0,
          overflow: "hidden",
          fontSize: "1px",
          lineHeight: "1px",
          color: "#fff",
          opacity: 0,
        }}
      >
        A preheader is the short summary text that follows the subject line when
        an email is viewed in the inbox.
      </div>
      <table border={0} cellPadding={0} cellSpacing={0} width="100%">
        <tbody>
          <tr>
            <td align="center" bgcolor="#e9ecef">
              
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      valign="top"
                      style={{ padding: "36px 24px" }}
                    >
                      <a
                        href="https://sendgrid.com"
                        target="_blank"
                        rel = "noreferrer"
                        style={{ display: "inline-block" }}
                      >
                      {/* <p>
                        <h2>Welcome</h2>
                      </p> */}
                        <img
                          src="https://res.cloudinary.com/dnfydoll0/image/upload/v1644599544/t%E1%BA%A3i_xu%E1%BB%91ng_rrswfp.jpg"

                          alt="Logo"
                          border={0}
                          width={48}
                          style={{
                            display: "block",
                            width: "150px",
                            maxWidth: "150px",
                            minWidth: "48px",
                          }}
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/*[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]*/}
            </td>
          </tr>
          {/* end logo */}
          {/* start hero */}
          <tr>
            <td align="center" bgcolor="#e9ecef">
              {/*[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]*/}
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      align="left"
                      bgcolor="#ffffff"
                      style={{
                        padding: "36px 24px 0",
                        fontFamily:
                          '"Source Sans Pro", Helvetica, Arial, sans-serif',
                        borderTop: "3px solid #d4dadf",
                      }}
                    >
                      <h1
                        style={{
                          margin: 0,
                          fontSize: "32px",
                          fontWeight: 700,
                          letterSpacing: "-1px",
                          lineHeight: "48px",
                        }}
                      >
                        Xác nhận địa chỉ Email thành công
                      </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/*[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]*/}
            </td>
          </tr>
          {/* end hero */}
          {/* start copy block */}
          <tr>
            <td align="center" bgcolor="#e9ecef">
              {/*[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]*/}
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                {/* start copy */}
                <tbody>
                  <tr>
                    <td
                      align="left"
                      bgcolor="#ffffff"
                      style={{
                        padding: "24px",
                        fontFamily:
                          '"Source Sans Pro", Helvetica, Arial, sans-serif',
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                      Nhấn vào nút bên dưới để quay về trang đăng nhập của bạn.
                       {/* Nếu bạn không tạo tài khoản bằng {" "}
                        <a href="https://blogdesire.com">Paste</a>, bạn có thể xóa email này một cách an toàn. */}
                      </p>
                    </td>
                  </tr>
                  {/* end copy */}
                  {/* start button */}
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              bgcolor="#ffffff"
                              style={{ padding: "12px" }}
                            >
                              <table border={0} cellPadding={0} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      bgcolor="#1a82e2"
                                      style={{ borderRadius: "6px" }}
                                    >
                                      <Link to="/login"
                                       

                                        style={{
                                          display: "inline-block",
                                          padding: "16px 36px",
                                          fontFamily:
                                            '"Source Sans Pro", Helvetica, Arial, sans-serif',
                                          fontSize: "16px",
                                          color: "#ffffff",
                                          textDecoration: "none",
                                          borderRadius: "6px",
                                        }}
                                      >
                                        Đến trang đăng nhập
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {/* end button */}
                  {/* start copy */}
                  <tr>
                    <td
                      align="left"
                      bgcolor="#ffffff"
                      style={{
                        padding: "24px",
                        fontFamily:
                          '"Source Sans Pro", Helvetica, Arial, sans-serif',
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      {/* <p style={{ margin: 0 }}>
                        If that doesn't work, copy and paste the following link
                        in your browser:
                      </p>
                      <p style={{ margin: 0 }}>
                        <a href="https://blogdesire.com"  target="_blank"  rel = "noreferrer"  >
                          https://blogdesire.com/xxx-xxx-xxxx
                        </a>
                      </p> */}
                    </td>
                  </tr>
                  {/* end copy */}
                  {/* start copy */}
                  <tr>
                    <td
                      align="left"
                      bgcolor="#ffffff"
                      style={{
                        padding: "24px",
                        fontFamily:
                          '"Source Sans Pro", Helvetica, Arial, sans-serif',
                        fontSize: "16px",
                        lineHeight: "24px",
                        borderBottom: "3px solid #d4dadf",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        Thanks you,
                        <br /> Nongnghiepxanh
                      </p>
                    </td>
                  </tr>
                  {/* end copy */}
                </tbody>
              </table>
              {/*[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]*/}
            </td>
          </tr>
          {/* end copy block */}
          {/* start footer */}
          <tr>
            <td align="center" bgcolor="#e9ecef" style={{ padding: "24px" }}>
              {/*[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]*/}
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                {/* start permission */}
                <tbody>
                  <tr>
                    <td
                      align="center"
                      bgcolor="#e9ecef"
                      style={{
                        padding: "12px 24px",
                        fontFamily:
                          '"Source Sans Pro", Helvetica, Arial, sans-serif',
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#666",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        You received this email because we received a request
                        for [type_of_action] for your account. If you didn't
                        request [type_of_action] you can safely delete this
                        email.
                      </p>
                    </td>
                  </tr>
                  {/* end permission */}
                  {/* start unsubscribe */}
                  <tr>
                    <td
                      align="center"
                      bgcolor="#e9ecef"
                      style={{
                        padding: "12px 24px",
                        fontFamily:
                          '"Source Sans Pro", Helvetica, Arial, sans-serif',
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#666",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        To stop receiving these emails, you can{" "}
                        <a href="https://sendgrid.com" target="_blank" rel = "noreferrer">
                          unsubscribe
                        </a>{" "}
                        at any time.
                      </p>
                      <p style={{ margin: 0 }}>
                        Paste 1234 S. Broadway St. City, State 12345
                      </p>
                    </td>
                  </tr>
                  {/* end unsubscribe */}
                </tbody>
              </table>
              {/*[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]*/}
            </td>
          </tr>
          {/* end footer */}
        </tbody>
      </table>
      {/* end body */}
    </div>
  );
}

export default Active;
