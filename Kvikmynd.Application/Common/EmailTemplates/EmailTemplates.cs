namespace Kvikmynd.Application.Common.EmailTemplates
{
    public static class EmailTemplates
    {
        public static string GetResetPasswordTemplate(string userName, string url)
        {
            return $@"<body
              marginheight=""0""
              topmargin=""0""
              marginwidth=""0""
              style=""margin: 0px; background-color: rgb(242, 243, 248);""
              leftmargin=""0""
            >
              <div
                style=""
                  min-width: 100%;
                  @import url(
                    https://fonts.googleapis.com/css?family=Roboto:300,
                    400,
                    500,
                    700|Open + Sans:300,
                    400,
                    600,
                    700
                  );
                  font-family: 'Open Sans', sans-serif;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                ""
              >
                <div
                  style=""
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    margin-top: 50px;
                  ""
                >
                  <h2 style=""font-family: 'Roboto', sans-serif;"">
                    KVIKMYND
                  </h2>
                </div>
                <div
                  style=""
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    max-width: 70%;
                    margin: 50px auto 0;
                    background-color: aquamarine;
                    border-radius: 10px;
                  ""
                >
                  <div
                    style=""
                      padding: 0 35px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    ""
                  >
                    <div style=""display: flex; flex-direction: column; align-items: center;"">
                      <h1
                        style=""
                          font-family: 'Roboto', sans-serif;
                          font-weight: 500;
                          font-size: 32px;
                          text-align: center;
                        ""
                      >
                        You have requested to reset your password
                      </h1>
                      <span
                        style=""
                          display: inline-block;
                          vertical-align: middle;
                          border-bottom: 1px solid #fcd6d0;
                          margin: 25px 0px;
                          width: 100px;
                        ""
                      ></span>
                    </div>
                    <h3
                      style=""
                        font-family: 'Roboto', sans-serif;
                        font-weight: 300;
                        text-align: center;
                      ""
                    >
                      Hello {userName},
                    </h3>
                    <p
                      style=""
                        font-family: 'Roboto', sans-serif;
                        text-align: center;
                        margin-top: 0px;
                      ""
                    >
                      Just press the button below and follow the instructions.
                    </p>
                    <a
                      style=""font-family: 'Roboto', sans-serif; text-align: center;""
                      href=""{url}""
                    >
                      <button
                        style=""
                          font-family: 'Roboto', sans-serif;
                          font-weight: 600;
                          line-height: 1.75;
                          text-transform: uppercase;
                          padding: 6px 16px;
                          border-radius: 10px;
                          color: black;
                          background-color: #fcd6d0;
                          text-decoration: none;
                          border: 0;
                          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
                            0px 2px 2px 0px rgb(0 0 0 / 14%),
                            0px 1px 5px 0px rgb(0 0 0 / 12%);
                          margin-bottom: 15px;
                        ""
                      >
                        Reset my password
                      </button>
                    </a>
                    <p
                      style=""
                        font-family: 'Roboto', sans-serif;
                        text-align: center;
                        margin-top: 0px;
                      ""
                    >
                      If you didn't request a password reset, you can ignore this email.
                      Your password will not be changed.
                    </p>
                    <p
                      style=""
                        font-family: 'Roboto', sans-serif;
                        font-weight: 600;
                        text-align: center;
                      ""
                    >
                      Thank you, The Kvikmynd Team
                    </p>
                  </div>
                </div>
              </div>
            </body>";
        }
    }
}