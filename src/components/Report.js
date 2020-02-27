import React, { useContext } from 'react';
import { DispatchContext, StateContext } from "./context";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

/**
 * Post-session report
 * @returns {*}
 */
export default () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const report = state.get('report');
  const ratios = {
    der: report.getIn(['der', 'corrects']) / (report.getIn(['der', 'corrects']) + report.getIn(['der', 'wrongs'])),
    die: report.getIn(['die', 'corrects']) / (report.getIn(['die', 'corrects']) + report.getIn(['die', 'wrongs'])),
    das: report.getIn(['das', 'corrects']) / (report.getIn(['das', 'corrects']) + report.getIn(['das', 'wrongs'])),
  };

  return (
    <section className="row">
      <div className="col">
        <h2>Report</h2>
        <div className="card">
          <div className="card-header">
            <h3>Session Report</h3>
          </div>
          <div className="card-body">
            <div className="progress-group">
              <div className="progress-label">
                DER
              </div>
              <div className="progress mr-0">
                <div className="progress-bar" role="progressbar"
                     style={{
                       width: `${ratios.der * 100}%`,
                       backgroundColor: '#007bff',
                     }} />
              </div>
            </div>
            <div className="progress-group">
              <div className="progress-label">
                DIE
              </div>
              <div className="progress mr-0">
                <div className="progress-bar" role="progressbar"
                     style={{
                       width: `${ratios.die * 100}%`,
                       backgroundColor: '#dc3545',
                     }} />
              </div>
            </div>
            <div className="progress-group">
              <div className="progress-label">
                DAS
              </div>
              <div className="progress mr-0">
                <div className="progress-bar" role="progressbar"
                     style={{
                       width: `${ratios.das * 100}%`,
                       backgroundColor: '#28a745',
                     }} />
              </div>
            </div>
          </div>
        </div>
        <h3>Today Report</h3>
      </div>
    </section>
  );
};
