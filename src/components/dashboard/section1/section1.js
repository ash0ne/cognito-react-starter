import React from "react";
{
  /* Code to construct the pretty display for IDP details and tokens */
}
const SectionOne = ({ tokens }) => (
  <div className="row">
    <h3 className="m-4 text-dark">
      This section has the sample code to get the tokens from the Auth object
    </h3>

    <div className="col-lg-7">
      <div className="card border-0 ml-4">
        <div className="card-body p-4">
          <h5 className="card-title text-purple">ID details from Cognito</h5>
          {tokens.idToken && tokens.idToken.payload && (
            <table>
              <tbody>
                {Object.entries(
                  JSON.parse(JSON.stringify(tokens.idToken.payload)),
                ).map(([key, value]) => (
                  <tr key={key}>
                    <td>
                      <b>{key}</b>
                    </td>
                    <td className="text-secondary">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    <div className="col-lg-5">
      <div className="card border-0 ml-4">
        <div className="card-body p-4">
          <h5 className="card-title text-purple">Auth Token</h5>
          <p className="card-text text-secondary">
            {"Bearer " + tokens.accessToken}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SectionOne;
