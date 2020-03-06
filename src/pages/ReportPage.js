import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardBody ,Badge } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';
import network from "../components/network";
import LineChartWeeklyPerformance from "../components/LineChartWeeklyPerformance";

export default (props) => {
  const [report, setReport] = useState({
    worstPerformers: [],
    weeklyPerformance: [],
  });
  useEffect(() => {
    (async () => {
      const { ok, report, error } = await network.get('/api/stats?reports=weekly&reports=worst');
      if (!ok) {
        return;
      }

      setReport({
        worstPerformers: report.worst_performers,
        weeklyPerformance: report.weekly_performance,
      });
    })();
  }, []);

  return (
    <div className="container report-page">
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
              {!!report.weeklyPerformance &&
              <LineChartWeeklyPerformance weeklyPerformance={report.weeklyPerformance}/>
              }
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
