import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import Title from "../Dashcomponents/Title";
import { useAuth } from "../hooks/useAuth";
import { obtenerPSS } from "../entities/questionnarie";

function createData(jsonResponse) {
  return jsonResponse.data.data.map((Data) => {
    const { created_at, total } = Data;
    return {
      created_at: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "short",
        timeStyle: "short",
        hour12: true,
      }).format(new Date(created_at)),
      total,
    };
  });
}

export default function ChartPSS() {
  const auth = useAuth();
  const [data, setData] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    const fetchPrueba = () => {
      obtenerPSS({
        email: auth.user.user,
        access: auth.user.access,
      }).then((jsonResponse) => {
        setData(createData(jsonResponse));
      });
    };
    fetchPrueba();
  }, [auth.user.user, auth.user.access]);

  return (
    <React.Fragment>
      <Title>Escala de Estrés Percibido</Title>
      <ResponsiveContainer height={240}>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid stroke="#ccc"/>
          <XAxis
            dataKey="created_at"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
                fontWeight: "500",
              }}
            >
              Nivel de Estrés
            </Label>
          </YAxis>
          <Tooltip />
          <ReferenceLine
            y={13}
            label={{
              position: "insideTopRight",
              value: "Estrés Leve",
              fill: "#42855B",
              fontWeight: "500",
            }}
            stroke="#42855B"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={26}
            label={{
              position: "insideTopRight",
              value: "Estrés Moderado",
              fill: "#C28906",
              fontWeight: "500",
            }}
            stroke="#C28906"
            strokeDasharray="3 3"
          />
                    <ReferenceLine
            y={40}
            label={{
              position: "insideTopRight",
              value: "Estrés Severo",
              fill: "#D2001A",
              fontWeight: "500",
            }}
            stroke="#D2001A"
            strokeDasharray="3 3"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke={theme.palette.primary.main}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
