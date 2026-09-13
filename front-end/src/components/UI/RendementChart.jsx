// // components/RendementChart.jsx
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// export default function RendementChart({ stats }) {
//   // نجهزو الداتا من stats
//   const data = (stats || [])
//     .filter((s) => s.rendement !== null && s.rendement !== undefined)
//     .map((s) => ({
//       name: s.nomParcelle,
//       rendement: s.rendement,
//       moyenne: s.moyenneHistorique || 0,
//       alerte: s.alerte || false,
//     }));

//   if (data.length === 0) {
//     return (
//       <div className="py-12 text-center text-gray-400 text-sm">
//         Pas assez de données pour afficher le graphique
//       </div>
//     );
//   }

//   return (
//     <div className="h-80 w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#9CA3AF", fontSize: 12 }}
//             dy={10}
//           />
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: "#9CA3AF", fontSize: 12 }}
//             unit="%"
//           />
//           <Tooltip
//             cursor={{ fill: "#F9FAFB" }}
//             contentStyle={{
//               borderRadius: "12px",
//               border: "none",
//               boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
//             }}
//             formatter={(value) => [`${value}%`, "Rendement"]}
//           />
//           <Bar dataKey="rendement" radius={[6, 6, 0, 0]} barSize={40}>
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={entry.alerte ? "#EF4444" : "#059669"}
//               />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }