import React, { useContext } from 'react';
import { StateContext } from "./context";
import LineChartWeeklyPerformance from "./LineChartWeeklyPerformance";

/**
 * Post-session report
 * @returns {*}
 */
export default () => {
  const state = useContext(StateContext);

  const session = state.getIn(['report', 'session']);
  const weeklyPerformance = state.getIn(['report', 'weekly_performance']);

  const sessionRatios = {
    der: session.getIn(['der', 'corrects']) / (session.getIn(['der', 'corrects']) + session.getIn(['der', 'wrongs'])),
    die: session.getIn(['die', 'corrects']) / (session.getIn(['die', 'corrects']) + session.getIn(['die', 'wrongs'])),
    das: session.getIn(['das', 'corrects']) / (session.getIn(['das', 'corrects']) + session.getIn(['das', 'wrongs'])),
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
                <div className="progress-bar bg-masculine" role="progressbar"
                     style={{
                       width: `${sessionRatios.der * 100}%`,
                     }} />
              </div>
            </div>
            <div className="progress-group">
              <div className="progress-label">
                DIE
              </div>
              <div className="progress mr-0">
                <div className="progress-bar bg-feminine" role="progressbar"
                     style={{
                       width: `${sessionRatios.die * 100}%`,
                     }} />
              </div>
            </div>
            <div className="progress-group">
              <div className="progress-label">
                DAS
              </div>
              <div className="progress mr-0">
                <div className="progress-bar bg-neuter" role="progressbar"
                     style={{
                       width: `${sessionRatios.das * 100}%`,
                     }} />
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header">
            <h3 className="mb-0">Weekly Report</h3>
          </div>
          <div className="card-body">
            <LineChartWeeklyPerformance weeklyPerformance={weeklyPerformance.toJS()} />
          </div>
        </div>
      </div>
    </section>
  );
};
