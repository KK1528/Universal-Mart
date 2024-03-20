import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], []);

    useEffect(() => {
      const getuserstats = async () => {
        try {
          const res = await userRequest("/users/stats");
          res.data.map((item) => (
            setUserStats((prev) => [...prev, { name: MONTHS[item._id], "Active User": item.total }])
            )
          ) 
        }catch {};
      }
      getuserstats();
    }, [MONTHS]); 
  

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
