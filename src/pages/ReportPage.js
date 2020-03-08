import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Badge } from 'reactstrap';
import network from "../components/network";
import LineChartWeeklyPerformance from '../components/LineChartWeeklyPerformance';
import BarChartHistogram from '../components/BarChartHistogram';
import Loader from '../components/Loader';

export default (props) => {
  const [status, setStatus] = useState({ busy: false, error: null });
  const [report, setReport] = useState({
    worstPerformers: [],
    weeklyPerformance: [],
    histogram: [],
  });
  useEffect(() => {
    (async () => {
      setStatus({ busy: true });
      const { ok, report, error } = await network.get('/api/stats?reports=weekly&reports=worst&reports=histogram');
      if (!ok) {
        setStatus({ error });
        return;
      }

      setStatus({ busy: false });
      setReport({
        worstPerformers: report.worst_performers,
        weeklyPerformance: report.weekly_performance,
        histogram: report.histogram,
      });
    })();
  }, []);

  return (
    <div className="container report-page">
      {!!status.busy &&
      <Loader />
      }
      <section className="row">
        <div className="col">
          <h2>Report</h2>

          <Card>
            <CardHeader>
              <h5 className="mb-0">Needs improvements</h5>
            </CardHeader>
            <CardBody>
              {report.worstPerformers.map(item => (
              <Badge
                pill color="warning" className="p-2 mr-2 mb-2"
                style={{ opacity: (1.05 - item.confidence_factor) }}
              >
                {item.word}
                <span className="pl-2">{item.correct_factor * 100}%</span>
              </Badge>
              ))}
            </CardBody>
          </Card>

          <Card className="mt-2">
            <CardHeader>
              <h5 className="mb-0">Performance</h5>
            </CardHeader>
            <CardBody>
              {!!(report && report.histogram && report.histogram.length) &&
              <BarChartHistogram histogram={report.histogram} />
              }
              {!!(report && report.weeklyPerformance && report.weeklyPerformance.length) &&
              <LineChartWeeklyPerformance weeklyPerformance={report.weeklyPerformance}/>
              }
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
